import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
import 'ag-grid-enterprise';

import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';
import './styles.css'

import { startTime } from './store/reducer';
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



    removeNaNValues(rowData, event){
        let noNaNRowData = rowData.map(row=>{
            if(row.id===event.data.id){
                console.log(event.oldValue)
                return {
                    ...row,
                    quantity: event.oldValue
                    }
                    
            }
            return row
        })
        event.api.setRowData(noNaNRowData)
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

    handleSellValueChange = (val) => {
        this.props.updateSellAmount(val)
    };

    handleBuyValueChange = (val) => {
        this.props.updateBuyAmount(val)
    };

    getMainMenuItems(params){
        let updatedMenuItems = params.defaultItems.filter(item =>!(item==='autoSizeAll' || item === 'autoSizeThis'));
        return updatedMenuItems;
    };


    render() {
        return (
            <div
                className='parent'
            >
                <div
                    // style={{
                    //     height: "100%",
                    //     width: "100%"
                    //   }}
                    className='ag-theme-balham-dark'
                >
                    <ContextForRun.Provider value={{running: this.props.running, balance:this.props.balance}}>
                        <div className='sliderContainer'>
                            <label>Sell amount:</label>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                        <Slider
                                onChange={(event, val) => {
                                    this.handleSellValueChange(val);
                                }}
                                name="sellSlider"
                                ValueLabelComponent={ValueLabelComponent}
                                aria-label="custom thumb label"
                                defaultValue={DEFAULT_BUY_SELL_VALUE}
                            />
                            &nbsp;&nbsp;&nbsp;&nbsp;
                        <label id='sellSliderValueLabel'>{this.props.sellAmount}</label>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                        <label>Buy amount:</label>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <Slider
                                onChange={(event, val) => {
                                    this.handleBuyValueChange(val)
                                }}
                                name="buySlider"
                                ValueLabelComponent={ValueLabelComponent}
                                aria-label="custom thumb label"
                                defaultValue={DEFAULT_BUY_SELL_VALUE}
                            />
                            &nbsp;&nbsp;&nbsp;&nbsp;
                        <label id='buySliderValueLabel'>{this.props.buyAmount}</label>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <label>Balance: {balanceAndNetValueFormatter(this.props.balance)}</label>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <label>Net Value: {balanceAndNetValueFormatter(this.props.netValue)}</label>
                        </div>
                        <AgGridReact
                            columnDefs={[
                                {
                                    field: 'id',
                                    hide: true,

                                },
                                {
                                    field: 'country',
                                    rowGroup: true,
                                    hide: true,
                                    enableRowGroup:true,

                                },
                                {
                                    field: 'instrument',
                                    rowGroup: true,
                                    hide: true,
                                    enableRowGroup: true,

                                },
                                {
                                    field: 'quantity',
                                    aggFunc: 'sum',
                                    filter: "agNumberColumnFilter",
                                    floatingFilterComponentParams: { suppressFilterButton: true },
                                    onCellValueChanged: (event) => {
                                        
                                        if (event.oldValue < event.newValue) {
                                            let buyAmount = { amount: event.newValue - event.oldValue }
                                            event.data.quantity = event.oldValue
                                            this.props.onBuy(event.data.id, buyAmount.amount, event.data.price)
                                        }
                                        if (event.oldValue > event.newValue) {
                                            let sellAmount = { amount: event.oldValue - event.newValue }
                                            event.data.quantity = event.oldValue
                                            this.props.onSell(event.data.id, sellAmount.amount, event.data.price, event.data.quantity)
                                        }
                                        if(isNaN(event.newValue)){
                                            let newRowData = this.props.rowData.slice()
                                            event.data.quantity = event.oldValue
                                            this.removeNaNValues(newRowData, event)
                                       
                                        }
                                        
                                    },
                                    valueParser: (params) => {
                                        return Number(params.newValue)
                                        // params.data.quantity = Number(params.newValue)
                                        // return true
                                    },
                                    editable: () => { if (this.props.running) { return false } return true },

                                },
                                {
                                    field: 'price',
                                    aggFunc: 'sum',
                                    filter: "agNumberColumnFilter",
                                    floatingFilterComponentParams: { suppressFilterButton: true },
                            
                                    valueFormatter: params => {
                                        if (params.node !== null) {
                                            return _preFormatter(params, _priceFormatter)
                                        } return null
                                    },
                                    cellRenderer: "agAnimateShowChangeCellRenderer",

                                },
                                {
                                    headerName: 'B/S/K',
                                    valueGetter: params => _bskGetter(params),
                                    cellRenderer: 'bskRenderer',
                            
                                    filter: false,
                                    cellRendererParams: (params) => {
                                        return {
                                            buyButton: (id, price) => this.props.onBuy(id, this.props.buyAmount, price),
                                            sellButton: (id, price, quantity) => this.props.onSell(id, this.props.sellAmount, price, quantity),
                                            getBalance: () => this.props.balance,
                                            getSellAmount: () => this.props.sellAmount,
                                            getBuyAmount: () => this.props.buyAmount
                                        }
                                    },


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
                                flex: 1,
                                suppressMenu: true
                                
                            }}
                            
                            // popupParent={document.querySelector("body")}
                            suppressAggFuncInHeader={true}                         
                            rowGroupPanelShow={'always'}
                            frameworkComponents={{ bskRenderer: BskRenderer }}
                            rowData={this.props.rowData}
                            onGridReady={this.onGridReady.bind(this)}
                            //getMainMenuItems={this.getMainMenuItems.bind(this)}
                            onCellValueChanged={this.onCellValueChanged}
                            deltaRowDataMode={true}
                            sideBar={true}
                            floatingFilter={true}
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



const DEFAULT_BUY_SELL_VALUE = 100;

const balanceAndNetValueFormatter = (balanceOrnetValue) => {
    let balanceOrnetValueInMill = balanceOrnetValue / 1000000;
    if (balanceOrnetValueInMill < 1) {
        return (balanceOrnetValue / 1000000).toFixed(4) + ' million'
    }
    return (balanceOrnetValue / 1000000).toFixed(4) + ' millions'
}

const _bskGetter = (params) => {
    if (params.node.group) {
        return null
    }

    return Math.round((params.data.price)) < 300 ? 'BUY'
        : Math.round((params.data.price)) > 400 ? 'SELL'
            : 'KEEP'
    
};

const _preFormatter = (params, formatter) => params.node.group ? formatter(params.value) : formatter(params.data[params.column.colDef.field]);

const _priceFormatter = value => Number((Math.round(value * 100) / 100).toFixed(2));

const mapStateToProps = state => {
    return {
        rowData: state.rowData,
        running: state.running,
        sellAmount: state.sellAmount,
        buyAmount: state.buyAmount,
        balance: state.balance,
        netValue: state.netValue
    }
};

function ValueLabelComponent(props) {
    const { children, open, value } = props;

    return (
        <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
            {children}
        </Tooltip>
    );
}

ValueLabelComponent.propTypes = {
    children: PropTypes.element.isRequired,
    open: PropTypes.bool.isRequired,
    value: PropTypes.number.isRequired,
};

const mapDispatchToProps = dispatch => {

    return {
        onInitRowData: rowData => dispatch(actions.initRowData(rowData)),
        onAdvance: () => dispatch(actions.advance()),
        onRun: () => dispatch(actions.run()),
        onStop: (interval) => dispatch(actions.stop(interval)),
        onBuy: (id, amount, price) => dispatch(actions.buy(id, amount, price)),
        onSell: (id, amount, price, quantity) => dispatch(actions.sell(id, amount, price, quantity)),
        updateSellAmount: (amount) => dispatch(actions.updateSellAmount(amount)),
        updateBuyAmount: (amount) => dispatch(actions.updateBuyAmount(amount))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
