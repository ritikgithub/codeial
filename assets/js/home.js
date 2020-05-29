{
 

    let showPost = function(post){

        let newPost = $(`<li id="post-${post._id}">
        <p> ${ post.user.name }</p>
        <p> ${ post.content }</p>
        <a class="delete-post-button" href="posts/delete?postId=${post._id}">Delete Post</a>
        <form id="comment" action="/posts/comments/create" method="POST">
            <textarea name="comment" id="comment-id" cols="30" rows="2"></textarea>
            <input type="hidden" name="postId" value=${post._id} >
            <button type="submit">Comment</button>
        </form>
        <div id="show-comments-container">
            <ul>
               
            </ul>
        </div>
    </li>`);
    return newPost;   
    

    };


    let postCreation = function(){
        $('#post-submit-form').on('submit',function(event){
            event.preventDefault();
            $.ajax({
                type:'post',
                url: '/posts/create',
                data: $(this).serialize(),
                success: function(data){
                   let newPost = showPost(data.data.post);
                        $("#posts").prepend(newPost);
                        new Noty({
                            theme:'relax',
                            text: data.message,
                            type:'success',
                            timeout:1000
                        }).show(); 
                   deletePost($(newPost).find(".delete-post-button"));
                },error : function(err){
                    console.log("Error",err);
                }
            });
        });
    }
    postCreation();


    let deletePost = function(deleteLink){
        deleteLink.click(function(event){
            event.preventDefault();
            $.ajax({
                type:'get',
                url: deleteLink.attr('href'),
                success: function(data){
                   $(`#post-${data.data.postId}`).remove();
                        new Noty({
                            theme:'relax',
                            text: data.message,
                            type:'success',
                            timeout:1000
                        }).show(); 
                
                },error : function(err){
                    console.log("Error",err);
                }
        });
    });
}

    for(let post of $("#posts").children()){
        deletePost($(post).find(".delete-post-button"));
    }

}