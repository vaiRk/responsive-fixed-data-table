'use-strict';

var React = require('react');
var FixedDataTable = require('fixed-data-table');
var ResponsiveFixedDataTable = require('responsive-fixed-data-table');

var Column = FixedDataTable.Column;

var data = [
	['a1', 'b1', 'c1'],
	['a2', 'b3', 'c2'],
	['a3', 'b3', 'c3']
];

function rowGetter(rowIndex) {
  return data[rowIndex];
}

React.render(
	<ResponsiveFixedDataTable
		rowHeight={40}
		rowGetter={rowGetter}
		rowsCount={data.length}
		width={500}
		height={200}
		headerHeight={60} >
		<Column label='Col 1' width={100} dataKey={0} />
		<Column label="Col 2" width={400} dataKey={1} flexGrow={1} />
	</ResponsiveFixedDataTable>
, document.body);
