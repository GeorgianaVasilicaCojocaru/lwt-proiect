import './App.css';
import React, { useState } from 'react'
import GamesList from './components/GamesList';
import AddGameForm from './components/AddGameForm';
import Header from './components/Header';
import { Routes, Route } from "react-router-dom";
import NavMenu from './components/Nav';
import LoginForm from './components/LoginForm';
import GamesPage from './components/GamePage';


function App() {

  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'))
  const handleLogin = () => setLoggedIn(true)
  const handleLogout = () => {
    localStorage.removeItem('token')
    setLoggedIn(false)
  }

  return (
    <div className="App">

      <Header></Header>
      {!loggedIn ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
          
      <div>
        
        <NavMenu onLogout={handleLogout}/>
        <Routes>
          <Route path="/" element={<GamesPage />} />
          <Route path="/addGame" element={<AddGameForm />} />
        </Routes>
        
      </div>
        
      )}
      
    </div>
  );
}

export default App;
