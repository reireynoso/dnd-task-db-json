import React, { Component } from 'react'
import styled from 'styled-components'
import Task from './Task'
import {Droppable} from 'react-beautiful-dnd'

const containerStyle = {
    margin: '8px',
    border: '1px solid lightgrey',
    width: '300px',
    height: '300px',
    borderRadius: '10px'
}

const Title = styled.h3`
    padding: 8px;
`;

const TaskList = styled.div`
    padding: 8px;
    transition: background-color 0.2s ease;
    background-color: ${props => (props.isDraggingOver ? 'skyblue': 'white')};
    flex-grow:1;
    min-height: 200px;
`;

export default class Column extends Component {
    
    render() {
        // console.log(this.props)
        return (
            <div style={containerStyle}>
                <Title>{this.props.column.title}</Title>
                <Droppable droppableId={this.props.column.id}>
                    {(provided, snapshot) => (
                        <TaskList
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            isDraggingOver = {snapshot.isDraggingOver}
                        >
                            {this.props.tasks.map((task,index) => <Task handleOnCompleted={this.props.handleOnCompleted} key={task.id} task={task} index={index}></Task>)}
                            {provided.placeholder}
                        </TaskList>
                    )}
                </Droppable>
            </div>
        )
    }
}