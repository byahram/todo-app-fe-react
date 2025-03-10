import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}
  
  :root {
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;
    text-rendering: optimizeLegibility;
  }
  
  body {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background-color: white;
    color:rgb(60, 64, 68);
  }
  
  a {
    font-weight: 500;
    color: #B9B28A;
    text-decoration: none;
  }
  a:hover {
    color: #EBE5C2;
  }
  
  h1 {
    font-size: 3.2em;
    line-height: 1.1;
  }
  
  button {
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    background-color: #B9B28A;
    cursor: pointer;
    transition: border-color 0.25s;
  }
  button:hover {
    border-color: #EBE5C2;
  }
`;

export default GlobalStyle;
