export interface HierarchyNode {
    key: string;
    children: (HierarchyNode | string)[];
}
