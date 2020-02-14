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
                field: 'instrument',
              },
              {
                headerName: 'B/S/K',
                field: 'bsk',
              },
              {
                field: 'quantity',
              },
              {
                field: 'price'
              },
              {
                headerName: 'High',
                hide: true
              },
              {
                headerName: 'Low',
                hide: true
              },
            ]}
            autoGroupColumnDef={
              {
                headerName: 'Letter',
                flex: 1
              }
            }
            defaultColDef={{
              filter: true,
              sortable: true,
              flex: 1
            }}
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
