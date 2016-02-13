'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import ResponsiveFixedDataTable from './../../src/responsive-fixed-data-table';

describe('responsive-fixed-data-table', function() {
	let table;
	const container = document.createElement('div');
	container.style.width = '500px';
	container.style.height = '500px';

	beforeEach(function() {
		const props = {
			foo: 'bar',
			containerStyle: { width: '20%', position: 'absolute' },
			rowHeight: 1,
			rowsCount: 1,
			headerHeight: 1
		};
		table = ReactDOM.render(<ResponsiveFixedDataTable {...props} />, container);
	});

	afterEach(function() {
		ReactDOM.unmountComponentAtNode(container);
		table = null;
	});

	// _____TESTS_________________________________________________________________ //
	it('should have 100% width and height', function() {
		const tableNode = ReactDOM.findDOMNode(table);
		expect(tableNode.style.width).toBe('100%');
		expect(tableNode.style.height).toBe('100%');
	});

	it('should accept additional styles', function() {
		const tableNode = ReactDOM.findDOMNode(table);
		expect(tableNode.style.position).toBe('absolute');
	});

	xit('should not update', function() {
		const newProps = { ...table.props };
		expect(table.shouldComponentUpdate(newProps)).toBe(false);
		const newState = { ...table.state };
		expect(table.shouldComponentUpdate(newProps, newState)).toBe(false);
	});

	xit('should update', function() {
		const newProps = { headerHeight: 100, ...table.props };
		expect(table.shouldComponentUpdate(newProps)).toBe(true);
		const newState = { gridWidth: 100, ...table.state };
		expect(table.shouldComponentUpdate(newProps, newState)).toBe(true);
	});

	it('should transfer props and add width and height', function() {
		const tableState = table.state;
		const fixedDataTable = table.refs.table;
		expect(fixedDataTable.props.foo).toBe('bar');
		expect(fixedDataTable.props.width).toBe(tableState.gridWidth);
		expect(fixedDataTable.props.height).toBe(tableState.gridHeight);
	});
});