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
            if(expiredAttachments.length){
                const users = await company.getUsers({UserStatusId: 1});
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