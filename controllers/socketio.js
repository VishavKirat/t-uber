const socket = require('socket.io');

module.export = function(app){
  var server = app.listen(4000);
  const io = socket(server);

  io.on('connection',function(socket){
    console.log(socket.id);
  });

}
