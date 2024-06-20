import React, { useState, useEffect } from 'react'
import '../css/Comment.css'
import { deleteComment } from '../../api'

function CommentCard({comment, defaultUsername,comments, setComments}) {
  const [isDeleting, setIsDeleting] = useState(false)

  const isOwnedComment = comment.author === defaultUsername 

  // Functions. 
  async function handleClick(event) {
    setIsDeleting(true);

    // Remove from DB.
    await deleteComment(comment.comment_id);

    // Remove from comment list.
    const newCommentList = comments.filter((element) => element.comment_id !== comment.comment_id);
    setComments(newCommentList);

    setIsDeleting(false);
  }

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