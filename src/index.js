module.exports = {solve: iterativeGreedyAlgorithm}

// TODO add the possibility to own score function
/**
 *
 * @param greedyAlgorithm function that receives two arrays, one of elements to be computed and one for the points for the rest of the iterations.
 * It returns an object with two elements, chosen and rejected
 * @param startingData starting array of elements
 * @param resetFunction function to be applied to each element at the start of each iteration
 * @param params extra params
 */
async function iterativeGreedyAlgorithm (greedyAlgorithm, startingData, resetFunction, params = {}) {
  const MAX_NUMBER_OF_ITERATIONS = (typeof params.MAX_NUMBER_OF_ITERATIONS === 'number') ? params.MAX_NUMBER_OF_ITERATIONS : 100
  // At every loop if we improve the result then we apply serialize function to the result to save a copy
  const serializeFunction = (typeof params.serializeFunction === 'function') ? params.serializeFunction : ((x) => JSON.parse(JSON.stringify(x)))
  // In the greedy queue we store all the elements in array in reverse order of execution
  const greedyQueue = [startingData]
  let bestGreedyQueue = []
  let bestScore = 0
  for (let j = 0; j < MAX_NUMBER_OF_ITERATIONS; j++) {
    let iterationScore = 0
    greedyQueue.forEach(function (collection) {
      collection.forEach(function (element) {
        resetFunction.call(element, element)
      })
    })
    const n = greedyQueue.length
    for (let i = n - 1; i >= 0; i--) {
      const {chosen, rejected} = await greedyAlgorithm(greedyQueue[i], flatten(greedyQueue.slice(0, i)))
      iterationScore += chosen.length
      if (chosen.length !== 0) {
        greedyQueue[i] = chosen
        // end of the queue
        if (i === n - 1) {
          if (rejected.length) {
            greedyQueue.push(rejected)
          }
        } else {
          greedyQueue[i + 1] = [...greedyQueue[i + 1], ...rejected]
        }
      } else {
        // If chosen.length === 0 then these elements could not be assigned even at the beginning of the queue, we should get rid of them
        if (i !== n - 1) {
          greedyQueue[i] = greedyQueue[i + 1]
          greedyQueue[i + 1] = rejected
        }
      }
    }
    if (iterationScore > bestScore) {
      bestScore = iterationScore
      // There must be a better way to store the result
      // Plus the name is a bit tricky, one expects that the algorithm in it pass sets the elements
      bestGreedyQueue = serializeFunction(flatten(greedyQueue))
    }
    const greedyQueueLength = greedyQueue.reduce((length, array) => length + array.length, 0)
    if (iterationScore === greedyQueueLength) {
      return bestGreedyQueue
    }
  }
  return bestGreedyQueue
}

function flatten (arrays) {
  return arrays.reduce((a1, a2) => a1.concat(a2), [])
}