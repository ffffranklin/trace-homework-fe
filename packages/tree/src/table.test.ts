import { treeTable } from "./table";
import { testTree } from "./__testdata__/testing_trees";
import { Tree } from "./types";

describe('Table', ()=> {
  describe('treeTable', ()=> {
    let tree: Tree;

    beforeEach(()=> {
      tree = testTree();
    })

    it('should throw if table cant be created', ()=> {
      expect(treeTable).toThrow('implement me');
    })

    it('should return table with schema name', ()=> {
      expect(treeTable(tree).schema.name).toEqual('ecommerce_performance')
    })

  });
});
