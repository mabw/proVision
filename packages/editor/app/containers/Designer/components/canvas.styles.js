import styled from "styled-components";

export const CanvasContainer = styled.div`
  background: rgba(0, 0, 0, 0.15);
  min-width: 414px;
  padding: 50px 0;
  font-weight: normal;
  color: #000;
  font-size: 1rem;
  position: absolute;
  top: 40px;
  left: 0;
  width: 100%;
  z-index: 1;
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
    z-index: 3;
    margin-top: -20px;
    background: #3b97e3;
  }

  .designer_node:hover .designer_widget-holder {
    pointer-events: none;
  }
  .designer_toolbar-item {
    padding: 5px 7px;
    font-size: 0.8rem;
    cursor: pointer;
    width: 26px;
    vertical-align: middle;
    display: inline-block;
    color: white;
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
