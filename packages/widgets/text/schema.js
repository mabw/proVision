const styleProps = {
  schema: {
    type: "object",
    properties: {
      fontColor: {
        type: "string",
        title: "font color",
        default: "#000000",
      },
    },
  },
  uiSchema: {
    fontColor: {
      "ui:widget": "color",
    },
  },
  formData: {
    fontColor: "#000000",
  },
};

const settingProps = {
  schema: {
    type: "object",
    properties: {
      content: {
        type: "string",
        title: "text",
      },
    },
  },
  uiSchema: {},
  formData: {
    content: "demo string",
  },
};

export default { styleProps, settingProps };
