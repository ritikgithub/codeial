// const { eventNames } = require("../../models/post");
// const { get } = require("mongoose");

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
        <p class="bradley-underline"> ${ post.user.name }</p>
        <p class="fontsize-1point2"> ${ post.content }</p>
        
        <a class="delete-post-button" href="posts/delete?postId=${post._id}"><i class="far fa-trash-alt"></i></a>
       
        <div class="post-likes">
        <a href="/posts/add-delete-like?postId=${post._id}" class="add-delete-like-button"><i class="far fa-thumbs-up"></i></a>
        <span class="post-likes-no">0</span>
        </div>

        
        <form id="comment" action="/comments/create" method="POST">
            <textarea name="comment" id="comment-id" cols="30" rows="1"></textarea>
            <input type="hidden" name="postId" value=${post._id} >
            <button type="submit">Comment</button>
        </form>

       
        <div class="show-comments-container">
          <h4>Comments</h4>
            <ul>
               
            </ul>
        </div>
    </li>`);
    if(post.img_path) { 
        $(`<img src="${post.img_path}" width="600px"><br><br>`).insertAfter($(newPost.find('a')[0]));
        
        
    } 
    return newPost;   
    

    };


    let postCreation = function(){
        $('#post-submit-form').on('submit',function(event){
            event.preventDefault();
            var formData = new FormData($(this)[0]);

            $.ajax({
                type:'post',
                url: '/posts/create',
                data: formData,
                contentType: false,
                processData: false, 
                success: function(data){
                   let newPost = showPost(data.data.post);
                        $("#posts").prepend(newPost);
                        noty(data.message);
                        deletePost($(newPost).find(".delete-post-button"));
                        addDeleteLikeOnPost(newPost);
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
        <p class="bradley-underline fontsize1point0">  ${ comment.user.name }</p>
        <p> ${ comment.content }</p>
        <a class="comment-delete-button" href="/comments/delete/${ comment._id }"><i class="far fa-trash-alt"></i></a>
        <div class="comment-likes">
         <a href="/comments/add-delete-like?commentId=${comment._id}" class="add-delete-like-button-comment"><i class="far fa-thumbs-up"></i></a> 
        <span class="comment-likes-no">0</span>
       
        </div>
        
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
                    addDeleteLikeOnComment(newComment);
                    noty(data.message);
                }, error: function(err){
                    console.log(err.responseText);
                }
            });
        });
    };

    
    let addDeleteLikeOnPost  = function(post){
        post.find(".add-delete-like-button").click(function(event){
            event.preventDefault();
            $.ajax({
                type: 'get',
                url : $(this).attr('href'),
                success: function(data){
                    console.log(post.find(".post-likes-no"));
                    post.find(".post-likes-no").text(data.data.post.likes.length);
                    post.find(".add-delete-like-button i").toggleClass("color-blue");
                }, error : function(){
                    console.log("Error ",err); return;
                }
            });
        });
    }

    let addDeleteLikeOnComment  = function(comment){
        comment.find(".add-delete-like-button-comment").click(function(event){
            event.preventDefault();
            $.ajax({
                type: 'get',
                url : $(this).attr('href'),
                success: function(data){
                    comment.find(".comment-likes-no").text(data.data.comment.likes.length);
                    comment.find(".add-delete-like-button-comment i").toggleClass("color-blue");
                }, error : function(){
                    console.log("Error ",err); return;
                }
            });
        });
    }


    for(let post of $("#posts").children()){
        deletePost($(post).find(".delete-post-button"));
        createComment($(post)); 
        addDeleteLikeOnPost($(post));
        for(let comment of $(post).find(".show-comments-container > ul").children()){
            deleteComment($(comment).find(".comment-delete-button"));
            addDeleteLikeOnComment($(comment));
        }
    }





}

