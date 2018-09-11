import React from 'react'
import elapsedTime from './elapsedTime'

export default function ElapsedTime(props) {
    const format = require('format-duration');
    //console.log(format(elapsedTime(props.timingEvents)));
    return (
        <div className='elapsed-time'>
            { format(elapsedTime(props.timingEvents)) }
        </div>
    )
}
