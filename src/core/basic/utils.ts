import type { TreeDataItem as ATreeDataItem } from 'ant-design-vue/es/tree/Tree';

export interface TreeDataItem extends ATreeDataItem {
  children: any;
}
/**
 * 渲染货位至树形控件
 * @param {Array} depts 所有部门
 * @param {Number | null} parentId 父级部门ID
 * @param {number[]|string[]} keyPath ID路径
 */

/** 库区货位树 */
type ShelfTree = {
  id: string;
  shelfName: string;
  shelfCode: string;
  stockType: number;
  parentId: string;
  children: [];
};

/**
 * 构建货位树
 * @param shelfList
 * @param parentId
 * @param keyPath
 * @param type
 */
export const formatShelf2Tree = (
  shelfList: ShelfTree[],
  parentId: string | null = null,
  keyPath: (string | number)[] = [],
  type: number,
): TreeDataItem[] => {
  return shelfList
    .filter((item) => item.parentId === parentId)
    .map((item) => {
      const _keyPath = keyPath.concat(parentId || []);
      const arr = formatShelf2Tree(shelfList, item.id, _keyPath, type);
      return Object.assign(item, {
        keyPath: _keyPath,
        title: item.shelfName,
        key: item.shelfCode,
        value: item.shelfCode,
        formData: item,
        children: arr.length ? arr : null,
        selectable: (item.parentId != null && type == 1) || (item.parentId == null && type == 2),
      });
    });
};

/**
 * 在树中根据ID找child
 * @param {string|number} id
 * @param {any[]} treeData 树形数据
 * @param {string} keyName 指定ID的属性名，默认是id
 * @param {string} children 指定children的属性名，默认是children
 */
export const findChildById = <T = any>(
  id,
  treeData: T[] = [],
  keyName = 'id',
  children = 'children',
) => {
  return treeData.reduce((prev, curr) => {
    if (curr[keyName] === id) {
      return curr;
    }
    if (prev) {
      return prev;
    }
    if (curr[children]?.length) {
      return findChildById(id, curr[children], keyName, children);
    }
  }, undefined);
};
