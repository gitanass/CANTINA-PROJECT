import logo from "./logo.svg";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <div className="App" style={{ backgroundColor: "#e4e4e4" }}>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <AppRoutes></AppRoutes>
    </div>
  );
}

export default App;
