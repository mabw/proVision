import styled from "styled-components";

export const CanvasContainer = styled.div`
  background: #f7f7f9;
  min-width: 414px;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding-top: 50px;
  .designer_selected-node {
    position: relative;
    outline: 1px dashed blue;
  }
  .designer_hidden {
    display: none;
  }
  .designer_node {
    position: relative;
    outline: 1px dashed red;
  }
  .designer_node-placeholder {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    margin-top: -20px;
    outline: 1px solid red;
    background: rgba(255, 100, 100, 0.85);
  }
  .designer_node:hover .designer_widget-holder {
    pointer-events: none;
  }
  .designer_covered-widget {
    position: relative;
    &::after {
      width: 100%;
      content: "";
      position: absolute;
      height: 1px;
      left: 0;
      ${(props) => (props.direction === "before" ? "top: 0;" : "bottom: 0;")}
      z-index: 10;
      background: green;
    }
  }
`;
