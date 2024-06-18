import {React, useEffect, useState} from 'react'
import {getCommentsByArticleId, createComment} from '../../api'
import {useParams} from 'react-router-dom'
import '../css/Comment.css'


function CommentList() {
    // ToDo - ultimately allow to pick from DB or add actual sign-up/authentication functionality
    const defaultUsername = 'grumpy19'
    //let emptyCommentSubmitted = false
    const [emptyCommentSubmitted, setEmptyCommentSubmitted] = useState(false)

    const {article_id}= useParams()
    const [comments, setComments] = useState([])

    // Functions.  
    async function getCommentsSetState(articleId) {
        const commentsForArticle = await getCommentsByArticleId(articleId)
        setComments(commentsForArticle)
      }
    
    async function handleSubmit(event) {
        event.preventDefault()
        const commentBody = event.target[0].value

        // Empty the textarea so we get the placeholder back / don't repeat the comment.
        event.target[0].value = ''

        if (commentBody) {
            setEmptyCommentSubmitted(false)

             // ToDo - disable button?

            // Save to DB and get unique key (comment_id)back. 
            const returnedComment = await createComment(article_id, defaultUsername, commentBody) 

            // Add returned comment to list. 
            const newCommentsList = structuredClone(comments)
            newCommentsList.unshift(returnedComment)

            setComments(newCommentsList)

            // ToDo - re-enable button?
        } else {
            console.log('empty')
            setEmptyCommentSubmitted(true)
        }
    }

    // useEffect callback to invoke the get method. 
    useEffect( () => {getCommentsSetState(article_id)}, [])

    return (
        <div >
            <p><u>Comments</u></p>
            {/* ToDo - Use a comment component? 
            This covers use case to view comments but will need extending if further funtionality required*/}
            <form onSubmit={handleSubmit}>
                <textarea type="text" cols="120" placeholder="Add your comment..." rows="5" name="newComment"/>
                {emptyCommentSubmitted ? <div className='error'><h3><p>Error: Empty comment submitted</p></h3></div> : <p></p>}
                <button type="submit">Submit Comment</button>
            </form>
            <ul>
                {comments.map( (comment) => <li className='comment-list' key={comment.comment_id}>{comment.body}</li>)}
            </ul>
            
        </div>
    )
}

export default CommentList