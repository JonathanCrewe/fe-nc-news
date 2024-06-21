import { Routes, Route } from 'react-router-dom';
import './css/App.css'
import Header from './components/Header'
import ArticleList from './components/ArticleList'
import ArticleDetail from './components/ArticleDetail';
import ErrorPage from './components/ErrorPage';
import CommentList from './components/CommentList';


function App() {
   return (

    <>
      <Header/>
      <Routes>
        <Route path="/" element={<ArticleList/>}/>
        <Route path="/articles" element={<ArticleList/>}/>
        <Route path="/articles/:topicParam" element={<ArticleList/>}/>
        <Route path="/article/:article_id" element={<ArticleDetail />}/>
        <Route path="/*" element={<ErrorPage errorMessage="Oops! You've navigated to a non-existent page."/>} />
      </Routes>
      

    </>
  )
}

export default App
