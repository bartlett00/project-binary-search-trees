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

/*
    buildTree algo
        find middle, middle becomes root
        find middle of left, middle becomes root
            middle becomes left child of root
        find middle of right, middle becomes root
            middle becomes right child of root

*/
function buildTree(array) {
  let sortedArr = mergeSort(array);
  let length = sortedArr.length;

  function buildSortedTree(array, start, end) {
    if (start > end) {
      return null;
    }
    // console.log(array);
    // console.log(start);
    // console.log(end);
    let middle = Math.floor((start + end) / 2);
    // console.log(middle);
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
  //insertions are always "leaves"
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
  // delete implementation heavily sourced from https://www.geeksforgeeks.org/deletion-in-binary-search-tree/

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

  /*
    two cases
      leaf
      node
        with one child
          child replaces parent in tree
          in other words
            parent of removed element points 
            to removed elements child

        with both children
          find node that is next biggest
            look in its right subtree
            item in the furthest left of its right subtree
              keep going left until end of branch
              recursively remove smallest item in right subtree
              take key at that node and replace original key
          
  */
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

/*
  levelOrder psuedo code

  base case: node = null

  queue node
  queue left child
  queue right child

*/

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

/*
    queue node
    queue left child
    queue right child
    until bottom of tree is reached

    base case =>
      if node is null, return null
  */

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
    return;
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

const exampleArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let tree = buildTree(exampleArr);
const testArr = [1, 6, 3, 2, 7, 4, 5];
let testTree = buildTree(testArr);
prettyPrint(testTree);
