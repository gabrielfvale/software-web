module.exports = {
  components: {
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
          cast: {
            type: "array",
            items: { $ref: "#/components/schemas/Cast" },
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
    },
  },
};
