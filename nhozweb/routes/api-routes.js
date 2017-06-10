var express = require('express');
var router = express.Router();
var data = require('../../nhozdata');

router.get('/providers', function (req, res, next) {
  data.getProvider({}, function (err, rows) {
    res.send({
      err: err,
      providers: rows
    });
  });
});

router.post('/providers/add', function (req, res, next) {
  console.log("req.body:");
  console.log(req.body);

  var providerId = req.body.id;
  if (providerId) {
    var providerName = req.body.name || `Proveedor ${providerId}`;

    data.providerExists({ id: providerId }, function (err, exists) {
      if (err) {
        console.error(`Error al verificar proveedores ${err}`);
        var error = "Error al verificar proveedores";
        res.send({ err: error });
      } else if (exists) {
        var error = `Proveedor ${providerId} ya existe!`;
        res.send({ err: error });
      } else {
        console.log(`agregando proveedor ${providerId} ${providerName}`);
        data.addProvider({ id: providerId, name: providerName }, function (err) {
          if (err) {
            console.error(`Error al agregar proveedor ${providerId}: ${err}`);
            var error = `Error al agregar proveedor ${providerId}`;
            res.send({ err: error });
          } else {
            var succ = `Proveedor ${providerId} agregado`;
            console.log(succ);
            res.send({ ok: succ });
          }
        });
      }
    });
  } else {
    var error = "No se ingreso un id de proveedor!";
    res.send({ err: error });
  }
});

router.post('/providers/delete', function (req, res, next) {
  console.log("req.body:");
  console.log(req.body);
  var providerIds = req.body.providerIds;

  data.deleteProviders({ ids: providerIds }, function (err) {
    if (err) {
      console.error(err);
      res.send({ err: err });
    } else {
      res.send({ ok: "Proveedores eliminados correctamente" });
    }
  });
});

router.post('/providers/update', function (req, res, next) {
  console.log("req.body:");
  console.log(req.body);
  var queryData = req.body.queryData;
  var newData = req.body.newData;

  data.updateProvider(queryData, newData, function (err) {
    if (err) {
      res.send({ err: err });
    } else {
      res.send({ ok: `Proveedor actualizado` });
    }
  });
});

module.exports = router;
