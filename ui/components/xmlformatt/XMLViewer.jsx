import React, { useState } from 'react';
import { xml2js } from 'xml-js';

const XmlViewer = ({ xml }) => {
  const [expandedNodes, setExpandedNodes] = useState([]);

  const handleToggle = (nodePath) => {
    if (expandedNodes.includes(nodePath)) {
      setExpandedNodes(expandedNodes.filter((path) => path !== nodePath));
    } else {
      setExpandedNodes([...expandedNodes, nodePath]);
    }
  };

  const renderNode = (node, path) => {
    const nodePath = path.join('/');
    const isExpanded = expandedNodes.includes(nodePath);

    if (!node.elements) {
      return (
        <div key={nodePath}>
          &lt;{node.name}&gt; {node.elements ? '' : node.text} &lt;/{node.name}&gt;
        </div>
      );
    }

    return (
      <div key={nodePath}>
        <div onClick={() => handleToggle(nodePath)} style={{ cursor: 'pointer' }}>
          {isExpanded ? '▼' : '►'} &lt;{node.name}&gt;
        </div>
        {isExpanded && (
          <div style={{ marginLeft: '20px' }}>
            {node.elements.map((child, index) => renderNode(child, [...path, index.toString()]))}
          </div>
        )}
        <div>{`</${node.name}>`}</div>
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
