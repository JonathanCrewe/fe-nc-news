import {React, useEffect, useState} from 'react'
import ArticleSummary from './ArticleSummary'
import { getCommentsByArticleId } from '../../api'
import { useParams } from 'react-router-dom'


function CommentList() {
    const {article_id}= useParams()
    const [comments, setComments] = useState([])

    // Functions.  
    async function getCommentsSetState(articleId) {
        const comments = await getCommentsByArticleId(articleId)
        setComments(comments)
      }

    // useEffect callback to invoke the get method. 
    useEffect( () => {getCommentsSetState(article_id)}, [])

    return (
        <div>
            {/* ToDo - render this stuff properly */}
            {/* <ArticleSummary key={article.article_id} article={article} /> */}
            Comments
            <p>{comments[0].body}</p>
        </div>
    )
}

export default CommentList