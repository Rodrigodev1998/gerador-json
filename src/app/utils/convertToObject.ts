import { HierarchyNode } from "../types/HierarchyNode";

export const convertArrayToTree = (array: HierarchyNode[]): any => {
    const formatKey = (key: string): string => {
        return key.charAt(0).toUpperCase() + key.slice(1).toLowerCase();
    };

    const tree = {};

    const addToTree = (node: HierarchyNode, parent: any) => {
        const formattedKey = formatKey(node.key);

        if (node.children && node.children.length > 0) {
            const hasObjectChildren = node.children.some(child => typeof child !== 'string');

            if (hasObjectChildren) {
                parent[formattedKey] = {};
                node.children.forEach((child) => {
                    if (typeof child === 'string') {
                        if (!parent[formattedKey].strings) {
                            parent[formattedKey].strings = [];
                        }
                        parent[formattedKey].strings.push(child);
                    } else {
                        addToTree(child, parent[formattedKey]);
                    }
                });
            } else {
                parent[formattedKey] = node.children;
            }
        } else {
            parent[formattedKey] = [];
        }
    };

    array.forEach((node) => {
        addToTree(node, tree);
    });

    return tree;
}
