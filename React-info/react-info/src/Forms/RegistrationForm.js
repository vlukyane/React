import React, { Component } from 'react';

class RegistrationForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: ''
        };

    }

    handleSubmit(event) {
        event.preventDefault();
        console.log('form is submitted value is', this.state.email)
    }

    handleEmailChange(event) {
        console.log('email was changed', event.target.value);
        this.setState = ({
            email: event.target.value
        });
    }

    render() {
        console.log(this.state.email);
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <input
                    type="text"
                    placeholder="E-mail"
                    value={this.state.email}
                    onChange={this.handleEmailChange.bind(this)}
                />
                <button>Save</button>
            </form>
        )
    }
}


export default RegistrationForm;