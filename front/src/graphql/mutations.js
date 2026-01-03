import { gql } from "@apollo/client"

export const LOGIN_USER = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input)
  }
`

export const ADD_GAME = gql`
  mutation AddGame($input: GameInput!) {
    addGame(input: $input) {
      id
      title
      rating
    }
  }
`

export const UPDATE_GAME = gql`
  mutation UpdateGame($id: ID!, $input: GameUpdateInput!) {
    updateGame(id: $id, input: $input) {
      id
      title
      rating
    }
  }
`

export const DELETE_GAME = gql`
  mutation DeleteGame($id: ID!) {
    deleteGame(id: $id)
  }
`