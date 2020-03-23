import React, { Component } from "react";
import { ContextForRun } from "./App";

export default class BskRenderer extends Component {
    constructor(props) {
        super(props);
        this.state = { value: props.value };
        this.node = props.node;
    }

    handleSell = event => {
        this.props.sellButton(this.node.data.id, this.node.data.price, this.node.data.quantity)

    };

    handleBuy = event => {
        this.props.buyButton(this.node.data.id, this.node.data.price, this.node.data.quantity)
    };


    recommendation = value => {
        const buyRec = <div className="buy recommendation">BUY</div>;
        const sellRec = <div className="sell recommendation">SELL</div>;
        const keepRec = <div className="keep recommendation">KEEP</div>;

        return value === 'BUY' ? buyRec : value === 'SELL' ? sellRec : keepRec
    };

    sellButton = (netValue) => {
        let disableSell = false;
        if (!this.node.group) {
            disableSell = (this.node.data.quantity === 0)
        }
        return (
            <button disabled={disableSell} className="buy-sell-button" onClick={this.handleSell}>SELL</button>
        );
    };

    buyButton = (balance) => {
        let disableBuy = false;
        if (!this.node.group) {
            disableBuy = this.node.data.price > balance
        }
        return (
            <button disabled={disableBuy} className="buy-sell-button " onClick={this.handleBuy}>BUY</button>
        )
    };

    renderCell = (running, balance, netValue) => {
        const grouped = <span>-</span>;
        const cell = <div className="bskCell">
            {this.recommendation(this.state.value)}
            {this.buyButton(balance)}
            {this.sellButton(netValue)}
        </div>;

        if (running != null) {
            if (!this.node.group) {
                return this.recommendation(this.state.value)
            } else {
                return <span>-</span>
            }
        };
        return this.props.node.group ? grouped : cell
    };

    render = () => {
        return (
            <ContextForRun.Consumer>
                {(runningAndBalance) => (
                    <div>
                        {this.renderCell(runningAndBalance.running, runningAndBalance.balance)}
                    </div>
                )}
            </ContextForRun.Consumer>
        );
    }
};


