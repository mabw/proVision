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
  legend {
    display: block;
    width: 100%;
    font-size: 14px;
    color: #b9a5a6;
    border: 0;
  }
  .btn-add {
    .glyphicon-plus {
      display: inline-block;
      font: normal normal normal 14px/1 FontAwesome;
      font-size: inherit;
      text-rendering: auto;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      &:before {
        content: "\f067";
      }
      &:after,
      &:before {
        box-sizing: border-box;
      }
    }
  }
  .btn-danger {
    flex: 0;
    .glyphicon-remove {
      display: inline-block;
      font: normal normal normal 14px/1 FontAwesome;
      font-size: inherit;
      text-rendering: auto;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      &:before {
        content: "\f00d";
      }
      &:after,
      &:before {
        box-sizing: border-box;
      }
    }
  }
`;
