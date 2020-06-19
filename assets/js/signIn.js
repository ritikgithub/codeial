console.log("hii");
let forgot_password = function(){

    $('#forgot-password').click(function(event){
        event.preventDefault();
        $(`<form method="post" action="/users/forgot-password"> <p>Enter your Email: </p>
        <input type="email" placeholder="Enter your email" name="email">
        <button type="submit">Submit</button>
        </form>`).appendTo($('#forgot-password-div'));
    });
}

forgot_password();