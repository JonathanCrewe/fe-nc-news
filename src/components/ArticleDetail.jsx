import {React, useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import {getArticleById} from '../../api'
import ArticleSummary from './ArticleSummary'
import { useNavigate } from 'react-router-dom';


function ArticleDetail() {
    const {article_id} = useParams()
    const [article, setArticle] = useState({})
    const navigate = useNavigate()

    // Functions.  
    async function getArticleSetState(articleId) {
        const article = await getArticleById(articleId)
        setArticle(article)
      }

    function handleClick(event) {
        event.preventDefault()
        navigate(`/articles/${article.article_id}/comments`)
    }

    // useEffect callback to invoke the get method. 
    useEffect( () => {getArticleSetState(article_id)}, [])

    return (
        <div className='article_detail'>
            <ArticleSummary key={article.article_id} article={article} />
            <p>{article.body}</p>
            <button onClick={handleClick}>View Comments</button>
        </div>
    )    
}

export default ArticleDetail