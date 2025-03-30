import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AppWrapper from "./components/AppWrapper";
import NotesPage from "./pages/NotesPage";
import Header from "./components/Header";

function App() {
  return (
    <AppWrapper>
      <Router>
        <Header />
        <div className="pageContent">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/notes" element={<NotesPage />} />
          </Routes>
        </div>
      </Router>
    </AppWrapper>
  );
}

export default App;
