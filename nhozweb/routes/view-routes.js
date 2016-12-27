var express = require('express');
var router = express.Router();
var data = require('../../nhozdata');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Nhoz' });
});

router.get('/providers', function (req, res, next) {
  var provId = req.query.id;

  data.getProviderLike({ id: provId }, function (err, rows) {
    res.render('providers', {
      title: 'Proveedores',
      providers: rows,
      err: err
    });
  });
});

router.post('/providers/add', function (req, res, next) {
  console.log(req.body);
  req.err = "error!";
  res.redirect('/providers');
});


module.exports = router;
