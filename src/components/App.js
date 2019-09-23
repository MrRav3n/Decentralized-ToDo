import React, { Component } from 'react';
import Web3 from 'web3'
import './App.css';
import Navbar from "./Navbar";
import ToDoList from "./ToDoList";


class App extends Component {

  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  loadWeb3() {
    if(window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      alert("Cannot connect to blockchain")
    }
  }
  async loadBlockchainData() {
    const web3 = window.web3;
    const account = await web3.eth.getAccounts();
    this.setState({account: account[0]})
  }


  constructor(props) {
    super(props);
    this.state = {
      account: ''
    }
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account}/>
        <ToDoList />
      </div>
    );
  }
}

export default App;
