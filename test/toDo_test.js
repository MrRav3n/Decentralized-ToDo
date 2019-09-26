const ToDo = artifacts.require('ToDo');

require('chai')
.use(require('chai-as-promised'))
.should()

contract('ToDo', ([deployer, person]) => {
    let toDo
    before(async() => {
        toDo = await ToDo.deployed()
    })
    describe('Should be inicialized', async() => {
        it('should be inicialized', async() => {
            const address = await toDo.address
            assert.notEqual(address, '')
            assert.notEqual(address, 0x0)
        })

    })
    describe('Basic tests', async() => {

        it('Should create new tasks properly', async() => {
            const createNewTask = await toDo.createNewTask("First task", {from: person})
            const result = createNewTask.logs[0].args
            assert.equal(result.id, 1)
            assert.equal(result.content.toString(), "First task")
            assert.equal(result.completed, false)
            await toDo.createNewTask("",{from: person}).should.be.rejected
        })
        it('Should finish task properly', async() => {
            const finishTask = await toDo.finishTask(1, {from: person})
            const result = finishTask.logs[0].args
            assert.equal(result.id.toString(), 1)
            assert.equal(result.completed, true)
            await toDo.finishTask(0, {from: person}).should.be.rejected
        
        })
    })


})
