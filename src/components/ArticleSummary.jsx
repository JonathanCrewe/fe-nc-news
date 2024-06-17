import React from 'react'

function ArticleSummary({article}) {
  return (
    <div className='article_summary'>
        <li>
        <img src={article.article_img_url} alt="Article Image" /> 
        <h2>{article.title}</h2>
        <p>By: {article.author}</p>
        <p>Comments: {article.comment_count} | Votes: {article.votes}</p>
        </li>
    </div>
  )
}

export default ArticleSummary