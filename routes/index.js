const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.send('Hegemonic');
});

module.exports = router;
