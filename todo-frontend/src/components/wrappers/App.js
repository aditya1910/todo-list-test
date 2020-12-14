import React, { Component } from 'react';
import TodoList from '../ui/TodoList';
import LoginPage from '../ui/LoginPage'

class App extends Component {
    constructor() {
        super()
        this.state = { userId: '', val: '' }
    }

    logIn = () => {
        const { val } = this.state
        this.setState({ userId: val })
    }

    handleChange = (event) => {
        const val = event.target.value
        this.setState({ val })
    }

    render() {
        return (
            <div>
                {this.state.userId !== '' ? <TodoList userId={this.state.userId} /> :
                    <LoginPage
                        handleChange={this.handleChange}
                        logIn={this.logIn} />}
            </div>
        );
    }
}

export default App;
