/**
 * https://pintia.cn/problem-sets/1740640628187717632/exam/problems/1746729666142191618?type=7&page=0
 * 
 * 7-11 判断二分图
存在一个 无向图 ，图中有 n 个节点。其中每个节点都有一个介于 0 到 n - 1 之间的唯一编号。
二分图 定义：如果能将一个图的节点集合分割成两个独立的子集 A 和 B ，并使图中的每一条边的两个节点一个来自 A 集合，一个来自 B 集合，就将这个图称为 二分图 。

给你一个二维数组 graph ，其中 graph[u] 是一个节点数组，由节点 u 的邻接节点组成。形式上，对于 

graph[u] 中的每个 v ，都存在一条位于节点 u 和节点 v 之间的无向边。

该无向图同时具有以下属性：

不存在自环（graph[u] 不包含u）

不存在平行边（graph[u] 不包含重复值）

如果 v  在graph[u] 内，那么 u也应该在  graph[v] 里

这个图可能不是连通图，也就是说两个节点 u 和 v 之间可能不存在一条连通彼此的路径。 

如果图是二分图，返回 true ；否则，返回 false 。 
 * 
 */

// 解题思路，尝试将节点放在一个集合，相连的节点放在另一个集合。
// 若所有节点只出现在其中一个集合中，则符合二分图条件。
function isBinaryGraph(graph) {
  let ans = false;
  dfs(0, {}, {});
  return ans;

  function dfs(index, mapA, mapB) {
    if (ans === true) { return }
    if (index in mapA && index in mapB) { return; }

    // 结束条件判断
    if (index === graph.length) {
      for (let i = 0; i < graph.length; i++) {
        // 如果一个节点 即在 A 又在 B 则不符合
        if (i in mapA && i in mapB) { return; }
        if (i === graph.length - 1) { ans = true; }
      }
      return;
    }

    const nodes = graph[index];
    if (!nodes.length) {
      dfs(index + 1, mapA, mapB);
      return;
    }

    if (!(mapA[index]) && !(mapB[index])) {
      // 可尝试放在A
      dfs(index + 1, ...putInA())
      // 可尝试放在B 
      dfs(index + 1, ...putInB())
      return;
    }

    if (index in mapA) {
      return dfs(index + 1, ...putInA())
    }

    if (index in mapB) {
      return dfs(index + 1, ...putInB())
    }

    function putInA() {
      const cloneA = { ...mapA };
      const cloneB = { ...mapB };
      cloneA[index] = 1;

      for (let j = 0; j < nodes.length; j++) {
        cloneB[nodes[j]] = 1
      }
      return [cloneA, cloneB];
    }

    function putInB() {
      const cloneA = { ...mapA };
      const cloneB = { ...mapB };
      cloneB[index] = 1;

      for (let j = 0; j < nodes.length; j++) {
        cloneA[nodes[j]] = 1
      }
      return [cloneA, cloneB];
    }
  }

}

function test(inputs) {
  const graph = JSON.parse(inputs.replace('\n', '').replace(/;/g, ','));
  console.log(isBinaryGraph(graph))
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

// test('[[1,2,3];[0,2];[0,1,3];[0,2]]');
// test('[[1,3];[0,2];[1,3];[0,2]]')