/**
https://pintia.cn/problem-sets/1740640628187717632/exam/problems/1746729666142191616?type=7&page=0
7-9 最长超赞子字符串

给你一个字符串 s 。请返回 s 中最长的 超赞子字符串 的长度。
「超赞子字符串」需满足满足下述两个条件：
该字符串是 s 的一个非空子字符串
进行任意次数的字符交换后，该字符串可以变成一个回文字符串
1 <= s.length <= 10^5
s 仅由数字组成

输入格式:
输入一行只包含数字的字符串s

输出格式:
输出s中最长的 超赞子字符串 的长度

输入样例:
在这里给出一组输入。例如：

3242415
输出样例:
在这里给出相应的输出。例如：

5
"24241" 是最长的超赞子字符串，交换其中的字符后，可以得到回文 "24142"


 */


// 参考 leetCode 题解
/**
- 使用 位运算(XOR) 后的状态存储字符串中数字字符出现奇偶次数。  1代表奇数  0 代表偶数次。
- 在遍历字符串过程中，使用 HashMap 记录不同状态出现最早位置。
- 在遍历过程中，如果相同状态再次出现，说明两个位置间的字符都是出现偶数次。
- 如果只需改变一个字符，相同状态可以再次出现。说明两个位置间的字符只有一个出现奇数次，其余都是出现偶数次。

 */
function longestAwesome(input) {
  let state = 0;
  let map = { 0: -1 }
  let ans = 0;
  debugger
  for (let i = 0; i < input.length; i++) {
    const char = input[i].charCodeAt(0) - '0'.charCodeAt(0);
    // 数字 0~9 使用第 x 位 记录数字 x 的奇偶
    // 如 input 为 '121' 时  
    // 当 i=0 char = 1;  state = 0 ^ 1<<1  =  0 ^ 010 = 010
    // 当 i=1 char = 2;  state = 010 ^ 1<<2 = 010 ^ 100 = 110
    // 当 i=2 char = 1;  state = 110 ^ 1<<1 = 110 ^ 010 = 100
    // 当 state 为 100 时，代表字符串中 2 出现奇数次，1出现偶数次。
    state ^= (1 << char)

    for (let n = 0; n <= 9; n++) {
      const next = state ^ (1 << n);
      // 更新其中的一个字符，状态就会再次出现，说明两个位置间只有一个字符出现奇数次，其余出现偶数次。符合条件
      if (next in map) { // 注意不能用 if(next[map]) 因为 next[map] 的值可以为 0.
        ans = max(ans, i - map[next]);
      }
    }

    // 当状态再次出现时，说明两个状态中间的字符出现都是偶数个。符合条件
    if (state in map) {
      ans = max(ans, i - map[state]);
    } else {
      map[state] = i;
    }
  }

  return ans;

  function max(a, b) {
    return a >= b ? a : b
  }
}

function test(inputs) {
  console.log(longestAwesome(inputs.replace('\n', '')))
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

// 暴力解法也可通过 PTA
function getNiceSubstringLength(input) {
  // 思路: 
  // 超赞子字符串即 其中做多一个字符为奇数个，其余字符为偶数个

  let max = 0;
  for (let i = 0; i < input.length; i++) {
    let map = {};
    for (let j = i; j < input.length; j++) {
      let char = input[j];
      if (!map[char]) { map[char] = 0 }
      map[char]++
      if (isValid(map) && (j - i + 1) > max) {
        max = j - i + 1
      }
    }
  }
  return max;

  function isValid(map) {
    return Object.values(map).filter(it => it % 2 === 1).length <= 1
  }
}

// test('76263')
// console.log(getNiceSubstringLength('3242415'))
// test('121')
// test('3242415')