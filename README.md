[![npm version](https://badge.fury.io/js/responsive-fixed-data-table.svg)](http://badge.fury.io/js/responsive-fixed-data-table)
# responsive-fixed-data-table
Responsive wrapper for [Facebook's Fixed-Data-Table](https://github.com/facebook/fixed-data-table) grids

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


```

Width and height of your table will be overriden to take all the available space of its parent container.
