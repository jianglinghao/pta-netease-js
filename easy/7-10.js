/**
 * https://pintia.cn/problem-sets/1740631898909958144/exam/problems/1740638588686434309?type=7&page=0
 * 7-10 判断二叉树是不是搜索树
 * 
 */

function TreeNode(val, left, right) {
  this.val = val;
  this.left = left ? left : null
  this.right = right ? right : null
}

function isBinarySearchTree(input) {
  if (!input.length) {
    return false;
  }
  const tree = buildTreeV2(input);
  return isValidBSTV2(tree, null, null);
}

function buildTreeV2(inputArray) {
  let index = 0;
  const treeRoot = getNode();
  const queue = [treeRoot];
  while (queue.length) {
    let root = queue.shift();
    let left = getNode();
    let right = getNode();
    root.left = left;
    root.right = right;
    if (left !== null) { queue.push(left); }
    if (right != null) { queue.push(right); }
  }
  return treeRoot;

  function getNode() {
    if (inputArray[index] === null || index >= inputArray.length) {
      index++;
      return null;
    }
    return new TreeNode(inputArray[index++], null, null);
  }
}

function isValidBSTV2(root, min, max) {
  if (root === null) return true

  if (min !== null && root.val <= min.val) return false;
  if (max !== null && root.val >= max.val) return false;
  return isValidBSTV2(root.left, min, root) && isValidBSTV2(root.right, root, max);
}

function test(inputs) {
  const arrItems = inputs.split(',').map(it => {
    if (it === 'null') {
      return null;
    }
    return +it;
  })
  console.log(isBinarySearchTree(arrItems))
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

// function buildTree(inputArray, rootIndex) {
//   if (rootIndex >= inputArray.length) {
//     return null
//   }
//   let root = inputArray[rootIndex];
//   if (root === null) {
//     return null
//   }

//   let leftNode = buildTree(inputArray, 2*rootIndex + 1);
//   let rightNode = buildTree(inputArray, 2*rootIndex + 2);

//   return new TreeNode(root, leftNode, rightNode);
// }

// function isValidBST(root) {
//   if (!root) {
//     return true;
//   }

//   // 根节点需要比左子树的最大值要大，首次提交遗漏了等于的判定
//   if (root.left && root.val <= getMaxValue(root.left)) {
//     return false;
//   }

//   // 根节点需要比右子树的最小值要小，首次提交遗漏了等于的判定
//   if (root.right && root.val >= getMinValue(root.right)) {
//     return false;
//   }

//   // 左右子树都需要时合法的
//   return isValidBST(root.left) && isValidBST(root.right)


//   function getMaxValue(node) {
//     return node.right ? getMaxValue(node.right) : node.val 
//   }

//   function getMinValue(node) {
//     return node.left ? getMinValue(node.left) : node.val 
//   }

// }

// console.log(isBinarySearchTree([4,2,6,null,3]))
// console.log(isBinarySearchTree([]))
// console.log(isBinarySearchTree([2,2,2]))