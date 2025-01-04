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
import EditDocument from "./components/EditDocument"
import Dashboard from "./components/Dashboard"
import EditProfile from "./components/EditProfile"

function App() {
  
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/createDoc" element={<CreateDocument />} />
        <Route path="/viewDoc" element={<ViewDocument />} />
        <Route path="/editDoc" element={<EditDocument />} />
        <Route path="/editProfile" element={<EditProfile />} />
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App