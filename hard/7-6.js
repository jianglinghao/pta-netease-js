/**
https://pintia.cn/problem-sets/1740640628187717632/exam/problems/1740640696596824070?type=7&page=0
7-6 计算岛屿最大面积

给你一个大小为 m x n 的二进制矩阵 grid 。

岛屿 是由一些相邻的 1 (代表土地) 构成的组合，这里的「相邻」要求两个 1 必须在 水平或者竖直的四个方向上 相邻。你可以假设 grid 的四个边缘都被 0（代表水）包围着。

岛屿的面积是岛上值为 1 的单元格的数目。

计算并返回 grid 中最大的岛屿面积。如果没有岛屿，则返回面积为 0 。

示例 1：

输入：grid = [

[1, 1, 0, 0, 0];

 [1, 1, 0, 0, 0];

[0, 0, 1, 0, 0];

 [0, 0, 0, 1, 1]] 

输出：4

示例 2：

输入：grid = [[0,0,0,0,0,0,0,0]]

输出：0

输入格式:
字符串表示的二维数组。例如：[[1,1,0,0,0];[1,1,0,0,0];[0,0,1,0,0];[0,0,0,1,1]]

输出格式:
数字。例如：4


输入样例:
在这里给出一组输入。例如：

[[1,1,0,0,0];[1,1,0,0,0];[0,0,1,0,0];[0,0,0,1,1]]
输出样例:
在这里给出相应的输出。例如：

4


 * @param {*} matrix 
 * @returns 
 */

function getMaxGrid(matrix) {
  const m = matrix.length;
  const n = matrix[0].length;
  const exist = {}
  let max = 0;
  let acc = 0;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] === 1 && !exist[`${i}-${j}`]) {
        acc = 0; // !注意此处的acc应该作为全局变量携带，而不是 search 的变量。
        search(i, j)
      }
    }
  }

  function search(i, j) {
    if (exist[`${i}-${j}`]) {
      return;
    }
    exist[`${i}-${j}`] = 1;
    if (!matrix[i][j]) {
      return;
    }
    acc += 1;

    if (acc > max) {
      max = acc;
    }
    // 向右搜索
    if (j < n - 1) {
      search(i, j + 1);
    }
    // 向下搜索
    if (i < m - 1) {
      search(i + 1, j);
    }
    // 向上搜索
    if (i >= 1) {
      search(i - 1, j);
    }
    // 向左搜索
    if (j >= 1) {
      search(i, j - 1);
    }
  }
  return max;
}

function test(inputs) {
  const nodes = JSON.parse(inputs.replace('\n', '').replace(/;/g, ','));
  // console.log(nodes)
  console.log(getMaxGrid(nodes));
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

// test('[[1,1,0,0,0];[1,1,0,0,0];[0,0,1,0,0];[0,0,0,1,1]]')
// test('[[0,0,0,0,0];[0,0,0,0,0];[0,0,0,0,0];[0,0,0,0,0]]')
// test('[[0,0,0,0,0,0,0,0]]')
// test('[[0,1,0,0];[0,1,1,0];[1,0,1,1]]')

// 0 1 0 0 
// 0 1 1 0
// 1 0 1 1


// test('[[0,1,0,0];[0,1,1,0];[1,0,1,1];[0,1,1,0]]')
// 0 1 0 0 
// 0 1 1 0
// 1 0 1 1
// 0 1 1 0