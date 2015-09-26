[![npm version](https://badge.fury.io/js/responsive-fixed-data-table.svg)](http://badge.fury.io/js/responsive-fixed-data-table)
# responsive-fixed-data-table
Responsive wrapper for [Facebook's Fixed-Data-Table](https://github.com/facebook/fixed-data-table) grids

## Installation
This module is available as an npm package.

    npm install [--save] responsive-fixed-data-table

## Usage
```js
var React = require('react');
var Column = require('fixed-data-table').Column;
var ResponsiveFixedDataTable = require('responsive-fixed-data-table');

var ResponsiveTable = React.createClass({
  render: function() {
    return (
      <ResponsiveFixedDataTable {...tableProps}>
        <Column {...columnsProps} />
      </ResponsiveFixedDataTable>
    );
  }
});

module.exports = ResponsiveTable;
```

All passed props will be passed to the underlying FixedDataTable component. Please check [FixedDataTable docs](http://facebook.github.io/fixed-data-table/api-table.html) for a list of available options.  
Width and height will be overriden to take all the available space of its parent container.

### Additional configuration
**containerStyle** *{Object}*: Additional styles to be set on the container div.  
**refreshRate** *{Number}*: Time in milliseconds to debounce the resize handler.
