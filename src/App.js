import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
import 'ag-grid-enterprise';

import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';
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

    handleSellValueChange = (val) => {
        this.props.updateSellAmount(val)
    };
    
    handleBuyValueChange = (val) => {
        this.props.updateBuyAmount(val)
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
                        <div className='sliderContainer'>
                            <label>Sell amount:</label>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                        <Slider
                            onChange = {(e, val)=>{
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
                            onChange = {(e, val)=>{
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
                        <label>Balance: {this.props.balance}</label>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <label>Net Value: {this.props.netValue}</label>
                        </div>
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
                                    cellRendererParams: (params)=>{
                                        return{
                                        buyButton: ()=>this.props.onBuy(params.data.id, this.props.buyAmount),
                                        sellButton: ()=>this.props.onSell(params.data.id, this.props.sellAmount),
                                        getBalance: ()=>  this.props.balance,
                                        getSellAmount: ()=> this.props.sellAmount
                                    }}
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



const DEFAULT_BUY_SELL_VALUE = 100;

const _bskGetter = (params) => {
    if (params.node.group) {
        return null
    }

    return Math.round((params.data.price * Math.random(0, 3))) % 3 === 0 ? 'BUY'
        : Math.round((params.data.price * Math.random(0, 3))) % 2 === 0 ? 'SELL'
            : 'KEEP'
};

const _preFormatter = (params, formatter) => params.node.group ? formatter(params.value) : formatter(params.data[params.column.colDef.field]);

const _priceFormatter = value => (Math.round(value * 100) / 100).toFixed(2);

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
        onBuy: (id, quantity) => dispatch(actions.buy(id, quantity)),
        onSell: (id, quantity) => dispatch(actions.sell(id, quantity)),
        updateSellAmount: (amount) => dispatch(actions.updateSellAmount(amount)),
        updateBuyAmount: (amount) => dispatch(actions.updateBuyAmount(amount))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
