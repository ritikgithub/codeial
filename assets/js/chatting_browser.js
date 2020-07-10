class chatBox {
    constructor(chatroom , sender_email , env_name){
        this.sender_email = sender_email;
        this.chatroom = chatroom;
        if(env_name == "production")
             this.socket = io.connect('http://3.128.184.46:5000');
        else
             this.socket = io.connect('http://localhost:5000');

        if(this.sender_email) //dont know why this condition is used
             this.connectionHandler();
    }
    

    connectionHandler(){
        let self = this;
        //acknowledging the connection on client side
        self.socket.on('connect',function(){
            console.log('Connection established between sockets');
        });

        self.socket.emit('join_room',{
            sender_email : self.sender_email,
            chatroom: self.chatroom
        });

        self.socket.on('user_joined',function(sender_email){
            console.log(`${sender_email} has added to chat room`);
            
        });

        $(`#chatbox-${self.chatroom} .input-message`).submit(function(event){
            event.preventDefault();
            
            self.socket.emit('send-message',{
                message: $(`#chatbox-${self.chatroom} .input-message input`).val(),
                sender_email: self.sender_email,
                chatroom: self.chatroom
            });
        });

            self.socket.on('receive-message',function(data){
                let newMessage  = $('<li>');

                newMessage.append(`<span>${data.message}</span>`);

                if(data.sender_email == self.sender_email)
                 newMessage.addClass('self-message');
                else  
                {  
                //  newMessage.append($(`<sub>${data.email}</sub>`));
                 newMessage.addClass('other-message');
                }
                 
                
                 $(`#chatbox-${self.chatroom} .messages`).append(newMessage);
            });
       
    }
}