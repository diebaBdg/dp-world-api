'use strict';

exports.getOrder = (order_by,order_direction) => {
    let order = [];
    if (order_by) {
        order.push([
            order_by,
            order_direction ? order_direction : 'ASC'
        ]);
        return order
    }else{
        return undefined;
    }
}