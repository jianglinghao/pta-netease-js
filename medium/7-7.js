/**
https://pintia.cn/problem-sets/1740639867689107456/exam/problems/1740640149902721025?type=7&page=0
7-7 连通网络的操作次数

用以太网线缆将 n 台计算机连接成一个网络，计算机的编号从 0 到 n-1。
线缆用 connections 表示，其中 connections[i] = [a, b] 连接了计算机 a 和 b。

网络中的任何一台计算机都可以通过网络直接或者间接访问同一个网络中其他任意一台计算机。

给你这个计算机网络的初始布线 connections，
你可以拔开任意两台直连计算机之间的线缆，并用它连接一对未直连的计算机。
请你计算并返回使所有计算机都连通所需的最少操作次数。如果不可能，则返回 -1 。

输入格式:
第 1 行输入 n 和 m，分别表示计算机的个数和线缆个数，用空格分隔。
接下来的 m 行输入，表示有线缆连接的计算机 a 和 b，用空格分隔。

输出格式:
对每一组输入，在一行中输出使所有计算机都连通所需的最少操作次数，如果不可能，则返回-1。

输入样例1:
如图所示：

![image](./assets/medium-7-8.png)

这里相应地给出一组输入：

输入样例1:
4 3
0 1
0 2
1 2
输出样例1:
在这里给出相应的输出。例如：

1
解释：拔下计算机 1 和 2 之间的线缆，并将它插到计算机 1 和 3 上。

输入样例2:
6 4
0 1
0 2
0 3
1 2
输出样例2:
在这里给出相应的输出。例如：

-1
解释：线缆数量不足。


提示

1 <= n <= 10^5

1 <= connections.length <= min(n*(n-1)/2, 10^5)

connections[i].length == 2

0 <= connections[i][0], connections[i][1] < n

connections[i][0] != connections[i][1]

没有重复的连接。

两台计算机不会通过多条线缆连接。

 */

// 求连通性调整步数, 这版只能拿 21 分，无法通过像  2->1, 2->0 这种 case 的判断
function getModifyStep(n, m, connections) {
  // 如果连接线数量少于 n-1 则不可能完成连接。
  if (m < n - 1) {
    return -1
  }

  let rootArray = []
  // 先令每个节点的根节点是自己
  for (let i = 0; i < n; i++) {
    rootArray[i] = i;
  }

  // 连接
  for (let i = 0; i < m; i++) {
    const con = connections[i];
    const lower = con[0] < con[1] ? con[0] : con[1];
    const higher = con[0] < con[1] ? con[1] : con[0];
    // 高位节点的 root 设为 低位节点的 root
    rootArray[higher] = getRoot(lower);
  }

  // 重新从高位到低位重新进行寻根，将 4->3  3->2  2->1  1->0  这种连接情况的根全部归为0
  for (let i = n - 1; i >= 0; i--) {
    rootArray[i] = getRoot(i);
  }


  const rootCount = new Set(Object.values(rootArray));
  return rootCount.size - 1;

  function getRoot(index) {
    if (rootArray[index] === index) {
      return index;
    }
    let rootIndex = getRoot(rootArray[index]);
    rootArray[index] = rootIndex;
    return rootIndex;
  }
}


// 第二版通过标准的 UnionFind 算法实现
function getModifyStepV2(n, m, connections) {
  // 如果连接线数量少于 n-1 则不可能完成连接。
  if (m < n - 1) {
    return -1
  }
  debugger
  let uf = new UnionFind(n);
  for (let i = 0; i < connections.length; i++) {
    const conn = connections[i];
    uf.union(conn[0], conn[1]);
  }
  return uf.count - 1;
}

function UnionFind(n) {
  this.count = n;
  this.parent = [];
  for (let i = 0; i < n; i++) {
    this.parent[i] = i;
  }
}

UnionFind.prototype.union = function (a, b) {
  let rootA = this.find(a);
  let rootB = this.find(b);

  if (rootA !== rootB) {
    // 注意是 rootA 不是 a
    this.parent[rootA] = rootB
    this.count--;
    // 这一步可以马上调整树形
    this.find(a)
  }
}

UnionFind.prototype.find = function (a) {
  if (this.parent[a] !== a) {
    this.parent[a] = this.find(this.parent[a]);
  }
  return this.parent[a]
}

console.log(getModifyStepV2(4, 3,
  [
    [0, 1],
    [0, 2],
    [1, 2]
  ]))

function test(inputs) {
  /**
    4 3
    0 1
    0 2
    1 2
   */
  const lines = inputs.split('\n');
  const [first, ...connectionString] = lines;
  const [n, m] = first.trim().split(' ').map(it => +it);
  // connectionString 的 PTA 测试用例里，应该是有空行，需要进行过滤。
  const connections = connectionString.filter(it => !!it).map(row => row.trim().split(' ').map(it => +it));
  console.log(getModifyStepV2(n, connections.length, connections));
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

// console.log(getModifyStepV2(4, 3,
//   [
//     [0, 1],
//     [0, 2],
//     [1, 2]
//   ]))
// 01234  67 8
// console.log(getModifyStepV2(8, 8,
//   [
//     [0, 1],
//     [1, 2],
//     [2, 3],
//     [3, 4],
//     [6, 7],
//     [0, 2],
//     [0, 3],
//     [1, 3]
//   ]))

// console.log(getModifyStepV2(3, 2,
//   [
//     [2, 0],
//     [2, 1]
//   ]))
// console.log(getModifyStepV2(6, 5,
//   [[0,1],[0,2],[0,3],[1,2],[1,3]]
// ))

// console.log(getModifyStepV2(5,4,
//   [[0,1],[0,2],[3,4],[2,3]]))
