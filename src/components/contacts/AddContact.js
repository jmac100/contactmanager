import React, { Component } from 'react'
import { Consumer } from '../../context'
import TextInputGroup from '../layout/TextInputGroup'
import axios from 'axios'

class AddContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {}
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value })

  onSubmit = async (dispatch, e) => {
    e.preventDefault()
    const { name, email, phone } = this.state

    if (!this.validate()) return

    const newContact = {
      name,
      email,
      phone
    }

    const res = await axios.post('http://jsonplaceholder.typicode.com/users', newContact)
    dispatch({ type: 'ADD_CONTACT', payload: res.data })

    this.setState({
      name: '',
      email: '',
      phone: '',
      errors: {}
    })

    this.props.history.push('/')
  }

  validate() {
    const { name, email, phone } = this.state
    if (name === '') {
      this.setState({ errors: { name: 'Name is required' } })
      return false
    }
    if (email === '') {
      this.setState({ errors: { email: 'Email is required' } })
      return false
    }
    if (phone === '') {
      this.setState({ errors: { phone: 'Phone is required' } })
      return false
    }
    return true
  }

  render() {
    const { name, email, phone, errors } = this.state
    return (
      <Consumer>
        {value => {
          const { dispatch } = value
          return (
            <div className="card mb-3">
              <div className="card-header">Add Contact</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    label="Name"
                    name="name"
                    placeholder="Enter name..."
                    value={name}
                    onChange={this.onChange}
                    error={errors.name}
                  />
                  <TextInputGroup
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="Enter email..."
                    value={email}
                    onChange={this.onChange}
                    error={errors.email}
                  />
                  <TextInputGroup
                    label="Phone"
                    name="phone"
                    placeholder="Enter phone..."
                    value={phone}
                    onChange={this.onChange}
                    error={errors.phone}
                  />
                  <input type="submit" value="Add Contact" className="btn btn-block btn-light" />
                </form>
              </div>
            </div>
          )
        }}
      </Consumer>
    )
  }
}

export default AddContact