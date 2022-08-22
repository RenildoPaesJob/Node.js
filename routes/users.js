let NeDB = require("nedb");
let db = new NeDB({
  filename: "users.db",
  autoload: true,
});

module.exports = (app) => {

  let route   = app.route('/users');
  let routeId = app.route('/users/:id');

  route.get((req, res) => {
    //find => procurar, sem parametros, busca todos os registros
    //sort => ordenar = 1 => decrescente, -1 => crescente, name => ordenar por name
    //exec => executa um função de callback.
    db.find({}).sort({name:1}).exec((err, users) => {
      if (err) {
        //function da pasta utils, metodo send()
        app.utils.error.send(err, req, res);
      } else {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        // res.end(JSON.stringify({
        res.json({
          users
        });
      }
    });
  });

  route.post((req, res) => {
    /**VALIDAÇÕES*/
    req.assert('name', 'O nome é obrigatório!').notEmpty();
    req.assert('email', 'O email está invalido!').notEmpty().isEmail();

    let errors = req.validationErrors();
    
    if (errors) {
      //function da pasta utils, metodo send()
      app.utils.error.send(errors, req, res);
      return false;
    }

    //usando NEDB para armazenar os dados do users
    db.insert(req.body, (err, user) => {
      if (err) {
        //function da pasta utils, metodo send()
        app.utils.error.send(err, req, res);
      } else {
        res.status(200).json(user);
      }
    });
  });

  //buscar um registro
  routeId.get((req, res) => {
    //findOne => busca um registro
    db.findOne({_id:req.params.id}).exec((err, user) => {
      if (err) {
        app.utils.error.send(err, req, res);
      } else {
        res.status(200).json(user);
      }
    });
  });

  //editar um registro
  routeId.put((req, res) => {
    db.update({_id: req.params.id}, req.body, err => {
      if (err) {
        app.utils.error.send(err, req, res);
      } else {
        res.status(200).json(Object.assign(req.params, req.body));
      }
    });
  });

  //excluir um registro
  routeId.delete((req, res) => {
    db.remove({_id: req.params.id}, {}, err => {
      if (err) {
        app.utils.error.send(err, req, res);
      } else {
        res.status(200).json(req.params);
      }
    });
  });
};