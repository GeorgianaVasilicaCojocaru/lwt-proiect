import { useState,useEffect  } from 'react'

export default function AddGameForm({ onSubmit,data }) {
  const [title, setTitle] = useState('')
  const [genre, setGenre] = useState('RPG')
  const [platform, setPlatform] = useState('PC')
  const [rating, setRating] = useState(0)
  const [status,setStatus] = useState('playing')

  useEffect(() => {
    if (data) {
      setTitle(data.title || '');
      setGenre(data.genre || 'RPG');
      setPlatform(data.platform || 'PC');
      setRating(data.rating || 0);
      setStatus(data.status || 'playing');
    }
  }, [data]);

  
  const handleSubmit = async (e) => {

    e.preventDefault();
    console.log(data);
    const current = {
      title,
      genre,
      platform,
      rating: parseFloat(rating),
      status,
    }

    // e doar cazul pt add
    if(!data?.id){
      onSubmit(current);
      return 
    }

    let updated = {};
    Object.keys(current).forEach((key) => {
      if (current[key] !== data[key]) {
        updated[key] = current[key];
      }
    });

    //console.log(updated);
    onSubmit({
      input:updated,
      id: data.id,
    });

  }

  return (
    <div>
      <h2>Add Game</h2>
      <form onSubmit={handleSubmit}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option>Action</option>
          <option>Adventure</option>
          <option>RPG</option>
          <option>Strategy</option>
          <option>Simulation</option>
          <option>Sports</option>
          <option>Puzzle</option>
        </select>
        <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
          <option>PC</option>
          <option>PS</option>
          <option>Xbox</option>
          <option>Switch</option>
          <option>Mobile</option>
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="playing">Playing</option>
          <option value="finished">Finished</option>
          <option value="plan_to_play">Plan to play</option>
          <option value="dropped">Drop</option>
          <option value="on_hold">On Hold</option>
        </select>
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          placeholder="Rating (0-10)"
          step="0.1"
          min="0"
          max="10"
        />
        <button type="submit">Done</button>
      </form>
    </div>
  )
}
