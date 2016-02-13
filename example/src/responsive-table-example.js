'use strict';

import React from 'react';
import { render } from 'react-dom';
import { Column, Cell } from 'fixed-data-table';
import ResponsiveFixedDataTable from 'responsive-fixed-data-table';

const data = [
	{ name: 'Olivia Dunham', email: 'odunham@fbi.gov' },
	{ name: 'Walter Bishop', email: 'drbishop@harvard.edu' },
	{ name: 'Peter Bishop', email: 'peterbishop@fbi.gov' },
	{ name: 'Astrid Farnsworth', email: 'afarnsworth@fbi.gov' }
];

class MyCell extends React.Component {
	render() {
		const { rowIndex, data, field, ...props } = this.props;
		return (
			<Cell {...props}>
				{data[rowIndex][field]}
			</Cell>
		);
	}
}

render(
	<ResponsiveFixedDataTable
	rowHeight={40}
	rowsCount={data.length}
	width={500}
	height={200}
	headerHeight={60} >
	<Column
		header={<Cell>Name</Cell>}
		cell={<MyCell data={data} field='name' />}
		width={200} />
	<Column
		header={<Cell>Email</Cell>}
		cell={<MyCell data={data} field='email' />}
		width={400}
		flexGrow={1} />
</ResponsiveFixedDataTable>
, document.getElementById('example-container'));