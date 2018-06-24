import React, {Component} from 'react';
import Board from 'react-trello';

import data from '../data/data.json';

class RestaurantManager extends Component {

  // componentDidMount(){
  //   data.lane.push()
  // }
  updateField = (field, evt) => {
    this.setState({[field]: evt.target.value})
  }

  handleAdd = () => {
    this.props.onAdd(this.state)
  }

  shouldReceiveNewData = nextData => {
    console.log('Board has changed')
    console.log(nextData)
  }

  handleCardDelete = (cardId, laneId) => {
    console.log(`Card: ${cardId} deleted from lane: ${laneId}`)
  }

  handleCardAdd = (card, laneId) => {
    console.log(`New card added to lane ${laneId}`)
    console.dir(card)
  }

  render() {
    const {onCancel} = this.props
    return (
      <Board
        data={data}
        draggable
        id="EditableBoard1"
        onDataChange={this.shouldReceiveNewData}
        onCardClick={(cardId, metadata, laneId) => alert(`Card with id:${cardId} clicked. Card in lane: ${laneId}`)}
        // editable
      />
    )
  }
}
export default RestaurantManager;
