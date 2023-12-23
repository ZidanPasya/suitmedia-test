import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import Header from './component/Header.jsx'
import Banner from './component/Banner.jsx'
import IdeaCard from './component/IdeaCard.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header />
    <Banner />
    <IdeaCard />
  </React.StrictMode>,
)
