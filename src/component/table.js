import React, { Component } from 'react';
import '../App.css';

export class Table extends Component {
  constructor(props){
    super();
    this.state = {
      sort: "",
      direction: ""
    }
  }
  _sort=(x)=>{
    this.props.sort(x)
    this.setState({sort:x})
    if(this.state.direction==="down"){
      this.setState({
        direction:'up'
      })
    }else{
      this.setState({
        direction:'down'
      })
    }
  }  
    render() {
      // Change Name icon sort
      let nameIconSort = ""
      if((this.state.sort ==="name")&&(this.state.direction==="up")){
        nameIconSort = 'arrow_downward'
      }
      if((this.state.sort==="name")&&(this.state.direction==="down")){
        nameIconSort = 'arrow_upward'
      }
      // Change Email icon sort
      let emailIconSort = ""
      if((this.state.sort ==="email")&&(this.state.direction==="up")){
        emailIconSort = 'arrow_downward'
      }
      if((this.state.sort==="email")&&(this.state.direction==="down")){
        emailIconSort = 'arrow_upward'
      }
      // Change Phone Icon Sort
      let phoneIconSort = ""
      if((this.state.sort ==="phone")&&(this.state.direction==="up")){
        phoneIconSort = 'arrow_downward'
      }
      if((this.state.sort==="phone")&&(this.state.direction==="down")){  
        phoneIconSort = 'arrow_upward'
      }
      return (
        <table border="1" frame="void" rules="rows">
          <thead>
            <tr>
              <th className="widthS" onClick={()=>this._sort('name')}>
                <span>Name</span>
                <i className="material-icons">{nameIconSort}</i>
              </th>
              <th className="widthT" onClick={()=>this._sort('email')}>
                <span>E-mail adrres</span>
                <i className="material-icons">{emailIconSort}</i>
              </th  >
              <th className="widthS" onClick={()=>this._sort('phone')}>
                <span>Phone number</span>
                <i className="material-icons">{phoneIconSort}</i>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.props.children}
          </tbody>
        </table>
      );
    }
  }
  
  