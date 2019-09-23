import React, { Component } from 'react';
import Web3 from 'web3'
import './App.css';
import Navbar from "./Navbar";
import ToDoList from "./ToDoList";
import ToDo from '../abis/ToDo.json'


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
    this.setState({account: account[0]});
    const networkId = await web3.eth.net.getId();
    const networkData = ToDo.networks[networkId];
    if(networkData) {
      const toDo = web3.eth.Contract(ToDo.abi, networkData.address);
      this.setState({toDo});
      const toDoCount = await toDo.methods.toDoCount().call();
      for(let i=0; i<=toDoCount; i++) {
        const task = await toDo.methods.tasks(i).call();
        this.setState({tasks : [...this.state.tasks, task]})
      }
      console.log(this.state.tasks)
    } else {
      alert("Cannot connect to network")
    }
  }


  constructor(props) {
    super(props);
    this.state = {
      account: '',
      tasks: []
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
