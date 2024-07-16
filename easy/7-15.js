/**
https://pintia.cn/problem-sets/1740631898909958144/exam/problems/1744596436660166657?type=7&page=0

7-15 字符串编辑距离

给定一个源串和目标串，能够对源串进行如下操作：

在给定位置上插入一个字符

替换任意字符

删除任意字符

写一个程序，返回最小操作数，使得对源串进行这些操作后等于目标串

输入格式:
函数的输入是一行包含两个字符串，word1 和 word2，以空格分割

每个字符串的长度大于0同时小于500，word1 和 word2 由小写英文字母组成

输出格式:
输出两个字符的编辑距离，是一个整数

输入样例1:
在这里给出一组输入。例如：

horse ros
输出样例1:
在这里给出相应的输出。例如：

3
输入样例2:
在这里给出一组输入。例如：

intention execution
输出样例2:
在这里给出相应的输出。例如：

5

 */


// 动态规划版本实现这个状态转移方程是通过对编辑距离问题的分析得出的。

// 假设我们要将字符串 word1 转换为字符串 word2。我们可以考虑最后一个字符，有以下几种情况：

// 如果 word1 的最后一个字符与 word2 的最后一个字符相同，那么它们之间不需要任何操作，编辑距离与将 word1 的前 i-1 个字符转换为 word2 的前 j-1 个字符的编辑距离是一样的，即 dp[i][j] = dp[i-1][j-1]。
// 如果 word1 的最后一个字符与 word2 的最后一个字符不同，我们可以进行三种操作：插入、删除或替换。
// 插入操作：我们将 word1 的前 i 个字符转换为 word2 的前 j-1 个字符，然后在 word1 的末尾插入 word2 的最后一个字符，这样就能匹配上 word2 的最后一个字符。因此，此时的编辑距离为 dp[i][j-1] + 1。
// 删除操作：我们将 word1 的前 i-1 个字符转换为 word2 的前 j 个字符，然后删除 word1 的最后一个字符，这样就能匹配上 word2 的最后一个字符。因此，此时的编辑距离为 dp[i-1][j] + 1。
// 替换操作：我们将 word1 的前 i-1 个字符转换为 word2 的前 j-1 个字符，然后将 word1 的最后一个字符替换为 word2 的最后一个字符，这样就能匹配上 word2 的最后一个字符。因此，此时的编辑距离为 dp[i-1][j-1] + 1。
// 综上所述，我们得到了状态转移方程：
// [dp[i][j] = \begin{cases} dp[i-1][j-1] & ,
// \text{ if } word1[i-1] == word2[j-1] \ 1 +
// \min(dp[i-1][j-1], dp[i-1][j], dp[i][j-1]) & ,
// \text{ otherwise} \end{cases} ]
function minDistanceDp(stringA, stringB) {
  let lenA = stringA.length;
  let lenB = stringB.length;
  let dp = []
debugger
  for (let i = 0; i <= lenA; i++) {
    dp[i] = [];
    dp[i][0] = i;
  }

  for (let j = 0; j <= lenB; j++) {
    dp[0][j] = j;
  }

  for (let i = 1; i <= lenA; i++) {
    for (let j = 1; j <= lenB; j++) {
      if (stringA[i - 1] === stringB[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1]
      } else {
        dp[i][j] = min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]) + 1
      }
    }
  }
  return dp[lenA][lenB];

  function min(...ele) {
    let min = ele[0];
    ele.forEach(el => {
      if (el < min) min = el
    })
    return min;
  }
}
minDistanceDp('intention','execution')
function test(inputs) {
  const [first, second] = inputs.split(' ');
  console.log(minDistanceDp(first.trim(), second.trim()))
}

(function start() {
  var buf = '';
  process.stdin.on('readable', function () {
    var chunk = process.stdin.read();
    if (chunk) buf += chunk.toString();
  })

  process.stdin.on('end', function () {
    test(buf)
  })
})()

// 仍然会有一个会超时
// 参考极客时间实现  https://time.geekbang.org/column/article/75794
function minDistance(stringA, stringB) {
  let lenA = stringA.length;
  let lenB = stringB.length;
  let minDist = Number.MAX_VALUE;

  getMinDistance(0, 0, 0)

  return minDist;

  function getMinDistance(i, j, edit) {
    if (i === lenA || j === lenB) {
      if (i < lenA) edit += (lenA - i)
      if (j < lenB) edit += (lenB - j)
      if (edit < minDist) minDist = edit
      return
    }

    // 字符相等
    if (stringA[i] === stringB[j]) {
      getMinDistance(i + 1, j + 1, edit)
    } else {
      // 将 A 字符串中 i 位置的字符替换为 B字符串中 j 位置的字符
      getMinDistance(i + 1, j + 1, edit + 1)
      // 将 A 字符串中 i 位置的字符删除
      getMinDistance(i + 1, j, edit + 1)
      // 将 A 字符串中 i 位置前插入一个与 B字符串中 j 位置的字符
      getMinDistance(i, j + 1, edit + 1)
    }
  }
}

// 递归回溯法-会有一个用例点超时
function distance(stringA, stringB) {
  let lenA = stringA.length;
  let lenB = stringB.length;
  let mem = {};

  let minDistance = getMinDistance(0, 0, 0)

  return minDistance;

  function getMinDistance(i, j, min) {
    const cacheKey = `${i}-${j}`;
    if (i === lenA || j === lenB) {
      if (i === lenA) {
        return min + (lenB - j)
      }

      if (j === lenB) {
        return min + (lenA - i)
      }
    }

    // 首次提交时，遗漏了 min >= mem[cacheKey] 的判断
    if (mem[cacheKey] && min >= mem[cacheKey]) {
      return mem[cacheKey]
    }

    // 字符相等
    if (stringA[i] === stringB[j]) {
      minV = getMinDistance(i + 1, j + 1, min)
      mem[cacheKey] = minV;
      return minV
    }

    // 将 A 字符串中 i 位置的字符替换为 B字符串中 j 位置的字符
    let replaceOp = getMinDistance(i + 1, j + 1, min + 1)
    // 将 A 字符串中 i 位置的字符删除
    let deleteOp = getMinDistance(i + 1, j, min + 1)
    // 将 A 字符串中 i 位置前插入一个与 B字符串中 j 位置的字符
    let addOp = getMinDistance(i, j + 1, min + 1)
    let minV = getMin(replaceOp, deleteOp, addOp);

    mem[cacheKey] = minV;
    return minV
  }

  function getMin(a, b, c) {
    let min = a;
    if (b < min) {
      min = b;
    }
    if (c < min) {
      min = c;
    }
    return min;
  }

}


// console.log(minDistanceDp('horse', 'ros'))
// console.log(distance('intention', 'execution'))
// console.log(distance('mitcmu', 'mtacnu'))
// console.log(distance('park', 'spake'))
// console.log(minDistance('park', 'spake'))
// park -> [s]park -> spa[k]k -> spak[e]