import { ColDef, GridOptions } from '@ag-grid-community/core'

declare var PersonFilter: any
declare var YearFilter: any

const columnDefs: ColDef[] = [
  { field: 'athlete', minWidth: 150, filterComp: PersonFilter },
  { field: 'age', filterComp: 'agNumberColumnFilter' },
  { field: 'country', minWidth: 150 },
  { field: 'year', filterComp: YearFilter },
  {
    field: 'date',
    minWidth: 130,
    filterComp: 'agDateColumnFilter',
    filterParams: {
      comparator: function (
        filterLocalDateAtMidnight: Date,
        cellValue: string
      ) {
        const dateAsString = cellValue
        const dateParts = dateAsString.split('/')
        const cellDate = new Date(
          Number(dateParts[2]),
          Number(dateParts[1]) - 1,
          Number(dateParts[0])
        )

        if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
          return 0
        }

        if (cellDate < filterLocalDateAtMidnight) {
          return -1
        }

        if (cellDate > filterLocalDateAtMidnight) {
          return 1
        }
      },
    },
  },
  { field: 'sport' },
  { field: 'gold', filterComp: 'agNumberColumnFilter' },
  { field: 'silver', filterComp: 'agNumberColumnFilter' },
  { field: 'bronze', filterComp: 'agNumberColumnFilter' },
  { field: 'total', filterComp: 'agNumberColumnFilter' },
]

const gridOptions: GridOptions = {
  defaultColDef: {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
  },
  columnDefs: columnDefs,
  rowData: null,
}

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', () => {
  const gridDiv = document.querySelector('#myGrid')
  new agGrid.Grid(gridDiv, gridOptions)

  fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
    .then(response => response.json())
    .then(data => {
      gridOptions.api!.setRowData(data)
    })
})
