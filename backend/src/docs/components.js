module.exports = {
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      Error: {
        type: "object",
        properties: {
          error: {
            type: "string",
            description: "Error message",
          },
        },
      },
      Genre: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            description: "Genre ID",
          },
          name: {
            type: "string",
            description: "Genre name",
          },
        },
      },
      Cast: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Person name",
          },
          profile_path: {
            type: "string",
            description: "Person picture path",
          },
          character: {
            type: "string",
            description: "Character played",
          },
        },
      },
      Movie: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            description: "Movie ID",
          },
          backdrop_path: {
            type: "string",
            description: "Movie backdrop path",
          },
          poster_path: {
            type: "string",
            description: "Movie poster path",
          },
          title: {
            type: "string",
            description: "Movie title",
          },
          tagline: {
            type: "string",
            description: "Movie tagline",
          },
          overview: {
            type: "string",
            description: "Movie overview text",
          },
          genres: {
            type: "array",
            items: { $ref: "#/components/schemas/Genre" },
          },
          release_date: {
            type: "string",
            description: "Movie release date YYYY-MM-DD",
          },
        },
      },
      List: {
        type: "object",
        properties: {
          list_id: {
            type: "integer",
          },
          user_id: {
            type: "integer",
          },
          name: {
            type: "string",
          },
          description: {
            type: "string",
          },
          created_at: {
            type: "string",
            format: "date-time",
          },
          updated_at: {
            type: "string",
            format: "date-time",
          },
          list_type: {
            type: "string",
            enum: ["private", "public", "admin"],
          },
          likes: {
            type: "integer",
          },
          movies: {
            type: "array",
            items: { type: "integer" },
          },
        },
      },
      Review: {
        type: "object",
        properties: {
          review_id: {
            type: "integer",
          },
          user_id: {
            type: "integer",
          },
          movie_api_id: {
            type: "integer",
          },
          score: {
            type: "number",
            multipleOf: 0.1,
          },
          description: {
            type: "string",
          },
          like: {
            type: "integer",
          },
          created_at: {
            type: "string",
            format: "date-time",
          },
          updated_at: {
            type: "string",
            format: "date-time",
          },
        },
      },
      Comment: {
        type: "object",
        properties: {
          comment_id: {
            type: "integer",
          },
          user_id: {
            type: "integer",
          },
          review_id: {
            type: "integer",
          },
          description: {
            type: "string",
          },
          created_at: {
            type: "string",
            format: "date-time",
          },
          updated_at: {
            type: "string",
            format: "date-time",
          },
        },
      },
      User: {
        type: "object",
        properties: {
          username: {
            type: "string",
          },
          first_name: {
            type: "string",
          },
          last_name: {
            type: "string",
          },
          country: {
            type: "string",
          },
          bio: {
            type: "string",
          },
        },
      },
    },
  },
};
