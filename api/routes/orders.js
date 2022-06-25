const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const OrderModel = mongoose.model('Order');

router.get('/', async (req, res, next) => {
    try {
        const orders = await OrderModel.find({});

        res.status(200).json({
            count: orders.length,
            orders: orders.map(order => {
                return {
                    product: order.product,
                    quantity: order.quantity,
                    request: {
                        type: "GET",
                        url: "http://localhost:3000/orders/" + order._id
                    }
                }
            })
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        let order = new OrderModel ({
            product: req.body.productId,
            quantity: req.body.quantity
        });
        order = await order.save();
        res.status(201).json({
            message: 'Ordem criada com sucesso!',
            createdOrder: {
                product: order.product,
                quantity: order.quantity,
                _id: order._id,
                request: {
                    type: "GET",
                    url: "http://localhost:3000/orders/" + order._id
                }
            }
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


router.get('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    res.status(200).json({
        message: 'Test GET request to /orders',
        id: id
    })
});

router.patch('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    res.status(200).json({
        message: 'Update order',
        id: id
    })
});

router.delete('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    res.status(200).json({
        message: 'Delete order',
        id: id
    })
});

module.exports = router;