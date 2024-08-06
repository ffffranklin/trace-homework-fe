import { treeTable } from "./table";
import { testTree } from "./__testdata__/testing_trees";
import { Tree } from "./types";
import { parseISO } from "date-fns";

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

    it('should generate schema columns', () => {
      const table = treeTable(tree)

      expect(table.schema.columns).toEqual([
        { field: 'segment', label: '', format: 'string' },
        { field: 'total_orders_calc', label: 'Total Orders', format: 'integer' },
        { field: 'cart_conversion', label: 'Cart Conversion', format: 'percent' },
        { field: 'total_carts', label: 'Total Carts', format: 'integer' }
      ])
    })

    it('should generate data', () => {
      const table = treeTable(tree, parseISO('2021-12-27T00:00:00.000Z'));

      expect(table.data).toEqual([
        {
          "cart_conversion": 0.7203318097172846,
          "date": parseISO('2021-12-27T00:00:00.000Z'),
          "segment": "Overall",
          "total_carts": 5944,
          "total_orders_calc": 4281.652276959539,
        },
        {
          "cart_conversion": 0.7346225535880708,
          "date": parseISO("2021-12-27T00:00:00.000Z"),
          "segment": "New York",
          "total_carts": 4234,
          "total_orders_calc": 3110.391891891892
        },
        {
          "cart_conversion": 0.7021276595744681,
          "date": parseISO("2021-12-27T00:00:00.000Z"),
          "segment": "Boston",
          "total_carts": 47,
          "total_orders_calc": 33
        },
        {
          "cart_conversion": 0.7734375,
          "date": parseISO("2021-12-27T00:00:00.000Z"),
          "segment": "Chicago",
          "total_carts": 129,
          "total_orders_calc": 99.7734375
        }
      ])
    })

    it('should generate multiple data', () => {
      const table = treeTable(
        tree,
        parseISO('2021-12-27T00:00:00.000Z'),
        parseISO('2022-02-07T00:00:00.000Z')
      );

      expect(table.data).toEqual([
        {
          "cart_conversion": [0.7203318097172846, 0.8112084173387096],
          "date": [parseISO('2021-12-27T00:00:00.000Z'), parseISO('2022-02-07T00:00:00.000Z')],
          "segment": "Overall",
          "total_carts": [5944, 32090],
          "total_orders_calc": [4281.652276959539, 26031.678112399193],
        },
        {
          "cart_conversion": [0.7346225535880708, 0.8167707103087566],
          "date": [parseISO('2021-12-27T00:00:00.000Z'), parseISO('2022-02-07T00:00:00.000Z')],
          "segment": "New York",
          "total_carts": [4234, 24129],
          "total_orders_calc": [3110.391891891892, 19707.860469039988]
        },
        {
          "cart_conversion": [0.7021276595744681, 0.806910569105691],
          "date": [parseISO('2021-12-27T00:00:00.000Z'), parseISO('2022-02-07T00:00:00.000Z')],
          "segment": "Boston",
          "total_carts": [47, 486],
          "total_orders_calc": [33, 392.1585365853658]
        },
        {
          "cart_conversion": [0.7734375, 0.8210609659540776],
          "date": [parseISO('2021-12-27T00:00:00.000Z'), parseISO('2022-02-07T00:00:00.000Z')],
          "segment": "Chicago",
          "total_carts": [129, 1249],
          "total_orders_calc": [99.7734375, 1025.505146476643]
        }
      ])
    })
  });
});

function randomFutureDate(): Date {
  return new Date((new Date()).getTime() + (10 * Math.random() * 10e10))
}
