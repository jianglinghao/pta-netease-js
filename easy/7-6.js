/**
题目: https://pintia.cn/problem-sets/1740631898909958144/exam/problems/1740638588686434305?type=7&page=0

给定两个字符串 s 和 t ，判断它们是否是同构的。

如果 s 中的字符可以按某种映射关系替换得到 t ，
那么这两个字符串是同构的。

每个出现的字符都应当映射到另一个字符，
同时不改变字符的顺序。不同字符不能映射到同一个字符上，
相同字符只能映射到同一个字符上，字符可以映射到自己本身。

输入格式:
输入两个字符串s和t，且满足以下条件：

1 <= s.length <= 5 * 10^4

t.length == s.length

s 和 t 由任意有效的 ASCII 字符组成

输出格式:
如果是同构字符串则返回1，否则返回 0

输入样例1:
在这里给出一组输入。例如：

egg,add
输出样例1:
在这里给出相应的输出。例如：

1
输入样例2:
在这里给出一组输入。例如：

foo,bar
输出样例2:
在这里给出相应的输出。例如：

0
输入样例3:
在这里给出一组输入。例如：

paper,title
输出样例3:
在这里给出相应的输出。例如：

1

 */

/**
 * a 是否可映射至 b
 * @param {*} a
 * @param {*} b
 */
function mappingString(a, b) {
  // 记录 a 中 已映射的字符
  const map = {}
  // 记录 b 中 已被隐射的字符
  const existChar = {}
  for (let i = 0; i < a.length; i++) {
    const charA = a[i];
    const charB = b[i];
    if (!(charA in map)) {
      // 如果有其他字符已经映射至 charB
      if (existChar[charB]) {
        return 0
      } else {
        map[charA] = charB
        existChar[charB] = 1
      }
    } else if (map[charA] === charB) {
      continue
    } else {
      return 0
    }
  }
  return 1
}

function test(inputs) {
  const [a, b] = inputs.split(',');
  console.log(mappingString(a, b))
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

// console.log(mappingString('egg','add'))
// console.log(mappingString('foo','bar'))
// console.log(mappingString('paper','title'))