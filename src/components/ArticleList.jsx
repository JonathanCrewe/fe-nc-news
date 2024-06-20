import { React, useState, useEffect } from 'react'
import {getArticles, getTopics} from '../../api'
import ArticleSummary from './ArticleSummary'

function ArticleList() {
    const [articles, setArticles] = useState([])
    const [topics, setTopics] = useState([])

    // Functions. 
    async function getDataSetState() {
        const returnedTopics = await getTopics()
        setTopics([{slug: 'All', description: 'All topics'}, ...returnedTopics])

        const articleResult = await getArticles()
        setArticles(articleResult)
      }

    async function handleTopicChange(event) {
        const articleResult = await getArticles('topic', event.target.value)
        setArticles(articleResult)
    }

    // useEffect callback to invoke the get method. 
    useEffect( () => {getDataSetState()}, [])

    // HTML. 
    return (
        <div className='article_list'>
            <select name="categories" onChange={handleTopicChange}>
                {topics.map( (topic) => <option value={topic.slug} key={topic.slug}>{topic.slug}</option>)}
            </select>

            <ul>
                {articles.map( (article) => <ArticleSummary key={article.article_id} article={article} />)}
            </ul>
        </div>
    )
}

export default ArticleList
