import { treeTable } from "./table";
import { testTree } from "./__testdata__/testing_trees";
import { Tree } from "./types";

describe('Table', () => {
  describe('treeTable', () => {
    let tree: Tree;

    beforeEach(() => {
      tree = testTree();
    })

    it('should throw if table cant be created', () => {
      expect(treeTable).toThrow('implement me');
    })

    it('should return table with schema name', () => {
      const table = treeTable(tree);

      expect(table.schema.name).toEqual('ecommerce_performance')
    })

    describe('when dates provided', () => {
      it('should return first table date filter', () => {
        const date1 = randomFutureDate();
        const table = treeTable(tree, date1);
        expect(table.filters.date1).toEqual(date1)
        expect(table.filters.date2).toEqual(undefined)
      });

      it('should return second table date filter', () => {
        const date2 = randomFutureDate();
        const table = treeTable(tree, undefined, date2);
        expect(table.filters.date1).toEqual(undefined)
        expect(table.filters.date2).toEqual(date2)
      });

      it('should return both table date filters', () => {
        const date1 = randomFutureDate();
        const date2 = randomFutureDate();
        const table = treeTable(tree, date1, date2);
        expect(table.filters.date1).toEqual(date1)
        expect(table.filters.date2).toEqual(date2)
      });
    })

    it('should generate schema columns', ()=> {
      const table = treeTable(tree)

      expect(table.schema.columns).toEqual([
        { field: 'segment', label: '', format: 'string'},
        { field: 'total_orders_calc', label: 'Total Orders', format: 'integer' },
        { field: 'cart_conversion', label: 'Cart Conversion', format: 'percent'},
        { field: 'total_carts', label: 'Total Carts', format: 'integer'}
      ])
    })
  });
});

function randomFutureDate(): Date {
  return new Date((new Date()).getTime() + (10 * Math.random() * 10e10))
}
