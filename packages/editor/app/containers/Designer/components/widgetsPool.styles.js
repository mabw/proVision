import styled from "styled-components";

export const WidgetContainer = styled.div`
  position: fixed;
  top: 40px;
  left: 0;
  z-index: 3;
  width: 15%;
  height: calc(100% - 40px);
  background: #444444;
  height: 100%;
  padding: 15px;
`;

export const WrapHolder = styled.div`
  height: 24px;
  background: green;
  color: #fff;
  text-align: center;
  line-height: 24px;
  font-size: 14px;
  cursor: move;
  margin-top: 10px;
  min-width: 150px;
`;
