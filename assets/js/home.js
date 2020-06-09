{
    let noty = function(message){
        new Noty({
            theme:'relax',
            text: message,
            type:'success',
            timeout:1000
        }).show(); 
    }

    let showPost = function(post){

        let newPost = $(`<li id="post-${post._id}">
        <p> ${ post.user.name }</p>
        <p> ${ post.content }</p>
        <a class="delete-post-button" href="posts/delete?postId=${post._id}">Delete Post</a>
        <form id="comment" action="/comments/create" method="POST">
            <textarea name="comment" id="comment-id" cols="30" rows="2"></textarea>
            <input type="hidden" name="postId" value=${post._id} >
            <button type="submit">Comment</button>
        </form>
        <div class="show-comments-container">
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
                        noty(data.message);
                        deletePost($(newPost).find(".delete-post-button"));
                        createComment(newPost);
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
            console.log(deleteLink.attr('href'));
            $.ajax({
                type:'get',
                url: deleteLink.attr('href'),
                success: function(data){
                   $(`#post-${data.data.postId}`).remove();
                   noty(data.message);
                },error : function(err){
                    console.log("Error",err);
                }
        });
    });
}

    

    let showComment = function(comment){
       return  $(`<li id="comment-${comment._id}">
        <p> Comment done by: ${ comment.user.name }</p>
        <p> ${ comment.content }</p>
        <a class="comment-delete-button" href="/comments/delete/${ comment._id }">Delete Comment</a>
    </li>`)
    };

    let deleteComment = function(deleteCommentLink){
        deleteCommentLink.click(function(event){
            event.preventDefault();
            $.ajax({
                type:'get',
                url: $(this).attr("href"),
                success: function(data){
                    $(`#comment-${data.data.commentId}`).remove();
                    noty(data.message);
                }, error: function(err){
                    console.log("kjb",err);
                }
            });


        });

    };

    let createComment = function(post){
        $(post).find('form').submit(function(event){
            event.preventDefault();
            $.ajax({
                type:'post',
                url:'/comments/create',
                data:  $(this).serialize() ,
                success: function(data){
                    let newComment = showComment(data.data.comment);
                    $(post).find(".show-comments-container > ul").prepend(newComment);
                    deleteComment(newComment.find(".comment-delete-button"));
                    noty(data.message);
                }, error: function(err){
                    console.log(err.responseText);
                }
            });
        });
    };

    


    for(let post of $("#posts").children()){
        deletePost($(post).find(".delete-post-button"));
        createComment($(post)); 
        for(let comment of $(post).find(".show-comments-container > ul").children()){
            deleteComment($(comment).find(".comment-delete-button"));
        }
    }


}