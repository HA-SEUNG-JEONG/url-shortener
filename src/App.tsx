import { useState } from "react";
import "./App.css";
import InputBox from "./components/InputBox";
import LinkResult from "./components/LinkResult";

function App() {
  const [inputValue, setInputValue] = useState("");
  return (
    <div className="App">
      <InputBox setInputValue={setInputValue} />
      <LinkResult inputValue={inputValue} />
    </div>
  );
}

export default App;
