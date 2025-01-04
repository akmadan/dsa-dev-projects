class TreeNode {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }

  // insert
  insert(key, value) {
    const newNode = new TreeNode(key, value);

    if (this.root === null) {
      this.root = newNode;
    } else {
      this._insertNode(this.root, newNode);
    }
  }

  // insert node helper
  _insertNode(node, newNode) {
    if (newNode.key < node.key) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this._insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this._insertNode(node.right, newNode);
      }
    }
  }

  // search
  search(key) {
    return this._searchNode(this.root, key);
  }

  // search node helper
  _searchNode(node, key) {
    console.log(node.key);
    if (node === null) return null;
    if (key === node.key) return node.value;
    if ((key < node.key)) return this._searchNode(node.left, key);
    return this._searchNode(node.right, key);
  }

  toJSON() {
    return this.root;
  }
}

export default BinaryTree;
