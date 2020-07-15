$('#friends-list a').click(function(event){
    event.preventDefault();
    let nameOfFriend= $(this).text();
    $.ajax({
        type:'get',
        url: $(this).attr('href'),
        success: function(data){
          let chatboxContainer = $(`<div></div>`).appendTo($('#chatbox-flex'));
          chatboxContainer.append(` <h4> ${nameOfFriend} </h4>`)
          $(`<div id="chatbox-${data.data.chatbox._id}" class="chat-box">
         
          <div class="messages-container">
          <ul class="messages">    
          </ul>
          </div>
          
          <div class="input-message-container">
          <form class="input-message">
              <input class="input-message-field" name="message" placeholder="Type Here" type="text">
              <button type="submit">Send</button>
          </form>
          </div>
          </div>`).appendTo(chatboxContainer);
         
          if(data.data.chat_messages){
          for(chat_message of data.data.chat_messages) {
             
            let new_message;
            if(user_email != chat_message.sender.email) 
            {
                 new_message = $(`<li class="other-message">
                    <p>
                        ${chat_message.message}
                    </p>
                </li>`);
            }
             else  
             {
                new_message = $(`<li class="self-message">
                    <p>
                        ${chat_message.message}
                    </p>
                </li>`);
             }
             new_message.appendTo(`#chatbox-${data.data.chatbox._id} .messages`)
        }
        }

        new chatBox(data.data.chatbox._id, user_email, env_name);

        },error : function(err){
            console.log("Error",err);
        }
    }

    );
});