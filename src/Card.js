import React, { Component } from "react";
import "./Card.css";
export default class Card extends Component {
  constructor(props) {
    super(props);
    const angle = Math.random() * 90 - 45;
    const xPos = Math.random() * 44 - 22;
    const yPos = Math.random() * 44 - 22;
    this.moveCard = `translate(${xPos}px, ${yPos}px) rotate(${angle}deg)`;
  }

  render() {
    return (
      <img
        className="Card"
        src={this.props.image}
        alt={this.props.name}
        style={{ transform: this.moveCard }}
      />
    );
  }
}
