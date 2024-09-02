'use client'

import React, { useState } from 'react';
import HierarchyNode from './HierarchyNode';
import { HierarchyNode as HierarchyNodeType } from '../types/HierarchyNode';
import { convertArrayToTree } from '../utils/convertToObject';
import { FiDownload } from 'react-icons/fi';

const HierarchyBuilder: React.FC = () => {
  const [nodeRootKeyName, setNodeRootKeyName] = useState('')
  const [hierarchy, setHierarchy] = useState<HierarchyNodeType[]>([]);

  const addRootNode = () => {
    if (!nodeRootKeyName) return;
    setHierarchy([...hierarchy, { key: nodeRootKeyName, children: [] }]);
    setNodeRootKeyName('')
  };

  const saveHierarchy = () => {
    const json = JSON.stringify(convertArrayToTree(hierarchy), null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'hierarchy.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-2 flex flex-col lg:flex-row gap-4">
      <div className="flex-1">
        <div className="flex justify-center gap-2">
          <input
            className="border p-1 rounded"
            placeholder="Digite uma categoria"
            value={nodeRootKeyName}
            onChange={(e) => setNodeRootKeyName(e.target.value)}
          />
          <button onClick={addRootNode} 
          className={`px-4 py-2 rounded text-white ${
            nodeRootKeyName
              ? 'bg-green-500 hover:bg-green-600'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
          disabled={!nodeRootKeyName}
          >
            Adicionar raiz
          </button>
        </div>
        <div className="mt-4 flex items-center flex-col">
          {hierarchy.map((node, index) => (
            <HierarchyNode
              key={node.key}
              node={node}
              hierarchy={hierarchy}
              setHierarchy={setHierarchy}
            />
          ))}
        </div>
        <div className="flex justify-center">
          
        </div>
      </div>
      <div className="w-[2px] bg-gray-300 mx-4 lg:mx-0"></div>
      <div className="flex-1 p-4 border rounded bg-gray-100 overflow-y-auto max-h-[80vh]">
        <div className='flex items-center justify-between mb-4'>
          <h3 className="text-lg font-bold">JSON:</h3>
          <button 
          onClick={saveHierarchy} 
          className={`px-4 py-2 rounded text-white ${
            hierarchy.length > 0
              ? 'bg-blue-500 hover:bg-blue-600'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
          disabled={hierarchy.length === 0}
          >
            <FiDownload size={16}/>
          </button>
        </div>
        <pre className="text-sm bg-gray-700 text-white p-2 rounded overflow-x-auto">
          {JSON.stringify(convertArrayToTree(hierarchy), null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default HierarchyBuilder;
