import React, {Component} from 'react'
import './style.css'

class HowToPlay extends Component {

    render() {
        return (
            <div className="how-to-play-window">
                <div className="how-to-play">
                    <h4><strong>How to play</strong>:</h4>
                    <h4> Memory is a counter game where the object is to find pairs.</h4>
                    <h4> When the game begins, all pictures are hidden</h4>
                    <h4><strong> To Play:</strong></h4>
                </div>

                <div className="to-play">
                    <ol>
                        <li>Select two cards to try to match the pictures.</li>
                        <li>If you match the pictures you can go again.</li>
                        <li>If they don`t match it is the computer turn them.</li>
                        <li>The player that finds all pairs wins!</li>
                        <li>Have Fun!</li>
                    </ol>
                </div>
            </div>
    )
    }
}


export default HowToPlay;
