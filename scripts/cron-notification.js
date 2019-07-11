const CronJob = require('cron').CronJob;
const models = require('../db/models');
const moment = require('moment');
const Op = require('sequelize').Op;


// identify expired attachments and create notifications to Users
new CronJob('00 00 00 * * *', async () => {
    try {
        console.log('Notification cron start');
        const now = moment().format();

        const companies = await models.Company.findAll({
            attributes: ['id', 'socialName'],
            where: {
                CompanyStatusId: 5,
            }
        })
        for (const company of companies) {
            const expiredAttachments = await company.getCompanyAttachments({
                attributes: ['id'],
                where: {
                    AttachmentStatusId: 2,
                    validityDate: { [Op.lt]: now }
                }
            });
            if (expiredAttachments.length) {
                const users = await company.getUsers({ UserStatusId: 1 });
                const notifications = await users.map(user => {
                    return models.Notification.build({
                        UserId: user.id,
                        message: `Olá,<br>A empresa ${company.socialName} tem documentos vencidos, acesse a aplicação e reenvie os documentos atualizados.<br><br> `
                    })
                });
                for (notification of notifications) {
                    await notification.sendEmail();
                    await notification.save();
                }
            }
        }
        console.log('Notification cron end');
    } catch (err) {
        console.log(err)
    }

}, null, true, 'America/Sao_Paulo');


// identify expired integration to Notify the users
new CronJob('00 30 00 * * *', async () => {
    try {
        console.log('Notification expired integration start');
        const now = moment().format()
        const fifteenDaysAhead = moment().add(15, "days").format();
        const almostExpiredIntegrations = await models.IntegrationSchedule.findAll({
            where: {
                validityDate: {
                    [Op.between]: [now, fifteenDaysAhead]
                }
            }
        });

        for (integration of almostExpiredIntegrations) {
            const employee = await integration.getEmployee();
            const company = await employee.getCompany();
            const users = await company.getUsers({ where: { UserTypeId: 2 } });
            const notifications = users.map(user => {
                return models.Notification.build({
                    UserId: user.id,
                    message: `Olá ${user.name},<br> Há colaborador(es) com a integração prestes a vencer, acesse o sistema <link> para agendar novas integrações.`
                })
            })
            for (notification of notifications) {
                await notification.sendEmail();
                await notification.save();
            }
            return 'foi';
        }
        console.log('Notification expired integration end');
    } catch (err) {
        console.log(err)
    }

}, null, true, 'America/Sao_Paulo');