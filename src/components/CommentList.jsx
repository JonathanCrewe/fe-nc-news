import {React, useEffect, useState} from 'react'
import ArticleSummary from './ArticleSummary'
import { getCommentsByArticleId } from '../../api'
import { useParams } from 'react-router-dom'
import '../css/Comment.css'


function CommentList() {
    const {article_id}= useParams()
    const [comments, setComments] = useState([])

    // Functions.  
    async function getCommentsSetState(articleId) {
        const commentsForArticle = await getCommentsByArticleId(articleId)
        setComments(commentsForArticle)
      }

    // useEffect callback to invoke the get method. 
    useEffect( () => {getCommentsSetState(article_id)}, [])

    return (
        <div >
            <p><u>Comments</u></p>
            {/* ToDo - Use a comment component? 
            This covers use case to view comments but will need extending if further funtionality required*/}
            <ul>
                {comments.map( (comment) => <li className='comment-list' key={comment.comment_id}>{comment.body}</li>)}
            </ul>
        </div>
    )
}

export default CommentList