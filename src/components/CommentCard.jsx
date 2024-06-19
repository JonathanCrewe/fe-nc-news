import React, { useState, useEffect } from 'react'
import '../css/Comment.css'
import { deleteComment } from '../../api'

function CommentCard({comment, defaultUsername,comments, setComments}) {
    const [isDeleting, setIsDeleting] = useState(true)

  const isOwnedComment = comment.author === defaultUsername 

  // Functions. 
  async function handleClick(event) {
    // ToDo - this fails to set the button to disabled while processing. I can't seem to fix it. 
    // Why can't I just set the event.target.dasabled? This should be easy!
    setIsDeleting(true)

    // Optimistically remove from list.
    const newCommentList = comments.filter( (element) => element.comment_id !== comment.comment_id)
    setComments(newCommentList)

    // Remove from DB. 
    await deleteComment(comment.comment_id)
    setIsDeleting(false)
  }

  // ToDo - this disables botton but won't ever get re-enabled.
  //useEffect( () => {setIsDeleting(!isDeleting)}, [comments])

  // HTML. 
  return (
    <div>CommentCard
        <li className='comment-list' key={comment.comment_id}>
          <p>{comment.body}</p>
          <p>{`By: ${comment.author} | Votes: ${comment.votes}`}</p>
          {isOwnedComment ? <button disabled={isDeleting} onClick={handleClick}>{isDeleting ? 'Deleting...' : 'Delete'}</button> : null}
        </li>
    </div>
  )
}

export default CommentCard