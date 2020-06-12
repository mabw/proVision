import styled from "styled-components";

export const PanelContainer = styled.div`
  width: 15%;
  min-width: 145px;
  height: calc(100% - 40px);
  position: fixed;
  top: 40px;
  right: 0;
  z-index: 3;
  background: #444444;

  section {
    text-align: left;
    width: 100%;
    .section-title {
      border-bottom: 1px solid rgba(0, 0, 0, 0.25);
      padding: 9px 10px 9px 20px;
      background: rgba(0, 0, 0, 0.1);
    }
    > p {
      padding: 10px;
    }
  }

  .form-control {
    font-size: 0.75rem;
    height: 24px;
    line-height: 24px;
    background-color: rgba(0, 0, 0, 0.2);
    border: none;
    box-shadow: none;
    border-radius: 2px;
    box-sizing: border-box;
    padding: 5px;
    position: relative;
    color: #ddd;
  }
`;
