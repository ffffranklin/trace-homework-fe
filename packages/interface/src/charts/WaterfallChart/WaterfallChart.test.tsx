import { ChangeColumn, ColumnType, Series, StartColumn, WaterfallStep } from "./types";
import { faker } from "@faker-js/faker";
import { chartService } from "./WaterfallChart";

describe('WaterfallChart', () => {
  describe('chartService', () => {
    describe('when waterfall data is generated', () => {
      it('should map columns to steps and add end step', () => {
        const series: Series = [
          startColumn({ value: faker.number.int({ min: -100, max: 100 }) }),
          changeColumn({ value: faker.number.int({ min: -100, max: 100 }) }),
          changeColumn({ value: faker.number.int({ min: -100, max: 100 }) }),
        ]
        const actual = chartService.waterfallData(series)
        const expected: WaterfallStep[] = [
          {
            name: 'start',
            subtotal: series[0].value,
            value: series[0].value,
            columnType: series[0].type,
            columnLabel: series[0].label,
            columnValue: series[0].value,
          },
          {
            name: '0',
            subtotal: series[0].value + series[1].value,
            value: series[1].value,
            columnType: series[1].type,
            columnLabel: series[1].label,
            columnValue: series[1].value,
          },
          {
            name: '1',
            subtotal: series[0].value + series[1].value + series[2].value,
            value: series[2].value,
            columnType: series[2].type,
            columnLabel: series[2].label,
            columnValue: series[2].value,
          },
          {
            name: 'end',
            subtotal: series[0].value + series[1].value + series[2].value,
            value: series[0].value + series[1].value + series[2].value,
            columnType: ColumnType.End,
            columnLabel: null,
            columnValue: null
          }
        ]

        expect(actual).toEqual(expected);
      });
    })

    describe('when chart height is retrieved', ()=> {
      it.todo('should derive height to fit view port')
    })

    describe('when chart width is retrieved', ()=> {
      it.todo('should derive height to fit view port')
    })

    describe('when series scale is retrieved', () => {
      it('should generate from series', () => {
        const height = faker.number.int({min: 0})
        const data: WaterfallStep[] = chartService.waterfallData([
          startColumn({ value: -10 }),
          changeColumn({ value: 100 }),
        ]);
        const actual = chartService.getLeftScale(data, height);
        actual.tickFormat
        expect(actual.range()).toEqual([height, 0]);
        expect(actual.domain()).toEqual([
          data.length,
          0,
        ]);
      })
    })
  })
})

function column({ type, value }: { type: ColumnType, value?: number }) {
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
