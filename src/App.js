import React, { Component } from 'react';
import { connect } from 'react-redux';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
import 'ag-grid-enterprise';

import './styles.css'

import { startTime } from './store/reducer';
import * as actions from './store/actions';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
    this.intervalUpdater = null;
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    console.log('The grid is ready!')
  }

  advanceButtonHandler = () => {
    this.props.onAdvance()
  }

  runButtonHandler = () => {
    this.intervalUpdater = setInterval(this.props.onAdvance, 300)
  }

  stopButtonHandler = () => {
    clearInterval(this.intervalUpdater);
  }

  render() {
    return (
      <div
        className='parent'
      >
        <div
          className='ag-theme-balham-dark'
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
          className='button-container'
        >
          <div
            className='cremeButton-wrap'
          >
            <button
              className='cremeButton'
              onClick={this.advanceButtonHandler}
            >
              Advance</button>
            <button
              className='cremeButton'
              onClick={this.runButtonHandler}
            >
              Run</button>
            <button
              className='cremeButton'
              onClick={this.stopButtonHandler}
            >
              Stop</button>
          </div>
        </div>


      </div>
    );
  }
}

const _preFormatter = (params, formatter) => params.node.group ? formatter(params.value) : formatter(params.data[params.column.colDef.field])

const _priceFormatter = value => (Math.round(value * 100) / 100).toFixed(2)

const _bskFormatter = value => value === 0 ? 'BUY' : value === 1 ? 'SELL' : 'KEEP'

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
