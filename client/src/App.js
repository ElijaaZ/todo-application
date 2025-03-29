import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AppWrapper from "./components/AppWrapper";

function App() {
  return (
    <AppWrapper>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </AppWrapper>
  );
}

export default App;
