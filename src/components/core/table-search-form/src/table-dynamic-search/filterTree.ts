export const filterTree = (childrenName: string, filter: (node: any) => boolean) => {
  return function (nodes) {
    const filterIt = filterTree(childrenName, filter);
    return nodes.reduce((acc, node) => {
      if (filter(node)) {
        acc.push({
          ...node,
          [childrenName]: filterIt(node[childrenName] || []),
        });
        return acc;
      }
      return acc;
    }, []);
  };
};
