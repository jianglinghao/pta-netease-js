// 题目链接: https://pintia.cn/problem-sets/1740631898909958144/exam/problems/1740638588682240000?type=7&page=0
class MyQueue {
  constructor() {
    this.items = [];
  }

  empty() {
    return this.items.length === 0;
  }

  push(item) {
    this.items.push(item);
    return 'null'
  }
  peek(item) {
    return this.items[0];
  }
  pop() {
    if (!this.empty()) {
      return this.items.shift();
    } else {
      return "Queue is empty";
    }
  }

  size() {
    return this.items.length;
  }
}
function test(inputs) {
  const lines = inputs.split('\n');
  const ops = lines[0].split(',');
  const params = lines[1].split(',');
  const queue = new MyQueue()
  const outputs = [];
  ops.forEach((op,i) => {
      const fn = queue[op].bind(queue);
      if (op === 'push') {
          outputs.push(fn(params[i]));
      } else {
          outputs.push(fn());
      }
  })
  console.log(outputs.join(','))
}
test(`push,push,peek,pop,empty
1,2,,,`)
// (function start() {
//   var buf = '';
//   process.stdin.on('readable', function() {
//       var chunk = process.stdin.read();
//       if (chunk) buf += chunk.toString();
//   })

//   process.stdin.on('end', function() {
//       test(buf)
//   })
// })()
