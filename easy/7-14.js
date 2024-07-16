/**
 * https://pintia.cn/problem-sets/1740631898909958144/exam/problems/1744596436655972353?type=7&page=0
 * 7-14 最小栈

设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。

实现 MinStack 类:

MinStack() 初始化堆栈对象。

void push(int val) 将元素val推入堆栈。

void pop() 删除堆栈顶部的元素。

int top() 获取堆栈顶部的元素。

int getMin() 获取堆栈中的最小元素。

输入格式:
第一行输入是操作的序列，即MinStack类之中的成员函数；

第二行输入是成员函数所对应的参数，若没有参数则输入为 []

输出格式:
输出为对应序列中每个操作的返回值

输入样例:
在这里给出一组输入。例如：

push,push,push,getMin,pop,top,getMin
-2,0,-3,,,,
输出样例:
在这里给出相应的输出。例如：

null,null,null,-3,null,0,-2
解释:
MinStack minStack = new MinStack();

minStack.push(-2);

minStack.push(0);

minStack.push(-3);

minStack.getMin(); --> 返回 -3.

minStack.pop();

minStack.top(); --> 返回 0.

minStack.getMin(); --> 返回 -2.

提示:
-231 <= val <= 231 - 1

pop、top 和 getMin 操作总是在 非空栈 上调用

push, pop, top, and getMin最多被调用 3 * 104 次
 */

function MinStack() {
  // 从大到小排序
  this.sortedArr = []
  this.stack = []
}

MinStack.prototype.push = function (v) {
  this.stack.push(v);
  let index = this.sortedArr.findIndex(it => it <= v);
  this.sortedArr.splice(index === -1 ? this.sortedArr.length : index, 0, v);
  return 'null'
}

MinStack.prototype.pop = function () {
  const v = this.stack.pop();
  let index = this.sortedArr.findIndex(it => it === v);
  this.sortedArr.splice(index, 1);
  return 'null'
}

MinStack.prototype.top = function () {
  return this.stack[this.stack.length - 1]
}

MinStack.prototype.getMin = function () {
  return this.sortedArr[this.sortedArr.length - 1]
}


function getOpResult(opArray, numArray) {
  let minStack = new MinStack();
  let res = [];
  for(let i = 0; i < opArray.length; i++) {
    let op  =opArray[i];
    if (op === 'push') {
      res.push(minStack.push(numArray[i]));
    } else {
      res.push(minStack[op]());
    }
  }
  return res.join(',');
}

function test(inputs) {
  const [first, second] = inputs.split('\n');
  let op = first.split(',');
  let params = second.split(',').map(it => {
    if (it !== '') {
      return +it
    }
    return null
  });
  console.log(getOpResult(op, params))
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












// 感觉leetcode 这个比较好 push pop  不是每次都遍历的 只有最小才 操作minStack


/**
 * initialize your data structure here.
 */
var MinStack = function() {
  this.stack = [];
  this.minStack = [];
};

/**
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function(val) {
  this.stack.push(val);
  if (this.minStack.length === 0 || val <= this.minStack[this.minStack.length - 1]) {
    this.minStack.push(val);
  }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
  if (this.stack.pop() === this.minStack[this.minStack.length - 1]) {
    this.minStack.pop();
  }
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
  return this.stack[this.stack.length - 1];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
  return this.minStack[this.minStack.length - 1];
};

// 调用示例
var obj = new MinStack();
obj.push(-2);
obj.push(0);
obj.push(-3);
console.log(obj.getMin()); // 返回 -3
obj.pop();
console.log(obj.top()); // 返回 0
console.log(obj.getMin()); // 返回 -2