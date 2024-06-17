import {React, useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import {getArticleById} from '../../api'
import ArticleSummary from './ArticleSummary'
import { useNavigate } from 'react-router-dom';
import CommentList from './CommentList';


function ArticleDetail() {
    const {article_id} = useParams()
    const [article, setArticle] = useState({})
    const navigate = useNavigate()

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
            <h2>{article.body}</h2>
            {/* <button onClick={handleClick}>View Comments</button> */}
            <CommentList />
        </div>
    )    
}

export default ArticleDetail