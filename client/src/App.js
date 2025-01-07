import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateTodos from "./pages/CreateTodos";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import Tasks from "./pages/Tasks";
import Profile from "./pages/Profile"
import SingleGroup from "./pages/SingleGroup";
import AppWrapper from "./components/AppWrapper";

function App() {
  return (
    <AuthProvider>
      <AppWrapper>
      <Router>
        <Navbar />
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/createtodos" element={<CreateTodos />} />
          <Route path="/tasks" element={<Tasks/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/tasks/:groupName" element={<SingleGroup/>}/>
        </Routes>
      </Router>
      </AppWrapper>
    </AuthProvider>
  );
}

export default App;
