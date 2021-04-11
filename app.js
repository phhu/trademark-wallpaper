import React, { useState, useEffect } from 'react'

const App = () => {
  let dy = 15
  return (
    <div>
      <svg  height="200" width="200">
        
        <text  x="0" y="16">THE</text>
        <text  x="0" y={16+dy}>NORTH</text>
        <text  x="0" y={16+2*dy}>FACE</text>
      </svg>
    </div>
  )
}

export default App
