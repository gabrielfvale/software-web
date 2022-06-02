const errors = {
  not_found: {
    description: "Resource not found error",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/Error",
        },
      },
    },
  },
  server: {
    description: "Server error",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/Error",
        },
      },
    },
  },
};

const movie = {
  "/movie/{id}": {
    get: {
      tags: ["Movie"],
      summary: "Movie details by id",
      parameters: [
        {
          in: "path",
          name: "id",
          type: "string",
          required: true,
          description: "Movie ID",
        },
      ],
      responses: {
        200: {
          description: "Movie details returned",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Movie",
              },
            },
          },
        },
        404: errors.not_found,
        500: errors.server,
      },
    },
  },
  "/movie/discover": {
    get: {
      tags: ["Movie"],
      summary: "Discover movies with filters",
      parameters: [
        {
          in: "query",
          name: "page",
          type: "integer",
          description: "Desired page",
        },
        {
          in: "query",
          name: "sort_by",
          description: "Sort movies",
          schema: {
            type: "string",
            enum: [
              "popularity.asc",
              "popularity.desc",
              "release_date.asc",
              "release_date.desc",
              "revenue.asc",
              "revenue.desc",
              "primary_release_date.asc",
              "primary_release_date.desc",
              "original_title.asc",
              "original_title.desc",
              "vote_average.asc",
              "vote_average.desc",
              "vote_count.asc",
              "vote_count.desc",
            ],
          },
        },
        {
          in: "query",
          name: "release_date.gte",
          type: "string",
          description:
            "Filter movies with release date greater or equal than parameter",
        },
        {
          in: "query",
          name: "release_date.lte",
          type: "string",
          description:
            "Filter movies with release date less or equal than parameter",
        },
        {
          in: "query",
          name: "year",
          type: "string",
          description: "Filter movies from specified year",
        },
        {
          in: "query",
          name: "with_genres",
          type: "string",
          description: "Comma separated genre list to include",
        },
        {
          in: "query",
          name: "without_genres",
          type: "string",
          description: "Comma separated genre list to exclude",
        },
      ],
      responses: {
        200: {
          description: "Discover search returned",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  page: {
                    type: "integer",
                  },
                  total_pages: {
                    type: "integer",
                  },
                  total_results: {
                    type: "integer",
                  },
                  results: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Movie" },
                  },
                },
              },
            },
          },
        },
        400: {
          description: "Invalid search parameters",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
        500: errors.server,
      },
    },
  },
  "/movie/popular": {
    get: {
      tags: ["Movie"],
      summary: "Paginated list of popular movies",
      parameters: [
        {
          in: "query",
          name: "page",
          type: "integer",
          description: "Desired page",
        },
      ],
      responses: {
        200: {
          description: "Discover search returned",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  page: {
                    type: "integer",
                  },
                  total_pages: {
                    type: "integer",
                  },
                  total_results: {
                    type: "integer",
                  },
                  results: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Movie" },
                  },
                },
              },
            },
          },
        },
        400: {
          description: "Invalid page parameter",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
        500: errors.server,
      },
    },
  },
  "/movie/{id}/recommendations": {
    get: {
      tags: ["Movie"],
      summary: "Paginated list of recommended movies",
      parameters: [
        {
          in: "path",
          name: "id",
          type: "integer",
          description: "Movie ID to search similar",
        },
        {
          in: "query",
          name: "page",
          type: "integer",
          description: "Desired page",
        },
      ],
      responses: {
        200: {
          description: "Discover search returned",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  page: {
                    type: "integer",
                  },
                  total_pages: {
                    type: "integer",
                  },
                  total_results: {
                    type: "integer",
                  },
                  results: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: {
                          type: "integer",
                        },
                        title: {
                          type: "string",
                        },
                        genre_ids: {
                          type: "array",
                          items: { type: "integer" },
                        },
                        release_date: {
                          type: "string",
                        },
                        poster_path: {
                          type: "string",
                        },
                        backdrop_path: {
                          type: "string",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        400: {
          description: "Invalid page parameter",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
        500: errors.server,
      },
    },
  },
};

const list = {
  "/list/{id}": {
    get: {
      tags: ["List"],
      summary: "List by id",
      parameters: [
        {
          in: "path",
          name: "id",
          type: "integer",
          description: "List ID",
        },
      ],
      responses: {
        200: {
          description: "List returned",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/List" },
            },
          },
        },
      },
    },
  },
  "/list/popular": {
    get: {
      tags: ["List"],
      summary: "Popular lists",
      parameters: [
        {
          in: "query",
          name: "page",
          type: "integer",
        },
      ],
      responses: {
        200: {
          description: "List returned",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  page: {
                    type: "integer",
                  },
                  total_pages: {
                    type: "integer",
                  },
                  total_results: {
                    type: "integer",
                  },
                  results: {
                    type: "array",
                    items: { $ref: "#/components/schemas/List" },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "/list": {
    post: {
      tags: ["List"],
      summary: "Create a list",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/List" },
          },
        },
      },
      responses: {
        201: {
          description: "List created",
        },
        500: errors.server,
      },
    },
    put: {
      tags: ["List"],
      summary: "Update a list",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/List" },
          },
        },
      },
      responses: {
        201: {
          description: "List updated",
        },
        500: errors.server,
      },
    },
    delete: {
      tags: ["List"],
      summary: "Delete a list",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                list_id: {
                  type: "integer",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "List deleted",
        },
        404: errors.not_found,
        500: errors.server,
      },
    },
  },
};

const review = {
  "/review/{movie_id}": {
    get: {
      tags: ["Review"],
      summary: "Review by movie id",
      parameters: [
        {
          in: "path",
          name: "movie_id",
          type: "integer",
          description: "Movie ID",
        },
      ],
      responses: {
        200: {
          description: "Reviews returned",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  page: {
                    type: "integer",
                  },
                  total_pages: {
                    type: "integer",
                  },
                  total_results: {
                    type: "integer",
                  },
                  results: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/Review",
                    },
                  },
                },
              },
            },
          },
        },
        404: errors.not_found,
        500: errors.server,
      },
    },
  },
  "/review/popular": {
    get: {
      tags: ["Review"],
      summary: "Reviews sorted by popularity",
      parameters: [
        {
          in: "query",
          name: "page",
          type: "integer",
          description: "Desired page",
        },
      ],
      responses: {
        200: {
          description: "Popular reviews returned",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  page: {
                    type: "integer",
                  },
                  total_pages: {
                    type: "integer",
                  },
                  total_results: {
                    type: "integer",
                  },
                  results: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/Review",
                    },
                  },
                },
              },
            },
          },
        },
        404: errors.not_found,
        500: errors.server,
      },
    },
  },
  "/review/{review_id}/comments": {
    get: {
      tags: ["Review"],
      summary: "Review's comments by review id",
      parameters: [
        {
          in: "query",
          name: "page",
          type: "integer",
          description: "Desired page",
        },
      ],
      responses: {
        200: {
          description: "Comments returned",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  page: {
                    type: "integer",
                  },
                  total_pages: {
                    type: "integer",
                  },
                  total_results: {
                    type: "integer",
                  },
                  results: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/Comment",
                    },
                  },
                },
              },
            },
          },
        },
        404: errors.not_found,
        500: errors.server,
      },
    },
  },
  "/review": {
    post: {
      tags: ["Review"],
      summary: "Create a review",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Review" },
          },
        },
      },
      responses: {
        201: {
          description: "Review created",
        },
        500: errors.server,
      },
    },
    put: {
      tags: ["Review"],
      summary: "Update a review",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Review" },
          },
        },
      },
      responses: {
        200: {
          description: "Review updated",
        },
        500: errors.server,
      },
    },
    delete: {
      tags: ["Review"],
      summary: "Delete a review",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                review_id: {
                  type: "integer",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Review deleted",
        },
        404: errors.not_found,
        500: errors.server,
      },
    },
  },
  "/review/comment": {
    post: {
      tags: ["Review"],
      summary: "Create a comment in a review",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Comment" },
          },
        },
      },
      responses: {
        201: {
          description: "Comment created",
        },
        404: errors.not_found,
        500: errors.server,
      },
    },
    put: {
      tags: ["Review"],
      summary: "Update a Comment",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Comment" },
          },
        },
      },
      responses: {
        200: {
          description: "Comment updated",
        },
        404: errors.not_found,
        500: errors.server,
      },
    },
    delete: {
      tags: ["Review"],
      summary: "Delete a comment",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                review_id: {
                  type: "integer",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Review deleted",
        },
        404: errors.not_found,
        500: errors.server,
      },
    },
  },
  "/review/like": {
    post: {
      tags: ["Review"],
      summary: "Like or unlike a review",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                review_id: {
                  type: "integer",
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "Review liked/unliked",
        },
        404: errors.not_found,
        500: errors.server,
      },
    },
  },
};

module.exports = { paths: { ...movie, ...list, ...review } };
