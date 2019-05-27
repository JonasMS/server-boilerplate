const
    Router = require('express').Router,
    router = new Router();

router.get('/', (req, res) => {
    res.status(200).send('Hello World');
});

module.exports = router;
