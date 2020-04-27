import styled from "styled-components";

export const CanvasContainer = styled.div`
  background: #f7f7f9;
  min-width: 414px;
  height: 100%;
  overflow-y: auto;
  .designer_selected-node {
    position: relative;
    outline: 1px dashed blue;
  }
  .designer_node:hover {
    position: relative;
    outline: 1px dashed red;
  }
  .designer_widget-holder {
    pointer-events: none;
  }
`;
