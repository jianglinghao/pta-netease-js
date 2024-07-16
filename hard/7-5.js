/**
https://pintia.cn/problem-sets/1740640628187717632/exam/problems/1740640696596824069?type=7&page=0
7-5 二叉树的最大路径和

二叉树中的 路径 被定义为一条节点序列，序列中每对相邻节点之间都存在一条边。
同一个节点在一条路径序列中 至多出现一次 。
该路径 至少包含一个 节点，且不一定经过根节点。
路径和 是路径中各节点值的总和。
给你一个二叉树的根节点 root ，返回其 最大路径和 。


 */

function TreeNode(value, left, right) {
  this.value = value;
  this.left = left ? left : null;
  this.right = right ? right : null;
}


function maxPathSumV2(nums) {
  const tree = buildTree(nums);
  let ans = Number.MIN_SAFE_INTEGER;
  dfs(tree)

  function dfs(root) {
    if (root === null) {
      return 0;
    }
    const left = dfs(root.left);
    const right = dfs(root.right);
    ans = maxOfEles(ans, root.value + left + right);
    return maxOfEles(maxOfEles(left, right) + root.value, 0);
  }
  return ans;
}

function buildTree(nums) {
  const queue = [];
  let nextIndex = 0;
  let root = createNode();
  queue.push(root);

  while(queue.length) {
    let root = queue.shift();
    let leftNode = createNode();
    let rightNode = createNode();
    root.left = leftNode;
    root.right = rightNode;

    if (leftNode !== null) {
      queue.push(leftNode);
    }

    if (rightNode !== null) {
      queue.push(rightNode);
    }
  }
  return root;


  function createNode() {
    let v = nums[nextIndex];
    if (v === null || v === undefined) {
      nextIndex++;
      return null;
    }
    return new TreeNode(nums[nextIndex++]);
  }
}

function maxOfEles(...ele) {
  let max = Number.MIN_SAFE_INTEGER;
  ele.forEach(it => {
    if (it > max) {
      max = it;
    }
  })
  return max;
}

function test(inputs) {
  const nodes = inputs.split(',').map(it => {
    if (it === 'null') {
      return null
    }
    return +it
  });
  console.log(maxPathSumV2(nodes));
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

// test('-10,9,20,null,null,15,7');

// 首次提交未通过的case
// test('-3')
// test('3,-1,-4,null,null,3,4')



/**

      20
   10     4
        5   -1
               10
 */

// 本解法，理解错了题目的含义(没有理解一个节点只能被计算一次，故而求了最大自树和)。
function maxPathSum(nums) {
  // 构建树，不能按满二叉树来，而要层序遍历来。
  // const tree = getTree(0);
  const tree = buildTree(nums);
  // [带有根节点的最大值，子树中独立的最大值]
  const [withRootMax, singleMax] = getMaxSum(tree);
  return withRootMax >= singleMax ? withRootMax : singleMax;

  function getMaxSum(root) {
    /**
          20
      10     4
            5  -1
                  10
    */
    if (root.left === null && root.right === null) {
      return [root.value, root.value];
    }
    if (root.left === null) {
      return getHalfMaxSum(root.right);
    }
    if (root.right === null) {
      return getHalfMaxSum(root.left);
    }

    const [withLeftRootMax, leftSingleMax] = getMaxSum(root.left);
    const [withRightRootMax, rightSingleMax] = getMaxSum(root.right);

    const newWithRootMax = maxOfEles(root.value, root.value + withLeftRootMax, root.value + withRightRootMax, root.value + withLeftRootMax + withRightRootMax );
    return [
        newWithRootMax,
        maxOfEles(newWithRootMax, leftSingleMax, rightSingleMax)
      ]

    function getHalfMaxSum(halfRoot) {
      const [withLeftRootMax, leftSingleMax] = getMaxSum(halfRoot);
      const newWithRootMax = maxOfEles(root.value, root.value + withLeftRootMax);
      return [
        newWithRootMax,
        maxOfEles(newWithRootMax, leftSingleMax)
      ]
    }

    /**
     * 不能直接把全部可能罗列出来。因为可能只有一个负数的根节点，如果用这种方式，就会省略根节点。
     * 还有某个子树的最大值，可能不能直接累加给父节点: -4这颗子树的最大值为 4. 但不能直接把 4累加到3上。
     *      3
     *   -1   -4
     *      -3   4
     */
    // return maxOfEles(root.value, leftSum, rightSum, leftSum + root.value, rightSum + root.value, root.value + leftSum + rightSum);

  }

}