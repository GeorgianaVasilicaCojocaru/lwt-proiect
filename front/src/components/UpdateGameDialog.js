import { UPDATE_GAME } from "../graphql/mutations"
import { useMutation } from "@apollo/client"
import AddGameForm from "./AddGameForm"

export default function UpdateGameDialog({ onClose,gameData }) {
  const [updateGame] = useMutation(UPDATE_GAME)

  //console.log(gameData);

  const handleSubmit = async ({id,input}) => {
    console.log("UPDATE SOON")
    console.log(input);
    console.log(id);
    await updateGame({ variables: { id,input } })
    alert('Game updated!')
    onClose()
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close" onClick={onClose}>x</button>
        <AddGameForm onSubmit={handleSubmit} data={gameData} />
      </div>
    </div>
  )
}