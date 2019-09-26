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
    await this.loadContract();
  }

  loadWeb3() {
    if(window.ethereum) {
      window.web3 = new Web3(window.ethereum, );
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

  }
  async loadContract() {
    const web3 = window.web3;
    const networkId = await web3.eth.net.getId();
    const networkData = ToDo.networks[networkId];
    if(networkData) {
      const toDo = web3.eth.Contract(ToDo.abi, networkData.address);
      this.setState({toDo})
      this.setState({toDo});

      this.refreshPage();
      this.loadTasksCompleted();
    this.setState({loading: false})
    } else {
      alert("Cannot connect to network")
    }
  }

  async createNewTask(newTask) {
      this.setState({loading: true})
    this.state.toDo.methods.createNewTask(newTask).send({from: this.state.account}, (e) => {
     this.checkBlockTime();
    })
  }

  async checkBlockTime() {
      //sleep function
    const sleep = (milliseconds) => {
      return new Promise(resolve => setTimeout(resolve, milliseconds))
    };
    // Checking that block is mined
    const blockNumberBefore = await window.web3.eth.getBlockNumber();
    let blockNumberNow = await window.web3.eth.getBlockNumber();
    while(blockNumberBefore ===  blockNumberNow) {
        blockNumberNow = await window.web3.eth.getBlockNumber();
        await sleep(250);
    }
    this.setState({loading: false})
    //load tasks again
    this.refreshPage();
    this.loadTasksCompleted();
    }

    async finishTask(id) {
        this.setState({loading:true})
        const task = await this.state.toDo.methods.tasks(id).call();
        if(task.completed === false) {
            this.state.toDo.methods.finishTask(id).send({from: this.state.account}, (e) => {
                  this.checkBlockTime();
              })

      }
    }
    async refreshPage() {
        this.setState({tasks: []});
        const toDoCount = await this.state.toDo.methods.toDoCount().call();
        for(let i=1; i<=toDoCount; i++) {
         const task = await this.state.toDo.methods.tasks(i).call();
         if(task.completed === false) {
         this.setState({tasks : [...this.state.tasks, task]})
         }
     }
 }

 async loadTasksCompleted() {
     this.setState({tasksCompleted: []});
     const toDoCount = await this.state.toDo.methods.toDoCount().call();
     for(let i=1; i<=toDoCount; i++) {
      const task = await this.state.toDo.methods.tasks(i).call();
      if(task.completed === true) {
      this.setState({tasksCompleted : [...this.state.tasksCompleted, task]})
      }
  }
}





  constructor(props) {
    super(props);
    this.state = {
        account: '',
        tasks: [],
        loading: true,
        tasksCompleted: []

    }
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account}/>
          {this.state.loading
                ? <div className="container mt-5"><h1 className="text-center">Loading blockchain data...</h1></div>
                : <ToDoList onClick={this.createNewTask.bind(this)} tasksCompleted={this.state.tasksCompleted} tasks = {this.state.tasks} checkboxOnClick={this.finishTask.bind(this)}/>
          }

      </div>
    );
  }
}

export default App;
