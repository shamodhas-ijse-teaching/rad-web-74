import React, { createContext, useState } from "react"
import B from "./B"

export const XContext = createContext<any>(null)

const A = () => {
  const [x, setX] = useState(10)

  return (
    <div className="bg-red-600 p-5">
      <div className="flex justify-evenly">
        <div>
          <h1>A</h1>
          <h2>X: {x}</h2>
        </div>
        <input
          type="number"
          value={x}
          onChange={(e) => setX(Number(e.target.value))}
        />
        <button onClick={() => setX(20)}>Change</button>
      </div>

      <XContext.Provider value={{ x, data: x, change: setX }}>
        {/* x:x, data:x */}
        <B />
      </XContext.Provider>
    </div>
  )
}

export default A
