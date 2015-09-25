'use-strict';

var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var Table = require('fixed-data-table').Table;
var debounce = require('debounce');
var assign = require('react/lib/Object.assign');

var ResponsiveFixedDataTable = React.createClass({
	mixins: [ PureRenderMixin ],

	propTypes: {
		containerStyle: React.PropTypes.object,
		refreshRate: React.PropTypes.number
	},

	getDefaultProps: function() {
		return {
			containerStyle: {},
			refreshRate: 250 // ms
		};
	},

	getInitialState: function() {
		return {
			gridWidth: 1,
			gridHeight: 1
		};
	},

	componentDidMount: function() {
		this._setDimensionsOnState();
		this._attachResizeEvent();
	},

	componentWillMount: function() {
		this._setDimensionsOnState = debounce(this._setDimensionsOnState, this.props.refreshRate);
	},

	componentWillUnmount: function() {
		window.removeEventListener('resize', this._setDimensionsOnState);
	},

	_attachResizeEvent: function() {
		var win = window;

		if (win.addEventListener) {
			win.addEventListener('resize', this._setDimensionsOnState, false);
		} else if (win.attachEvent) {
			win.attachEvent('resize', this._setDimensionsOnState);
		} else {
			win.onresize = this._setDimensionsOnState;
		}
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

	_getStyle: function() {
		return assign(this.props.containerStyle, {
			width: '100%',
			height: '100%'
		});
	},

	/**
	 * @return {ReactDOMNode}
	 */
	render: function() {
		return (
			<div style={this._getStyle()}>
				<Table {...this.props} ref='table' width={this.state.gridWidth} height={this.state.gridHeight} />
			</div>
		);
	}
});

module.exports = ResponsiveFixedDataTable;
