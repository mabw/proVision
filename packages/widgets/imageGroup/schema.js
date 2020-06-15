const styleProps = {
  schema: {
    type: "object",
    properties: {
      source: {
        type: "string",
        title: "background",
      },
    },
  },
  uiSchema: {},
  formData: {
    source:
      "//m.360buyimg.com/babel/s2002x392_jfs/t1/87496/32/17224/122060/5e845caaE6b28e1d0/0b5102c16c08ad84.jpg!q70.dpg",
  },
};

const settingProps = {
  schema: {
    type: "object",
    properties: {
      columns: {
        type: "number",
        title: "columns in row",
        default: 1,
      },
      items: {
        type: "array",
        title: "A list of fixed items",
        items: [
          {
            title: "Additional item",
            type: "object",
            properties: {
              source: {
                type: "string",
                default:
                  "//m.360buyimg.com/babel/s2002x392_jfs/t1/87496/32/17224/122060/5e845caaE6b28e1d0/0b5102c16c08ad84.jpg!q70.dpg",
              },
              link: {
                type: "string",
                default: "http://www.baidu.com",
              },
            },
          },
        ],
        additionalItems: {
          title: "Additional item",
          type: "object",
          properties: {
            source: {
              type: "string",
              default:
                "//m.360buyimg.com/babel/s2002x392_jfs/t1/87496/32/17224/122060/5e845caaE6b28e1d0/0b5102c16c08ad84.jpg!q70.dpg",
            },
            link: {
              type: "string",
              default: "http://www.baidu.com",
            },
          },
        },
      },
    },
  },
  uiSchema: {},
  formData: {
    columns: 1,
    items: [
      {
        source:
          "//m.360buyimg.com/babel/s2002x392_jfs/t1/87496/32/17224/122060/5e845caaE6b28e1d0/0b5102c16c08ad84.jpg!q70.dpg",
        link: "http://www.baidu.com",
      },
    ],
  },
};

export default { styleProps, settingProps };
