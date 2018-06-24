import React, {Component} from 'react';
import Board from 'react-trello';

import Panel from '../components/Panel/Panel';
import PanelHeader from '../components/Panel/PanelHeader/PanelHeader';
import PanelElement from '../components/Panel/PanelElement/PanelElement';

import data from '../data/data.json';

class RestaurantManager extends Component {
  state = {
    testOrders: [
      {
        seatNumber: 'E29',
        order: [
          {
            "product": "Coca Cola",
            "quanity": 5
          },
          {
            "product": "Beer",
            "quanity": 1
          }
        ]
      },
      {
        seatNumber: 'A273',
        order: [
          {
            "product": "Hot Dog",
            "quanity": 5
          },
          {
            "product": "Beer",
            "quanity": 6
          }
        ]
      },
      {
        seatNumber: 'H765',
        order: [
          {
            "product": "Coca Cola",
            "quanity": 5
          },
          {
            "product": "Popcorn",
            "quanity": 2
          },
          {
            "product": "Beer",
            "quanity": 1
          }
        ]
      },
    ],
    totalPrice: 0,
  }

  setEventBus = eventBus => {
    this.setState({eventBus})
  }

  // On start up get orders from server, (or predefinded state), and push or our data.json.
  componentDidMount(){
    this.state.testOrders.map(orders => {
      const orderItems = orders.order.map(items => {
        return `${items.product}: ${items.quanity} \n`;
      });
      const newOrder = {
        "laneId": "ORDERED",
        "id": `${orders.seatNumber}`,
        "title": `${orders.seatNumber}`,
        "description": `${orderItems.toString().replace(/,/g, '')}`
      }
      data.lanes[0].cards.push(newOrder);
      return newOrder;
    });
  }

  handleDragEnd = (cardId, sourceLaneId, targetLaneId) => {
    console.log('drag ended')
    console.log(`cardId: ${cardId}`)
    console.log(`sourceLaneId: ${sourceLaneId}`)
    console.log(`targetLaneId: ${targetLaneId}`)
  }

  shouldReceiveNewData = nextData => {
    console.log('Board has changed')
    console.log('nextData', nextData)
  }

  handleCardDelete = (cardId, laneId) => {
    console.log(`Card: ${cardId} deleted from lane: ${laneId}`)
  }

  handleCardAdd = (card, laneId) => {
    console.log(`New card added to lane ${laneId}`)
    console.dir(card)
  }

  render() {
    const { totalPrice } = this.state;
    return (
      <div>
        <Panel className='panel'>
          <PanelHeader className='panel-header'>
            Order Summary
          </PanelHeader>
          <PanelElement className='panel-element'>
            Order Total: ${totalPrice}
          </PanelElement>
        </Panel>
        <Board
          className='background'
          data={data}
          draggable
          id="RestaurantManager"
          onDataChange={this.shouldReceiveNewData}
          onCardClick={(cardId, metadata, laneId) => this.displayOrderInfo(cardId, metadata, laneId)}
          eventBusHandle={this.setEventBus}
          handleDragEnd={this.handleDragEnd}
        />
      </div>

    )
  }
}
export default RestaurantManager;
