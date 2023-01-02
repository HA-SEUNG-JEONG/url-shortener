import { styled } from "@stitches/react";
import { Dispatch, SetStateAction, useState } from "react";

const InputContainer = styled("input", {
  border: "0",
  borderRadius: "1rem",
  width: "20rem",
  height: "3rem",
  padding: "0 1rem",
  backgroundColor: "White",
  color: "black",
});

const Button = styled("button", {
  padding: "1rem 1rem",
  marginLeft: "0.5rem",
  backgroundColor: "#3498db",
  "&:hover": {
    backgroundColor: "#2980b9",
  },
});

interface SetInputValueProps {
  setInputValue: Dispatch<SetStateAction<string>>;
}

const InputBox = ({ setInputValue }: SetInputValueProps) => {
  const [value, setValue] = useState("");
  const handleClick = () => {
    setInputValue(value);
    setValue("");
  };

  return (
    <>
      <h2>URL Shortener</h2>
      <InputContainer
        type="link"
        id="link"
        name="link" //name 연결해서 링크 입력되도록
        onChange={(changeEvent) => setValue(changeEvent.target.value)}
        placeholder="Please enter URL"
      />
      <Button onClick={handleClick}>Shorten!</Button>
    </>
  );
};

export default InputBox;
