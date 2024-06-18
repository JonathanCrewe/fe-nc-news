import axios from 'axios';

// Basic URL. 
const ncNewsApi = axios.create({baseURL: 'https://be-nc-news-wz3p.onrender.com/api/'})


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
    try {
        const paramObj = {"inc_votes":  increment}
        const response = await ncNewsApi.patch(`/articles/${articleId}`, paramObj)

        return response.data.article
    }
    catch (err) {
        console.log(err)
    }
}