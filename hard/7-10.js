/**
https://pintia.cn/problem-sets/1740640628187717632/exam/problems/1746729666142191617?type=7&page=0

7-10 统计美丽子字符串 II

给你一个字符串 s 和一个正整数 k 。
用 vowels 和 consonants 分别表示字符串中元音字母和辅音字母的数量。
如果某个字符串满足以下条件，则称其为 美丽字符串 ：

vowels == consonants，即元音字母和辅音字母的数量相等。

(vowels * consonants) % k == 0，即元音字母和辅音字母的数量的乘积能被 k 整除。

返回字符串 s 中 非空美丽子字符串 的数量。
子字符串是字符串中的一个连续字符序列。
英语中的 元音字母 为 'a'、'e'、'i'、'o' 和 'u' 。
英语中的 辅音字母 为除了元音字母之外的所有字母。

输入样例1:
在这里给出一组输入。例如：

s = "baeyh", k = 2
输出样例1:
在这里给出相应的输出。例如：

2
解释：
字符串 s 中有 2 个美丽子字符串。

子字符串 "aeyh"，vowels = 2（["a","e"]），consonants = 2（["y","h"]）。
可以看出字符串 "aeyh" 是美丽字符串，因为 vowels == consonants 且 vowels * consonants % k == 0 。

子字符串 "baey"，vowels = 2（["a","e"]），consonants = 2（["b","y"]）。
可以看出字符串 "baey" 是美丽字符串，因为 vowels == consonants 且 vowels * consonants % k == 0 。
可以证明字符串 s 中只有 2 个美丽子字符串。

输入样例2:
在这里给出一组输入。例如：

s = "abba", k = 1
输出样例2:
在这里给出相应的输出。例如：

3
解释：
字符串 s 中有 3 个美丽子字符串。

子字符串 "ab"，vowels = 1（["a"]），consonants = 1（["b"]）。

子字符串 "ba"，vowels = 1（["a"]），consonants = 1（["b"]）。

子字符串 "abba"，vowels = 2（["a","a"]），consonants = 2（["b","b"]）。
可以证明字符串 s 中只有 3 个美丽子字符串。

输入样例3:
在这里给出一组输入。例如：

s = "bcdf", k = 1
输出样例3:
在这里给出相应的输出。例如：

0
解释：字符串 s 中没有元音字母，则没有美丽子字符串。
提示：

1 <= s.length <= 5 * 10^4

1 <= k <= 1000

s 仅由小写英文字母组成。

字符串格式可按照s = "XXX", k = n 格式解析
 */


function beautifulSubstrings(s, k) {

  /**
  思路:
    约束1: 元音字符长度 = 辅音字符长度
        令 str[i]中 元音为1，辅音为-1
        sum[0] = 0;
        sum[i] = str[0] + str[1] + ...str[i-1];
        sum[j] = str[0] + str[1] + ...str[i-1] + ...str[j-1];
        sub[i, j) =  sum[j] - sum[i] = str[i] + ... str[j-1] =  0. 即[i, j) 子串的元辅音个数相同。

    约束2: 元音字符长度 * 辅音字符长度  % k = 0
        设字符串长度为 L, (L/2)^2 % k = 0  -> L^2 % 4k = 0 
        设 L = dx, d是L的一个因子。d^2*x^2 % 4k, 若找到一个因子d,使得 d^2 是 4k 的倍数，则 L^2 也是 4k 的倍数
        即找到 d 后，L 只要满足时 d 的倍数即可。
        j - i % d = 0;
        j % d = i % d
      
    约束1+约束2:  遍历字符串，记录 (i%d , sum[i]) 的值，当有相同状态的 tuple 时，即为复合条件的子串。  
  */
  let d = 1;
  while (true) {
    if ((d * d) % (4 * k) === 0) { break; }
    d++;
  }

  const sum = [];
  sum[0] = 0;
  for (let i = 0; i < s.length; i++) {
    const x = 'aeiou'.includes(s[i]) ? 1 : -1
    sum[i + 1] = sum[i] + x
  }

  const hashMap = {};
  let ans = 0;
  for (let i = 0; i < sum.length; i++) {
    const tuple = `${i % d}-${sum[i]}`;
    if (!(tuple in hashMap)) { hashMap[tuple] = 0 }
    ans += hashMap[tuple];
    hashMap[tuple] += 1
  }
  return ans;
};


// 暴力解法也能通过 PTA
function beautifulSubstringsV0(s, k) {
  let ans = 0;
  for (let i = 0; i < s.length; i++) {
    let acc = 0;
    for (let j = i; j < s.length; j++) {
      const x = 'aeiou'.includes(s[j]) ? 1 : -1
      acc += x;
      const l = j - i + 1;
      if (acc === 0 && ((l * l) % (4 * k) === 0)) {
        ans++;
      }
    }
  }
  return ans;
}

function test(inputs) {
  const match = /s = "(.+)", k = (\d+)/.exec(inputs);
  const s = match[1];
  const k = +match[2];

  console.log(beautifulSubstringsV0(s, k))
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

// test('s = "baeyh", k = 2')
// console.log(beautifulSubstrings("baeyh", 2))