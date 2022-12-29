import { styled } from "@stitches/react";
import { ChangeEvent } from "react";

const MainContainer = styled("form", {
  fontSize: "13px",
  border: "0",
});

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

const InputBox = () => {
  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("event");
  };
  return (
    <MainContainer onSubmit={handleSubmit}>
      <InputContainer type="text" placeholder="Please enter URL" />
      <Button>Shorten!</Button>
    </MainContainer>
  );
};

export default InputBox;
