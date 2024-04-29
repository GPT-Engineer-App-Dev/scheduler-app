import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import CompletedTasks from "./pages/CompletedTasks.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route path="/completed" element={<CompletedTasks />} />
      </Routes>
    </Router>
  );
}

export default App;