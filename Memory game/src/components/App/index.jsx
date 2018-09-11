import React, {Component} from 'react'
import SkirtCards from "../SkirtCards/"
import './style.css'
import CardGame from "../CardGame";
import HowToPlay from "../HowToPlayFrame";
import Timer from "../Timer/index"


class App extends Component {
    constructor() {
        super();
        this.state = {
            newGameButtonPressed: false,
            gameDifficulty: '',
            skirtCard: '',
            endOfAGameState: false,
            time: '',
        }
    }

    buttonClickHandler = (difVariant, skirt) => {
        this.setState( {newGameButtonPressed: true, gameDifficulty: difVariant, skirtCard: skirt} );
    };

    restartGame = (time) => {
        if (time === -1) {alert('Game Restarted!')}
        else {
            const strToOutput = 'Congratulations! You won! Your time:' + time;
            alert(strToOutput);
        }
        this.setState( {newGameButtonPressed: false, gameDifficulty: '', skirtCard: '', endOfAGameState: false});
    };

    endOfAGame = (state) => {
        this.setState( {endOfAGameState: state});
    };

    render() {
        const gameContinuing = this.state.endOfAGameState ? 0 : 1;
        if (this.state.newGameButtonPressed){
            return <div className="board">
                <SkirtCards render={false}/>
                <CardGame gameDifficulty={this.state.gameDifficulty} skirtCard={this.state.skirtCard} restartGame={this.restartGame.bind(this)} endOfAGame={this.endOfAGame}/>
                <Timer gameContinuing={gameContinuing} restartGame={this.restartGame.bind(this)}/>
            </div>
        }

        return <div className="board">
            <HowToPlay/>
            <SkirtCards render={true} onButtonClick={this.buttonClickHandler.bind(this)}/>
        </div>
    }
}


export default App;
