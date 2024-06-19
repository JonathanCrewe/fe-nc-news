import {React, useEffect, useState} from 'react'
import {getCommentsByArticleId, createComment} from '../../api'
import {useParams} from 'react-router-dom'
import CommentCard from './CommentCard'


function CommentList({comments, setComments} ) {
    // State. 
    const [inputValue, setInputValue] = useState('')
    const [isSendingComment, setIsSendingComment] = useState(false)

     // ToDo - ultimately allow to pick from DB or add actual sign-up/authentication functionality
    const defaultUsername = 'grumpy19'

    const {article_id}= useParams()

    // Functions.  
    async function getCommentsSetState(articleId) {
        const commentsForArticle = await getCommentsByArticleId(articleId)
        setComments(commentsForArticle)
      }
    
    async function handleSubmit(event) {
        event.preventDefault()
        setIsSendingComment(true)
        const commentBody = event.target[0].value

        // Empty the textarea so we get the placeholder back / can't resubmit the comment.
        event.target[0].value = ''
        setInputValue('')

        if (commentBody) {
             // Save to DB and get unique key (comment_id)back. 
            const returnedComment = await createComment(article_id, defaultUsername, commentBody) 

            // Add returned comment to list. 
            const newCommentsList = structuredClone(comments)
            newCommentsList.unshift(returnedComment)

            setComments(newCommentsList)
        }

        setIsSendingComment(false)
    }

    function handleInputChange(event) {
        setInputValue(event.target.value);
    }


    // useEffect callback to invoke the get method. 
    useEffect( () => {getCommentsSetState(article_id)}, [])

    return (
        <div >
            <p><u>Comments</u></p>
            <form onSubmit={handleSubmit}>
                {/* ToDo - is it possible to disable the textarea when isSendingComment === true? */}
                <textarea type="text" cols="120" placeholder="Add your comment..." rows="5" name="newComment" onChange={handleInputChange} />
                {isSendingComment ? <p>Sending your comment...</p> : null}
                <button type="submit" disabled={!inputValue}>Submit Comment</button>
            </form>
            <ul>
                {comments.map( (comment) => <CommentCard key={comment.comment_id} comment={comment} comments={comments} setComments={setComments} defaultUsername={defaultUsername}/>)}
            </ul>
            
        </div>
    )
}

export default CommentList