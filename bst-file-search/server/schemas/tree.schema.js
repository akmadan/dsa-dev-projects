class TreeNode {
  constructor(key, value) {
    this.key = key; // File name or path
    this.value = value; // File metadata (e.g., path, size, creation date)
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

  // insert node

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

  // search node

  _searchNode(node, key) {
    if (node === null) return null;
    if (key === node.key) return node.value;
    if ((key < node, key)) return this._searchNode(node.left, key);
    return this._searchNode(node.right, key);
  }

  // create a json object from the tree
  toJSON() {
    return this.root;
  }
}

export default BinaryTree;
