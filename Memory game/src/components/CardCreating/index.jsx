import React, {Component} from "react";
import './style.css'

class CardCreating extends Component {

    constructor(params) {
        super(params);
    }

    render() {

        const imageSkirt = require('../SkirtCards/img/' + this.props.skirtCard);
        const imageContent = require('../CardGame/img/' + this.props.card.cardValue);
        var flippedCSS = this.props.card.flipped ? " Card-Back-Flip" : " Card-Front-Flip";
        if (!this.props.card.clicked) flippedCSS =  "Card-Front-Flip";
        return (
            <div className="Card">
                <div className={"Card-Front "+ flippedCSS}>
                    <img className="image" src={imageSkirt}/>
                </div>
                <div className={"Card-Back "+ flippedCSS}>
                    <img className="image" src={imageContent}/>
                </div>
            </div>
        );
    }
}

export default CardCreating;
