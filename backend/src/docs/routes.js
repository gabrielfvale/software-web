const list = {
  paths: {
    "/list": {
      post: { tags: ["List"] },
      put: { tags: ["List"] },
      delete: { tags: ["List"] },
    },
    "/list/{id}": {
      get: {
        tags: ["List"],
        description: "Get todos",
        parameters: [],
        responses: {
          200: {
            description: "Todos were obtained", // response desc.
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Todo", // Todo model
                },
              },
            },
          },
        },
      },
    },
  },
};

module.exports = { ...list };
