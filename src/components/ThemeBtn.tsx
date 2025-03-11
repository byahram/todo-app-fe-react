import { useState } from "react";
import { AiOutlineMoon, AiOutlineSun } from "react-icons/ai";
import styled from "styled-components";

export const ThemeBtn = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };
  return (
    <Button onClick={toggleTheme}>
      {isDarkMode ? <AiOutlineMoon size={24} /> : <AiOutlineSun size={24} />}
    </Button>
  );
};

const Button = styled.button`
  background: #f1f1f1;
  padding: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  }
`;
