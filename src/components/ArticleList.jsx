import { React, useState, useEffect } from 'react'
import {getArticles} from '../../api'
import ArticleSummary from './ArticleSummary'

function ArticleList() {
    const [articles, setArticles] = useState([])

    // Functions.  
    async function getArticlesSetState() {
        const articleResult = await getArticles()
        setArticles(articleResult)
      }

    // useEffect callback to invoke the get method. 
    useEffect( () => {getArticlesSetState()}, [])

    // HTML. 
    return (
        <div className='article_list'>
            <ul>
                {articles.map( (article) => <ArticleSummary key={article.article_id} article={article} />)}
            </ul>
        </div>
    )
}

export default ArticleList
