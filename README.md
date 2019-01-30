# bnp-crud-ui

## Overview

bnp-crud-ui is a reusable React component with general CRUD functionality that aims to make viewing, editing and creating entries on OpusCapita microservices easy and accessible.

## Options

| Property        | Type   | Description |
|:----------------|:-------|:------------|
| dataUrl         | string |A string defining the url to the api endpoint connecting to the table. |
| styles          | Object | An object defining styling rules for the table. |
| shownRows       | Number | A number defining the amount of rows that the table shows initially. |
| initiallySorted | String | A string of the field that the table is sorted by initially. |
| lockedRows      | Object | An Object defining rows locked by a field and multiple values. |
| lockedColumns   | Array  | An array of columns that are not editable. |
| notEmptyColums  | Array  | An array of columns that are not allowed to be empty. |

### styles
| Property        | Type   | Description |
|:----------------|:-------|:------------|
| striped         | Bool   | Defines if the table-rows should have zebra-striped layout.
| hovered         | Bool   | Defines if the table-rows should change background color on hover.

### lockedRows
| Property        | Type   | Description |
|:----------------|:-------|:------------|
| field           | String | The field by wich the values are locked. |
| value           | Array  | The values that are locked. |
| unSelectable    | Bool   | Defines if the locked values should be selectable or not. |

## Example
The following shows an example of an implementation of the bnp-crud-ui DataTable component:

```jsx
<DataTable
    dataUrl={ url }
    styles={
        {
            striped: true,
            hovered: true
        }
    }
    shownRows={ 10 }
    initiallySortedColumn={ 'id' }
    lockedRows={
        {
            field: 'customerId',
            value: [ 'test' ],
            unSelectable: true
        }
    }
    lockedColumns={
        [ 'id', 'status' ]
    }
    notEmptyColumns={
        [ 'customerId' ]
    }
/>
```