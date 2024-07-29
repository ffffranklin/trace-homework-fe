import { ChangeColumn, ColumnType, Series, StartColumn } from "./types";
import { faker } from "@faker-js/faker";
import { chartService } from "./WaterfallChart";

describe('WaterfallChart', () => {
  describe('chartService', () => {
    describe('when series scale is retrieved', () => {
      it('should generate from series', () => {
        const series: Series = [
          startColumn({ value: -10 }),
          changeColumn({ value: 100 }),
        ]
        const actual = chartService.getOrdinalScale(series);
        actual.tickFormat
        expect(actual.range()).toEqual([0, 1]);
        expect(actual.domain()).toEqual([
          series[0].value,
          series[1].value,
        ]);
      })
    })
  })
})

function column({ type, value }: { type: ColumnType.Start | ColumnType.Change, value?: number }) {
  return ({
    type,
    label: faker.lorem.word(),
    value: value || faker.number.int({ min: -1000, max: 1000 }),
  });
}

function changeColumn({ value }: { value?: number } = {}): ChangeColumn {
  return column({ type: ColumnType.Change, value }) as ChangeColumn
}

function startColumn({ value }: { value?: number } = {}): StartColumn {
  return column({ type: ColumnType.Start, value }) as StartColumn
}
