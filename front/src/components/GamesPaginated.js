import { useState } from "react"
import { useQuery } from "@apollo/client"
import { PAGINATED_GAMES } from "../graphql/queries"
import "../styles/gamegrid.css"

const PAGE_SIZE = 2

export default function GamesPaginated() {
  const [page, setPage] = useState(1)

  const { data, loading, error } = useQuery(PAGINATED_GAMES, {
    variables: { page, limit: PAGE_SIZE },
    fetchPolicy: "cache-and-network",
  })

  if (loading) return <p>Loading games...</p>
  if (error) return <p>Error: {error.message}</p>

  const { items, totalCount, hasNextPage } = data.paginatedGames
  const totalPages = Math.ceil(totalCount / PAGE_SIZE)

  return (
    <div className="games-wrapper">
      <h2>My Games</h2>

      <div className="games-grid">
        {items.map((game) => (
          <div className="game-card" key={game.id}>
            <h3>{game.title}</h3>


            <div className="meta">
              <span><b>Genre:</b> {game.genre}</span>
              <span><b>Platform:</b> {game.platform}</span>
            </div>
            <div className="meta">
              <span><b>Status:</b> {game.status}</span>
              <span><b>Rating:</b> {game.rating}</span>
            </div>

          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Prev
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={!hasNextPage}
        >
          Next
        </button>
      </div>
    </div>
  )
}
