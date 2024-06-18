import {React, useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import {getArticleById, updateArticle} from '../../api'
import ArticleSummary from './ArticleSummary'
import CommentList from './CommentList';


function ArticleDetail() {
    const {article_id} = useParams()
    const [article, setArticle] = useState({})
    const [isError, setIsError] = useState(false)

    // Functions.  
    async function getArticleSetState(articleId) {
        const article = await getArticleById(articleId)
        setArticle(article)
      }

    async function handleVote(event) {
        const newArticle = structuredClone(article)
        const increment = Number(event.target.id)
        newArticle.votes = Number(newArticle.votes) + increment
        setArticle(newArticle)

        try {
            setIsError(false)
            await updateArticle(article_id, increment)
        }
        catch(error) {
            newArticle.votes = Number(newArticle.votes) - increment
            setIsError(true)
        }
        // ToDo - can a user vote multiple times? Consider disabling button after a single use
    }

    // useEffect callback to invoke the get method. 
    useEffect( () => {getArticleSetState(article_id)}, [])

    return (
        <div className='article_detail'>
            <ArticleSummary key={article.article_id} article={article} />
            <h2>{article.body}</h2>
            <button id="1" onClick={handleVote}>Vote UP</button><button id="-1" onClick={handleVote}>Vote Down</button>
            {isError ? <div className='error'><h3><p>Error: Vote Could Not Be Saved To The Database</p></h3></div> : null}
            <CommentList />
        </div>
    )    
}

export default ArticleDetail