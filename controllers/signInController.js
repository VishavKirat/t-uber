
module.exports = function(app){

app.get('/signin',function(req,res){
  res.render('signIn.ejs');
  console.log('you are at sIgniN page');
})


}
