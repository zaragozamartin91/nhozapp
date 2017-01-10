var express = require('express');
var router = express.Router();
var data = require('../../nhozdata');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Nhoz' });
});


router.get('/providers', function (req, res, next) {
  var provId = req.query.id;
  var msg = {
    err: req.query.err,
    succ: req.query.succ
  }

  data.getProviderLike({ id: provId }, function (err, rows) {
    if (err) {
      msg.err = "Error de conexion con BBDD: no se pudieron obtener los proveedores";
      rows = [];
    }

    res.render('providers', {
      title: 'Proveedores',
      providers: rows,
      msg: msg,
    });
  });
});

/* SIGUIENDO ESQUEMA POST/REDIRECT/GET https://es.wikipedia.org/wiki/Post/Redirect/Get  */
router.post('/providers/add', function (req, res, next) {
  var providerId = req.body.id;
  if (providerId) {
    var providerName = req.body.name || `Proveedor ${providerId}`;

    data.providerExists({ id: providerId }, function (err, exists) {
      if (err) {
        console.error(`Error al verificar proveedores ${err}`);
        var error = encodeURIComponent("Error al verificar proveedores");
        res.redirect(`/providers?err=${error}`);
      } else if (exists) {
        var error = encodeURIComponent(`Proveedor ${providerId} ya existe!`);
        res.redirect(`/providers?err=${error}`);
      } else {
        data.addProvider({ id: providerId, name: providerName }, function (err) {
          if (err) {
            console.error(`Error al agregar proveedor ${providerId}: ${err}`);
            var error = encodeURIComponent(`Error al agregar proveedor ${providerId}`);
            res.redirect(`/providers?err=${error}`);
          } else {
            var succ = encodeURIComponent(`Proveedor ${providerId} agregado`);
            res.redirect(`/providers?succ=${succ}`);
          }
        });
      }
    });
  } else {
    var error = encodeURIComponent("No se ingreso un id de proveedor!");
    res.redirect(`/providers?err=${error}`);
  }
});


router.get('/articles', function (req, res, next) {
  var articleId = req.query.articleId;
  var providerId = req.query.providerId;
  var description = req.query.description;
  var msg = {
    err: req.query.err,
    succ: req.query.succ
  }

  var queryData = {
    id: articleId,
    providerId: providerId,
    description: description
<<<<<<< HEAD
  }

  data.getArticle(queryData, function (err, rows) {
    if (err) {
      msg.err = err;
    }

    rows = rows || [];

=======
  };

  data.getArticle(queryData, function (err, rows) {
    if (err) {
      msg.err = err.message;
    }

>>>>>>> 50bef5ba5424288aaebf27cf5926e18cf46943c6
    res.render('articles', {
      title: 'Articulos',
      msg: msg,
      articles: rows
    });
  })
});




module.exports = router;
