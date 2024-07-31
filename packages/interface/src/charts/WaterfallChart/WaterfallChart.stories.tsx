import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { WaterfallChart } from "./WaterfallChart";
import { ColumnType, Format } from "./types";

const meta = {
  component: WaterfallChart,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof WaterfallChart>;

export default meta;

type Story = StoryObj<typeof meta>;

const WaterfallChartWithGlobalTheme = (props: { series: any, format: any, globals: any }) => {
  return (
    <WaterfallChart series={props.series} format={props.format} theme={props.globals.backgrounds.value === '#333333' && 'dark' || 'light'}/>
  )
}

export const Primary: Story = {
  args: {
    format: Format.Number,
    series: [
      {
        type: ColumnType.Start,
        label: "Month 1",
        value: 100,
      },
      {
        type: ColumnType.Change,
        label: "a",
        value: -20,
      },
      {
        type: ColumnType.Change,
        label: "b",
        value: 40,
      },
      {
        type: ColumnType.Change,
        label: "c",
        value: -60,
      },
      {
        type: ColumnType.Change,
        label: "d",
        value: 50,
      },
      {
        type: ColumnType.Change,
        label: "e",
        value: 10,
      },
    ],
  },
  decorators: [
    (Story) => {
      return <Story/>;
    },
  ],
  render(args, { globals }) {
    return <WaterfallChartWithGlobalTheme globals={globals} series={args.series} format={args.format}/>
  }
};
