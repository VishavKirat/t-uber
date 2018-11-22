module.exports = function(app){

  app.get('/onlinetutors',function(req,res){
    res.render('viewall.ejs');
  });


}
