import React, { useState, useEffect } from "react"

export function AlreadyScore() {
    const [scores, setScores] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchScores = async () => {
            try {
                setIsLoading(true)
                const response = await fetch(
                    "http://localhost:5000/api/scores/all"
                )
                const data = await response.json()
                console.log(data) // Verifica los datos recibidos
                setScores(data)
                setIsLoading(false)
            } catch (err) {
                setError(err)
                setIsLoading(false)
            }
        }

        fetchScores()
    }, [])

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

    return (
        <div>
            <h2>Saved Scores</h2>
            <ul>
                {scores.map((score, index) => (
                    <li key={index}>
                        {score.fighter_left}
                        {score.scores_left} vs {score.fighter_right}
                        {score.scores_right} - Winner: {score.winner}
                    </li>
                ))}
            </ul>
        </div>
    )
}
