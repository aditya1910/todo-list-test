import Header from './Header';
import Footer from './Footer';
import FilteredList from './FilteredList';
const axios = require('axios');
import React, { Component } from 'react';
const baseUrl = 'http://localhost:3001/'

class TodoList extends Component {
    constructor(props) {
        super(props)
        this.state = { loading: true, toDoList: [], filter: 'all', filteredList: [] }
        this.getToDoList()
    }

    getToDoList = async () => {
        const { userId } = this.props
        const response = await axios.get(`${baseUrl}toDo/allToDo/userId/${userId}`)
        const { result } = response.data
        this.setState({ toDoList: result, loading: false })
        this.changeFilter(this.state.filter)
    }

    addNew = async (todo) => {
        const { userId } = this.props
        const body = { userId, todo }
        const uri = `${baseUrl}toDo/`
        const response = await axios.post(uri, body)
        this.getToDoList()
    }

    changeStatus = async (_id, checked) => {
        const uri = `${baseUrl}toDo/${_id}/status/${checked ? 'COMPLETED' : 'ACTIVE'}`
        const response = await axios.put(uri)
        this.getToDoList()
    }


    changeFilter = (key) => {
        const { toDoList } = this.state
        if (key === 'completed') {
            this.setState({ filteredList: toDoList.filter(item => { return item.status === 'COMPLETED' }), filter: key })
        } else if (key === 'active') {
            this.setState({ filteredList: toDoList.filter(item => { return item.status === 'ACTIVE' }), filter: key })
        } else {
            this.setState({ filteredList: toDoList, filter: key })
        }
        this.setState({ filter: key })
    }

    deleteTodo = async (_id) => {
        const uri = `${baseUrl}toDo/${_id}`
        const response = await axios.delete(uri)
        this.getToDoList()
    }

    addSubTask = async (parentTaskId, todo) => {
        const { userId } = this.props
        const body = { userId, todo, parentTaskId }
        const uri = `${baseUrl}toDo/`
        const response = await axios.post(uri, body)
        this.getToDoList()
    }


    render() {
        const count = this.state.filteredList.length
        return (
            <div className="container" >
                <div className="row">
                    <div className="todolist">
                        <Header addNew={this.addNew} />
                        <FilteredList items={this.state.filteredList}
                            changeStatus={this.changeStatus}
                            deleteTodo={this.deleteTodo}
                            addSubTask={this.addSubTask}
                        />
                        <Footer count={count} filter={this.state.filter} changeFilter={this.changeFilter} />
                    </div>
                </div>
            </div>
        )
    }
}

export default TodoList;
