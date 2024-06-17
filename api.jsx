import axios from 'axios';

// Basic URL. 
const ncNewsApi = axios.create({baseURL: 'https://be-nc-news-wz3p.onrender.com/api/'})

// Functions. 
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

// Functions. 
export async function getArticleById(articleId) {
    try {
        const response = await ncNewsApi.get(`/articles/${articleId}`)

        return response.data.article
    }
    catch (err) {
        console.log(err)
    }
}