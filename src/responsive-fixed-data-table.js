'use strict';

import React from 'react';
import { findDOMNode } from 'react-dom';
import { Table } from 'fixed-data-table';
import debounce from 'lodash/debounce';
import assign from 'lodash/assign';
import isEqual from 'lodash/isEqual';

const initialPixels = 1;

export default class ResponsiveFixedDataTable extends React.Component {
	constructor(props, context) {
		super(props, context);
	}

	static propTypes = {
		containerStyle: React.PropTypes.object,
		refreshRate: React.PropTypes.number
	};

	static defaultProps = {
		containerStyle: {},
		refreshRate: 250 // ms
	};

	state = {
		gridWidth: initialPixels,
		gridHeight: initialPixels
	};

	shouldComponentUpdate(nextProps, nextState) {
		return !isEqual(this.props, nextProps) || !isEqual(this.state, nextState);
	}

	componentDidMount() {
		this.__isMounted = true;
		this._setDimensionsOnState();
		this._attachResizeEvent();
	}

	componentWillMount() {
		const { refreshRate } = this.props;
		this._setDimensionsOnState = debounce(this._setDimensionsOnState, refreshRate);
	}

	componentWillUnmount() {
		this.__isMounted = false;
		window.removeEventListener('resize', this._setDimensionsOnState);
	}

	_attachResizeEvent() {
		if (window.addEventListener) {
			window.addEventListener('resize', this._setDimensionsOnState, false);
		} else if (window.attachEvent) {
			window.attachEvent('resize', this._setDimensionsOnState);
		} else {
			window.onresize = this._setDimensionsOnState;
		}
	}

	_setDimensionsOnState = () => {
		if (this.__isMounted) {
			const { offsetWidth, offsetHeight } = findDOMNode(this);

			this.setState({
				gridWidth: offsetWidth || initialPixels,
				gridHeight: offsetHeight || initialPixels
			});
		}
	}

	_getStyle() {
		return {
			...this.props.containerStyle,
			width: '100%',
			height: '100%'
		};
	}

	render() {
		const { gridWidth, gridHeight } = this.state;

		return (
			<div style={this._getStyle()}>
				<Table ref='table' {...this.props} width={gridWidth} height={gridHeight} />
			</div>
		);
	}
};
