const router = require('express').Router();
const controller = require('../controllers/company-status');
const auth = require("../config/auth")();
router.use(auth.authenticate());

/**
 * @api {get} /company-status List of company status
 * @apiName GetCompanyStatus
 * @apiGroup Companies
 * 
 * @apiSuccess {Int} count Number of total items.
 * @apiSuccess {Array} rows List of company status
 * 
 */
router.get('/', controller.get);

module.exports = router;