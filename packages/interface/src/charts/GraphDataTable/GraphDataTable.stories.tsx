import { GraphDataTable } from "./GraphDataTable";
import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { treeTable } from "@exp/tree";
import { testTree } from "@exp/tree/src/__testdata__/testing_trees";

const meta = {
  component: GraphDataTable,
  parameters: {
    layout: 'fullscreen'
  },
} satisfies Meta< typeof GraphDataTable>

export default meta;

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    data: treeTable(testTree()),
  },
  decorators: [
    (Story) => {
      return <Story/>;
    },
  ],
}
