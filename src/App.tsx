import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import InputBox from "./components/InputBox";
import LinkResult from "./components/LinkResult";

function App() {
  const [inputValue, setInputValue] = useState("");
  return (
    <>
      <InputBox setInputValue={setInputValue} />
      <LinkResult inputValue={inputValue} />
      <ToastContainer theme="colored" autoClose={3000} position="top-center" />
    </>
  );
}

export default App;
