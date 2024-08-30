'use client';

import React, { useState } from 'react';
import { HierarchyNode as HierarchyNodeType } from '../types/HierarchyNode';
import { removeNode } from '../utils/removeNode';
import { replaceNodeInTree } from '../utils/replaceNodeInTree';
import { FiPlus } from 'react-icons/fi';

interface HierarchyNodeProps {
  node: HierarchyNodeType;
  hierarchy: HierarchyNodeType[]
  setHierarchy: React.Dispatch<React.SetStateAction<HierarchyNodeType[]>>
}

const HierarchyNode: React.FC<HierarchyNodeProps> = ({ 
  node: thisNode,
  hierarchy,
  setHierarchy
}) => {
  const [addingNodeChild, setAddingNodeChild] = useState(false);
  const [addingListItem, setAddingListItem] = useState(false);
  const [childRootKeyName, setChildRootKeyName] = useState('')
  const [listItem, setListItem] = useState('')

  const [key, setKey] = useState(thisNode.key);

  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKey(e.target.value);
    thisNode.key = e.target.value;
  };

  const addRootChild = () => {
    thisNode.children.push({ key: childRootKeyName, children: [] })
    const hierarchyUpdated = hierarchy.map(node => {
      if (node.key === thisNode.key) {
        return thisNode
      }

      return node
    })
    setHierarchy(hierarchyUpdated)
    setAddingNodeChild(false)
    setChildRootKeyName('')
  }
  
  const addRootItemList = () => {
    thisNode.children.push(listItem)
    const hierarchyUpdated = hierarchy.map(node => {
      if (node.key === thisNode.key) {
        return thisNode
      }

      return node
    })
    setHierarchy(hierarchyUpdated)
    setAddingListItem(false)
    setListItem('')
  }

  const removeNodeItem = (nodeKeyToRemove: string) => {
    const hierarchyUpdated = removeNode(hierarchy, nodeKeyToRemove);
    setHierarchy(hierarchyUpdated)
  }

  const removeListItem = (node: HierarchyNodeType, itemToRemove: string) => {
    node.children = node.children.filter(item => typeof item === 'string' && item !== itemToRemove);
    const updatedTree = replaceNodeInTree(hierarchy, node)
    setHierarchy(updatedTree)
  }

  return (
    <div className="ml-4 mb-4 border p-4 rounded bg-white shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
        <input
          type="text"
          value={key}
          onChange={handleKeyChange}
          placeholder="Digite uma categoria"
          className="border p-1 rounded w-full sm:w-auto"
        />
        <button
          onClick={() => setAddingNodeChild(true)}
          className="bg-blue-500 text-white px-2 py-1 rounded w-full sm:w-auto flex items-center"
        >
          <FiPlus size={16} /> filho
        </button>
        <button
          onClick={() => setAddingListItem(true)}
          className="bg-green-500 text-white px-2 py-1 rounded w-full sm:w-auto"
        >
          Adicionar Item
        </button>
        <button
          onClick={() => removeNodeItem(thisNode.key)}
          className="bg-red-500 text-white px-2 py-1 rounded w-full sm:w-auto"
        >
          Remover
        </button>
      </div>

      {addingNodeChild && (
        <div className="mt-4 flex flex-col sm:flex-row items-start gap-2">
          <input
            type="text"
            placeholder="Digite uma categoria"
            className="border p-1 rounded w-full sm:w-auto"
            value={childRootKeyName}
            onChange={(e) => setChildRootKeyName(e.target.value)}
          />
          <button
            onClick={addRootChild}
            className="bg-blue-500 text-white px-2 py-1 rounded w-full sm:w-auto"
          >
            Adicionar
          </button>
          <button
            onClick={() => setAddingNodeChild(false)}
            className="bg-red-500 text-white px-2 py-1 rounded w-full sm:w-auto"
          >
            Cancelar
          </button>
        </div>
      )}

      {addingListItem && (
        <div className="mt-4 flex flex-col sm:flex-row items-start gap-2">
          <input
            type="text"
            placeholder="Digite o nome do item"
            className="border p-1 rounded w-full sm:w-auto"
            value={listItem}
            onChange={(e) => setListItem(e.target.value)}
          />
          <button
            onClick={addRootItemList}
            className="bg-green-500 text-white px-2 py-1 rounded w-full sm:w-auto"
          >
            Adicionar Item
          </button>
          <button
            onClick={() => setAddingListItem(false)}
            className="bg-red-500 text-white px-2 py-1 rounded w-full sm:w-auto"
          >
            Cancelar
          </button>
        </div>
      )}

      {thisNode.children && thisNode.children.length > 0 && (
        <div className="ml-4 mt-4">
          {thisNode.children.map((child, index) => {
            if (typeof child === 'object') {
              return (
                <HierarchyNode
                  key={index}
                  node={child}
                  hierarchy={hierarchy}
                  setHierarchy={setHierarchy}
                />
              );
            } else if (typeof child === 'string') {
              return (
                <div key={child} className="flex items-center gap-2 mt-2">
                  <li className="list-disc">{child}</li>
                  <button
                    onClick={() => removeListItem(thisNode, child)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Remover
                  </button>
                </div>
              );
            }
          })}
        </div>
      )}
    </div>
  );
};

export default HierarchyNode;
