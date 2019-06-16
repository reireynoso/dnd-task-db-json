import React, { Component } from 'react'
import styled from 'styled-components'
import {Draggable} from 'react-beautiful-dnd'

const Container = styled.div`
    display: flex; 
    border: 1px solid lightgrey;
    border-radius: 2px;
    padding: 8px;
    margin-bottom: 8px;
    justify-content: space-around;
    /* background-color: ${props => props.isDragging ? 'lightgreen' : 'white'}; */
`;

const Handle = styled.div`
    width: 20px;
    height: 20px;
    background-color: orange;
    border-radius: 4px;
`;

const Done = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 4px;
`;

export default class Task extends Component {

    render() {
        // console.log(this.props)
        const backgroundColor = this.props.task.completed ? 'green' : 'red'
        const isDraggedDisabled = this.props.task.completed === false //disabled ability to drag is task is not completed
        return (
        <Draggable draggableId={this.props.task.id} index={this.props.index} isDragDisabled={isDraggedDisabled}>
            {(provided,snapshot) => (
                 <Container
                    {...provided.draggableProps}
                    ref={provided.innerRef} 
                    isDragging={snapshot.isDragging}
                    // {...provided.dragHandleProps}
                    >
                    <Handle {...provided.dragHandleProps}/> 
                    {this.props.task.content}
                    <Done style={{backgroundColor}} onClick={() => this.props.handleOnCompleted(this.props.task)}/>
                </Container>
            )}
        </Draggable>
       
        )
    }
}
