import { testTree } from "./testing_trees";

describe("testing_trees", () => {
  test("should assemble the testing tree instance", () => {
    const tree = testTree();

    expect(tree.order).toEqual(12);
    expect(tree.size).toEqual(11);

    for (const entry of tree.nodeEntries()) {
      const { attributes } = entry;
      expect(attributes.data).toHaveLength(112);
    }
  });
});
