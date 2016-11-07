const isNumber = require('lodash.isnumber')
const isFunction = require('lodash.isfunction')
const flatten = require('lodash.flatten')
// TODO add the possibility to own score function
/**
 *
 * @param greedyAlgorithm function that receives two arrays, one of elements to be computed and one for the points for the rest of the iterations.
 * It returns an object with two elements, chosen and rejected
 * @param startingData starting array of elements
 * @param resetFunction function to be applied to each element at the start of each iteration
 * @param params extra params
 */
function iterativeGreedyAlgorithm (greedyAlgorithm, startingData, resetFunction, params) {
  const MAX_NUMBER_OF_ITERATIONS = isNumber(params.MAX_NUMBER_OF_ITERATIONS) ? params.MAX_NUMBER_OF_ITERATIONS : 100
  // In the greedy queue we store all the elements in array in reverse order of execution
  const greedyQueue = [startingData]
  let bestScore = 0
  for (let j = 0; j < MAX_NUMBER_OF_ITERATIONS; j++) {
    let iterationScore = 0
    greedyQueue.forEach(function (collection) {
      collection.forEach(function (element) {
        resetFunction.call(null, element)
      })
    })
    for (let i = n - 1; i >= 0; i--) {
      const {chosen, rejected} = greedyAlgorithm(greedyQueue[i], flatten(greedyQueue.slice(0, i)))
      iterationScore += chosen.length
    }
  }
}