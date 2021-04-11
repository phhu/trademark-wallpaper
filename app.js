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
import NorthFace from './svgLogos/northFace'
import Mastercard from './svgLogos/mastercard'
import Nike from './svgLogos/nike'

const App = () => {
  const dy = 15
  return (
    <div>
      <svg height='1000' width='1000'>
        <NorthFace transform='translate(100,0)' />
        <Mastercard transform='translate(0,200)' />
        <Nike transform='translate(0,350)'/>
      </svg>
    </div>
  )
}

export default App
