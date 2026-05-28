import React, { useContext } from "react"
import { XContext } from "./A"

const D = () => {
  const { data, change } = useContext(XContext)

  return (
    <div className="bg-yellow-500 p-5">
      <h1>D</h1>
      <h2>X: {data}</h2>

      <input
        type="number"
        value={data}
        onChange={(e) => change(e.target.value)}
      />
    </div>
  )
}

export default D
