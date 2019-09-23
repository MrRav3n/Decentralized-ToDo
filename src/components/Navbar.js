import React from 'react'

class Navbar extends React.Component{
    render() {
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
            <a className="navbar-brand" href="#">Navbar w/ text</a>
             <span className="navbar-text">
                    {this.props.account}
             </span>
            </div>
        </nav>
    );}
}

export default Navbar