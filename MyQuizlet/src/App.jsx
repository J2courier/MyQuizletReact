import { useState } from 'react'
import Navbar from './components/navbar'
import Home from './components/Home/home'
import Flashcard from './components/Flashcard/flashcard'
import Quizzer from './components/Quizzer/quizzer'
import Settings from './components/Settings/settings'
import './App.css'
import './index.css'

function App() {
  const [activeComponent, setActiveComponent] = useState('home')

  const renderComponent = () => {
    switch (activeComponent) {
      case 'home':
        return <Home />
      case 'flashcard':
        return <Flashcard />
      case 'quizzer':
        return <Quizzer />
      case 'settings':
        return <Settings />
      default:
        return <Home />
    }
  }

  return (
    <div className="app">
      <Navbar setActiveComponent={setActiveComponent} />
      <div className="content">
        {renderComponent()}
        <div className="side-bar"></div>
      </div>
    </div>
  )
}

export default App

