$('#search-box input').keyup(function(event){
    let text = $(this).val();
    $.ajax({
        url:'/search',
        type:'post',
        data: {
            text: text
        },
        success: function(users){
           $('#search-box ul').remove();
           let list = $('<ul>');
           for(let user  of users){
                $(`<li><a href="/users/profile/${user._id}">${user.name}</a></li>`).appendTo(list);
           }
           list.appendTo($('#search-box'));
        }, error: function(err){
            console.log(err);
        }
    });
});


