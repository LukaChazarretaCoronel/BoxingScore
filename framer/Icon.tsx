import React from "react"
import { styles } from "./Styles.tsx"

export function Icon({ iconColor, rounds, scores = [], handleClick }) {
    return (
        <div style={styles.scoreColumnStyle}>
            {(scores || []).map((score, index) =>
                index < rounds ? (
                    <div key={index} style={styles.scoreBoxStyle}>
                        <span>{score}</span>
                        <div
                            style={{
                                width: "80%",
                                height: "10px",
                                backgroundColor: iconColor,
                                borderRadius: 5,
                            }}
                            onClick={() => handleClick(index)}
                        />
                    </div>
                ) : null
            )}
        </div>
    )
}
