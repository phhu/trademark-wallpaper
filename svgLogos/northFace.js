import React, { useState, useEffect } from 'react'

/* north face
  see https://lsngregg.wordpress.com/tag/the-north-face/
  and masking: https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Clipping_and_masking
*/

const range = lim => {
  //console.log("lim",lim)
  return [...Array(lim).keys()];
}
export default function NorthFace ({
  transform = 'translate(0,0)',
  words = ["the","north","face"],
  rotate = 15,
  count = 3,
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
  count = Math.max(1,count)
  const sizes = range(count).map(i => (60/count)*(count-i)-2)
  //count = Math.min([10,count])
  const extraOffset = rotate % 90 >10? 10 : 0

  return (
    <g transform={transform}>
      {words.map((word,i) => (
        <text key={"word"+i} y={20*(i+1)} {...pp}>{word.toUpperCase()}</text>
      ))}
      <g transform={`translate(${100+ extraOffset},60) rotate(${rotate},30,-30) `}>
        <defs>
          <clipPath id='cut-off-bottom'>
            <rect x='0' y='-60' width='100' height='60' />
          </clipPath>
        </defs>
        {sizes.map((r)=> (
          <NFCircle r={r} fill='black' />
        ))}
      </g>
      {/* stroke='black' stroke-width='0' */}
    </g>
  )
}

const NFCircle = ({
  cx = 0,
  cy = 0,
  fill = 'black',
  stroke = "white",
  r = 58
} = {}) => {
  const pp = { cx, cy, fill, r,stroke }
  return (
    <circle {...pp} key={"nfc"+r} strokeWidth="2" clipPath='url(#cut-off-bottom)' />
  )
}
