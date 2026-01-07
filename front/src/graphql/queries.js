import { gql } from "@apollo/client"

export const GET_GAMES = gql`
  query GetGames {
    games {
      id
      title
      genre
      platform
      status
      rating
      owner {
        username
      }
    }
  }
`
export const GET_GAMES_BY_STATUS = gql`
  query GetGamesByStatus($status : Status!) {
    gamesByStatus(status : $status) {
      id
      title
      genre
      platform
      status
      rating
      owner {
        username
      }
    }
  }
`
export const GET_GAMES_BY_GENRE = gql`
  query GetGamesByGenre($genre : Genre!) {
    gamesByGenre(genre : $genre) {
      id
      title
      genre
      platform
      status
      rating
      owner {
        username
      }
    }
  }
`
export const PAGINATED_GAMES = gql`
  query PaginatedGames($page: Int!, $limit: Int!) {
    paginatedGames(page: $page, limit: $limit) {
      items {
        id
        title
        genre
        platform
        status
        rating
      }
      page
      limit
      totalCount
      hasNextPage
    }
  }
`
