/**
题目链接: https://pintia.cn/problem-sets/1740631898909958144/exam/problems/1740638588686434307?type=7&page=0
7-8 最长的美好字符子串

当一个字符串 s 包含的每一种字母的大写和小写形式 同时 出现在 s 中，
就称这个字符串 s 是 美好 字符串。比方说，"abABB" 是美好字符串，
因为 'A' 和 'a' 同时出现了，且 'B' 和 'b' 也同时出现了
。然而，"abA" 不是美好字符串因为 'b' 出现了，而 'B' 没有出现。
给你一个字符串 s ，请你返回 s 最长的 美好子字符串 。
如果有多个答案，请你返回 最早 出现的一个。
如果不存在美好子字符串，请你返回一个空字符串。

输入格式：
字符串S。

输出格式：
S的最长美好字符子串s。

输入样例:
在这里给出一组输入。例如：

dDzeE
输出样例:
在这里给出相应的输出。例如：

dD
提示
1 <= s.length <= 100

s 只包含大写和小写英文字母。

 */

// 分治的思想。先找出不成对的字符集，切割成子串。递归判断每个子串
function longestNiceSubstring(s) {
  let res = '';

  getNiceSub(0, s.length);
  return res;

  function getNiceSub(start, end) {
    if (start >= end) {
      return;
    }

    // 先找出不成对的字符集
    const badCharSet = getBadCharSet(start, end);

    if (badCharSet.size === 0) {
      if (end - start > res.length) {
        res = s.substring(start, end);
      }
      return;
    }

    let pos = start;

    // 111#1111#11
    while(pos < end) {
      while(pos < end && badCharSet.has(s[pos].toLowerCase())) {
        pos++;
      }
      start = pos;

      while(pos < end && !badCharSet.has(s[pos].toLowerCase())) {
        pos++;
      }
      getNiceSub(start, pos);
    }
  }

  function getBadCharSet(left, right) {
    const upperCaseMap = {}
    const lowerCaseMap = {}

    for (let i = left; i < right; i++) {
      const char = s[i];
      const isCapital = char.charCodeAt() < 'a'.charCodeAt();
      if (isCapital) {
        upperCaseMap[char.toLowerCase()] = 1;
      } else {
        lowerCaseMap[char] = 1;
      }
    }
    const allChar = Array.from(new Set([...Object.keys(upperCaseMap), ...Object.keys(lowerCaseMap)]));
    return new Set(allChar.filter(it => !upperCaseMap[it] || !lowerCaseMap[it]));
  }
}

function test(inputs) {
  console.log(longestNiceSubstring(inputs))
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


// 被这个用例卡住了
// console.log(longestNiceSubstring('YazaAay'));
// console.log(longestNiceSubstring('"HkhBubUYy"'))


// console.log(longestNiceSubstring('abABB'));
// console.log(longestNiceSubstring('abA'));
// console.log(longestNiceSubstring('dDzeE'));
// console.log(longestNiceSubstring('AaBbeCcDdBb'))

// console.log(longestNiceSubstring('abc'))
// console.log(longestNiceSubstring('ab'))
// console.log(longestNiceSubstring('aAb'))
// console.log(longestNiceSubstring('aBb'))
// console.log(longestNiceSubstring('abABB'))
// console.log(longestNiceSubstring('dDzeE'))
// console.log(longestNiceSubstring('dDzeEcC'))
// console.log(longestNiceSubstring('a'))
// console.log(longestNiceSubstring(''))