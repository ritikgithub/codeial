module.exports = function(http){
    const Chat_message  = require('../models/chat_message');
    const User = require('../models/user');
    const io = require('socket.io')(http);

    io.sockets.on('connection',function(socket){
        console.log('User is connected ',socket.id);
        socket.on('disconnect',function(){
            console.log('User got disconnected',socket.id);
        });

        socket.on('join_room',function(data){
            socket.join(data.chatroom);
            io.sockets.in(data.chatroom).emit('user_joined',data.email);
        });

        socket.on('send-message',async function(data){
            let user = await User.findOne({email:data.email});
            
           await Chat_message.create({
                user: user._id,
                message: data.message
            });

            io.sockets.in(data.chatroom).emit('receive-message',data);
        });



    });
}