/**
https://pintia.cn/problem-sets/1740640628187717632/exam/problems/1740640696596824064?type=7&page=0
7-2 按公因数计算最大组件大小

给定一个由不同正整数组成的非空数组 nums，考虑下面的构图：

有 nums.length 个节点，按照从 nums[0]到 nums[nums.length-1]标记；

只有当 nums[i] 和 nums[j] 共用一个大于 1 的公因数时，nums[i] 和 nums[j] 之间才有一条边。

返回构图中最大连通组件的大小。

输入格式:
输入为数组元素，空格分隔

输出格式:
输出最大连通组件的大小

输入样例1:
在这里给出一组输入。例如：

4 6 15 35

4-6-15-35

可以看到，最大连通组件的大小为 4。

出样例1:
在这里给出相应的输出。例如：

4



输入样例2:
在这里给出一组输入。例如：

20 50 9 63
对应的构图为
20-50 9-63

可以看到，最大连通组件的大小为 2。

输出样例2:
在这里给出相应的输出。例如：

2

注意：
1 <= nums.length <= 2*10^4

1 <= nums[i] <= 10^5

nums 中所有值都不同
 */

function maxLinkComponentSize(inputNums) {
  // 从小到大排序
  // const sorted = inputNums.sort((it1, it2) => it1 - it2);
  const uf = new UnionFind(inputNums.length);

  for (let i = 0; i < inputNums.length; i++) {
    for (let j = i + 1; j < inputNums.length; j++) {
      // 如果已经连通，则直接跳过。
      if (uf.connect(i, j)) { continue }
      let numA = inputNums[i];
      let numB = inputNums[j];
      // 是否有大于1的公因数
      if (hasGCDGraterThanOne(numA, numB)) {
        uf.union(i, j);
      }
    }
  }
  const rootMap = getComponentRootMap();
  return getMaxComponentSize(rootMap);


  function getComponentRootMap() {
    const rootMap = {};
    for (let i = 0; i < uf.parent.length; i++) {
      let root = uf.parent[i];
      rootMap[root] = rootMap[root] ? (rootMap[root] + 1) : 1
    }
    return rootMap;
  }

  function getMaxComponentSize(rootMap) {
    let max = 0;
    const componentSize = Object.values(rootMap);
    for (let i = 0; i < componentSize.length; i++) {
      if (max < componentSize[i]) {
        max = componentSize[i]
      }
    }
    return max;
  }

}

function hasGCDGraterThanOne(a, b) {
  return gcd(a, b) > 1

  // 欧几里得求最大公约数算法
  function gcd(a, b) {
    if (b === 0) return a;
    return gcd(b, a % b);
  }
}

function hasCommon(min, max) {
  if (min === 1) {
    return false;
  }
  if (max % min === 0) {
    return true
  }
  let i = 2;
  while (i * 2 <= min) {
    if (min % i === 0 && max % i === 0) {
      return true;
    }
    i++
  }
  return false;
}

function UnionFind(n) {
  this.count = n;
  this.parent = [];
  for (let i = 0; i < n; i++) {
    this.parent[i] = i;
  }
}

UnionFind.prototype.union = function (a, b) {
  const rootA = this.find(a);
  const rootB = this.find(b);
  if (rootA === rootB) { return }

  // 让根指向更小的数。
  if (rootA < rootB) {
    this.parent[rootB] = rootA;
    this.find(b);
  } else {
    this.parent[rootA] = rootB;
    this.find(a);
  }
  this.count--;
}

UnionFind.prototype.find = function (a) {
  if (this.parent[a] !== a) {
    this.parent[a] = this.find(this.parent[a])
  }
  return this.parent[a];
}

UnionFind.prototype.connect = function (a, b) {
  const rootA = this.find(a);
  const rootB = this.find(b);
  return rootA === rootB
}

function test(inputs) {
  const inputNums = inputs.split(' ').map(it => +it);
  console.log(maxLinkComponentSize(inputNums));
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

// console.log(hasCommon(4, 6))
// console.log(hasCommon(6, 15))
// console.log(hasCommon(15, 35))
// console.log(hasCommon(4, 35))
// console.log(hasCommon(4, 15))

// console.log(maxLinkComponentSize([4, 6, 15, 9]))
// console.log(maxLinkComponentSize([4,6,15, 35]))
// console.log(maxLinkComponentSize([20,50,9,63]))

// gpt

class UnionFind {
  constructor(n) {
    this.parent = new Array(n).fill(0).map((_, index) => index);
    this.size = new Array(n).fill(1);
  }

  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  union(x, y) {
    let rootX = this.find(x);
    let rootY = this.find(y);
    if (rootX !== rootY) {
      if (this.size[rootX] < this.size[rootY]) {
        [rootX, rootY] = [rootY, rootX];
      }
      this.parent[rootY] = rootX;
      this.size[rootX] += this.size[rootY];
    }
  }
}

/**
 * 计算最大公因数
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
function gcd(a, b) {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}

/**
 * 计算构图中最大连通组件的大小
 * @param {number[]} nums
 * @return {number}
 */
function largestComponentSize(nums) {
  const maxNum = Math.max(...nums);
  const uf = new UnionFind(maxNum + 1);

  for (const num of nums) {
    for (let fact = 2; fact * fact <= num; fact++) {
      if (num % fact === 0) {
        uf.union(num, fact);
        uf.union(num, num / fact);
      }
    }
  }

  const freq = {};
  let maxGroup = 0;

  for (const num of nums) {
    const root = uf.find(num);
    freq[root] = (freq[root] || 0) + 1;
    maxGroup = Math.max(maxGroup, freq[root]);
  }

  return maxGroup;
}