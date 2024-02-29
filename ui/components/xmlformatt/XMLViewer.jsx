import React, { useState, useEffect } from 'react';
import { xml2js } from 'xml-js';

const XmlViewer = ({ xml }) => {
  const [expandedNodes, setExpandedNodes] = useState([]);

  useEffect(() => {
    // Set initial state to expand all nodes
    const xmlObject = xml2js(xml, { compact: false });
    const nodePaths = [];

    const traverseNodes = (node, path) => {
      nodePaths.push(path.join('/'));
      if (node.elements) {
        node.elements.forEach((child, index) => traverseNodes(child, [...path, index]));
      }
    };

    xmlObject.elements.forEach((node, index) => traverseNodes(node, [index.toString()]));

    setExpandedNodes(nodePaths);
  }, [xml]);

  const handleToggle = (nodePath) => {
    if (expandedNodes.includes(nodePath)) {
      setExpandedNodes(expandedNodes.filter((path) => path !== nodePath));
    } else {
      setExpandedNodes([...expandedNodes, nodePath]);
    }
  };

  const renderNode = (node, path, level = 0) => {
    const nodePath = path.join('/');
    const isExpanded = expandedNodes.includes(nodePath);
  
    const indentation = '  '.repeat(level); // Two spaces for each level of indentation
  
    if (!node.elements) {
      // Leaf node: render the node name and text directly
      return (
        <div key={nodePath}>
          <div onClick={() => handleToggle(nodePath)} style={{ cursor: 'pointer' }}>
            {indentation}&lt;{node.name}&gt; {node.text.trim()} &lt;/{node.name}&gt;
          </div>
        </div>
      );
    }
  
    // Non-leaf node: render children recursively with proper indentation
    return (
      <div key={nodePath}>
        <div onClick={() => handleToggle(nodePath)} style={{ cursor: 'pointer' }}>
          {indentation}
          {isExpanded ? '▼ ' : '► '}
          &lt;{node.name}&gt;
        </div>
        {isExpanded && (
          <div style={{ marginLeft: '20px' }}>
            {node.elements.map((child, index) => renderNode(child, [...path, index.toString()], level + 1))}
          </div>
        )}
        {isExpanded && (
          <div>
            {indentation}&lt;/{node.name}&gt;
          </div>
        )}
      </div>
    );
  };
  
 
  const xmlObject = xml2js(xml, { compact: false });

  return (
    <pre>
      {xmlObject.elements.map((node, index) => renderNode(node, [index.toString()]))}
    </pre>
  );
};

export default XmlViewer;
