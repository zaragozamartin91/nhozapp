var express = require('express');
var router = express.Router();
var data = require('../../nhozdata');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Nhoz' });
});

router.get('/providers', function (req, res, next) {
  var provId = req.query.id;

  data.getProviderLike({id:provId}, function (err, rows) {
    res.render('providers', {
      title: 'Proveedores',
      providers: rows
    });
  });
});


module.exports = router;