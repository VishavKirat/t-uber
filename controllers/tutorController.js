module.exports =function(app){
app.get('/tutor-create',function(req,res){
  res.render('tutor-create.ejs');
});

app.get('/tutor/:id',function(req,res){
  const id = req.params.id;
  return  res.render('tutor.ejs');
})

app.get('/tutor',function(req,res){
  return  res.render('tutor.ejs');
})
}
