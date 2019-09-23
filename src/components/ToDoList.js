import React from 'react'

class ToDoList extends React.Component {
    render() {
        return(
            <form className="mt-4">
                <div className="form-row d-flex justify-content-center align-items-center">
                    <div className="col-md-5 col-8">
                        <input type="text" className="form-control" placeholder="Add To-Do"/>
                    </div>
                    <div className="col-1">
                        <button type="submit" className="btn btn-primary my-1">Submit</button>
                    </div>
                </div>
            </form>
        );
    }
}

export default ToDoList
