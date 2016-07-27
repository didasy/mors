'use strict';

/** @const {number} - Default length of bit tone in ms. */
const bit                 = 250;

/** @const {number} - Default length of block tone in ms. */
const block               = 500;

/** @const {number} - Default length of delay between tone in ms. */
const delayBetweenTone    = 100;

/** @const {number} - Default length of delay between letters in ms. */
const delayBetweenLetter  = 250;

/** @const {Object} - Map of alphanumerics to morse. */
const alphanumericsMap = {
  a: [bit, block],
  b: [block, bit, bit, bit],
  c: [block, bit, block, bit],
  d: [block, bit, bit],
  e: [bit],
  f: [bit, bit, block, bit],
  g: [block, block, bit],
  h: [bit, bit, bit, bit],
  i: [bit, bit],
  j: [bit, block, block, block],
  k: [block, bit, block],
  l: [bit, block, bit, bit],
  m: [block, block],
  n: [block, bit],
  o: [block, block, block],
  p: [bit, block, block, bit],
  q: [block, block, bit, block],
  r: [bit, block, bit],
  s: [bit, bit, bit],
  t: [block],
  u: [bit, bit, block],
  v: [bit, bit, bit, block],
  w: [bit, block, block],
  x: [block, bit, bit, block],
  y: [block, bit, block, block],
  z: [block, block, bit, bit],
  '0': [block, block, block, block, block],
  '1': [bit, block, block, block, block],
  '2': [bit, bit, block, block, block],
  '3': [bit, bit, bit, block, block],
  '4': [bit, bit, bit, bit, block],
  '5': [bit, bit, bit, bit, bit],
  '6': [block, bit, bit, bit, bit],
  '7': [block, block, bit, bit, bit],
  '8': [block, block, block, bit, bit],
  '9': [block, block, block, block, bit]
}

/**
 * @callback toneCallback
 * @param {number} toneLength - The length of the tone in ms.
 * @param {boolean} play - An indicator whether you should play this tone or not.
 */

/**
 * @function run - Run the text as morse code.
 * @param {string} text - The text you want to emit as morse code.
 * @param {Object} [opts] - The optional options for tone and delay length.
 * @param {number} [opts.bit] - The length of a bit tone in ms.
 * @param {number} [opts.block] - The length of a block tone in ms.
 * @param {number} [opts.delayBetweenTone] - The length of delay between tones in ms.
 * @param {number} [opts.delayBetweenLetter] - The length of delay between letters in ms.
 * @param {toneCallback} cb - The callback that handle what to do to a given tone.
 */
function run(text, opts, cb) {
  if (opts instanceof Function) {
    cb = opts;
    opts = {};
  }
  text
    .toLowerCase()
    .split('')
    .filter(function(el) { 
      return /[a-z0-9]/.test(el); 
    })
    .map(function(el) {
      return alphanumericsMap[el].map(function(toneLen, i, arr) {
        if (opts.bit && toneLen == 500) {
          toneLen = opts.bit;
        }
        if (opts.block && toneLen == 1000) {
          toneLen = opts.block;
        }
        let delay = delayBetweenTone || opts.delayBetweenTone;
        if (i == arr.length-1) {
          delay = delayBetweenLetter || opts.delayBetweenLetter;
        }
        return [toneLen, delay];
      }).reduce(function(a, b) {
        return a.concat(b);
      });
    })
    .reduce(function(a, b) {
      return a.concat(b);
    })
    .forEach(function(el, i) {
      let play = true;
      if (i % 2 == 1) {
        play = false;
      }
      cb(el, play);
    });
}

module.exports = run;