import "./App.css";
import Dashboard from "./pages/Dashboard.jsx";
import Navigator from "./routes";
function App() {
  return (
    <div className="App">
      <Navigator />
      <Dashboard />
    </div>
  );
}

export default App;
