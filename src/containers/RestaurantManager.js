import React, {Component} from 'react';
import Board from 'react-trello';

import Panel from '../components/Panel/Panel';
import PanelHeader from '../components/Panel/PanelHeader/PanelHeader';
import PanelElement from '../components/Panel/PanelElement/PanelElement';

import data from '../data/data.json';
import { updateObject } from '../utils/utility';

class RestaurantManager extends Component {
  state = {
    testOrders: [
      {
        "id": 0,
        "status": "ORDERED",
        "seatNumber": "A273",
        orderItems: [
          {
            "product": "Coke Cola",
            "quanity": 5,
            "price": 2.5
          },
          {
            "product": "Beer",
            "quanity": 1,
            "price": 5
          }
        ]
      },
      {
        "id": 1,
        "status": "IN_PROGRESS",
        "seatNumber": "A273",
        orderItems: [
          {
            "product": "Hot Dog",
            "quanity": 1,
            "price": 3.5
          },
          {
            "product": "Beer",
            "quanity": 1,
            "price": 5
          }
        ]
      },
      {
        "id": 2,
        "status": "IN_PROGRESS",
        "seatNumber": "C12",
        orderItems: [
          {
            "product": "Hot Dog",
            "quanity": 5,
            "price": 3.5
          },
          {
            "product": "Beer",
            "quanity": 6,
            "price": 5
          }
        ]
      },
      {
        "id": 3,
        "status": "DELIVERING",
        "seatNumber": "H02",
        orderItems: [
          {
            "product": "Hot Dog",
            "quanity": 2,
            "price": 3.5
          },
          {
            "product": "Beer",
            "quanity": 1,
            "price": 5
          }
        ]
      },
      {
        "id": 4,
        "status": "COMPLETED",
        "seatNumber": "B29",
        orderItems: [
          {
            "product": "Coke Cola",
            "quanity": 1,
            "price": 2.5
          },
          {
            "product": "Hot Dog",
            "quanity": 2,
            "price": 3.5
          },
          {
            "product": "Beer",
            "quanity": 1,
            "price": 5
          }
        ]
      },
    ],
    totalPrice: 0
  }

  setEventBus = eventBus => {
    this.setState({eventBus})
  }

  // On start up get orders from server, (or predefinded state), and push or our data.json.
  componentDidMount(){
    // Get a few test states
    this.state.testOrders.map(order => {
      const orderItems = order.orderItems.map(items => {
        return `${items.product}: ${items.quanity} \n`;
      });
      const newOrder = {
        "laneId": order.status,
        "id": `${order.id}`,
        "title": `${order.seatNumber}`,
        "description": `${orderItems.toString().replace(/,/g, '')}`
      }

      // Simple switch case to determine which lane the order belongs to.
      // 0: ORDERED, 1: IN_PROGRESS, 2: DELIVERING, 3: COMPLETED 4: CANCELLED
      switch (order.status) {
        case 'ORDERED':
          data.lanes[0].cards.push(newOrder);
          break;
        case 'IN_PROGRESS':
          data.lanes[1].cards.push(newOrder);
          break;
        case 'DELIVERING':
          data.lanes[2].cards.push(newOrder);
          break;
        case 'COMPLETED':
          data.lanes[3].cards.push(newOrder);
          break;
        case 'CANCELLED':
          data.lanes[4].cards.push(newOrder);

          break;
        default:
          data.lanes[0].cards.push(newOrder);
          break;
      }

      this.getTotalValue();
      return newOrder;
    });
  }

  componentDidUpdate(prevProps, prevState){
    if(this.state.testOrders !== prevState.testOrders){
      this.getTotalValue();
    }
  }

  // Get the total value of goods sold. We check if the status of the order is equal to COMPLETED, then we break down each items and it's quanity, and get the told value of that item, then we sum it up with the rest of the order. Lastly we sum up all orders to get the grand total.
  getTotalValue(){
    const completedOrders = this.state.testOrders.filter(order => order.status === 'COMPLETED');
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const total = completedOrders.map(orders => {
      const costOfOrder = orders.orderItems.map(orderItem => {
        const orderCost = orderItem.quanity * orderItem.price;
        return orderCost;
      });
      return Number(costOfOrder.reduce(reducer).toFixed(2));
    });
    const totalValue =  total.reduce(reducer).toFixed(2);

    this.setState({totalPrice: totalValue});
  }

  handleDragEnd = (cardId, sourceLaneId, targetLaneId) => {
    // console.log('drag ended')
    // console.log(`cardId: ${cardId}`)
    // console.log(`sourceLaneId: ${sourceLaneId}`)
    // console.log(`targetLaneId: ${targetLaneId}`)

    // Update the state of the order.
    const order = this.state.testOrders[cardId];
    order.status = targetLaneId;

    const updateOrder = updateObject(this.state.testOrders, {
      [cardId]: order
    });

    this.setState({testOrders: Object.values(updateOrder)});
  }

  shouldReceiveNewData = nextData => {
    console.log('Board has changed')
    console.log('nextData', nextData)
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
