'use strict'

exports.routes = (app) => {
    app.use('/companies', require('./company'));
    app.use('/documents', require('./document'));
    app.use('/functions', require('./function'));
    app.use('/document-types', require('./document-type'));
    app.use('/company-types', require('./company-type'));
    app.use('/company-status', require('./company-status'));
    app.use('/sectors', require('./sector'));
    app.use('/user-types', require('./user-types'));
    app.use('/auth', require('./auth'));
    app.use('/menu', require('./menu'));
    app.use('/employees', require('./employee'));
    app.use('/employee-status', require('./employee-status'));
    app.use('/integrations', require('./integration'));
    app.use('/integration-schedules', require('./integration-schedule'));
    app.use('/notifications', require('./notification'));
    return app;
}