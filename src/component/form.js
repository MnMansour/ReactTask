import React, { Component } from 'react';
import '../App.css';


export class Form extends Component {
  constructor(){
    super()
    this.state = {
      name:"",
      email:"",
      phone:""
    }
  }
  // Two way data binding
  // onChange={(e)=>this.setState({'name':e.target.value})}
  // Every time we change value of input field
  // it fires an event -> 'onChange'
  // this event contains event data (type, element, etc)
  // and when it happens
  // we update corresponding value in state

// Check Name if it's Valid
  _ValidName=(name)=>{
    var check = /^[A-Za-z\s]+$/;
    return check.test(name)
  }
// Check Email if it's Valid
  _ValidEmail=(email)=>{
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
// Check Phone if it's Valid
  _ValidNumber=(phone)=>{
    var re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return re.test(phone);
  }

  // Check all inputs if it's Valid
  _isValid = () =>{
    return((this._ValidName(this.state.name)) && (this._ValidEmail(this.state.email)) && (this._ValidNumber(this.state.phone)))
  }

  // Create submission function
  _submit = () =>{
    if (this._isValid()){
      //pass data to parent component
      this.props.addItem(this.state.name, this.state.email, this.state.phone)
      //remove values from input fields
      this.setState({
        name:'',
        email:'',
        phone:''
      })
    }
  }
    render() {
      //highlight submit button if all fields are filled
     let submitStyle = {cursor:"not-allowed"};
      if (this._isValid()){
        submitStyle = {backgroundColor: 'rgba(0,123,239,1)',color: 'rgba(255,255,255,1)',
         cursor:'pointer'}
      }
      // Show warning if Name field not valid
      let checkName = ''
      let warningN={}
      if ((!this._ValidName(this.state.name)) && this.state.name.length>=1){
        checkName = '**Name should be only letters';
        warningN={borderBottom: '1px solid rgba(255,0,0,0.8)'}
      }
      // Show warning if Email field not valid
      let checkEmail = ''
      let warningE={}
      if ((!this._ValidEmail(this.state.email))&&(this.state.email.length>=1)){
        checkEmail = '**Please enter valid email';
        warningE={borderBottom: '1px solid rgba(255,0,0,0.8)'}
      }
      // Show warning if Phone field not valid
      let checkPhone = ''
      let warningP={}
      if ((!this._ValidNumber(this.state.phone))&&(this.state.phone.length>=1)){
        checkPhone = '**Please enter valid number of 10 digits';
        warningP={borderBottom: '1px solid rgba(255,0,0,0.8)'}
      }

      return (

        <div className="form">
            <input style={warningN} placeholder="Full name" value={this.state.name} 
            onChange={(e) =>this.setState({'name':e.target.value})}/>
            <input style={warningE} placeholder="Email address" value={this.state.email}
            onChange={(e) =>this.setState({'email':e.target.value})}/>
            <input style={warningP}  placeholder="Phone number" value={this.state.phone}
            onChange={(e) =>this.setState({'phone':e.target.value})}/>
            <button style={submitStyle}  onClick={this._submit}> Add new</button>
            <div className="warning">
              <span className="checkName"> {checkName}</span>
              <span className="checkEmail"> {checkEmail}</span>
              <span className="checkPhone"> {checkPhone}</span>
            </div>
        </div >
      );
    }
  }
  