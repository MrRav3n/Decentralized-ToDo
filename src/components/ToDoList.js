import React from 'react'

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
            {this.props.tasks.map((task) => {
                return(
                    <div className="list-group-item col-4 font-weight-bolder" key={task.id}>
                    <li>{task.content}</li>
                    </div>
            );})}
            </ul>
             </div>
            </span>
        );
    }
}

export default ToDoList
