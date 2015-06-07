'use-strict';

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

describe('responsive-fixed-data-table', function() {
	var table;
	var ResponsiveFixedDataTable = require('../../lib/responsive-fixed-data-table');
	var container = document.createElement('div');
	container.style.width = '500px';
	container.style.height = '500px';

	beforeEach(function() {
		var props = {
			foo: 'bar',
			rowGetter: function() {},
			rowHeight: 1,
			rowsCount: 1,
			headerHeight: 1
		};
		table = React.render(<ResponsiveFixedDataTable {...props} />, container);
	});

	afterEach(function() {
		React.unmountComponentAtNode(container);
		table = null;
	});

	// _____TESTS_________________________________________________________________ //
	it('should have 100% width and height', function() {
		var tableNode = table.getDOMNode();
		expect(tableNode.style.width).toBe('100%');
		expect(tableNode.style.height).toBe('100%');
	});

	it('should transfer props and add width and height', function() {
		var tableState = table.state;
		var fixedDataTable = table.refs.table
		expect(fixedDataTable.props.foo).toBe('bar');
		expect(fixedDataTable.props.width).toBe(tableState.gridWidth);
		expect(fixedDataTable.props.height).toBe(tableState.gridHeight);
	});
});