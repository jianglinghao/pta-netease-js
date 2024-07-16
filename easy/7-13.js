/**
题目: https://pintia.cn/problem-sets/1740631898909958144/exam/problems/1740638633187987457?type=7&page=0

7-13 求最后一块石头的重量

有一堆石头，每块石头的重量都是正整数。

每一回合，从中选出两块 最重的 石头，然后将它们一起粉碎。假设石头的重量分别为 x 和 y，且 x <= y。那么粉碎的可能结果如下：

如果 x == y，那么两块石头都会被完全粉碎；

如果 x != y，那么重量为 x 的石头将会完全粉碎，而重量为 y 的石头新重量为 y-x。

最后，最多只会剩下一块石头。返回此石头的重量。如果没有石头剩下，就返回 0。

输入格式:
输入一组石头的重量，均为正整数。

输出格式:
输出最后一块石头的重量。如果没有石头剩下，就返回 0。

输入样例:
在这里给出一组输入。例如：

2,7,4,1,8,1
输出样例:
在这里给出相应的输出。例如：

1
 */


function lastWeight(stoneArray) {
  // 从大到小排序
  let sortArr = stoneArray.sort((it1, it2) => it2 - it1);

  while(sortArr.length >=2) {
    let [first, second] = sortArr.splice(0, 2);
    if (first !== second){
      let newStone = first - second;
      let insert = sortArr.findIndex(it => newStone >= it);
      sortArr.splice(insert === -1 ? sortArr.length : insert, 0, newStone);
    }
  }
  if (sortArr.length) {
    return sortArr[0];
  }
  return 0;
}

function test(inputs) {
  const stones = inputs.split(',').map(it => +it);
  console.log(lastWeight(stones));
}

(function start() {
  var buf = '';
  process.stdin.on('readable', function() {
      var chunk = process.stdin.read();
      if (chunk) buf += chunk.toString();
  })
  
  process.stdin.on('end', function() {
      test(buf)
  })
})()

// console.log(lastWeight([2,7,4,1,8,1]))