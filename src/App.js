import './App.css';
import Column from './Column'
import {DragDropContext} from 'react-beautiful-dnd'
import React, { Component } from 'react'
import SignUpForm from './SignUpForm'
import Header from './Header'

const styleContainer = {
  "display": 'flex'
}

export default class App extends Component {
  state={
    tasks: {},
    columns: [],
    loggedIn: false,
    currentUser: 'rei'
  }

  componentDidMount = () => {
    // const token = localStorage.getItem("token")
    // if(token){
    //   fetch()
    // }
    // console.log(localStorage.getItem('token'))

    // const token = localStorage.getItem('token')
    // fetch(`http://localhost:3000/api/v1/auto_login`,{
    //   headers: {
    //     "Authorization": token
    //   }
    // })
    // .then(resp => resp.json())
    // .then(data => console.log(data))

    fetch(`http://localhost:4000/tasks`)
    .then(resp => resp.json())
    .then(tasks => this.setState({
      tasks: tasks
    }))

    fetch(`http://localhost:4000/columns`)
    .then(resp => resp.json())
    .then(columns => this.setState({
      columns: columns
    }))
  }

  handleLogin = (signUpCred) => {
    // console.log(signUpCred.user.username)
    this.setState({
      loggedIn: true,
      currentUser: signUpCred.username
    })
  }

  handleLogOut = () => {
    this.setState({
      loggedIn: false,
      currentUser: ''
    })
  }

  onDragEnd = result => {
    // console.log(result)
    // // console.log(this.state.tasks)
    // console.log(this.state.columns)

    // console.log('Dest',result.destination)
    // console.log('source',result.source)

  
    if(result.destination.droppableId === result.source.droppableId || !result.destination){ //failsafe in case task in dropped in same container or if it doesn't land on a droppable zone
          return;
    }
    else{

    let newColumns = this.state.columns.map(column => {
      if (column.id === result.destination.droppableId){ //iterate through columns to match the destination ID
        column.taskIds = [...column.taskIds, result.draggableId] //updates match's task array and add the dragged task
        
        fetch(`http://localhost:4000/columns/${column.id}`,{
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            taskIds: column.taskIds
          })
        })
        // .then(resp => resp.json())
        // .then(data => {
        //    element.innerText = newNumberOfLikes;
        //    //console.log(data);
        // })

        return column
      }
      else if(column.id === result.source.droppableId){ //iterates through columns to match source ID
        let removeTask = column.taskIds.filter(taskId => { //updates match's task array and pops the matching draggable task
          if(taskId !== result.draggableId){
            return taskId
          }
        })
        // console.log(removeTask)
        column.taskIds = removeTask

        fetch(`http://localhost:4000/columns/${column.id}`,{
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            taskIds: column.taskIds
          })
        })

        return column
      }
    })
    // console.log(newColumns)

    this.setState({
      columns: newColumns
    })
  }

  }

  handleOnCompleted = (task) => {
    // console.log(task)
    fetch(`http://localhost:4000/tasks/`,{
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            [task.id]: {
              id: task.id,
              content: task.content,
              completed: !task.completed
            }
          })
        })
        .then(resp => resp.json())
        .then(updatedTask => 
          // console.log(updatedTask)
          this.setState({
            tasks: updatedTask
          })
        )
        
  }

  render() {
    // console.log(this.state.columns)
    return (
      <div>
        <Header currentUser={this.state.currentUser} handleLogOut={this.handleLogOut}/>

        {this.state.currentUser ? 
          <DragDropContext onDragEnd={this.onDragEnd}>
          <div style={styleContainer}>
            {this.state.columns.map(column=>{
              const tasks = column.taskIds.map(taskId => this.state.tasks[taskId])
              return <Column key={column.id} column={column} tasks={tasks} handleOnCompleted={this.handleOnCompleted}/>
            })}
          </div>
          </DragDropContext>
          :
          <SignUpForm handleLogin={this.handleLogin}/>         
        }
      </div>
    )
  }
}

