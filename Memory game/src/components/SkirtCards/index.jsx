import React, {Component} from 'react'
import './style.css'

class GameDifficulty extends Component {
    constructor(params) {
        super(params);
        this.state = {
            choseSkirt: '',
            choseDifficultyVariant: '',
            newGameButtonPressed: false,
        };
    }

    skirtClick (skirt) {
        this.setState( {choseSkirt: skirt} );
    }

    variantClick (variant) {
        this.setState( {choseDifficultyVariant: variant} );
    }

    render() {

        if (!this.props.render) return (<div className="game-board">
            <div className="options-after-start">
                <div className="skirt-cards">
                    <h4 className="h4-for-skirts">Skirt Cards</h4>
                </div>
                <div className="difficulty-variants">
                    <h4 className="h4-for-skirts">Game Difficulty</h4>
                </div>
            </div>
        </div>
        );

        const skirtVariants = ['logo-ball.png', 'logo-basket.png', 'logo-nba.png'];
        const images = [require('./img/logo-ball.png'), require('./img/logo-basket.png'), require('./img/logo-nba.png')];
        const skirtVariantsToRender = skirtVariants.map((skirt, indexOfSkirt) =>
            <div className={this.state.choseSkirt === skirt ? "red-border" : "casual-border"} key={indexOfSkirt} onClick={() => this.skirtClick(skirt)}><img src={images[indexOfSkirt]}/></div>);

        const difficultyVariants = ['Low', 'Medium', 'Hard'];
        const difficultyVariantsToRender = difficultyVariants.map((variant, indexOfVariant) =>
            <div className={this.state.choseDifficultyVariant === variant ? "red-border" : "casual-border"} key={indexOfVariant} onClick={() => this.variantClick(variant)}>{variant}</div>);

        return ( <div className="game-board">
                <div className="options-before-start">
                    <div className="skirt-cards">
                        <h4 className="h4-for-skirts">Skirt Cards</h4>
                        {skirtVariantsToRender}
                    </div>
                    <div className="difficulty-variants">
                        <h4 className="h4-for-skirts">Game Difficulty</h4>
                        {difficultyVariantsToRender}
                    </div>
                </div>
                <button className='button-for-new-game' onClick = {() => this.props.onButtonClick(this.state.choseDifficultyVariant, this.state.choseSkirt)}>
                    New Game
                </button>
            </div>

        )

    }
}

export default GameDifficulty;
