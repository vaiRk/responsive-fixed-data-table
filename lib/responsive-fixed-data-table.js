'use-strict';

var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var Table = require('fixed-data-table').Table;
var debounce = require('debounce');

var ResponsiveFixedDataTable = React.createClass({
	mixins: [ PureRenderMixin ],

	getInitialState: function() {
		return {
			gridWidth: 100,
			gridHeight: 100
		};
	},

	componentDidMount: function() {
		this._setDimensionsOnState();
	},

	componentWillMount: function() {
		this._setDimensionsOnState = debounce(this._setDimensionsOnState, 250);
		window.addEventListener('resize', this._setDimensionsOnState);
	},

	componentWillUnmount: function() {
		window.removeEventListener('resize');
	},

	_setDimensionsOnState: function() {
		if (this.isMounted()) {
			var tableWrapperNode = this.getDOMNode();
			this.setState({
				gridWidth: tableWrapperNode.offsetWidth,
				gridHeight: tableWrapperNode.offsetHeight
			});
		}
	},

	/**
	 * @return {ReactDOMNode}
	 */
	render: function() {
		var wrapperStyle = { width: '100%', height: '100%' };

		return (
			<div style={wrapperStyle}>
				<Table {...this.props} width={this.state.gridWidth} height={this.state.gridHeight} />
			</div>
		);
	}
});

module.exports = ResponsiveFixedDataTable;