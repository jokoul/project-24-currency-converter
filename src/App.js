import "./App.css";
import CurrencyRow from "./component/CurrencyRow";

function App() {
  return (
    <div className="App">
      <h1>Currency Converter</h1>
      <CurrencyRow />
      <h2>=</h2>
      <CurrencyRow />
    </div>
  );
}

export default App;
