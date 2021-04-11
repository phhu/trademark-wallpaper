import React, { useState, useEffect } from 'react'

const capitalize = (str) => (typeof str === 'string') ?
  str.replace(/^\w/, c => c.toUpperCase()): ''

export default function Mastercard ({
  transform = 'translate(150,0)',
  words = ["Master","card"],
  colors = ['#eb001b','#f79e1b'],
} = {}) {
  const pp = {
    x: 80,
    textAnchor: 'center'
  }
  words = words.map(capitalize)
  return (
    <g transform={transform}>
      <circle cx='100' cy='50' r='40' stroke='black' strokeWidth='0' fill={colors[0]} />
      <circle cx='50' cy='50' r='40' stroke='black' strokeWidth='0' fill={colors[1]} />
      <text x='80' y='110' textAnchor='middle' style={{ fontFamily: 'Mark' }}>{words.join("")}</text>
    </g>
  )
}

// className='mastercard'
