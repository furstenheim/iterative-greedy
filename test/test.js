const iterativeGreedy = require('./../index')
const assert = require('assert')
const maxBy = require('lodash.maxby')
const max = require('lodash.max')
const partition = require('lodash.partition')

describe('Max sum problem', function () {
  const tests = [
    {
      description: 'Only one iteration',
      collections: [
        {
          elements: [1, 4]
        },
        {
          elements: [2, 4]
        }
      ],
      expectedChosenElements: [4, 2]
    }
  ]
  tests.forEach(function (test) {
    it(test.description, function () {
      // TODO
    })
  })


  function resetAlgorithm (collections) {
    for (let collection of collections) {
      collection.avaiableElements = collection.elements
      collection.chosenElement = null
    }
  }

  function greedyAlgorithm (collectionsToChose, waitingCollections) {
    const chosenCollections = []
    const rejectedCollections = []
    var remainingCollections = collectionsToChose
    while (remainingCollections.length > 0) {
      const chosenCollection = maxBy(collectionsToChose, col => max(col.availableElements))
      remainingCollections = remainingCollections.filter(c => c !== chosenCollection)
      const chosenElement = max(chosenCollection.availableElements)
      chosenCollection.chosenElement = chosenElement
      chosenCollections.push(chosenCollection)

      remainingCollections.forEach(function (collection) {
        collection.avaiableElements = collection.avaiableElements.filter(e => e !== chosenElement)
      })
      waitingCollections.forEach(function (collection) {
        collection.avaiableElements = collection.avaiableElements.filter(e => e !== chosenElement)
      })

      const resultOfIteration = partition(remainingCollections, col => col.avaiableElements.length)
      remainingCollections = resultOfIteration[0]
      resultOfIteration[1].forEach(function (collection) {
        rejectedCollections.push(collection)
      })
    }
    return {chosen: chosenCollections, rejected: rejectedCollections}
  }
})