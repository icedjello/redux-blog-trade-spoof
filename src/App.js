import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
import 'ag-grid-enterprise';

import { startTime } from './store/reducer';
import * as actions from './store/actions';

class App extends Component {

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    console.log('The grid is ready!')
  }

  advanceButtonHandler = () => {
    this.props.onAdvance();
  }

  runButtonHandler = () => {
    this.props.onRun();
  }

  stopButtonHandler = () => {
    this.props.onStop();
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
                rowGroup: true,
                hide: true
              },
              {
                field: 'quantity',
                aggFunc: 'sum'
              },
              {
                field: 'price',
                aggFunc: 'sum',
                valueFormatter: params => _preFormatter(params, _priceFormatter),
                cellRenderer: "agAnimateShowChangeCellRenderer"
              },
              {
                headerName: 'B/S/K',
                field: 'bsk',
                valueFormatter: params => _preFormatter(params, _bskFormatter)
              },
            ]}
            autoGroupColumnDef={
              {
                headerName: 'Country/Instrument',
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
        <div
          style={{
            margin: '5px'
          }}
        >
          <button onClick={this.runButtonHandler}>Run</button>
          <button onClick={this.runButtonHandler}>Stop</button>
        </div>
      </Fragment>
    );
  }
}




const _preFormatter = (params, formatter) => params.node.group ? formatter(params.value) : formatter(params.data[params.column.colDef.field])


// params.node.group ? formatter(params.value) : 


const _priceFormatter = value => (Math.round(value * 100) / 100).toFixed(2)
// const _priceFormatter = value => 'hello'


const _bskFormatter = value => value === 0 ? 'BUY' : value === 1 ? 'SELL' : 'KEEP'
// const _bskFormatter = value => 'hello'



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
