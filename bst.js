function TreeNode(d) {
  let data = d;
  let left = null;
  let right = null;
  return { data, left, right };
}

function Tree(arr) {
  let root = null;
  return { root };
}

function mergeSort(array) {
  if (array.length === 1) {
    return array;
  } else {
    let left = array.slice(0, array.length / 2);
    let right = array.slice(array.length / 2);
    return merge(mergeSort(left), mergeSort(right));
  }
}

function merge(left, right) {
  let mergedArray = [];
  while (left.length > 0 && right.length > 0) {
    if (left[0] < right[0]) {
      mergedArray.push(left[0]);
      left.shift();
    } else if (right[0] < left[0]) {
      mergedArray.push(right[0]);
      right.shift();
    } else if (left[0] === right[0]) {
      right.shift();
    }
  }
  return [...mergedArray, ...left, ...right];
}

function buildTree(array) {
  let sortedArr = mergeSort(array);
  let length = sortedArr.length;

  function buildSortedTree(array, start, end) {
    if (start > end) {
      return null;
    }
    let middle = Math.floor((start + end) / 2);
    let node = TreeNode(array[middle]);
    node.left = buildSortedTree(array, start, middle - 1);
    node.right = buildSortedTree(array, middle + 1, end);

    return node;
  }

  return buildSortedTree(sortedArr, 0, length - 1);
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

function insert(node, insertData) {
  if (insertData === node.data) {
    return;
  }
  if (insertData > node.data) {
    if (node.right === null) {
      let newNode = TreeNode(insertData);
      node.right = newNode;
      return;
    } else {
      return insert(node.right, insertData);
    }
  }

  if (insertData < node.data) {
    if (node.left === null) {
      let newNode = TreeNode(insertData);
      node.left = newNode;
      return;
    } else {
      return insert(node.left, insertData);
    }
  }
}

function findReplacement(node) {
  node = node.right;
  while (node.data !== null && node.left !== null) {
    node = node.left;
  }
  return node;
}

function deleteItem(node, deleteData) {
  if (node === null) {
    return node;
  }

  if (deleteData < node.data) {
    node.left = deleteItem(node.left, deleteData);
  } else if (deleteData > node.data) {
    node.right = deleteItem(node.right, deleteData);
  } else {
    if (node.left === null && node.right !== null) {
      return node.right;
    }
    if (node.right === null && node.left !== null) {
      return node.left;
    }
    if (node.right === null && node.left === null) {
      node = null;
      return node;
    }
    if (node.right !== null && node.left !== null) {
      let replacement = findReplacement(node);
      node.data = replacement.data;
      node.right = deleteItem(node.right, replacement.data);
    }
  }
  return node;
}

function find(node, value) {
  if (node === null) {
    return null;
  }
  if (value > node.data) {
    return find(node.right, value);
  }
  if (value < node.data) {
    return find(node.left, value);
  }
  if (node.data === value) {
    return node;
  }
}

function levelOrder(node, callback) {
  if (!callback) {
    throw new Error("Error: callback function not provided.");
  }
  let queue = [];
  if (node === null) {
    return;
  }
  queue.push(node);
  while (queue.length !== 0) {
    let front = queue.shift();
    callback(front);
    if (front.left !== null) {
      queue.push(front.left);
    }
    if (front.right !== null) {
      queue.push(front.right);
    }
  }
}

function inOrder(node, callback) {
  if (!callback) {
    throw new Error("Error: callback function not provided.");
  }
  if (node === null) {
    return;
  } else {
    inOrder(node.left, callback);
    callback(node);
    inOrder(node.right, callback);
    return;
  }
}

function preOrder(node, callback) {
  if (!callback) {
    throw new Error("Error: callback function not provided.");
  }
  if (node === null) {
    return;
  } else {
    callback(node);
    preOrder(node.left, callback);
    preOrder(node.right, callback);
  }
}

function postOrder(node, callback) {
  if (!callback) {
    throw new Error("Error: callback function not provided.");
  }
  if (node === null) {
    return;
  } else {
    postOrder(node.left, callback);
    postOrder(node.right, callback);
    callback(node);
  }
}

function depth(root, node) {
  let queue = [];
  let depth = 0;
  if (root === null) {
    return null;
  }
  if (node === null) {
    return null;
  }

  queue.push(root);
  while (queue.length !== 0) {
    let front = queue.shift();
    if (front === node) {
      return depth;
    }
    if (node.data > front.data && front.right !== null) {
      depth++;
      queue.push(front.right);
    }
    if (node.data < front.data && front.left !== null) {
      depth++;
      queue.push(front.left);
    }
  }
  return depth;
}

function height(node) {
  if (node === null) {
    return -1;
  }
  let left = height(node.left);
  let right = height(node.right);
  if (left > right) {
    return left + 1;
  } else {
    return right + 1;
  }
}

function isBalanced(tree) {
  if (tree === null) {
    return null;
  }
  let leftHeight = height(tree.left);
  let rightHeight = height(tree.right);
  return Math.abs(leftHeight - rightHeight) <= 1 ? true : false;
}

function rebalance(tree) {
  let unbalanced = [];
  inOrder(tree, (node) => {
    unbalanced.push(node.data);
  });
  return buildTree(unbalanced);
}

function randomNumArr() {
  let random = Math.floor(Math.random() * 100);
  let randomArr = [];
  for (let i = 0; i < random; i++) {
    randomArr.push(Math.floor(Math.random() * 100));
  }
  return randomArr;
}

function bst() {
  let random = randomNumArr();
  let randomTree = buildTree(random);
  if (!isBalanced(randomTree)) {
    randomTree = rebalance(randomTree);
  }
  prettyPrint(randomTree);
  function printOrders() {
    let levelOrderArr = [];
    let preOrderArr = [];
    let postOrderArr = [];
    let inOrderArr = [];

    levelOrder(randomTree, (node) => {
      levelOrderArr.push(node.data);
    });
    preOrder(randomTree, (node) => {
      preOrderArr.push(node.data);
    });
    postOrder(randomTree, (node) => {
      postOrderArr.push(node.data);
    });
    inOrder(randomTree, (node) => {
      inOrderArr.push(node.data);
    });
    console.log(levelOrderArr);
    console.log(preOrderArr);
    console.log(postOrderArr);
    console.log(inOrderArr);
  }
  printOrders();

  for (let i = 0; i < 10; i++) {
    insert(randomTree, Math.floor(Math.random() * 200) + 100);
  }
  console.log(isBalanced(randomTree));
  randomTree = rebalance(randomTree);
  console.log(isBalanced(randomTree));
  prettyPrint(randomTree);
  printOrders();
}

bst();
