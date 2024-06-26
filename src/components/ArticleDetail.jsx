import {React, useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {getArticleById, updateArticle} from '../../api'
import ArticleSummary from './ArticleSummary'
import CommentList from './CommentList'
import ErrorPage from './ErrorPage'

function ArticleDetail() {
    const {article_id} = useParams()
    const navigate = useNavigate()

    const [article, setArticle] = useState({})
    const [isError, setIsError] = useState(false)
    const [comments, setComments] = useState([])
    const [articleError, setArticleError] = useState('')

    // Functions. 
    // Mounting function.  
    async function getArticleSetState(articleId) {
        try {
            const article = await getArticleById(articleId)
            setArticle(article)
        } catch(error) {
            if (error.response.ststus = 404) {
                setArticleError('Article not found')
            }
        }
      }

    // Handler functions. 
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

    function handleBackButton(event) {
        navigate('/articles')
    }

    // useEffect callback to invoke the get method. 
    useEffect( () => {getArticleSetState(article_id)}, [])


    return articleError? (
        <ErrorPage errorMessage={articleError}/>
    )
    :
    (
        <div className='article_detail'>
            <button id="2" onClick={handleBackButton}>Back</button>
            <ArticleSummary key={article.article_id} article={article} comments={comments}/>
            <h2>{article.body}</h2>
            <button id="1" onClick={handleVote}>Vote UP</button><button id="-1" onClick={handleVote}>Vote Down</button>
            {isError ? <div className='error'><h3><p>Error: Vote Could Not Be Saved To The Database</p></h3></div> : null}
             {/* ToDo - add a view comments button to show/hide comments? Toggle button text, too.  */}
            <CommentList comments={comments} setComments={setComments}/>
        </div>
    )    
}

export default ArticleDetail