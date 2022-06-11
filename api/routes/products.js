const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Test GET request to /products'
    })
});

router.post('/', (req, res, next) => {
    const product = {
        name: req.body.name,
        price: req.body.price
    }
    res.status(201).json({
        message: 'Test POST request to /products',
        product: product
    })
});

router.get('/:productId',  (req, res, next) => {
    const id = req.params.productId;
    if (id > 0) {
        res.status(200).json({
            message: 'Product ID foi informado',
            id: id
        })
    } else {
        res.status(400).json({
            message: 'productId deve ser maior que zero'
        })
    }
});

router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    res.status(200).json({
        message: 'Update products',
        id: id
    })
})


router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    res.status(200).json({
        message: 'Produto deletado products',
        id: id
    })
})

module.exports = router;