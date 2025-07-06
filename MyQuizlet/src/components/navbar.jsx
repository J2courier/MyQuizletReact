import "./navbar.css"

export default function Navbar({setActiveComponent}) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <button className="nav-button" onClick={() => setActiveComponent('home')}> Home </button>
        <button className="nav-button" onClick={() => setActiveComponent('flashcard')}>Flashcard</button>
        <button className="nav-button"onClick={() => setActiveComponent('quizzer')}>Quizzer</button>
        <button className="nav-button"onClick={() => setActiveComponent('settings')}>Settings</button>
      </div>
    </nav>
  )
}
