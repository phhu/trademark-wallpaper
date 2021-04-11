import React, { useState, useEffect } from 'react'

const capitalize = (str) => (typeof str === 'string') ?
  str.replace(/^\w/, c => c.toUpperCase()): ''

export default function Mastercard ({
  transform = 'translate(150,0)',
  words = ["Master","card"],
} = {}) {
  const pp = {
    x: 80,
    textAnchor: 'end'
  }
  words[0] = capitalize(words[0])
  return (
    <g transform={transform}>
      <circle cx='100' cy='50' r='40' stroke='black' strokeWidth='0' fill='#eb001b' />
      <circle cx='50' cy='50' r='40' stroke='black' strokeWidth='0' fill='#f79e1b' />
      <text x='30' y='110' style={{ fontFamily: 'Mark' }}>{words.join("")}</text>
    </g>
  )
}

// className='mastercard'
