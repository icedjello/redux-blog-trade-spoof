import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
import 'ag-grid-enterprise';

import { startTime } from './store/reducer';
import * as actions from './store/actions';
import { ValueService } from "ag-grid-community";

class App extends Component {

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    console.log('The grid is ready!')
  }

  advanceButtonHandler = () => {
    this.props.onAdvance();
  }

  render() {
    return (
      <Fragment>

        <div
          className='ag-theme-balham-dark'
          style={{
            width: '100%',
            height: '900px'
          }}
        >
          <AgGridReact
            columnDefs={[
              {
                field: 'id',
                hide: true
              },
              {
                field: 'country',
                rowGroup: true,
                hide: true
              },
              {
                field: 'instrument',
              },
              {
                headerName: 'B/S/K',
                field: 'bsk',
                valueFormatter: params => _preFormatter(params, _bskFormatter)

              },
              {
                field: 'quantity',
              },
              {
                field: 'price',
                aggFunc: _priceAggFunc,
                valueFormatter: params => _preFormatter(params, _priceFormatter),
                cellRenderer: "agAnimateShowChangeCellRenderer"
              },
              {
                headerName: 'High',
                // hide: true
              },
              {
                headerName: 'Low',
                // hide: true
              },
            ]}
            autoGroupColumnDef={
              {
                headerName: 'Country',
                flex: 1
              }
            }
            defaultColDef={{
              filter: true,
              sortable: true,
              flex: 1
            }}
            suppressAggFuncInHeader={true}
            rowData={this.props.rowData}
            onGridReady={this.onGridReady.bind(this)}
            deltaRowDataMode={true}
            onModelUpdated={() => {
              if (startTime == null) return;
              console.log(`transaction took: ${Date.now() - startTime} milliseconds.`)
            }}
            getRowNodeId={data => data.id}>
          </AgGridReact>
        </div>
        <div
          style={{
            margin: '5px'
          }}
        >
          <button onClick={this.advanceButtonHandler}>Advance</button>
        </div>
      </Fragment>
    );
  }
}

const _preFormatter = (params, formatter) => params.node.group ? '' : formatter(params)

const _priceFormatter = params => (Math.round(params.data.price * 100) / 100).toFixed(2)

const _bskFormatter = params => params.data.bsk === 0 ? 'BUY' : params.data.bsk === 1 ? 'SELL' : 'KEEP'

const _priceAggFunc = (values) => {
  let sum = 0;
  values.forEach(value => sum += value);
  return (Math.round(sum * 100) / 100).toFixed(2)
}


const mapStateToProps = state => {
  return {
    rowData: state.rowData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onInitRowData: rowData => dispatch(actions.initRowData(rowData)),
    onAdvance: () => dispatch(actions.onAdvance())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
