import React from "react";
import styled, { keyframes } from "styled-components";

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 50,
  color = "#707881",
}) => {
  return (
    <Spinner style={{ width: size, height: size, borderTopColor: color }} />
  );
};

export default LoadingSpinner;

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid #9aa6b2;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;
