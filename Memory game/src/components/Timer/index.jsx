import React from 'react'
import ElapsedTime from './Elapsed-time/index'
import elapsedTime from './Elapsed-time/elapsedTime'

import './style.css'

class Timer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            timingEvents: [],
            nonce: 0,
        };
        this.addTimerEvent = this.addTimerEvent.bind(this);
        this.tick = this.tick.bind(this);
        this.poll = setInterval(this.tick, 1000)
    }

    tick() {
        this.setState((prevState) => ({ nonce: prevState.nonce+1 }))
    }

    giveTime = () => {
        const format = require('format-duration');
        return format(elapsedTime(this.state.timingEvents));

    };

    addTimerEvent() {
        this.setState({
            timingEvents: [
                new Date()
            ]
        })
    }

    render() {
        if (this.props.gameContinuing === 0){
            this.props.restartGame(this.giveTime());
        }
        if (this.state.nonce === 0){
            this.addTimerEvent();
            this.setState({nonce: 1});
        }

        return (
            <div className='container'>
                <ElapsedTime
                    timingEvents={this.state.timingEvents}
                />
            </div>
        )
    }
}

export default Timer
