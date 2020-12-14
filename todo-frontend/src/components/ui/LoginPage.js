import React, { Component } from 'react';
import Button from './Button';

class LoginPage extends Component {
    constructor() {
        super();
        this.state = { userId: '' }
    }

    render() {
        return (
            <div className='todolist'>
                <label>Enter you Number:</label>
                <br></br>
                <input placeholder='Enter your phone number' onChange={this.props.handleChange}></input>
                <button onClick={this.props.logIn}>Submit</button>
            </div>
        )
    }
}

export default LoginPage;
