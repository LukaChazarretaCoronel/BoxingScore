import React, { useState, useEffect } from "react"
import { UnifiedRoundsComponent } from "./UnifiedRoundsComponent.tsx"
import { motion } from "framer-motion"
import { Icon } from "./Icon.tsx"
import { styles } from "./Styles.tsx"

interface FighterNameInputProps {
    label: string
    value: string
    onChange: (value: string) => void
}

const FighterNameInput: React.FC<FighterNameInputProps> = ({
    label,
    value,
    onChange,
}) => (
    <div style={styles.inputContainer}>
        <label htmlFor={label} style={styles.label}>
            {label}
        </label>
        <input
            id={label}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            style={styles.input}
            placeholder="Enter fighter name"
        />
    </div>
)

export function App() {
    const [rounds, setRounds] = useState(16)
    const [scoresLeft, setScoresLeft] = useState(Array(16).fill(10))
    const [scoresRight, setScoresRight] = useState(Array(16).fill(10))
    const [totalLeft, setTotalLeft] = useState(0)
    const [totalRight, setTotalRight] = useState(0)
    const [winner, setWinner] = useState("")
    const [FighterRight, setFighterRight] = useState("Fighter 1")
    const [FighterLeft, setFighterLeft] = useState("Fighter 2")

    // Función para guardar los puntajes en el backend
    const saveScores = async () => {
        const scoreData = {
            fighterLeft: FighterLeft,
            fighterRight: FighterRight,
            rounds: rounds,
            scoresLeft: scoresLeft,
            scoresRight: scoresRight,
            winner: winner,
        }

        try {
            const response = await fetch(
                "http://localhost:5000/api/scores/add",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(scoreData),
                }
            )

            if (response.ok) {
                const data = await response.json()
                console.log("Score saved successfully:", data.message)
                alert("¡Resultados guardados con éxito!")
            } else {
                console.error("Failed to save scores:", response.statusText)
                alert("Error al guardar los resultados.")
            }
        } catch (error) {
            console.error("Error saving scores:", error)
            alert("Error al guardar los resultados.")
        }
    }

    // Efecto para calcular totales y determinar ganador
    useEffect(() => {
        const sumLeft = scoresLeft.slice(0, rounds).reduce((a, b) => a + b, 0)
        const sumRight = scoresRight.slice(0, rounds).reduce((a, b) => a + b, 0)
        setTotalLeft(sumLeft)
        setTotalRight(sumRight)

        if (sumLeft > sumRight) {
            setWinner(FighterLeft)
        } else if (sumRight > sumLeft) {
            setWinner(FighterRight)
        } else {
            setWinner("Empate")
        }
    }, [scoresLeft, scoresRight, rounds, FighterLeft, FighterRight])

    const handleClickLeft = (index) => {
        setScoresLeft((prevScores) =>
            prevScores.map((score, i) =>
                i === index ? (score > 6 ? score - 1 : 10) : score
            )
        )
    }

    const handleClickRight = (index) => {
        setScoresRight((prevScores) =>
            prevScores.map((score, i) =>
                i === index ? (score > 6 ? score - 1 : 10) : score
            )
        )
    }

    return (
        <div style={styles.containerStyle}>
            <div style={styles.nameInputContainer}>
                <FighterNameInput
                    label="Fighter 1"
                    value={FighterLeft}
                    onChange={setFighterLeft}
                />
                <FighterNameInput
                    label="Fighter 2"
                    value={FighterRight}
                    onChange={setFighterRight}
                />
            </div>

            <UnifiedRoundsComponent rounds={rounds} setRounds={setRounds} />

            <motion.div
                style={styles.cardStyle}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2 style={styles.cardHeader}>Fight Results</h2>
                <div style={styles.resultStyle}>
                    <div style={styles.fighterResult}>
                        <span style={styles.fighterName}>{FighterLeft}</span>
                        <span style={styles.scoreTotal}>{totalLeft}</span>
                    </div>
                    <div style={styles.winnerContainer}>
                        <span style={styles.winnerLabel}>Winner</span>
                        <span style={styles.winnerName}>{winner}</span>
                    </div>
                    <div style={styles.fighterResult}>
                        <span style={styles.fighterName}>{FighterRight}</span>
                        <span style={styles.scoreTotal}>{totalRight}</span>
                    </div>
                </div>
            </motion.div>

            <div style={styles.scoresContainerStyle}>
                <Icon
                    iconColor="midnightblue"
                    rounds={rounds}
                    scores={scoresLeft}
                    handleClick={handleClickLeft}
                />
                <Icon
                    iconColor="midnightblue"
                    scores={scoresRight}
                    rounds={rounds}
                    handleClick={handleClickRight}
                />
            </div>

            {/* Botón para guardar votación */}
            <button
                onClick={saveScores}
                style={{
                    marginTop: "20px",
                    padding: "10px 20px",
                    backgroundColor: "green",
                    color: "white",
                    borderRadius: "5px",
                    border: "none",
                    cursor: "pointer",
                }}
            >
                Guardar Votación
            </button>
        </div>
    )
}
