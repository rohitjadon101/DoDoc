import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LandingPage from "./components/LandingPage"
import Header from "./components/Header"
import Footer from "./components/Footer"
import LoginPage from "./components/LoginPage"
import RegisterPage from "./components/RegisterPage"
import ProfilePage from "./components/ProfilePage"
import CreateDocument from "./components/CreateDocument"
import ViewDocument from "./components/ViewDocument"

function App() {
  
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/createDoc" element={<CreateDocument />} />
        <Route path="/viewDoc" element={<ViewDocument />} />
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App