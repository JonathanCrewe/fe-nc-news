import React from 'react'
import {Link} from 'react-router-dom'

function ArticleSummary({article, comments}) {
    const linkPath = `/articles/${article.article_id}`

    return (
        <div className='article_summary'>
            <li>
            <img src={article.article_img_url} alt="Article Image" /> 
            <h2>
                <Link to={linkPath}>
                {article.title}
                </Link>
            </h2>
            <p>By: {article.author}</p>
            <p>Comments: {comments ? comments.length : article.comment_count} | Votes: {article.votes}</p>
            </li>
        </div>
    )
}

export default ArticleSummary