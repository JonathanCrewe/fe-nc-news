import {React, useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import {getArticleById, updateArticle} from '../../api'
import ArticleSummary from './ArticleSummary'
import CommentList from './CommentList';


function ArticleDetail() {
    const {article_id} = useParams()
    const [article, setArticle] = useState({})

    // Functions.  
    async function getArticleSetState(articleId) {
        const article = await getArticleById(articleId)
        setArticle(article)
      }

    function handleVote(event) {
        const newArticle = structuredClone(article)
        const increment = Number(event.target.id)
        newArticle.votes = Number(newArticle.votes) + increment
        setArticle(newArticle)
        const articleFromDB = updateArticle(article_id, increment)
        // ToDo - could setArticle again here to reflect new votes/comments from other users?
        //        Might be confusing for user?
        // ToDo - can a user vote multiple times? Consider disabling button after a single use
    }

    // useEffect callback to invoke the get method. 
    useEffect( () => {getArticleSetState(article_id)}, [])

    return (
        <div className='article_detail'>
            <ArticleSummary key={article.article_id} article={article} />
            <h2>{article.body}</h2>
            <CommentList />
            <button id="1" onClick={handleVote}>Vote UP</button><button id="-1" onClick={handleVote}>Vote Down</button>
        </div>
    )    
}

export default ArticleDetail