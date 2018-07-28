import React, { Component } from 'react'
import axios from 'axios'

const Context = React.createContext()

const reducer = (state, action) => {
  switch (action.type) {
    case 'DELETE_CONTACT': {
      return {
        ...state,
        contacts: state.contacts.filter(contact => contact.id !== action.payload)
      }
    }
    case 'ADD_CONTACT': {
      return {
        ...state,
        contacts: [action.payload, ...state.contacts]
      }
    }
    case 'UPDATE_CONTACT': {
      return {
        ...state,
        contacts: state.contacts.map(contact => contact.id === action.payload.id ? (contact = action.payload) : contact)
      }
    }
    default: {
      return state
    }
  }
}

export class Provider extends Component {
  state = {
    contacts: [
      // { 
      //   id: 1,
      //   name: 'John Doe',
      //   email: 'jdoe@gmail.com',
      //   phone: '555-555-5555'
      // },
      // { 
      //   id: 2,
      //   name: 'Karen Williams',
      //   email: 'kwilliams@gmail.com',
      //   phone: '444-444-4444'
      // },
      // { 
      //   id: 3,
      //   name: 'Henry Johnson',
      //   email: 'hjohnson@gmail.com',
      //   phone: '333-333-3333'
      // }
    ],
    dispatch: action => {
      this.setState(state => reducer(state, action))
    }
  }

  async componentDidMount() {
    const res = await axios.get('http://jsonplaceholder.typicode.com/users')
    this.setState({
      contacts: res.data
    })
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    )
  }
}

export const Consumer = Context.Consumer