'use strict';
// A limit of rows in a page
const LIMIT = 10;
class PaginatorHelper{
    constructor(page){
        this._page = page;
        this._limit = page ? LIMIT: undefined;
    }

    get limit(){
        return this._limit;
    }

    get offset(){
        return this._page ? this._limit * (this._page - 1) : undefined;
    }

    pagesNumber(count){
        return this._page ? Math.ceil(count / this._limit): undefined;
    }
}
module.exports = PaginatorHelper;