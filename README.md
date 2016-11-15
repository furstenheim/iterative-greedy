## Iterative Greedy

Generic implementation of iterative greedy

## What is?

A way to boost a greedy algorithm in order to obtain a more extensive solution.


## Concrete example

Consider the following task: *Given a collection of arrays of numbers, pick an element from each of the arrays such that there aren't two equal elements and such that the sum is maximized.* That is, given two arrays [1, 4] and [2, 4], we should return 4 from the first array and 2 from the second. The only way to obtain a better sum would be with 4, 4 but then the elements would be repeated.

There is an easy way to solve the problem in general, just go over all the possible combination of elements and pick the one that maximizes the sum. This is obviously non feasible since the complexity is **O(m^n)**.


A greedy algorithm for the task would go as follows, pick the maximum element of the first array, then the maximum element from the next array which is not equal, go on with the following skipping arrays when all elements have already been chosen. In the case above, the maximum element from the first array is 4 so we pick it, in the second array 4 is already taken so we pick 2 and we are done.

Now, let's add another array, also with elements [4, 2], that is we start with arrays [1,4], [2,4] and [2,4]. The algorithm wouldn't be able to pick any element from the third array because 2 and 4 have been already chosen.

Presenting iterative greedy: Apply iteratively a greedy algorithm, if an element cannot be used in one iteration promote it so that it is evaluated first in the following iteration. In our example, after the first pass [2, 4] is not used so we promote it. In the second pass we first apply the greedy algorithm to it, obtaining 4. Then we go to [1, 4] and [2, 4] with 4 already chosen. We pick 1 and 2 and we end up with 4, 1, 2 which is a better result than the 4, 2 obtained with the simple greedy.


