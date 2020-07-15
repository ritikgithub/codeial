console.log("hii");
let forgot_password = function(){

    $('#forgot-password').click(function(event){
        event.preventDefault();
        $('#forgot-password').remove();
        $(`<form method="post" action="/users/forgot-password">
        <input type="email" placeholder="Enter your email" name="email">
        <button type="submit">Submit</button>
        </form>`).appendTo($('#forgot-password-div'));
    });
}

forgot_password();