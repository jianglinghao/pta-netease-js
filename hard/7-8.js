/**
https://pintia.cn/problem-sets/1740640628187717632/exam/problems/1744595385517248512?type=7&page=0

7-8 解码异或后的排列

给你一个整数数组 perm ，它是前 n 个正整数（1,2,3,4,5,…,n-1,n 共n个正整数）的排列，且 n 是个奇数 。

它被加密成另一个长度为 n-1 的整数数组 encoded ，满足 encoded[i] = perm[i] XOR perm[i+1]。比方说，如果 perm=[1,3,2] ，那么 encoded=[2,1]。

给你 encoded 数组，请你返回原始数组 perm 。题目保证答案存在且唯一。

提示：

n 是奇数。

3 <= n < 10^5

encoded.length == n - 1

输入格式:
整数数组encoded，以",”分隔字符串形式作为输入

输出格式:
解码后的原始整数数组perm，以",”分隔字符串形式作为输出


输入样例:
加密后的整数数组encoded：

6,5,4,6
输出样例:
原始数组perm：

2,4,1,5,3

 */

function decodeV2(encoded) {
  /**
    解题思路: 
      一: 先求解 perm[n-1];
      
      根据题目
      encoded[0] = perm[0] XOR perm[1]
      encoded[1] = perm[1] XOR perm[2]
      encoded[2] = perm[2] XOR perm[3]
      ...
      encoded[n-3] = perm[n-3] XOR perm[n-2]
      encoded[n-2] = perm[n-2] XOR perm[n-1]
      
      对 encoded 进行隔位异或
      a = encoded[0] XOR encode[2] XOR ...encoded[n-3] = perm[0] XOR perm[1] XOR perm[2] OXR perm[3]...OXR perm[n-2]

      对 1~n 进行异或
      b = 1 XOR 2 XOR 3 ....XOR n  =  perm[0] XOR perm[1]...XOR perm[n-2]  XOR perm[n-1]
      a XOR perm[n-1] = b
      perm[n-1] = a XOR b 

      二: 依次求解 perm[n-2]... perm[0]
      encoded[n-2] = perm[n-1] XOR perm[n-2]   ->  perm[n-2] = encoded[n-2] XOR perm[n-1]

   */
  let n = encoded.length + 1;
  let a = 0;
  for (let i = 0; i < encoded.length - 1; i += 2) { a ^= encoded[i]; }

  let b = 0;
  for (let i = 1; i <= n; i++) { b ^= i }

  let perm = new Array(n);
  perm[n - 1] = a ^ b;

  for (let i = n - 2; i >= 0; i--) {
    perm[i] = encoded[i] ^ perm[i + 1];
  }
  return perm;
}

function test(inputs) {
  const encoded = inputs.split(',').map(it => +it);
  console.log(decodeV2(encoded).join(','));
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

// 暴力解法，只能通过一个用例。时间 和 空间复杂度都超了
function decode(encoded) {
  // 将 encoded 每一个数字转为 2进制
  // 推导出第一位可能的 perm[0] perm[1] 组合 s1
  // 推导出第二位可能的 perm[1] perm[2] 组合 s2，根据 perm[1] 相同，过滤出 s2'
  // 推导出第三位可能的 perm[2] perm[3] 组合 s3，根据 perm[2] 想同，过滤出 s3'
  // ... 推导出 sn'
  // 编码后的每一位可能的源码组合
  /**
   * 例如:
   * encode: 6 5 4 6
   * tupleArray: [
      [ [4,2], [2,4], [5,3],[3,5] ], // 第一位可能的源码组合
      [ [4,1], [1,4] ], // 第二位可能的源码组合
      [ [1,5], [5,1] ], // 第三位可能的源码组合
      [ [4,2], [2,4], [5,3],[3,5] ] // 第四位可能的源码组合
    ]
   */
  const tupleArray = [];

  for (let i = 0; i < encoded.length; i++) {
    const encodeNum = encoded[i];
    tupleArray.push(getCombinations(encodeNum));
  }
  debugger
  let ans;
  // 遍历首位的源码组合
  const firstTuples = tupleArray[0];
  for (let i = 0; i < firstTuples.length; i++) {
    let [curr, next] = firstTuples[i];
    let map = {};
    map[curr] = true;
    map[next] = true;

    let index = 1;
    let nextPerm = next;
    let find = true;
    // 判断在第二、第三位... 是否能串联起来
    while (index < tupleArray.length) {
      const currTuples = tupleArray[index++];
      const currTuple = currTuples.find(it => it[0] === nextPerm);
      nextPerm = currTuple && currTuple[1];
      if (!currTuple || map[nextPerm]) {
        find = false;
        break;
      }
      map[nextPerm] = true;
    }
    if (find) {
      ans = [curr, next]
    }
  }

  for (let i = 1; i < tupleArray.length; i++) {
    const tuple = tupleArray[i].find(it => it[0] === ans[ans.length - 1]);
    ans.push(tuple[1]);
  }
  return ans;

  function getCombinations(num) {
    let binaryString = toBinary(num);

    const binaryCombinations = dfs(binaryString.length - 1, 1, [{ curr: 0, next: 0 }]);
    const decimalCombinations = binaryCombinations.map(it => {
      const { curr, next } = it;
      const tuple = new Array(2);
      tuple[0] = curr
      tuple[1] = next
      return tuple;
    })
    return decimalCombinations.filter(it => {
      const [curr, next] = it;
      return curr <= encoded.length + 1 &&
        next <= encoded.length + 1 &&
        curr > 0 &&
        next > 0
    });

    function dfs(index, binaryNum, perms) {
      if (index === -1) {
        return perms;
      }
      const binary = binaryString[index];
      const nextPerms = [];
      for (let i = 0; i < perms.length; i++) {
        const { curr, next } = perms[i];
        let curr_0 = curr;
        let curr_1 = curr + binaryNum;
        let next_0 = next;
        let next_1 = next + binaryNum;
        if (binary === '0') {
          nextPerms.push({ curr: curr_0, next: next_0 })
          nextPerms.push({ curr: curr_1, next: next_1 })
        } else {
          nextPerms.push({ curr: curr_0, next: next_1 })
          nextPerms.push({ curr: curr_1, next: next_0 })
        }
      }
      return dfs(index - 1, binaryNum * 2, nextPerms);
    }
  }

  function toBinary(num) {
    //   4
    //   2   0
    //   1   0
    //   0   1
    // 二进制数组， 4 -> '100'
    let res = '';
    while (num !== 0) {
      res = (num % 2) + res;
      num = Math.floor(num / 2)
    }
    return res;
  }
}


// console.log(decodeV2([6,5,4,6]))
// console.log(decodeV2([3,1]))
// console.log(decode([6,5,4,6]))