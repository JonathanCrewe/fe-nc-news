import {React, useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import {getArticleById} from '../../api'
import ArticleSummary from './ArticleSummary'


function ArticleDetail() {
    const {article_id} = useParams()
    const [article, setArticle] = useState({})

    // Functions.  
    async function getArticleSetState(articleId) {
        const article = await getArticleById(articleId)
        setArticle(article)
      }

    // useEffect callback to invoke the get method. 
    useEffect( () => {getArticleSetState(article_id)}, [])

    return (
        <div className='article_detail'>
            <ArticleSummary key={article.article_id} article={article} />
            <p>{article.body}</p>
        </div>
    )    
}

export default ArticleDetail