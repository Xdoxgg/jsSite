async function getAllPostsWithComments() {
    let response = await fetch("https://jsonplaceholder.typicode.com/posts");
    let posts = await response.json();
    response = await fetch("https://jsonplaceholder.typicode.com/comments");
    const comments = await response.json();
    posts.forEach(post => {
        post.comments = []
        comments.forEach(comment => {
            if (comment.postId == post.id) {
                post.comments.push(comment);
            }

        })
    })
    return posts;
}

