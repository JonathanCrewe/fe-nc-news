import React, { useState } from 'react'
import '../css/Comment.css'
import { deleteComment } from '../../api'

function CommentCard({comment, defaultUsername,comments, setComments}) {
  const isOwnedComment = comment.author === defaultUsername 

  // Functions. 
  async function handleClick(event) {
    // Optimistically remove from list.
    const newCommentList = comments.filter( (element) => element.comment_id !== comment.comment_id)
    setComments(newCommentList)

    // Remove from DB. 
    deleteComment(comment.comment_id)
  }

  // HTML. 
  return (
    <div>CommentCard
        <li className='comment-list' key={comment.comment_id}>
          <p>{comment.body}</p>
          <p>{`By: ${comment.author} | Votes: ${comment.votes}`}</p>
          {isOwnedComment ? <button onClick={handleClick}>Delete</button> : null}
        </li>
    </div>
  )
}

export default CommentCard