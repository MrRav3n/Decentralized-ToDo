import React from 'react'

//Main navbar

class Navbar extends React.Component{
    render() {
        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <a className="navbar-brand" href="#">To-Do App</a>
                    <span className="navbar-text">
                        Your account: {this.props.account} //loading account into navbar
                    </span>
                </div>
            </nav>
        );
    }
}

export default Navbar
