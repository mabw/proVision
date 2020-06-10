import React from "react";
import styled from "styled-components";

const WrapRoot = styled.div`
  width: 414px;
  height: 736px;
  background-color: ${(props) => props.backgroundColor || "white"};
  margin: 0 auto;
  position: relative;
  color: ${(props) => props.fontColor || "black"};
`;

const styleProps = {
  schema: {
    type: "object",
    properties: {
      backgroundColor: {
        type: "string",
        title: "background color",
        default: "white",
      },
      fontColor: {
        type: "string",
        title: "font color",
        default: "black",
      },
    },
  },
  uiSchema: {},
  formData: {
    backgroundColor: "white",
    fontColor: "black",
  },
};

const RootWidget = ({ children, backgroundColor, fontColor }) => {
  return (
    <WrapRoot backgroundColor={backgroundColor} fontColor={fontColor}>
      {children}
    </WrapRoot>
  );
};

RootWidget.defaultProps = {
  backgroundColor: "white",
  fontColor: "black",
};

const Root = {
  template: RootWidget,
  styleProps,
};

export { Root };
