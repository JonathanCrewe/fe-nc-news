import axios from 'axios';

// Basic URL. 
const ncNewsApi = axios.create({baseURL: 'https://be-nc-news-wz3p.onrender.com/api/'})

// Functions. 
async function getArticles() {
    try {
      //  const urlEnd = !query || query === "?category_name=All" ? '' : query
        const response = await ncNewsApi.get(`/articles`)

        return response.data.articles
    }
    catch (err) {
        console.log(err)
    }
}

export default getArticles