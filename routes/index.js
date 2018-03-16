var express = require('express');
var router = express.Router();

// デフォルトルーティング
router.get('/', function (request, response) {
    response.render('index', { title: 'window', message: 'now...developing...',
            test :[['test-a', 30, 200, 100, 500, 150, 250],['test-g', 50, 20, 10, 40, 15, 25]]
    });
});

module.exports = router;
