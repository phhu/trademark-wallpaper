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
const synonymsArray = require('synonyms-array')
global.synonyms = synonymsArray.get
const colors = require('nice-color-palettes/200');
global.colors = colors
import NorthFace from './svgLogos/northFace'
import Mastercard from './svgLogos/mastercard'
//import Nike from './svgLogos/nike'
const R = require('ramda')

const northFaceText = "the north face"

const randomValue = (list) => {
  return list[Math.floor(Math.random() * list.length)];
};
const syllableCount = word => {
  try{
    return rita.syllables(word).split(/[\/ ]/g).length
  } catch(e){
    return 1
  }
}
//global.syllableCount = syllableCount;
const getRhymes = ({i=0}={}) => word => rita.rhymes(word,{
  maxLength: word.length + 2,
  numSyllables: syllableCount(word),
})
const getSynonyms = ({}={}) => word =>
  synonymsArray.get(word).filter(
    word =>syllableCount(word)<3
  ).concat([word])

const getSameWord = ({}={}) => word => [word]
const varyWords = ({i=0}={}) => R.pipe(
  //R.split(" "),
  R.map(word => {
    if (/the/i.test(word)) {return word}
    const ff = [getSameWord]
    if (document.getElementById('useRhyme').checked){ff.push(getRhymes)}
    if (document.getElementById('useSynonyms').checked){ff.push(getSynonyms)}
    const f = ff[rnd(ff.length)]
    return randomValue(f()(word)) || word
  }),
)
const rnd = (max) => Math.floor(Math.random() * max)
const getRandomColors = ({
  count=2,
  previous=['#eb001b','#f79e1b'],
}={}) => {
  let cc = colors[rnd(200)]
  let newCC = [
    cc[rnd(5)],
    cc[rnd(5)]
  ]
  let choice = [].concat(previous,newCC)
  return [
    previous[rnd(previous.length)],
    choice[rnd(choice.length)]
  ]
}

const makewords = ({count=25, rows=5}={}) => words => {
  ret=[];
  let current = words;
  let colors = ['#eb001b','#f79e1b'];
  let rotate = 0
  let cnt = 3
  for (i=0; i< count; i++){
    ret.push({
      words: current,
      x: i % (count/rows),
      y: Math.floor(i/rows),
      colors,
      rotate,
      count: cnt
    })
    colors = getRandomColors({count:2,previous:colors})
    current = varyWords({i})(current)

    if (Math.random()>0.2){rotate += (rnd(5)-2)*90}
    if (Math.random()>0.2){cnt += (rnd(3)-(cnt===1? 0:1))}
  }
  return ret
}
let wordSets
let wordSets2
const refreshWordSets = () => {
wordSets = makewords({count:25, rows:5})(northFaceText.split(" "));
wordSets2 = makewords({count:25, rows:5})(["Master","card"]);
console.log(wordSets)
}
global.refreshWordSets = refreshWordSets
refreshWordSets()

const App = () => {
  const dy = 15
  return (
    <div>
      
      <svg height='1400' width='1600'>
        {wordSets.map((wordSet)=> (
              <g>
                <NorthFace 
                  key={"nf_"+wordSet.x+"_"+wordSet.y}
                  words={wordSet.words}
                  rotate={wordSet.rotate}
                  count={wordSet.count}
                  transform={
                    `translate(${50+(wordSet.x+0)*250},${(wordSet.y+0)*100})`
                  }  
                />
              </g>
        ))}
        {wordSets2.map((wordSet)=> (
          <g>
            <Mastercard
              colors=  {wordSet.colors}
              key={"mc_"+wordSet.x+"_"+wordSet.y}
              words={wordSet.words}
              transform={`translate(${50+(wordSet.x+0)*250},${500+(wordSet.y+0)*150})`}  
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
