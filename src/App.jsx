import { Routes, Route } from 'react-router-dom';
import './App.css'
import Header from './components/Header'
import ArticleList from './components/ArticleList'
import ArticleDetail from './components/ArticleDetail';


function App() {
   return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<ArticleList/>}/>
        <Route path="/articles/:article_id" element={<ArticleDetail />}/>
      </Routes>
      

    </>
  )
}

export default App
