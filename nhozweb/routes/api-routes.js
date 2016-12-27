var express = require('express');
var router = express.Router();
var data = require('../../nhozdata');

/* GET users listing. */
router.get('/providers', function (req, res, next) {
  data.getProvider({}, function (err, rows) {
    res.send({
      err: err,
      providers: rows
    });
  });
});

module.exports = router;
