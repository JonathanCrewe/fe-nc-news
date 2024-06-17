import { React, useState, useEffect } from 'react'
import getArticles from '../../api'


function ArticleList() {
    const [articles, setArticles] = useState([])

    async function getArticlesSetState() {
        const articleResult = await getArticles()
        setArticles(articleResult)
      }

    // useEffect callback to invoke the get method. 
    useEffect( () => {getArticlesSetState()}, [])

    return (
        <div className='article_list'>ArticleList
            <ul>
                {/* {articles.map( (article) => <IndividualItem key={item.item_id} item={item} />)} */}
                {articles.map( (article) => <li>{article.title}</li>)}
            </ul>
        </div>
    )
}

export default ArticleList
