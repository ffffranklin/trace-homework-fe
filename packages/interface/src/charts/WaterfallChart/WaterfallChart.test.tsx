import {ChangeColumn, ColumnType, StartColumn} from "./types";
import {faker} from "@faker-js/faker";
import {chartService} from "./WaterfallChart";

describe('WaterfallChart', () => {
  describe('chartService', ()=> {
    describe('when min max values retrieved', ()=> {
      it('should return min max', ()=> {
        const expected = [-10, 100]
        const actual = chartService.getMinMax([
          startColumn({ value: -10}),
          changeColumn({ value: 100}),
          changeColumn({ value: 10}),
        ])

        expect(actual).toEqual(expected);
      })
    })

    describe('when y scale is created', ()=> {
      it('should return liner scale', ()=> {
        const actual = chartService.getScale([2, 5]);

        expect(actual).toBeTruthy()
      })
    })
  })
})

function column( {type, value}: { type: ColumnType.Start | ColumnType.Change, value?: number})  {
  return ({
    type,
    label: faker.lorem.word(),
    value: value || faker.number.int({min: -1000, max:1000}),
  });
}

function changeColumn({ value }: {value?: number}={}): ChangeColumn {
  return column({type: ColumnType.Change, value}) as ChangeColumn
}

function startColumn({ value }: {value?: number}={}): StartColumn{
  return column({type: ColumnType.Start, value}) as StartColumn
}
