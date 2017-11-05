import React, { Component } from 'react';
import '../App.css';

export class Member extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: props.data.name,
            email: props.data.email,
            phone: props.data.phone,
            id: props.data.id,
        } 
    }

    _setMode = (mode) =>{
        this.setState({
          edit: mode
        })
      }

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

      _submit = () =>{
        if (this._isValid()){
          //pass data to parent component
          this.props.saveItem(this.state.name, this.state.email, this.state.phone, this.state.id)
          this._setMode(false)
            }
        }
    render(){
      // display edit form or regular text depending on mode

      //highlight submit button if all fields are filled
     let submitStyle = {cursor:"not-allowed"};
     if (this._isValid()){
       submitStyle = {cursor:'pointer'}
     }
     // Show warning if Name field not valid
     let warningN={}
     if ((!this._ValidName(this.state.name)) && this.state.name.length>=1){
       warningN={borderBottom: '1px solid rgba(255,0,0,0.8)'}
     }
     // Show warning if Email field not valid
     let warningE={}
     if ((!this._ValidEmail(this.state.email))&&(this.state.email.length>=1)){
       warningE={borderBottom: '1px solid rgba(255,0,0,0.8)'}
     }
     // Show warning if Phone field not valid
     let warningP={}
     if ((!this._ValidNumber(this.state.phone))&&(this.state.phone.length>=1)){
       warningP={borderBottom: '1px solid rgba(255,0,0,0.8)'}
     }

        //regular mode
        if (!this.state.edit){
            return(
                <tr>
                    <td>{this.state.name}</td>
                    <td>{this.state.email}</td>
                    <td>{this.state.phone}</td>
                    <td>
                        <a onClick={()=>this._setMode(true)}><i  className="material-icons" >mode_edit</i></a>
                        <a onClick={()=>this.props.deleteItem(this.state.id)}><i className="material-icons" >delete</i></a>
                    </td>
                 </tr>    
                )
            }else {
                return(
                    <tr className="form">
                        <td><input style={warningN} placeholder="Full name" value={this.state.name} 
                        onChange={(e) =>this.setState({'name':e.target.value})}/></td>
                        <td><input style={warningE} placeholder="Email address" value={this.state.email}
                        onChange={(e) =>this.setState({'email':e.target.value})}/></td>
                        <td><input style={warningP}  placeholder="Phone number" value={this.state.phone}
                        onChange={(e) =>this.setState({'phone':e.target.value})}/></td>
                        <td>
                            <a className="cancel" onClick={()=>this._setMode(false)}>cancel</a>
                            <a style={submitStyle} className="save" onClick={this._submit}>Save</a>
                        </td>
                    </tr >     
                )
            }   
        }
    }
