

/**
题目: https://pintia.cn/problem-sets/1740631898909958144/exam/problems/1740638588682240002?type=7&page=0

Drizzle 前往山地统计大山的数目，现在收到这片区域的地图，地图中用0（平地）和1（山峰）绘制而成，请你帮忙计算其中的大山数目。
山总是被平地四面包围着，每一座山只能在水平或垂直方向上连接相邻的山峰而形成。一座山峰四面被平地包围，这个山峰也算一个大山。
另外，你可以假设地图的四面都被平地包围着。
输入格式:
第一行输入M,N分别表示地图的行列，接下来M行每行输入N个数字表示地图。

范围:

对于 5% 的数据：M，N ≤ 10
对于 100% 的数据：M，N ≤ 2000

输出格式:
输出一个整数表示大山的数目。

输入样例:
在这里给出一组输入。例如：

4 5
1 1 0 0 0
1 1 0 0 0
0 0 1 0 0
0 0 0 1 1

输出样例:
在这里给出相应的输出。例如：

3
 */


/**
 * 统计大山个数
 * @param {*} matrix 
 * @param {*} m m 行
 * @param {*} n n 列
 */
function countMountain(matrix, m, n) {
  let total = 0;
  const searchedMap = {}
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] === 0 || searchedMap[`${i}-${j}`]) {
        continue
      }
      search(i, j)
      total++;
    }
  }
  return total;

  /**
   * @param {*} i 搜索起始行数
   * @param {*} j 搜索起始列数
   */
  function search(i, j) {
    if (i >= m || j >= n || i < 0 || j < 0) {
      return
    }
    if (matrix[i][j] === 0 || searchedMap[`${i}-${j}`]) {
      return;
    }
    searchedMap[`${i}-${j}`] = 1;
    // 向右深度搜索
    search(i, j + 1);
    // 向左深度搜索
    search(i, j - 1);
    // 向上深度搜索
    search(i - 1, j);
    // 向下深度搜索
    search(i + 1, j)
  }
}

function test(input) {
  const lines = input.split('\n');
  const matrix = lines.map(l => {
    const arr = l.split(' ').map(it => +it);
    return arr;
  })
  const firstLine = matrix.shift();
  const count = countMountain(matrix, firstLine[0], firstLine[1]);
  console.log(count);
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

// console.log(countMountain([
//   [1,1,0,0,0],
//   [1,1,0,0,0],
//   [0,0,1,0,0],
//   [0,0,0,1,1],
// ], 4, 5))

// // 首次提交忽略的用例
// console.log(countMountain([
//   [1,1,0,0,0],
//   [1,1,0,0,0],
//   [0,0,1,0,1],
//   [0,1,1,1,1],
// ], 4, 5))


// console.log(countMountain([
//   [1],
// ], 1, 1))

// console.log(countMountain([
//   [],
// ], 1, 0))

// console.log(countMountain([
// ], 0, 0))