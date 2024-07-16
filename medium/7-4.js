/**
https://pintia.cn/problem-sets/1740639867689107456/exam/problems/1740640113877843970?type=7&page=0

7-4 钥匙和房间

有 n 个房间，房间按从 0 到 n - 1 编号。最初，除 0 号房间外的其余所有房间都被锁住。
你的目标是进入所有的房间。然而，你不能在没有获得钥匙的时候进入锁住的房间。

当你进入一个房间，你可能会在里面找到一套不同的钥匙，每把钥匙上都有对应的房间号，即表示钥匙可以打开的房间。你可以拿上所有钥匙去解锁其他房间。

给你一个数组 rooms 其中 rooms[i] 是你进入 i 号房间可以获得的钥匙集合。如果能进入 所有 房间返回 true，否则返回 false。



示例 1：

输入：rooms = [[1];[2];[3];[]]输出：true

解释：我们从 0 号房间开始，拿到钥匙 1。之后我们去 1 号房间，拿到钥匙 2。然后我们去 2 号房间，拿到钥匙 3。最后我们去了 3 号房间。由于我们能够进入每个房间，我们返回 true。

示例 2：

输入：rooms = [[1,3];[3,0,1];[2];[0]]输出：false

解释：我们不能进入 2 号房间。



提示：

n == rooms.length

2 <= n <= 1000

0 <= rooms[i].length <= 1000

1 <= sum(rooms[i].length) <= 3000

0 <= rooms[i][j] < n

所有 rooms[i]  互不相同

输入格式:
字符串表示的二维数组。例如：[[1,3];[3,0,1];[2];[0]]

输出格式:
小些的true/false。例如：false。


输入样例:
在这里给出一组输入。例如：

[[1,3];[3,0,1];[2];[0]]
输出样例:
在这里给出相应的输出。例如：

false
 */


function canOpenAllRoom(roomKeysArray) {
  let roomKeys = [0];
  let enterRoomMap = {};

  while(roomKeys.length) {
    // 取出一把钥匙
    const key = roomKeys.shift();
    // 进入房间，并标记
    enterRoomMap[key] = true;
    // 取出房间里的钥匙
    const newKeys = roomKeysArray[key];
    // 新 key 加入队列
    roomKeys.push(...newKeys.filter(key => !(key in enterRoomMap)));
  }
  if (Object.keys(enterRoomMap).length === roomKeysArray.length) {
    return true;
  }
  return false;
}

function test(inputs) {
  // [[1,3];[3,0,1];[2];[0]]
  const roomKeys = JSON.parse(inputs.replace(/;/g, ','));
  console.log(canOpenAllRoom(roomKeys));
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

// test(`[[1];[2];[3];[]]`)
// test(`[[1,3];[3,0,1];[2];[0]]`)
// console.log(canOpenAllRoom([ [1], [2], [3], [] ]))
// console.log(canOpenAllRoom([ [1,3], [3,0,1], [2], [0] ]))