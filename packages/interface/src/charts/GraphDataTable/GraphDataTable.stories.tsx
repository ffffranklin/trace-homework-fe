import { GraphDataTable } from "./GraphDataTable";
import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { treeTable } from "@exp/tree";
import { testTree } from "@exp/tree/src/__testdata__/testing_trees";
import {parseISO} from 'date-fns'

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
    data: treeTable(
      testTree(),
      parseISO('2022-01-03T00:00:00.000Z'),
      parseISO('2022-02-07T00:00:00.000Z')
    ),
  },
  decorators: [
    (Story) => {
      return <Story/>;
    },
  ],
}
