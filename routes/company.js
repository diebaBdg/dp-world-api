const router = require('express').Router();
const controller = require('../controllers/company');
const expressValidator = require('./middlewares/express-validator');
const validators = require('./validators/company-validators');
const multer = require('multer');
const mkdirp = require('mkdirp');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const path = './uploads/companies/' + req.params.id;
        mkdirp(path, (err) => {
            if (err){
                console.error(err);
                cb(error);
            } else {
                cb(null, path);
            }
        });
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.').pop())
    }
})
const upload = multer({ storage: storage })

/**
 * @api {get} /companies List of companies
 * @apiName GetCompanies
 * @apiGroup Companies
 * 
 * @apiParam (Query params) {Int} page The page.
 * @apiParam (Query params) {String} order_by A column to order.
 * @apiParam (Query params) {String} order_direction The order direction (ASC or DESC).
 * @apiParam (Query params) {Int} status Filter by status.
 * @apiParam (Query params) {String} cnpj Filter by cnpj.
 * @apiParam (Query params) {String} socialName  Filter by social name.
 *
 * @apiSuccess {Int} count Number of total items.
 * @apiSuccess {Int} pages Number of pages.
 * @apiSuccess {Array} rows List of companies.
 * 
 * @apiSuccessExample {json} Sucesso (example)
 *    HTTP/1.1 200 OK
 *     {
 *           "count": 1,
 *           "pages": 1,
 *           "rows": [
 *               {
 *                  "id": 37,
 *                  "cnpj": "32325649000999",
 *                  "socialName": "socialName Teste 1",
 *                  "businessName": "businessName Teste 2",
 *                  "address": "Av Afonso Pena 3148",
 *                  "number": "1",
 *                  "complement": "apto 101",
 *                  "district": "Funcionários",
 *                  "city": "Belo Horizonte",
 *                  "state": "MG",
 *                  "country": "Brazil",
 *                  "cep": "30130012",
 *                  "phone": "31989915622",
 *                  "inscricaoEstadual": "12354885",
 *                  "site": "http://www.semsite.com.br",
 *                  "createdAt": "2019-03-24T21:41:04.110Z",
 *                  "updatedAt": "2019-03-25T16:43:05.794Z",
 *                  "CompanyStatusId": 2,
 *                  "CompanyTypeId": 1,
 *                  "SectorId": 1,
 *                  "CompanyId": null,
 *                  "CompanyStatus": {
 *                      "id": 2,
 *                      "description": "Envio de documentos"
 *                  },
 *                  "CompanyType": {
 *                      "id": 1,
 *                      "description": "Estrangeiro"
 *                  }]
 *              }
 *           ]
 *       }
 */
router.get('/', validators.get, expressValidator.findsValidatorErros(), controller.get);

/**
 * @api {get} /companies/:id Get a company
 * @apiName GetCompany
 * @apiGroup Companies
 * 
 * @apiParam (Query params) {Int} id The company id.
 *
 * @apiSuccess {object} data The company data.
 * 
 * @apiSuccessExample {json} Sucesso (example)
 *    HTTP/1.1 200 OK
 *     {
 *          "id": 44,
 *          "cnpj": "32325649000997",
 *          "socialName": "Razao teste 7",
 *          "businessName": null,
 *          "address": "Rua 1",
 *          "number": "40",
 *          "complement": null,
 *          "district": "Serra",
 *          "city": "Belo horizonte",
 *          "state": "MG",
 *          "country": "Brazil",
 *          "cep": null,
 *          "phone": "31989915622",
 *          "inscricaoEstadual": null,
 *          "site": null,
 *          "objectOfContract": null,
 *          "createdAt": "2019-04-02T03:11:08.954Z",
 *          "updatedAt": "2019-04-06T02:17:44.828Z",
 *          "CompanyStatusId": 2,
 *          "CompanyTypeId": 2,
 *          "SectorId": 1,
 *          "CompanyId": null
 *     }
 */
router.get('/:id', validators.get, expressValidator.findsValidatorErros(), controller.getOne);

/**
 * @api {post} /companies Create a new company
 * @apiName PostCompanies
 * @apiGroup Companies
 * 
 * @apiParam (Request body) {String} cnpj Brazilian document number.
 * @apiParam (Request body) {String} socialName Social name.
 * @apiParam (Request body) {String} businessName List Business name.
 * @apiParam (Request body) {String} address The local of the company.
 * @apiParam (Request body) {String} number The street number.
 * @apiParam (Request body) {String} complement The complement address.
 * @apiParam (Request body) {String} district The district.
 * @apiParam (Request body) {String} city The city.
 * @apiParam (Request body) {String} state The state or province.
 * @apiParam (Request body) {String} country The country.
 * @apiParam (Request body) {String} cep The postal code.
 * @apiParam (Request body) {String} phone The phone number.
 * @apiParam (Request body) {String} inscricaoEstadual Brazilian document number.
 * @apiParam (Request body) {String} site Company web site.
 * @apiParam (Request body) {Int}    CompanyTypeId Company type.
 * @apiParam (Request body) {Int}    CompanyId If is outsourced, the id of the company contractor.
 * 
 * 
 * @apiSuccess {Int} id Companie inserted
 * 
 * @apiSuccessExample {json} Sucesso (example)
 *    HTTP/1.1 201 OK
 *    {
 *        "id": 19
 *    }
 */
router.post('/', validators.post, expressValidator.findsValidatorErros(), controller.post);

/**
 * @api {patch} /companies/:id Update a company status
 * @apiName PatchCompanies
 * @apiGroup Companies
 * 
 * @apiParam (Params) {Int} id The company id.
 * @apiParam (Request body) {Int} SectorId Company sector id.
 * @apiParam (Request body) {Int} CompanyStatusId Company status id.
 * 
 * @apiSuccess {Int} updated 1 if the item was updated or 0 if is not
 * 
 * @apiSuccessExample {json} Success (example):
 *    HTTP/1.1 200 OK
 *    {
 *        "updated": 1
 *    }
 */
router.patch('/:id', validators.patch, expressValidator.findsValidatorErros(), controller.patch);

/**
 * @api {get} /companies/:id/contacts List of company contacts
 * @apiName GetCompaniesContact
 * @apiGroup Companies-Contact
 * 
 * @apiParam (Request body) {Int} id The company id.
 * 
 * @apiSuccess {Int} count Number of total items.
 * @apiSuccess {Array} rows List of contacts
 * 
 * @apiSuccessExample {json} Sucesso (example)
 *    HTTP/1.1 200 OK
 *    {
 *        "count": 2,
 *        "rows": [{
 *               "id": 31,
 *               "name": "José da Silva",
 *               "email": "velosojonathan7@gmail.com",
 *               "phone": null,
 *               "phone2": null
 *         }, {
 *               "id": 30,
 *               "name": "José da Silva",
 *               "email": "velosojonathan6@gmail.com",
 *               "phone": null,
 *               "phone2": null
 *         }]
 *    }
 */
router.get('/:id/contacts', validators.getContacts, expressValidator.findsValidatorErros(), controller.getContacts);

/**
 * @api {post} /companies/:id/contacts Create a new contact
 * @apiName PostCompaniesContact
 * @apiGroup Companies-Contact
 * 
 * @apiParam (Request body) {Int} id The company id.
 * @apiParam (Request body) {String} name The contact name.
 * @apiParam (Request body) {String} email The contact email.
 * 
 * @apiSuccess {Int} id Contact inserted
 * 
 * @apiSuccessExample {json} Sucesso (example)
 *    HTTP/1.1 201 OK
 *    {
 *        "id": 1,
 *        "msg": "Cadastrado com sucesso."
 *    }
 */
router.post('/:id/contacts', validators.postContacts, expressValidator.findsValidatorErros(), controller.postContacts);

/**
 * @api {post} /companies/:id/attachments Create a new company attachment
 * @apiName PostCompaniesAttachment
 * @apiGroup Companies-Attachment
 * 
 * @apiParam (Params) {Int} id The company id.
 * @apiParam (Multipart) {File} attachment The attachment file.
 * @apiParam (Multipart) {Int} DocumentId The Document id.
 * 
 * @apiSuccess {Int} id Company attachment inserted
 * 
 * @apiSuccessExample {json} Sucesso (example)
 *    HTTP/1.1 201 OK
 *    {
 *        "id": 1,
 *        "msg": "Anexado com sucesso."
 *    }
 */
router.post('/:id/attachments', upload.single('attachment'), validators.postAttachment, expressValidator.findsValidatorErros(), controller.postAttachment);

/**
 * @api {get} /companies/:id/attachments List company attachments
 * @apiName GetCompaniesAttachment
 * @apiGroup Companies-Attachment
 * 
 * @apiParam (Params) {Int} id The company id.
 * 
 * @apiSuccess {Array} rows List of attachments
 * 
 * @apiSuccessExample {json} Sucesso (example)
 *    HTTP/1.1 201 OK
 *    {
 *        "rows": [{
 *          "id": 26,
 *          "originalName": "relatorioD45.csv",
 *          "fileName": "attachment-1554686665843.csv",
 *          "validityDate": "2019-04-08T01:24:26.021Z",
 *          "encoding": "7bit",
 *          "mimetype": "text/csv",
 *          "destination": "./uploads/companies/44",
 *          "size": "9295856",
 *          "path": "uploads\\companies\\44\\attachment-1554686665843.csv",
 *          "createdAt": "2019-04-08T01:24:26.024Z",
 *          "updatedAt": "2019-04-08T01:24:26.024Z",
 *          "AttachmentStatusId": 1,
 *          "CompanyId": 44,
 *          "DocumentId": 2,
 *          "AttachmentStatus": {
 *              "id": 1,
 *              "name": "Aguardando Aprovação",
 *           }
 *       },
 *       {
 *          "id": 24,
 *          "originalName": "relatorioD45.csv",
 *          "fileName": "attachment-1554592781596.csv",
 *          "validityDate": "2019-04-06T23:19:41.778Z",
 *          "encoding": "7bit",
 *          "mimetype": "text/csv",
 *          "destination": "./uploads/companies/44",
 *          "size": "9295856",
 *          "path": "uploads\\companies\\44\\attachment-1554592781596.csv",
 *          "createdAt": "2019-04-06T23:19:41.778Z",
 *          "updatedAt": "2019-04-06T23:19:41.778Z",
 *          "AttachmentStatusId": 1,
 *          "CompanyId": 44,
 *          "DocumentId": 3,
 *          "AttachmentStatus": {
 *              "id": 1,
 *              "name": "Aguardando Aprovação"
 *          }
 *      }]
 *    }
 */
router.get('/:id/attachments', validators.getAttachments, expressValidator.findsValidatorErros(), controller.getAttachments);

/**
 * @api {get} /companies/:id/attachments/:idAttachment/file Download a company attachments
 * @apiName GetCompaniesAttachmentFile
 * @apiGroup Companies-Attachment
 * 
 * @apiParam (Params) {Int} id The company id.
 * @apiParam (Params) {Int} idAttachment The attachment id.
 * 
 * @apiSuccess {File} file The attachment file
 */
router.get('/:id/attachments/:idAttachment/file', validators.getAttachmentFile, expressValidator.findsValidatorErros(), controller.getAttachmentFile);

/**
 * @api {patch} /companies/:id/attachments/:idAttachment Update a attachment status
 * @apiName PatCompaniesAttachment
 * @apiGroup Companies-Attachment
 * 
 * @apiParam (Params) {Int} id The company id.
 * @apiParam (Params) {Int} idAttachment The attachment id.
 * @apiParam (Request body) {Int} AttachmentStatusId The status.
 * @apiParam (Request body) {String} note A note about the alteration.
 * 
 * @apiSuccessExample {json} Sucesso (example)
 *    HTTP/1.1 200 OK
 *    {
 *        "updated": 1,
 *        "msg": "Atualizado com sucesso."
 *    }
 */
router.patch('/:id/attachments/:idAttachment', validators.pathAttachment, expressValidator.findsValidatorErros(), controller.pathAttachment);

module.exports = router;