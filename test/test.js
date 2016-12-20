const iterativeGreedy = require('./../dist/index')
const assert = require('assert')
const maxBy = require('lodash.maxby')
const max = require('lodash.max')
const partition = require('lodash.partition')
const clone = require('lodash.clone')

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
      expectedChosenElements: [2, 4]
    },
    {
      description: 'Two iterations',
      collections: [
        {
          elements: [1, 4]
        },
        {
          elements: [2, 4]
        },
        {
          elements: [2, 4]
        }
      ],
      expectedChosenElements: [1, 2, 4]
    },
    {
      description: 'Solution not feasible',
      collections: [
        {
          elements: [2, 4]
        },
        {
          elements: [2, 4]
        },
        {
          elements: [2, 4]
        }
      ],
      expectedChosenElements: [2, 4]
    }
  ]
  tests.forEach(function (test) {
    it(test.description, function () {
      iterativeGreedy.solve(greedyAlgorithm, test.collections, resetAlgorithm)
    })
  })


  function resetAlgorithm (collection) {
    collection.availableElements = collection.elements
    collection.chosenElement = null
  }

  function greedyAlgorithm (collectionsToChoose, waitingCollections = []) {
    const chosenCollections = []
    const rejectedCollections = []
    var remainingCollections = collectionsToChoose
    while (remainingCollections.length > 0) {
      const chosenCollection = maxBy(remainingCollections, col => max(col.availableElements))
      if (chosenCollection === undefined) {
        // This should only be if it was not possible to get to begin with
        assert.equal(chosenCollections.length, 0, 'This should only happen if collections to choose has nowhere to choose')
        return {chosen: [], rejected: clone(collectionsToChoose)}
      }
      remainingCollections = remainingCollections.filter(c => c !== chosenCollection)
      const chosenElement = max(chosenCollection.availableElements)
      chosenCollection.chosenElement = chosenElement
      chosenCollections.push(chosenCollection)

      remainingCollections.forEach(function (collection) {
        collection.availableElements = collection.availableElements.filter(e => e !== chosenElement)
      })
      waitingCollections.forEach(function (collection) {
        collection.availableElements = collection.availableElements.filter(e => e !== chosenElement)
      })

      const [remainingCollectionsInThisIteration, rejectedCollectionsInThisIteration] = partition(remainingCollections, col => col.availableElements.length)
      remainingCollections = remainingCollectionsInThisIteration
      rejectedCollectionsInThisIteration.forEach(function (collection) {
        rejectedCollections.push(collection)
      })
    }
    return {chosen: chosenCollections, rejected: rejectedCollections}
  }
})