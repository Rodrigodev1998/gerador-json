import { HierarchyNode } from "../types/HierarchyNode";

export function removeNode(tree: HierarchyNode[], keyToRemove: string) {
    function recursiveRemove(nodes: any) {
        return nodes.reduce((acc, node) => {
            if (node.key === keyToRemove) {
                return acc;
            }

            if (node.children) {
                node.children = recursiveRemove(node.children);
            }

            acc.push(node);
            return acc;
        }, []);
    }

    return recursiveRemove(tree);
}