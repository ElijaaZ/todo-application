import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SavedTodos from "./pages/SavedTodos";
import CreateTodos from "./pages/CreateTodos";
import { AuthProvider } from "./context/AuthContext";
import SingleTodo from "./components/SingleTodo";
import Header from "./components/Header";
import Tasks from "./pages/Tasks";
import Calendar from "./pages/Calendar";
import Profile from "./pages/Profile";
import AddTodoButton from "./components/AddTodoButton";
import SingleGroup from "./pages/SingleGroup";
import AppWrapper from "./components/AppWrapper";

function App() {
  return (
    <AuthProvider>
      <AppWrapper>
      <Router>
        <Navbar />
        <Header/>
        <AddTodoButton/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/createtodos" element={<CreateTodos />} />
          <Route path="/savedtodos" element={<SavedTodos />} />
          <Route path="/savedtodos/:todoId" element={<SingleTodo/>} />
          <Route path="/tasks" element={<Tasks/>} />
          <Route path="/calendar" element={<Calendar/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/tasks/:groupName" element={<SingleGroup/>}/>
        </Routes>
      </Router>
      </AppWrapper>
    </AuthProvider>
  );
}

export default App;
