

module.exports = function(app){

  app.get('/profile',function(req,res){
    console.log(req);
    res.render('profile.ejs');
    console.log('you are at profile page');
  });

}
