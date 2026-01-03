import React, { useState } from 'react'
import "../styles/gamelist.css"

import { useQuery } from '@apollo/client'
import { GET_GAMES,GET_GAMES_BY_STATUS } from '../graphql/queries'
import GamesList from './GamesList';
import AddGameDialog from './AddGameDialog';


export default function GamesPage() {
    const [selectedStatus,setStatus] = useState('All');
    const [focused,setFocused] = useState('All');
    const [open, setOpen] = useState(false)


    const statuses = ['All','Playing','Finished','Plan to Play','On Hold','Dropped']
    const statusMap = {
        "All" : 'All',
        "Playing": 'playing',
        "Finished": 'finished',
        'Plan to Play': 'plan_to_play',
        'On Hold': 'on_hold',
        "Dropped": 'dropped',
    }

    const { loading, error, data,refetch } = useQuery(
        selectedStatus === 'All' ? GET_GAMES : GET_GAMES_BY_STATUS,
        {
        variables:
            { status : selectedStatus},
        }

    )


    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>


    return (
        <div style={{display:'flex', flexDirection:'column', justifyContent:'center',alignItems:'center'}}>

            <button style={{margin:"20px"}}  onClick={() => setOpen(true)}>Add entry</button>
            <div className="statusContainer">
                
            {statuses.map((status) => (
                <button key={status} type="button"
                onClick={() => {setStatus(statusMap[status]); setFocused(status)}}
                className={ focused === status ? 'active' : ''}>
                {status}
                </button>
            ))}

            </div>

            <GamesList games={data?.games || data?.gamesByStatus}></GamesList>
            {open && (
                <AddGameDialog
                onClose={() => setOpen(false)}
                onGameAdded={refetch}
                />
            )}

        </div>
    )
}
