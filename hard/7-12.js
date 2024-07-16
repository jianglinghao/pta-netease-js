/**
https://pintia.cn/problem-sets/1740640628187717632/exam/problems/1746729666142191619?type=7&page=0
7-12 超级回文数

如果一个正整数自身是回文数，而且它也是一个回文数的平方，那么我们称这个数为超级回文数。

现在，给定两个正整数 L 和 R ，请按照从小到大的顺序打印包含在范围 [L, R] 中的所有超级回文数。

注：R包含的数字不超过20位

回文数定义：将该数各个位置的数字反转排列，得到的数和原数一样，例如676，2332，10201。

输入格式:
L,R。例如4,1000

输出格式:
[L, R]范围内的超级回文数，例如[4, 9, 121, 484]

输入样例:
在这里给出一组输入。例如：

4,1000
输出样例:
以数组的形式打印符合条件的超级回文数，例如：

[4, 9, 121, 484]

 */

// 穷举 根号L ~ 根号R 之间的数字
// 如果这个数字是 回文数，且这个数字的平方也是回文数，则输出。


// 解法一: 暴力解法可拿 48/60 分，一个用例超时
function getSuperNumber(l, r) {
  // const superNumbers = [4, 9, 121, 484, 10201, 12321, 14641, 40804, 44944, 1002001, 1234321, 4008004, 100020001, 102030201, 104060401, 121242121, 123454321, 125686521, 400080004, 404090404, 10000200001, 10221412201, 12102420121, 12345654321, 40000800004, 1000002000001, 1002003002001, 1004006004001, 1020304030201, 1022325232201, 1024348434201, 1210024200121, 1212225222121, 1214428244121, 1232346432321, 1234567654321, 4000008000004, 4004009004004, 100000020000001, 100220141022001, 102012040210201, 102234363432201, 121000242000121, 121242363242121, 123212464212321, 123456787654321, 400000080000004];
  let res = [];
  for(let i = 0; i <= r; i++) {
    if (i * i < l) { continue };
    if (i * i > r) { break; }

    if (isValid(i) && isValid(i * i)) {
      console.log(i)
      res.push(i*i);
    }
  }

  function isValid(num) {
    let numString = num + '';
    let len = numString.length;
    let i = 0;
    while(i * 2 < len) {
      if (numString[i] !== numString[len -1 - i]) {
        return false;
      }
      i++;
    }
    return true;
  }
  return res;
}


/**
解法二:
通过暴力解法输出有效的回文因子，可发现每个回文因子的每位都不会大于2。
故可以通过排列组合字符串数字的方式，排列组合出有效的回文因子。再判断回文因子的平方是否也是回文数字。

超级回文数字的回文因子:
1
2
3
11
22
101
111
121
202
212
1001
1111
2002
10001
10101
10201
11011
11111
11211
20002
20102
100001
101101
110011
111111
200002
1000001
1001001
1002001
1010101
1011101
1012101
1100011
1101011
1102011
1110111
1111111
2000002
2001002
10000001
10011001
10100101
10111101
11000011
11011011
11100111
11111111
20000002
 */

// 可拿满分的解法
function getSuperNumberV2(l, r) {
  const potentialNum = [1, 2, 3];
  // i 从 2位到20位
  for(let i = 2; i <= 20; i++) {
    dfs(0, i, ['']);
  }
  potentialNum.sort((a, b) => {
    if (a === b ) { return 0 }
    return a > b ? 1 : -1
  });

  const ans = []
  for(let i = 0; i  < potentialNum.length; i++) {
    let num = potentialNum[i];
    if (isValid(num * num)) {
      ans.push(num * num);
    }
  }
  return ans.filter(it => it>=l && it <=r);

  function dfs(start, len, queue) {
    if (start === len) {
      // 不用 BigInt 会存在大数精度缺失!!
      potentialNum.push(...queue.map(it => BigInt(it)));
      return;
    }
    let res = [];
    while(queue.length) {
      let str = queue.pop();
      if (start === 0) {
        res.push(str + '1');
        res.push(str + '2');
      } else if (start < len / 2) { // len = 2  len = 3  len = 4 len = 5
        res.push(str + '0');
        res.push(str + '1');
        res.push(str + '2');
      } else {
        res.push(str + str[len - 1 - start]); // 回文
      }
    }
    dfs(start+1, len, res);
  }

  function isValid(num) {
    let numString = num + '';
    let len = numString.length;
    let i = 0;
    while(i * 2 < len) {
      if (numString[i] !== numString[len -1 - i]) {
        return false;
      }
      i++;
    }
    return true;
  }

}


function test(inputs) {
  const [l, r] = inputs.split(',').map(it => BigInt(it));
  console.log(`[${getSuperNumberV2(l, r).join(', ')}]`);
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

// getSuperNumber(1, 400000080000004);

// test('1,9999999999999999999');