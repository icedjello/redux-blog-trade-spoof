import React, {Component} from "react";
import {ContextForRun} from "./App";

export default class BskRenderer extends Component {
    constructor(props) {
        super(props);
        this.state = {value: props.value};
        this.node = props.node;
    }

    handleBuy = event => {
        // this.setState({value: event.target.value});
        this.props.buyButton({rowIndex: this.params.rowIndex, colKey: this.params.colKey})
    };

    handleSell = event => {
        // this.setState({value: event.target.value});
        this.props.buyButton({rowIndex: this.params.rowIndex, colKey: this.params.colKey})
    };

    recommendation = value => {
        const buyRec = <div className="buy recommendation">BUY</div>;
        const sellRec = <div className="sell recommendation">SELL</div>;
        const keepRec = <div className="keep recommendation">KEEP</div>;

        return value === 'BUY' ? buyRec : value === 'SELL' ? sellRec : keepRec
    };

    buyButton = () => {
        // debugger;
        return (
                <button className="buy-sell-button" onClick={this.handleBuy}>BUY</button>
        );
    };

    sellButtons = () => {
        return (
                <button className="buy-sell-button " onClick={this.handleSell}>SELL</button>
        )
    };

    renderCell = (running) => {
        const grouped = <span>-</span>;
        const cell = <div className="bskCell">
            {this.recommendation(this.state.value)}
            {this.buyButton()}
            {this.sellButtons()}
        </div>;
        if (running != null) return this.recommendation(this.state.value);
        return this.props.node.group ? grouped : cell
    };

    render = () => {
        return (
            <ContextForRun.Consumer>
                {(running) => (
                    <div>
                        {this.renderCell(running)}
                    </div>
                )}
            </ContextForRun.Consumer>
        );
    }
};
