import axios from 'axios';

// Basic URL. 
const ncNewsApi = axios.create({baseURL: 'https://be-nc-news-wz3p.onrender.com/api/'})

// ToDo - Remove try/catch blocks from all functions and handle errors where they are called from? Give better user feeback?

// Functions. 

// getArticles() 
export async function getArticles() {
    try {
      //  const urlEnd = !query || query === "?category_name=All" ? '' : query
        const response = await ncNewsApi.get(`/articles`)

        return response.data.articles
    }
    catch (err) {
        console.log(err)
    }
}

// getArticleById()
export async function getArticleById(articleId) {
    try {
        const response = await ncNewsApi.get(`/articles/${articleId}`)

        return response.data.article
    }
    catch (err) {
        console.log(err)
    }
}

// getCommentsByArticleId()
export async function getCommentsByArticleId(articleId) {
    try {
        const response = await ncNewsApi.get(`/articles/${articleId}/comments`)

        return response.data.comments
    }
    catch (err) {
        console.log(err)
    }
}

// updateArticle()
export async function updateArticle(articleId, increment) {
        const paramObj = {"inc_votes":  increment}
        const response = await ncNewsApi.patch(`/articles/${articleId}`, paramObj)

        return response.data.article
}

// createComment()
export async function createComment(articleId, username, comment) {
    // Create a new comment. 
    const newComment = {}
    newComment.body =  comment
    newComment.username = username

    // Send it to the database.
    const response = await ncNewsApi.post(`/articles/${articleId}/comments`, newComment)

    return response.data.comment
}

// deleteComment()
export async function deleteComment(commentId) {
    return await ncNewsApi.delete(`/comments/${commentId}`)
}