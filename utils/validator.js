module.exports = {

  user:(app, req, res) => {
    /**VALIDAÇÕES*/
    req.assert('name', 'O nome é obrigatório!').notEmpty();
    req.assert('email', 'O email está invalido!').notEmpty().isEmail();

    let errors = req.validationErrors();
    
    if (errors) {
      //function da pasta utils, metodo send()
      app.utils.error.send(errors, req, res);
      return false;
    } else {
      return true;
    }
  }
}