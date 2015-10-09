//kev
//var ChatRoom = require('../data_schemas/chatRoom');

module.exports = {
    chatHandler : function(io) {
        io.on('connection', function(socket){
            socket.on('send:chat_message', function(data){
                io.to(socket.room).emit('new:chat_message', data);               
            });

            socket.on("join:room", function(id) {
                socket.room = id;
                socket.join(id);
                // ChatRoom.findById(id, function(err, room){
                //     if(err){
                //        return console.error(err)
                //     }
                //     io.to(socket.room).emit('load:chat_messages', room);
                // });              
            });

            socket.on('unsubscribe', function(data){
                socket.leave(room);
            });

            socket.on('create:room', function(data){
                var newRoom = new ChatRoom();
                    newRoom.name = data.name;
                    newRoom.buyer = data.buyer;
                    newRoom.seller = data.seller;                    
                console.log(newRoom);
            })
        });
    },
    getRoom : function(id, callback){
        var event = {};
        // ChatRoom.findById(id, function(err, data){
        //     if(err){
        //         return console.error(err)
        //     }            
        //     callback(data)
        // });
    }
}