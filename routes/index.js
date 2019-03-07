// difinig routes
exports.routes = (app) => {
    app.use('/companies', require('./company'));
    app.use('/documents', require('./document'));
    app.use('/functions', require('./function'));
    app.use('/document-types', require('./document-type'));
    return app;
}