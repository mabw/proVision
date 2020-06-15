import React from "react";
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  img {
    width: ${(props) => 100 / props.columns}%;
    flex: 1 1 ${(props) => 100 / props.columns}%;
  }
`;
