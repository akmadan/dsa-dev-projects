"use client";
import React, { useEffect, useState } from "react";


interface Node {
  key: string;
  value: any;
  left: Node | null;
  right: Node | null;
}

const ViewTree = () => {
  const [treeData, setTreeData] = useState<Node | null>(null);

  useEffect(() => {
    const fetchTree = async () => {
      try {
        const response = await fetch("http://localhost:3001/show-tree"); // Ensure the route matches your backend API
        const data = await response.json();
        setTreeData(data['data']);
      } catch (error) {
        console.error("Error fetching tree data:", error);
      }
    };

    fetchTree();
  }, []);

  const renderTree = (node: Node | null) => {
    if (!node) {
      return (
        <div style={{ marginLeft: "20px" }}>
          <em>Null</em>
        </div>
      );
    }

    return (
      <div
        style={{
          marginLeft: "20px",
          borderLeft: "1px dashed gray",
          paddingLeft: "10px",
        }}
      >
        <div>
          <strong>{node.key}</strong>: {JSON.stringify(node.value)}
        </div>
        <div>
          <strong>Left:</strong>
          {renderTree(node.left)}
        </div>
        <div>
          <strong>Right:</strong>
          {renderTree(node.right)}
        </div>
      </div>
    );
  };

  return (
    <div>
      <h1>Binary Tree View</h1>
      {treeData ? renderTree(treeData) : <p>Loading tree data...</p>}
    </div>
  );
};

export default ViewTree;
