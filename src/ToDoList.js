import React from 'react';
import { connect } from 'react-redux';
import { addTodo, input, clearInput, completeTodo } from './redux/actions';

class ToDoList extends React.Component {

    handleChange = (event) => {
        this.props.inputAction(event.target.value)
        // console.log('before', this.props.input)
    }

    handleSubmit = () => {
        this.props.addTodo(this.props.input)
        this.props.clearInput()
        // console.log('after', this.props.input)
    }

    handleCheckbox = (event) => {
        // console.log(event.target.name)
        this.props.completeTodo(event.target.name)
    }

    render() {
        // const { input } = this.state
        const todolist = this.props.todo.length ? (this.props.todo.map((todo, index) => {
            return (
                <p key={index} style={{ margin: "1em" }}>
                    <label name={todo.id}>
                        <input type="checkbox" name={todo.id} onChange={this.handleCheckbox} />
                        <span style={todo.completed ? { textDecoration: 'line-through' } : null}>{todo.text}</span>
                    </label>
                </p>
            )
        })) : null
        return (
            <div className="container">
                <div id='todo-box'>
                    <p>To do list for today:</p>
                    {/* <input value={input} onChange={this.handleChange} /> */}
                    <input value={this.props.input} onChange={this.handleChange} />
                    <button onClick={this.handleSubmit}>Submit</button>
                    <div style={{ display: "flex", width: "960px", flexWrap: "wrap" }}>{todolist}</div>
                </div>
            </div>

        )
    }
}

//mapStateToProps needs to return an object,
//where the key is the new prop name to be used in the React app and the value is the name of the reducer function.
const mapStateToProps = (state) => {
    return {
        todo: state.todolist,
        input: state.input
    } // state.todolist becos in reducers.js i defined todolist = todolistReducer
};

//put all actions to dispatch to component in 1 object
const mapDispatchToProps = (dispatch) => {
    return {
        addTodo: (text) => { dispatch(addTodo(text)) },
        completeTodo: (id) => { dispatch(completeTodo(id)) },
        inputAction: (event) => { dispatch(input(event)) },
        clearInput: () => { dispatch(clearInput()) }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ToDoList)