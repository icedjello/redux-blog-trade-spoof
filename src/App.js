import React, {Component} from 'react';
import {connect} from 'react-redux';

import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
import 'ag-grid-enterprise';

import './styles.css'

import {startTime} from './store/reducer';
import * as actions from './store/actions';

import BskRenderer from './bskRenderer'

export const ContextForRun = React.createContext(undefined);

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        console.log('The grid is ready!')
    }

    advanceButtonHandler = () => {
        this.props.onAdvance()
    };

    runButtonHandler = () => {
        if (!this.props.running) {
            this.props.onRun();
        }
    };

    stopButtonHandler = () => {
        this.props.onStop(this.props.running)
    };

    render() {
        return (
            <div
                className='parent'
            >
                <div
                    className='ag-theme-balham-dark'
                >
                    <ContextForRun.Provider value={this.props.running}>
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
                                    valueGetter: params => _bskGetter(params),
                                    cellRenderer: 'bskRenderer',
                                    cellRendererParams: {
                                        buyButton: this.props.onBuy,
                                        sellButton: this.props.onSell
                                    }
                                },
                            ]}
                            autoGroupColumnDef={
                                {
                                    headerName: 'Country/Instrument',
                                }
                            }
                            defaultColDef={{
                                filter: true,
                                sortable: true,
                                flex: 1
                            }}
                            suppressAggFuncInHeader={true}
                            frameworkComponents={{bskRenderer: BskRenderer}}
                            rowData={this.props.rowData}
                            onGridReady={this.onGridReady.bind(this)}
                            deltaRowDataMode={true}
                            groupDefaultExpanded={-1}
                            onModelUpdated={() => {
                                if (startTime == null) return;
                                console.log(`transaction took: ${Date.now() - startTime} milliseconds.`)
                            }}
                            getRowNodeId={data => data.id}>
                        </AgGridReact>
                    </ContextForRun.Provider>
                </div>

                <div
                    className='button-container'
                >
                    <button
                        className='buy-sell-button'
                        onClick={this.advanceButtonHandler}
                    >Advance
                    </button>
                    <button
                        className='buy-sell-button'
                        onClick={this.runButtonHandler}
                    >Run
                    </button>
                    <button
                        className='buy-sell-button'
                        onClick={this.stopButtonHandler}
                    >Stop
                    </button>
                </div>
            </div>
        );
    }
}

const _bskGetter = (params) => {
    if (params.node.group) {
        return null
    }

    return params.data.price <= 300 ? 'BUY'
        : params.data.price >= 400 ? 'SELL'
            : 'KEEP'
};

const _preFormatter = (params, formatter) => params.node.group ? formatter(params.value) : formatter(params.data[params.column.colDef.field]);

const _priceFormatter = value => (Math.round(value * 100) / 100).toFixed(2);

const mapStateToProps = state => {
    return {
        rowData: state.rowData,
        running: state.running
    }
};


const mapDispatchToProps = dispatch => {

    return {
        onInitRowData: rowData => dispatch(actions.initRowData(rowData)),
        onAdvance: () => dispatch(actions.advance()),
        onRun: () => dispatch(actions.run()),
        onStop: (interval) => dispatch(actions.stop(interval)),
        onBuy: (params) => dispatch(actions.buy(params)),
        onSell: (params) => dispatch(actions.sell(params))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
