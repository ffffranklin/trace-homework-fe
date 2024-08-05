# ASSIGNMENT 02

The goals of this assignment are to:

1. Manipulate a graph structure that models complex relationships, such as financial metrics or operations over time, and transform the graph data into a tabular representation suitable for analysis or reporting; and

2. Visualize the tabular representation via a React component and to demonstrate its capabilities using Storybook.

The unit test you implement should be able to produce a table with the following structure:

|               | Total Orders | Cart Conversion | Total Carts |
| ------------- | ------------ | --------------- | ----------- |
| Overall       |              |                 |             |
| New York      |              |                 |             |
| Boston        |              |                 |             |
| Chicago       |              |                 |             |
| Los Angeles   |              |                 |             |
| San Francisco |              |                 |             |

If it looks like you'll be unable to complete the full exercise in the time you're able to allot, please focus on depth rather than breadth - that is, focus on one part of the exercise and do it really well.

Below are some tips:

- Understand the `MultiDirectedGraph` type from the `graphology` library, focusing on how this exercise's node and edge types (`TreeNode` and `TreeEdge`) would be represented in a `graphology` graph.

- Carefully review the type definitions provided (`types.ts`), focusing on how these types exist within a `graphology` graph and how the node and edge relationships within a graph contain additional information.

- Pay special attention to the `Segment` type, as it plays a crucial role in defining how nodes are categorized or grouped within the graph. You'll need to identify and extract values from nodes connected by an arithmetic edge to the segmented nodes. Choose how the date will be determined or accepted as input.


### Part 1: Extract graph data into a tabular format

Implement the `treeTable` function in `table.ts` to transform a tree represented by an instance of the `Tree` type into your `TableData` type consistent with the constraints detailed in the TSDoc comment attached to `treeTable`.

- This part of the assignment will take place within the `packages/tree` directory of your project setup.

- Implement unit tests that validate your algorithm and types for a variety of different graph structures.


### Part 2: Implement a React/UI Table to Display Your Results

Implement a React component to display the tabular data type you developed in Part 1.

- This part of the assignment will take place within the `packages/interface` directory of your project setup.

- Consider using libraries like `react-table` for flexibility and enhanced functionality.

- The component should accept props that include the data in the format produced by your `treeTable` function and any necessary handlers for interactive features like date selection.

- Create a story file (`GraphDataTable.stories.tsx`) for your table component. Make sure to setup the story to demonstrate the various states and functionalities of your table component, especially focusing on the dynamic data display based on date selection.
