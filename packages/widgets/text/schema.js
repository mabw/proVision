const styleProps = {
  schema: {
    type: "object",
    properties: {
      fontColor: {
        type: "string",
        title: "font color",
      },
    },
  },
  uiSchema: {},
  formData: {
    fontColor: "",
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
