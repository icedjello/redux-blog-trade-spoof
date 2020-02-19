import React, { Component } from "react";

export default class BskRenderer extends Component {
  constructor(props) {
    super(props);
    this.state = { value: props.value }
    this.node = props.node;
  }

  handleBuy = event => {
    this.setState({ value: event.target.value });
  };

  handleSell = event => {
    this.setState({ value: event.target.value });
  };

  recommendation = value => {
    const buyRec = <div className="buy recommendation">BUY</div>
    const sellRec = <div className="sell recommendation">SELL</div>
    const keepRec = <div className="keep recommendation">KEEP</div>

    return value === 'BUY' ? buyRec : value === 'SELL' ? sellRec : keepRec
  }

  buyButton = () => <button className="buy-sell-button" onClick={this.handleBuy}>BUY</button>

  sellButtons = () => <button className="buy-sell-button " onClick={this.handleSell}>SELL</button>

  renderCell = value => {
    const cell = <div className="bskCell">{this.recommendation(this.state.value)}{this.buyButton()}{this.sellButtons()}</div>
    return this.props.node.group ? <span>-</span> : cell
  }

  render() {
    return (
      <div>{this.renderCell(this.state.value)}</div>

    );
  }
};
