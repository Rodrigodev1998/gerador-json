import { HierarchyNode } from "../types/HierarchyNode";

export const replaceNodeInTree = (
    tree: HierarchyNode[],
    updatedNode: HierarchyNode
): HierarchyNode[] => {
    const recursiveReplace = (nodes: HierarchyNode[]): HierarchyNode[] => {
        return nodes.map((node) => {
            if (node.key === updatedNode.key) {
                return updatedNode;
            }

            if (node.children && node.children.length > 0) {
                return {
                    ...node,
                    children: recursiveReplace(node.children)
                };
            }

            return node;
        });
    };

    return recursiveReplace(tree);
};