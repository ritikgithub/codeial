class chatBox {
    constructor(email){
        this.user_email = email,
        this.socket = io.connect('http://localhost:5000');

        if(this.user_email) //dont know why this condition is used
             this.connectionHandler();
    }

    connectionHandler(){
        let self = this;


        self.socket.emit('join_room',{
            email : self.user_email,
            chatroom: 'codeial'
        });

        self.socket.on('user_joined',function(email){
            console.log(`${email} has added to chat room`);
            
        });

        $('#input-message').submit(function(event){
            event.preventDefault();
            
            self.socket.emit('send-message',{
                message: $('#input-message input').val(),
                email: self.user_email,
                chatroom: 'codeial'
            });
        });

            self.socket.on('receive-message',function(data){
                let newMessage  = $('<li>');

                newMessage.append(`<span>${data.message}</span>`);
                
                if(data.email == self.user_email)
                 newMessage.addClass('self-message');
                else  
                {  
                 newMessage.append($(`<sub>${data.email}</sub>`));
                 newMessage.addClass('other-message');
                }
                 
                
                 $('#messages').append(newMessage);
            });
       
    }
}