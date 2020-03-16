---
layout: article
key: 2020-01-13-integer-replacement
title: Integer Replacement
date: 2020-01-13 11:00:00-0800
tags: Algorithms Problems LeetCode
---

This is a problem I brought along to the WICSxACM Technical Interview Prep
workshop on 13 January 2020.<!--excerpt-separator--> It is also available at
[bit.ly/integer-replacement](https://bit.ly/integer-replacement).

## Problem Description

Source: [LeetCode 397](https://leetcode.com/problems/integer-replacement/)

Given a positive integer $$n$$, you can perform the following operations:

1. If $$n$$ is even, replace $$n$$ with $$n/2$$
2. If $$n$$ is odd, replace $$n$$ with either $$n + 1$$ or $$n - 1$$

What is the minimum number of replacements needed for $$n$$ to become $$1$$?

## Hints

1. The initial temptation is to go for a fancy, math-based $$O(1)$$ solution,
   but there are more general approaches that will increase your chances of
   actually coming up with a solution. What are some other approaches you can
   think of?
2. How can you think of the problem as a graph? (For this workshop, I know there
   have been quite a few other graph problems, so this will be fresh in your
   mind.)

## Solution

I have implemented one possible solution to the problem. I chose to use C++
because it is the language I prefer to use in interviews. Python makes things
too easy. IMHO interviewers will want to see your implementation skills, and C++
is the way to do that. Of course, this will vary on a case-by-case basis. Some
companies mainly use Python and will want to interview you in Python, for
instance.

### Approach 1: BFS

This solution was suggested in the [Hints](#hints). The idea is to think of the
numbers as a graph, where each number is a node and there are edges connecting
each node $$x$$ to $$x/2$$ if $$x$$ is even, or to $$x + 1$$ and $$x - 1$$ if
$$x$$ is odd. We can then perform a BFS (Breadth-First Search) on the graph to
find the length of the shortest path from $$n$$ to $$1$$.

- Time complexity: $$O(n)$$ -- we can only encounter numbers in the range
  $$[1, 2n]$$ since if you reach $$2n$$, you wasted a bunch of steps because
  $$2n$$ can just be divided by $$2$$ to get $$n$$. Since we never visit the
  same number twice, the time complexity is $$O(2n) = O(n)$$
- Space complexity: $$O(n)$$ -- same reason as above.

```cpp
class Solution {
 public:
  int integerReplacement(int n) {
    // Queue for BFS -- each pair holds a number `x` and the number
    // of steps it is from `n`. we use `long long` to account for the
    // edge case when `n == INT_MAX`. Note that as we pop nodes from
    // and add nodes to this queue, the number of steps gradually
    // increases. Furthermore, note that we are guaranteed to visit all nodes
    // that are `k` steps from `n` before any nodes that are `k + 1` steps
    // from `n`.
    queue<pair<long long, int>> q;

    // Visited set -- holds numbers that have already been encountered.
    // Numbers enter this set when they are first encountered by the
    // algorithm. We do not want to revisit these numbers because we only
    // care about the minimum number of steps to visit them.
    unordered_set<long long> visited;

    // The queue starts with `n` at 0 steps, and `n` is visited to begin with.
    q.push({n, 0});
    visited.insert(n);

    // BFS loop.
    while (!q.empty()) {
      // Retrieve the next `x` and `steps` from the queue.
      long long x;
      int steps;
      tie(x, steps) = q.front();  // See std::tie
      q.pop();

      // We solved the problem -- return the number of steps.
      if (x == 1) return steps;

      if (x % 2 == 0) {
        // If x is even, the only node connected to it will be `x/2`
        if (visited.find(x / 2) == visited.end()) {
          // Make sure to record that `x/2` is visited.
          visited.insert(x / 2);
          // Add `x/2` with one more step than `x`.
          q.push({x / 2, steps + 1});
        }
      } else {
        // Same as above, except we now have `x + 1` and `x - 1`
        if (visited.find(x + 1) == visited.end()) {
          visited.insert(x + 1);
          q.push({x + 1, steps + 1});
        }
        if (visited.find(x - 1) == visited.end()) {
          visited.insert(x - 1);
          q.push({x - 1, steps + 1});
        }
      }
    }

    // If for some reason no solution was found.
    return -1;
  }
};
```

### Alternate Approaches

If you look at the
[discussions](https://leetcode.com/problems/integer-replacement/discuss/) on the
original LeetCode problem, you will see references to dynamic programming (DP)
and recursion. These certainly work too.
