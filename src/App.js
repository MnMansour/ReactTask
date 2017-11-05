import React, { Component } from 'react';
import './App.css';
// Component of Table in main page to show member.
import { Table } from './component/table';
// Component of Form to add new row.
import { Form } from './component/form';
// Componet of Member to render members in table.
import { Member } from './component/member.js';

import logo from "./icon/logo.png";

import { users} from './data';


class App extends Component {
  constructor(props){
    super();
    this.state={users}
  }

  // Used by form component
  _addItem = (name, email, phone) => {
    console.log('Add Item')
    // We will user timestamp to generate uniq id's    
    let id = new Date().getTime
    let updateUsers = this.state.users

    //unshift - add to the beginning of the list
    updateUsers.unshift({
      id,
      name,
      email,
      phone
    })

    this.setState({
      users:updateUsers
    })
  }

  // Used by meber component
  _saveItem = (name, email, phone, id) =>{
    console.log('Save')
    let updateUsers = users
    // Update item
    let item = this.state.users.find((element)=> element.id === id)
    item = {
      name,
      email,
      phone,
      id
    }

    this.setState({
      users:updateUsers
    })
  }

  // Used by member component
  _deleteItem = (id) =>{
    
    // for removal item from arra we can use filter method for arrays
    this.setState({
      users: this.state.users.filter((element)=> element.id !== id)
    })
  }

  _sort = (sort) =>{
    let direction = this.state.direction;
    
    // if we are clicking the same type just change direction
    if (sort === this.state.sort){
      if (this.state.direction === 'down'){
        direction = 'up'
      } else {
        direction = 'down'
      }
    }
    
    var updatedUsers;
    // Filter function itself
    if (direction === 'down'){
      updatedUsers = this.state.users.sort((a,b)=>{
      if (a[sort] > b[sort]) {
        return 1;
      }
      if (a[sort] < b[sort]) {
        return -1;
      }
        return 0;
      })
    } else {
      updatedUsers = this.state.users.sort((a,b)=>{
      if (a[sort] < b[sort]) {
        return 1;
      }
      if (a[sort] > b[sort]) {
        return -1;
      }
        return 0;
      })
    }
    //apply all the data
    this.setState({
      sort,
      direction,
      users: updatedUsers
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div className="contain">
          <h2>List of participants</h2>
          <Form addItem={this._addItem}/>
          <Table sort={this._sort}> 
          {this.state.users.map((data,index)=> <Member saveItem={this._saveItem} deleteItem={this._deleteItem} data={data} key={data.id} />)}
          </Table>
        </div>
      </div>
    );
  }
}

export default App;
