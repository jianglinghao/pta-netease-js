/**
https://pintia.cn/problem-sets/1740640628187717632/exam/problems/1740640696596824071?type=7&page=0

7-7 不相交的线

在两条独立的水平线上按给定的顺序写下 nums1 和 nums2 中的整数。

现在，可以绘制一些连接两个数字 nums1[i] 和 nums2[j] 的直线，这些直线需要同时满足满足：

nums1[i] == nums2[j]

且绘制的直线不与任何其他连线（非水平线）相交。

请注意，连线即使在端点也不能相交：每个数字只能属于一条连线。

以这种方法绘制线条，并返回可以绘制的最大连线数。

1 <= nums1.length, nums2.length <= 500

1 <= nums1[i], nums2[j] <= 2000

输入格式:
每组输入为两行，表示nums1和nums2两个数组。每行有n+1个数字，数字间用空格分开，第一个数字表示数组个数n，后面跟n个数字；如2 2 3，表示数组有2个元素，元素值为2和3

输出格式:
输出最多能绘制不想交线的条数。


输入样例:
在这里给出一组输入。例如：

3 1 4 2
3 1 2 4
6 1 3 7 1 7 5
5 1 9 2 5 1
输出样例:
在这里给出相应的输出。例如：

2
2

 */

// 使用 dp 算法求解
function maxUncrossedLines(nums1, nums2) {
  const m = nums1.length;
  const n = nums2.length;
  const dp = [];

  for (let i = 0; i <= m; i++) {
    dp[i] = [];
    dp[i][0] = 0;
  }
  for (let i = 1; i <= n; i++) {
    dp[0][i] = 0;
  }

  /**
   * 
  dp 表
        1  3  7  1  7  5
     0  0  0  0  0  0  0
  1  0  1  1  1  1  1  1
  9  0  1  1  1  1  1  1
  2  0  1  1  1  1  1  1
  5  0  1  1  1  1  1  2
  1  0  1  1  1  2  2  2
  */

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (nums1[i - 1] === nums2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp[m][n];

  function max(a, b) {
    return a < b ? b : a
  }
}

function test(inputs) {
  const lines = inputs.split('\n');
  for (let i = 0; i < lines.length; i += 2) {
    const line1 = lines[i].split(' ').slice(1);
    const line2 = lines[i + 1].split(' ').slice(1);
    console.log(maxUncrossedLines(line1, line2))
  }
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


// 这一版解法会超时，此回溯算法不好找减枝条件。
function getLinkLines(nums1, nums2) {
  let max = 0;
  dfs(0, 0, 0);
  return max;

  function dfs(start1, start2, sum) {
    if (start1 >= nums1.length || start2 >= nums2.length) {
      if (sum > max) {
        max = sum;
      }
      return;
    }

    let num1 = nums1[start1];
    let num2 = nums2[start2];
    if (num1 === num2) {
      dfs(start1 + 1, start2 + 1, sum + 1);
    } else {
      dfs(start1, start2 + 1, sum);
      dfs(start1 + 1, start2, sum);
    }
  }
}

// console.log(getLinkLines([3, 2, 2, 4, 5], [2, 2, 3, 4, 5]))

/**

  3  2  2  4 5
  2  2  3  4 5

 */

// console.log(getLinkLines([1,3, 7, 1, 7, 5], [1,9,2,5,1]))

// test(
// `3 1 4 2
// 3 1 2 4
// 6 1 3 7 1 7 5
// 5 1 9 2 5 1`)