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
    }

    enterKeySubmit = (e) => {
        if (e.which === 13 && !e.shiftKey) {
            this.handleSubmit()
        }
    }

    handleCheckbox = (event) => {
        // console.log(event.target.name)
        this.props.completeTodo(event.target.name)
    }


    // scrollToBottom = () => {
    //     this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    // }

    // componentDidUpdate() {
    //     this.scrollToBottom();
    // }

    render() {
        // console.log(typeof (this.props.todo))
        const todolist = this.props.todo.length ? (this.props.todo.map((todo, index) => {
            return (
                <p key={index} style={{ margin: "1em" }}>
                    <label name={todo.id}>
                        <input type="checkbox" className="filled-in checkbox-white" name={todo.id} onChange={this.handleCheckbox} />
                        <span className="font-white" style={todo.completed ? { textDecoration: 'line-through' } : null}>{todo.text}</span>
                    </label>
                </p>
            )
        })) : null
        return (
            <div className="container">
                <div id='todo-box'>
                    <p>To do list for today:</p>
                    <input type="text" className="font-white" value={this.props.input} onChange={this.handleChange} onKeyPress={this.enterKeySubmit} />
                    {/* <button onClick={this.handleSubmit}>Submit</button> */}
                    <div className="todo-box">
                        {todolist}
                        {/* <div style={{ float: "right", clear: "both" }} ref={(e) => { this.messagesEnd = e }}></div> */}
                    </div>
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