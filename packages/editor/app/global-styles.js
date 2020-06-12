import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: Helvetica, Arial, sans-serif;
    overscroll-behavior:none;
  }

  body.fontLoaded {
    font-family: Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }
  img {
    user-select:none;
    -webkit-user-drag: none;
  }
`;

export default GlobalStyle;
