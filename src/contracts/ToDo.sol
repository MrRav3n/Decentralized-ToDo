pragma solidity ^0.5.8;

contract ToDo {

    uint public toDoCount;

    struct toDoStruct {
        uint id;
        string content;
        bool completed;
    }

    event CreateNewTaskEvent(
        uint id,
        string content,
        bool completed
    );

    event FinishTaskEvent(
        uint id,
        string content,
        bool completed
    );
    constructor() public {

    }

    mapping(uint => toDoStruct) public tasks;

    function createNewTask(string memory _content) public {
        require(bytes(_content).length>0);
         toDoCount++;
        tasks[toDoCount] = toDoStruct(toDoCount, _content, false);
        emit CreateNewTaskEvent(toDoCount, _content, false);

    }

    function finishTask(uint _id) public {
        require(_id>0 && _id<=toDoCount);
        require(!tasks[_id].completed);
        tasks[_id].completed = true;
        emit FinishTaskEvent(_id, tasks[_id].content, true);
    }

}
