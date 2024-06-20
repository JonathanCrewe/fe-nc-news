import { React, useState, useEffect } from 'react'
import {getArticles, getTopics} from '../../api'
import ArticleSummary from './ArticleSummary'


function ArticleList() {
    const [articles, setArticles] = useState([])
    const [topics, setTopics] = useState([])
    const [selectedTopic, setSelectedTopic] = useState('All')
    const [selectedSortBy, setSelectedSortBy] = useState('created_at')
    const [selectedSortOrder, setSelectedSortOrder] = useState('DESC')

    // Functions. 
    // Mounting function. 
    async function getDataSetState() {
        const returnedTopics = await getTopics()
        setTopics([{slug: 'All', description: 'All topics'}, ...returnedTopics])

        await getArticleDataSetState() 
    }

    // Helper functions. 
    async function getArticleDataSetState() {
        if (selectedSortBy === 'comment_count') {
            const sortedArticles = articles.toSorted( (curr, next) => {
                return selectedSortOrder === 'ASC'? (curr.comment_count - next.comment_count) : (next.comment_count - curr.comment_count)
            })

            setArticles(sortedArticles)
        } else {
            const articleResult = await getArticles('topic', selectedTopic, 
                                                    selectedSortBy === 'comment_count'? '' : selectedSortBy,
                                                    selectedSortOrder )
            setArticles(articleResult)
        }
    }

    // Handler functions. 
    async function handleTopicChange(event) {
        setSelectedTopic( event.target.value)
    }

    async function handleSortByChange(event) {
       setSelectedSortBy(event.target.value)
    }

    async function handleSortOrderChange(event) {
        setSelectedSortOrder(event.target.value)
    }

    // useEffect  
    useEffect( () => {getDataSetState()}, [])
    useEffect( () => {getArticleDataSetState()}, [selectedTopic, selectedSortBy, selectedSortOrder])

    // HTML. 
    return (
        <div className='article_list'>
            <p>
                <label htmlFor="topics">Topics: </label>
                <select id="topics" onChange={handleTopicChange}>
                    {topics.map( (topic) => <option value={topic.slug} key={topic.slug}>{topic.slug}</option>)}
                </select>
            </p>

            <label htmlFor="sort_by">Sort By: </label>
            <select id="sort_by" onChange={handleSortByChange}>
                <option value='created_at'>Date</option>
                <option value='comment_count'>Comment Count</option> 
                <option value='votes'>Votes</option> 
            </select>

            <label htmlFor="asc">ASC</label>
            <input type="radio" id="asc" name="sort_order" value="ASC" checked={selectedSortOrder === 'ASC'} onChange={handleSortOrderChange}/>
            <label htmlFor="desc">DESC</label>
            <input type="radio" id="desc" name="sort_order" value="DESC" checked={selectedSortOrder === 'DESC'} onChange={handleSortOrderChange}/>

            <ul>
                {articles.map( (article) => <ArticleSummary key={article.article_id} article={article} />)}
            </ul>
        </div>
    )
}

export default ArticleList
