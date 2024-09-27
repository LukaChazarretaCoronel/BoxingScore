import React, { useState } from "react"

const ParentComponent = () => {
    const [TotalLeftName, setTotalLeftName] = useState("TotalLeft")
    const [TotalRightName, setTotalRightName] = useState("TotalRight")

    return (
        <main>
            <TotalComponent name={TotalLeftName} />
            <TotalComponent name={TotalRightName} />
            <button onClick={() => setTotalLeftName("NuevoNombreLeft")}>
                Elegir nombre
            </button>
            <button onClick={() => setTotalRightName("NuevoNombreRight")}>
                Elegir nombre
            </button>
        </main>
    )
}

export function TotalComponent({ name }) {
    return (
        <div>
            <h1>{name}</h1>
        </div>
    )
}
