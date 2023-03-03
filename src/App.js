import Header from "./components/Header";
import Field from "./components/Field";
import "./App.css";

function App() {
  return (
    <div className="wrapper-app">
      <div className="app">
        <Header />
        <div className="transfer" />
        <Field />
      </div>
    </div>
  );
}

export default App;
