import React, { useState, useEffect } from 'react'

/* north face
  see https://lsngregg.wordpress.com/tag/the-north-face/
  and masking: https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Clipping_and_masking
*/
export default function NorthFace ({
  transform = 'translate(0,0)',
  words = ["the","north","face"],
} = {}) {
  const dy = 15
  const pp = {
    x: 95,
    textAnchor: 'end',
    fontSize: '20pt',
    style: {
      fontFamily: 'Yantramanav'
    }
  }

  return (
    <g transform={transform}>
      {words.map((word,i) => (
        <text key={"word"+i} y={20*(i+1)} {...pp}>{word.toUpperCase()}</text>
      ))}
      <g transform=''>
        <defs>
          <clipPath id='cut-off-bottom'>
            <rect x='100' y='0' width='100' height='60' />
          </clipPath>
        </defs>
        <NFCircle r='58' fill='black' />
        <NFCircle r='40' fill='white' />
        <NFCircle r='38' fill='black' />
        <NFCircle r='20' fill='white' />
        <NFCircle r='18' fill='black' />
      </g>
      {/* stroke='black' stroke-width='0' */}
    </g>
  )
}

const NFCircle = ({
  cx = 100,
  cy = 60,
  fill = 'black',
  r = 58
} = {}) => {
  const pp = { cx, cy, fill, r }
  return (
    <circle {...pp} key={"nfc"+r} clipPath='url(#cut-off-bottom)' />
  )
}
