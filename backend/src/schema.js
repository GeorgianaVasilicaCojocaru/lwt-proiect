const { gql } = require("apollo-server")

module.exports = gql`
  enum Genre {
    Action
    Adventure
    RPG
    Strategy
    Simulation
    Sports
    Puzzle
  }

  enum Platform {
    PC
    PS
    Xbox
    Switch
    Mobile
  }

  enum Status {
    playing
    finished
    plan_to_play
    dropped
    on_hold
  }

  type User {
    id: ID!
    username: String!
  }

  type Game {
    id: ID!
    title: String!
    genre: Genre!
    platform: Platform!
    rating: Float,
    status: Status!
    owner: User!
  }

  type PaginatedGames {
    items: [Game!]!
    page: Int!
    limit: Int!
    totalCount: Int!
    hasNextPage: Boolean!
  }

  type Query {
    games: [Game!]!
    game(id: ID!): Game
    gamesByGenre(genre: Genre!): [Game!]!
    gamesByPlatform(platform: Platform!): [Game!]!
    gamesByUser(userId: ID!): [Game!]!
    gamesByStatus(status: Status!) : [Game!]!
    paginatedGames(page: Int!, limit: Int!): PaginatedGames!
  }

  input GameInput {
    title: String!
    genre: Genre!
    platform: Platform!
    status: Status!
    rating: Float
  }

  input LoginInput {
    username: String!
    password: String!
  }

  input RegisterInput {
    username: String!
    password: String!
  }


  type Mutation {
    registerUser(input: RegisterInput!): User!
    login(input: LoginInput!): String!
    addGame(input: GameInput!): Game!
    updateGame(id: ID!, input: GameInput!): Game!
    deleteGame(id: ID!): Boolean!
  }
`
