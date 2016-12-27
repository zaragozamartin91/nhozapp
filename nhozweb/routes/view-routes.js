var express = require('express');
var router = express.Router();
var data = require('../../nhozdata');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Nhoz' });
});

router.get('/providers', function (req, res, next) {
  var provId = req.query.id;
  var error = req.query.err;

  data.getProviderLike({ id: provId }, function (err, rows) {
    res.render('providers', {
      title: 'Proveedores',
      providers: rows,
      err: error
    });
  });
});

/* SIGUIENDO ESQUEMA POST/REDIRECT/GET https://es.wikipedia.org/wiki/Post/Redirect/Get  */
router.post('/providers/add', function (req, res, next) {
  console.log(req.body);
  /* Necesario para enviar un error mediante la url. */
  var err = encodeURIComponent("Error al agregar proveedor");
  res.redirect(`/providers?err=${err}`);
});


module.exports = router;
