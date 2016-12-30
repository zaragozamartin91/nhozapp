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
