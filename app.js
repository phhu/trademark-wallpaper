import React, { useState, useEffect } from 'react'
// const thesaurusdom = require('thesaurus-dom')
// global.thesaurusdom = thesaurusdom
// const wordhippo = require('wordhippo')
// global.wordhippo = wordhippo
// const thesaurus = require("thesaurus");
// global.thesaurus = thesaurus
// var thesaurus = require('powerthesaurus-api')
// global.thesaurus = thesaurus

// const Synonymator = require("synonymator");
// const API_KEY = "f3ec27eab362158709e62541a10e328e";
// const syn = new Synonymator(API_KEY);
// global.syn = syn 
const rita = require('rita')
global.rita = rita
import NorthFace from './svgLogos/northFace'
import Mastercard from './svgLogos/mastercard'
import Nike from './svgLogos/nike'
const R = require('ramda')

const northFaceText = "the north face"

const randomValue = (list) => {
  return list[Math.floor(Math.random() * list.length)];
};
const syllableCount = word =>rita.syllables(word).split(/[\/ ]/g).length
global.syllableCount = syllableCount;
const rhymify = R.pipe(
  //R.split(" "),
  R.map(word => {
    if (/the/i.test(word)) {return word}
    const rhymes = rita.rhymes(word,{
      maxLength: word.length + 2,
      numSyllables: syllableCount(word),
    })
    return randomValue(rhymes) || word
  }),
)

const makewords = ({count=25, rows=5}={}) => words => {
  ret=[];
  let current = words;
  for (i=0; i< count; i++){
    ret.push({
      words: current,
      x: i % (count/rows),
      y: Math.floor(i/rows),
    })
    current = rhymify(current)
  }
  return ret
}
wordSets = makewords({count:25, rows:5})(northFaceText.split(" "));
wordSets2 = makewords({count:25, rows:5})(["Master","card"]);
console.log(wordSets)
const App = () => {
  const dy = 15
  return (
    <div>
      <svg height='1000' width='1000'>
        {wordSets.map((wordSet)=> (
              <g>
                <NorthFace 
                  key={"nf"+wordSet.x+"_"+wordSet.y}
                  words={wordSet.words}
                  transform={`translate(${(wordSet.x+0)*200},${(wordSet.y+0)*100})`}  
                />
              </g>

        ))}
        {wordSets2.map((wordSet)=> (
          <g>
            <Mastercard  
              key={"mc_"+wordSet.x+"_"+wordSet.y}
              words={wordSet.words}
              transform={`translate(${(wordSet.x+0)*200},${500+(wordSet.y+0)*100})`}  
            />
          </g>
        ))}
        {/*[100,300,500].map(spec => (
          <Mastercard 
            key={spec+1}
            words={rhymify(["mastercard"])}
            transform={`translate(${spec},200)`}
          />
        ))*/}
        {/* <Nike transform='translate(0,350)'/> */}
      </svg>
    </div>
  ) 
}

export default App
