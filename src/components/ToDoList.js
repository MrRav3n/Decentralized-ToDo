import React from 'react'
import './App.css';
class ToDoList extends React.Component {


    render() {


        return(
            <span>
            <div className="d-flex justify-content-center mt-5">
            <form className="form-inline" onSubmit = {(event) => {
                event.preventDefault();
                this.props.onClick(this.newTask.value);

                }}
                >

                <input type="text" ref={(input) => this.newTask = input } className="form-control mr-2" placeholder="Add To Do" />
                <button type="submit" className="btn btn-primary mb-2 mt-2">Add to do</button>

            </form>
            </div>
           <div>

            <ul className="list-group d-flex  align-items-center mt-5">

            <div className="list-group-item col-8 font-weight-bolder ">
            <li className="d-inline"><h1 className="text-center">Tasks To Do!</h1></li>
            </div>
            {this.props.tasks.map((task) => {
                return(
                    <div className="list-group-item col-8 font-weight-bolder d-inline" key={task.id}>
                    <span onClick={(event) => {
                        this.props.checkboxOnClick(task.id.toNumber())
                    }} className="mr-3 col-2 deleteSpan">Delete</span>
                    <li className="d-inline liSpan">{task.content}</li>

                    </div>
            );})}
            </ul>
            <ul className="list-group d-flex  align-items-center mt-5">
            <div className="list-group-item col-8 font-weight-bolder ">
            <li className="d-inline"><h1 className="text-center">Tasks already completed</h1></li>

            </div>
            {this.props.tasksCompleted.map((task) => {
                return(
                    <div className="list-group-item col-8 font-weight-bolder " key={task.id}>
                    <li className="d-inline">{task.content}</li>

                    </div>
                );
            })}
            </ul>
             </div>

            </span>
        );
    }
}

export default ToDoList
