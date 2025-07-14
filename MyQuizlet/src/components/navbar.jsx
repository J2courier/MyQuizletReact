import "./navbar.css"

export default function Navbar({setActiveComponent}) {
  return (
    <nav className="navbar">
      <div className="left">
        {/* North of Navbar */}
        <div className="h2-container">
          <div className="app-name-container">
            <span><strong>MyQuizlet</strong></span>
          </div>
        </div>

        {/* South Navbar */}
        <div className="navbar-container">
            <button className="nav-button" onClick={() => setActiveComponent('home')}> Home </button>
            <button className="nav-button" onClick={() => setActiveComponent('flashcard')}>Flashcard</button>
            <button className="nav-button"onClick={() => setActiveComponent('quizzer')}>Quizzer</button>
            <button className="nav-button"onClick={() => setActiveComponent('settings')}>Settings</button>
        </div>
      </div>
      <div className="right"></div>


    </nav>
  )
}
