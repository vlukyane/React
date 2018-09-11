import React, {Component} from 'react'
import CardCreating from '../CardCreating/index'
import './style.css'


class CardGame extends Component {
    constructor(props) {
        super(props);

        this.height = 0;
        this.width = 0;
        if (this.props.gameDifficulty === 'Low'){
            this.height = 2;
            this.width = 5;
        }
        if (this.props.gameDifficulty === 'Medium'){
            this.height = 3;
            this.width = 6;
        }
        if (this.props.gameDifficulty === 'Hard'){
            this.height = 3;
            this.width = 8;
        }

        this.gameStates = {FFC : "flip first card", FSC: "flip second card", BAD: "bad situation"};

        //creating array of cards n shuffling it
        var cards = this.createArray(this.height, this.width);
        var cardsLogo = ['bucks.png', 'bulls.png', 'lakers.png', 'memphis.png', 'miami.png', 'wolves.png', 'pacers.png', 'clippers.png', 'pistons.png', 'dallas.png', 'admirals.png', 'chiefs.png'];
        var orderList = [];
        for (var i=0;i<this.height * this.width;i++) {
            orderList.push(Math.floor(i / 2) + 1);
            orderList[i] = cardsLogo[orderList[i] - 1];
        }
        this.shuffle(orderList);
        for (var rowIndex=0;rowIndex<this.height; rowIndex++){
            for (var columnIndex=0;columnIndex<this.width;columnIndex++){
                cards[rowIndex][columnIndex] = {cardValue: orderList[rowIndex * this.width + columnIndex], flipped: false,
                    rowIndex: rowIndex, columnIndex: columnIndex, shouldBeInvisible: false, clicked: false}
            }
        }
        //--------------end of creating cards array
        this.state = { cards : cards,
                        gameState: this.gameStates.FFC,
                        firstCard: null,
                        secondCard: null,
                        cardFlippedSuccessfully: 0};
    }

    createArray(x ,y) {
        return Array.apply(null, Array(x)).map(function(e) {
            return Array(y);
        });
    }

    shuffle(arr) {
        for (var i = arr.length;i;i--){
            var j = Math.floor(Math.random() * i);
            var x = arr[i - 1];
            arr[i - 1] = arr[j];
            arr[j] = x;
        }
    }


    cardClick(card) {
        if (!card.flipped) {
            switch (this.state.gameState){
                case this.gameStates.FFC:
                    this.state.cards[card.rowIndex][card.columnIndex].flipped = true;
                    this.state.cards[card.rowIndex][card.columnIndex].clicked = true;
                    this.setState({cards: this.state.cards, firstCard: card, gameState: this.gameStates.FSC});
                    break;
                case this.gameStates.FSC:
                    this.state.cards[card.rowIndex][card.columnIndex].flipped = true;
                    this.state.cards[card.rowIndex][card.columnIndex].clicked = true;
                    this.setState({cards: this.state.cards});
                    if (this.state.firstCard.cardValue === card.cardValue){
                        setTimeout(() => {
                            this.state.firstCard.shouldBeInvisible = true;
                            this.state.secondCard = card;
                            this.state.secondCard.shouldBeInvisible = true;
                            this.setState({gameState: this.gameStates.FFC, cards: this.state.cards, cardFlippedSuccessfully: this.state.cardFlippedSuccessfully + 1});
                            this.checkingEndOfAGame();
                        }, 700);
                    } else {
                        this.state.cards[card.rowIndex][card.columnIndex].flipped = true;
                        this.state.cards[card.rowIndex][card.columnIndex].clicked = true;
                        this.setState({cards: this.state.cards, secondCard: card});
                        setTimeout(() => {
                            this.state.cards[this.state.firstCard.rowIndex][this.state.firstCard.columnIndex].flipped = false;
                            this.state.cards[this.state.firstCard.rowIndex][this.state.firstCard.columnIndex].clicked = false;
                            this.state.cards[this.state.secondCard.rowIndex][this.state.secondCard.columnIndex].flipped = false;
                            this.state.cards[this.state.secondCard.rowIndex][this.state.secondCard.columnIndex].clicked = false;
                            this.setState({cards: this.state.cards, gameState: this.gameStates.FFC, firstCard: '', secondCard: ''});
                        }, 700);


//                        this.setState({gameState: this.gameStates.BAD, cards: this.state.cards, secondCard: card});
                    }
                    break;
                case this.gameStates.BAD:
                    this.state.cards[this.state.firstCard.rowIndex][this.state.firstCard.columnIndex].flipped = false;
                    this.state.cards[this.state.firstCard.rowIndex][this.state.firstCard.columnIndex].clicked = false;
                    this.state.cards[this.state.secondCard.rowIndex][this.state.secondCard.columnIndex].flipped = false;
                    this.state.cards[this.state.secondCard.rowIndex][this.state.secondCard.columnIndex].clicked = false;
                    this.setState({cards: this.state.cards, gameState: this.gameStates.FSC, firstCard: card});
                    this.state.cards[card.rowIndex][card.columnIndex].flipped = true;
                    this.state.cards[card.rowIndex][card.columnIndex].clicked = true;
                    this.setState({cards: this.state.cards, gameState: this.gameStates.FSC, firstCard: card});
                    break;
            }
        }
    }

    restartButtonClickHandler = () => {
        this.props.restartGame(-1);
    };

    checkingEndOfAGame = () => {
        if (this.state.cardFlippedSuccessfully === Math.floor(this.width * this.height / 2) - 1) { this.props.endOfAGame(true)} else {this.props.endOfAGame(false)}
    };

    render() {
        if (this.props.render === false) return <div></div>;
        const stringForColumns = 'repeat(' + this.width + ', minmax(200px,200px))';
        const cardBoardStyle = {
            display: 'grid',
            gridGap: '20px',
            gridTemplateColumns: stringForColumns,
            justifyContent: 'center',
            gridAutoRows: 'minmax(200px, 200px)',
            gridAutoColumns: 'minmax(200px, 200px)',
        };



        const cardsRendered = this.state.cards.map((rowOfCards, rowIndex) =>
            rowOfCards.map((card, indexOfCardInRow) =>
                <div className={card.shouldBeInvisible ? "invisible-card" : "visible-card"} onClick={() => this.cardClick(card)}>
                    <CardCreating card={card} skirtCard={this.props.skirtCard}/>
                </div>
        ));
        return <div className="game">
            <div className="card-board" style={cardBoardStyle}>
                {cardsRendered}
            </div>
            <button className="button-for-restart-game" onClick={() => this.restartButtonClickHandler()}>Restart</button>
        </div>
    }
}


export default CardGame;
