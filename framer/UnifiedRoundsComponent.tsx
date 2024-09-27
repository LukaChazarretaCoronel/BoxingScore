import React from "react"
import { styles } from "./Styles.tsx"

export function UnifiedRoundsComponent({ rounds, setRounds }) {
    const increment = () => {
        if (rounds < 16) setRounds(rounds + 1)
    }

    const decrement = () => {
        if (rounds > 1) {
            setRounds((prevRounds) => (prevRounds === 3 ? 16 : prevRounds - 1))
        }
    }

    return (
        <div style={styles.roundsContainerStyle}>
            <div style={styles.buttonStyle} onClick={decrement}>
                -
            </div>
            <div>Rounds {rounds}</div>
            <div style={styles.buttonStyle} onClick={increment}>
                +
            </div>
        </div>
    )
}
