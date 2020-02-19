import React, { Component } from "react";

export default class BskRenderer extends Component {
  constructor(props) {
    super(props);
    this.state = { value: props.value }
  }

  handleBuy = event => {
    this.setState({ value: event.target.value });
  };

  handleSell = event => {
    this.setState({ value: event.target.value });
  };

  recommendation = value => {
    const buyRec = <button className="buy recommendation">BUY</button>
    const sellRec = <button className="sell recommendation">SELL</button>
    const keepRec = <button className="keep recommendation">KEEP</button>

    return (
      value === 'BUY' ? buyRec :
        value === 'SELL' ? sellRec :
          keepRec
    );
  }

  buyButton = () => <button className="btn btn-buy" onClick={this.handleBuy}>BUY</button>

  sellButtons = () => <button className="btn btn-sell" onClick={this.handleSell}>SELL</button>

  renderCell = () => <span>{this.recommendation(this.state.value)}{this.buyButton()}{this.sellButtons()}</span>

  render() {
    return (
      <div>{this.renderCell()}</div>

    );
  }
};
