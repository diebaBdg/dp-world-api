const router = require('express').Router();
const controller = require('../controllers/employee');
const expressValidator = require('./middlewares/express-validator');
const validators = require('./validators/employee-validators');
const auth = require("../config/auth")();
router.use(auth.authenticate());
const multer = require('multer');
const mkdirp = require('mkdirp');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const path = './uploads/employee/' + req.params.id;
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
 * @api {get} /employees List of employees
 * @apiName GetEmployees
 * @apiGroup Employees
 * 
 * @apiParam (Query params) page The page.
 * @apiParam (Query params) order_by A column to order.
 * @apiParam (Query params) order_direction The order direction (ASC or DESC).
 * @apiParam (Query params) CompanyId The company id.
 *
 * @apiSuccess {Int} count Number of total items.
 * @apiSuccess {Int} pages Number of pages.
 * @apiSuccess {Array} rows List of employees
 * 
 * @apiSuccessExample {json} Success (example)
 *    HTTP/1.1 200 OK
 *    {
 *       "count": 1,
 *       "pages": 1,
 *       "rows": [{
            "id": 4,
            "name": "João",
            "birthDate": "2009-01-07T00:00:00.000Z",
            "sector": "Compras",
            "rg": "MG45875255",
            "cpf": "10463904657",
            "phone": "37999223568",
            "email": "velosojonathan6@gmail.com",
            "address": "aaa",
            "number": "aaa",
            "complement": "aaa",
            "district": "aaa",
            "city": "aaa",
            "state": "MG",
            "country": "aaa",
            "cep": "30130012",
            "createdAt": "2019-04-11T04:37:53.000Z",
            "updatedAt": "2019-04-16T01:33:25.980Z",
            "CompanyId": 1,
            "FunctionId": 1,
            "EmployeeStatusId": 1
         }]
 *    }
 */
router.get('/', validators.get, expressValidator.findsValidatorErros(), controller.get);

/**
 * @api {patch} /employees/:id Update a employee status
 * @apiName PatchEmployees
 * @apiGroup Employees
 * 
 * @apiParam (Query params) id The employee id.
 * @apiParam (Request body) EmployeeStatusId A employee status id.
 *
 * @apiSuccess {Int} updated If was updated.
 * @apiSuccess {String} msg Success message
 * 
 * @apiSuccessExample {json} Success (example)
 *    HTTP/1.1 200 OK
 *    {
 *        "updated": 1,
 *        "msg": "Atualizado com sucesso."
 *    }
 */
router.patch('/:id', validators.patch, expressValidator.findsValidatorErros(), controller.patch);

/**
 * @api {post} /employees Create a employee
 * @apiName PostEmployees
 * @apiGroup Employees
 * 
 * @apiParam (Request body) {String} name Employee name.
 * @apiParam (Request body) {Date} birthDate The birth date. format: YYYY-MM-DD
 * @apiParam (Request body) {String} sector The description about the employee sector.
 * @apiParam (Request body) {String} rg Brazilian personal document.
 * @apiParam (Request body) {String} cpf Brazilian personal document number.
 * @apiParam (Request body) {String} phone The phone number.
 * @apiParam (Request body) {String} email The employee email.
 * @apiParam (Request body) {String} address The local of the company.
 * @apiParam (Request body) {String} number The street number.
 * @apiParam (Request body) {String} complement The complement address.
 * @apiParam (Request body) {String} district The district.
 * @apiParam (Request body) {String} city The city.
 * @apiParam (Request body) {String} state The state or province.
 * @apiParam (Request body) {String} country The country.
 * @apiParam (Request body) {String} cep The postal code.
 * @apiParam (Request body) {Int} CompanyId The company id.
 * @apiParam (Request body) {Int} FunctionId The function id.
 *
 * @apiSuccess {Int} id Function inserted
 * @apiSuccess {String} msg Success message
 * 
 * @apiSuccessExample {json} Success (example)
 *    HTTP/1.1 200 OK
 *    {
 *        "id": 17,
 *        "msg": "Cadastrado com sucesso."
 *    }
 */
router.post('/', validators.post, expressValidator.findsValidatorErros(), controller.post);

/**
 * @api {get} /employees/:id/attachments/:idAttachment/file Download a employee attachments
 * @apiName GetEmployeesAttachmentFile
 * @apiGroup Employees-Attachment
 * 
 * @apiParam (Params) {Int} id The employee id.
 * @apiParam (Params) {Int} idAttachment The attachment id.
 * 
 * @apiSuccess {File} file The attachment file
 */
router.get('/:id/attachments/:idAttachment/file', validators.getAttachmentFile, expressValidator.findsValidatorErros(), controller.getAttachmentFile);

/**
 * @api {get} /employees/:id/attachments List employee attachments
 * @apiName GetEmployeesAttachment
 * @apiGroup Employees-Attachment
 * 
 * @apiParam (Params) {Int} id The employee id.
 * 
 * @apiSuccess {Array} rows List of attachments
 * 
 * @apiSuccessExample {json} Sucesso (example)
 *    HTTP/1.1 201 OK
 *    {
 *        "rows": []
 *    }
 */
router.get('/:id/attachments', validators.getAttachments, expressValidator.findsValidatorErros(), controller.getAttachments);

/**
 * @api {post} /employees/:id/attachments Create a new employee attachment
 * @apiName PostEmployeesAttachment
 * @apiGroup Employees-Attachment
 * 
 * @apiParam (Params) {Int} id The employee id.
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
 * @api {patch} /employees/:id/attachments/:idAttachment Update a attachment status
 * @apiName PatchEmployeesAttachment
 * @apiGroup Employees-Attachment
 * 
 * @apiParam (Params) {Int} id The employee id.
 * @apiParam (Params) {Int} idAttachment The attachment id.
 * @apiParam (Request body) {Int} AttachmentStatusId The status.
 * @apiParam (Request body) {String} note A note about the alteration.
 * 
 * @apiSuccessExample {json} Sucesso (example)
 *    HTTP/1.1 201 OK
 *    {
 *        "updated": 1,
 *        "msg": "Atualizado com sucesso."
 *    }
 */
router.patch('/:id/attachments/:idAttachment', validators.pathAttachment, expressValidator.findsValidatorErros(), controller.pathAttachment);

module.exports = router;