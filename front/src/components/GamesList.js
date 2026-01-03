import "../styles/gamelist.css"
import { DELETE_GAME } from '../graphql/mutations'
import { useMutation } from "@apollo/client"
import UpdateGameDialog from "./UpdateGameDialog"
import { useState } from "react"

export default function GamesList({games}) {

  const emptyGame = {
    id: 0,
    title: '',
    genre: 'RPG',
    platform: 'PC',
    rating: 0,
    status: 'playing'
  };

  const [selectedGame,setSelectedGame] = useState(emptyGame);
  const [deleteGame] = useMutation(DELETE_GAME)
  const [open, setOpen] = useState(false)


  const handleDelete = async (id) => {

    await deleteGame({variables: {id}});
    alert('Game Deleted!');
  }
  
  const handleUpdate = async(game) => {
    console.log(game);
    setSelectedGame(game);
    console.log(selectedGame);
    setOpen(true);
  }

  
  if(!games || games.length === 0 ){
    return <p>No games found</p>
  }
  return (
    <div>
        <div className="gameContainer">
          <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Platform</th>
                    <th>Genre</th>
                    <th>Status</th>
                    <th>Rating</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>

            <tbody>
                {games.map((game) => (
                    <tr key={game.id}>
                        <td>{game.title}</td>
                        <td>{game.platform}</td>
                        <td>{game.genre}</td>
                        <td>{game.status}</td>
                        <td>{game.rating}</td>
                        <td className="td"><div className="separator"></div></td>
                        <td>
                        <div className="buttonContainer">
                          <button onClick={() => handleDelete(game.id)} >Delete</button>
                          <button onClick={()=>handleUpdate(game)} >Modify</button>
                        </div>
                      </td> 
                    </tr>
                    
                ))}
            </tbody>
          </table>
        </div>
        {open && (
          <UpdateGameDialog
          onClose={() => setOpen(false)}
          gameData={selectedGame}
          />
        )}
    </div>
  )
}
