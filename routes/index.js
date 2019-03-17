// difinig routes
exports.routes = (app) => {
    app.use('/companies', require('./company'));
    app.use('/documents', require('./document'));
    app.use('/functions', require('./function'));
    app.use('/document-types', require('./document-type'));
    app.use('/company-types', require('./company-type'));
    app.use('/sectors', require('./sector'));
    return app;
}