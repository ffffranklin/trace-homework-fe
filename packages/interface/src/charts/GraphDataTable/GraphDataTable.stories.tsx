import { GraphDataTable } from "./GraphDataTable";
import { Meta, StoryObj } from "@storybook/react";
import React from "react";

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
    className: 'test',
    data: {
      schema: {
        name: 'test',
        columns: [
          {
            field: 'a',
            label: 'A',
            format: 'string',
          }
        ],
      },
      filters: {
        date1: new Date(),
        date2: undefined,
      },
      data: []
    }
  },
  decorators: [
    (Story) => {
      return <Story/>;
    },
  ],
}
