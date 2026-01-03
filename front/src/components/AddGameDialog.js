import AddGameForm from "./AddGameForm"
import { useMutation } from '@apollo/client'
import { ADD_GAME } from '../graphql/mutations'

import "../styles/dialog.css"

export default function AddGameDialog({ onClose, onGameAdded }) {
  const [addGame] = useMutation(ADD_GAME)

  const handleSubmit = async (input) => {
    await addGame({ variables: { input } })
    alert('Game added!')
    onGameAdded()
    onClose()
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close" onClick={onClose}>x</button>
        <AddGameForm onSubmit={handleSubmit} data={null} />
      </div>
    </div>
  )
}
