import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AppWrapper from "./components/layout/AppWrapper";
import NotesPage from "./pages/NotesPage";
import { ModalProvider } from "./components/context/ModalContext";
import ModalManager from "./components/layout/ModalManager";

function App() {
  return (
    <ModalProvider>
      <AppWrapper>
        <Router>
          <ModalManager />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/notes" element={<NotesPage />} />
          </Routes>
        </Router>
      </AppWrapper>
    </ModalProvider>
  );
}

export default App;
