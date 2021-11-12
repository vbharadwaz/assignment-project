import './RPlanogram.css';
import React from 'react';
import axios from "axios";
import { SketchPicker } from 'react-color';

class RPlanogram extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {
          a:0,
          b:0,
          ab:"",
          test:false,
          board:[],
          save:[],
          t:false,
          k:false,
          p:false
          
        

        };
      }
      shouldComponentUpdate(nextProps, nextState){
        if(this.state.a===nextState.a && this.state.b===nextState.b){
          return false
        }
        else{
          return true
        }
      }
      handleChangeComplete = (color) => {
        this.setState({ background: color.hex });
      };
  render(){ 
    const ar= ()=>{
        for(var i=0;i<this.state.a;i++){
            const r=[]
            for(var j=0;j<this.state.b;j++){
                r.push([i,j])
            }
            this.state.board.push([r])
        }
        return this.state.board
    }
    const arr= (Item,c)=>{
      this.state.save.push([Item,c])
    }

  return (
    <div className="App">
        <div className="left">
            <span>Planogram Boxes</span>
            {this.state.a!==0 && this.state.b!==0 ?
             
            <div>
                 {ar().map((items, index) => {
                    return (
                      <div className="col" key={index} >
                        {items.map((subItems, sIndex) => {
                          return (<div className="row" key={subItems}>
                                <div className="ol" > {subItems.map((Item,ind)=>{return <div id={Item} key={ind} 
                                className="rectangle" onClick={async()=> 
                                  {await change(Item,this.state.item);arr(Item,this.state.item);
                                this.setState({k:true})}} >{Item[0]+','+Item[1]}</div>})} </div>
                          </div>)
                        })}
                        
                      </div>
                    );
                  })}
      
            </div> : ''}
        </div>
        <div className="right">
        <span>Planogram UI</span>
        <form className="p-3" >
            <div className="form-row">
                <div className="col">
                <label> Enter rows</label><br></br>
                <input type="number" className="form-control"  placeholder="Enter a number" min="0" onInput={()=>this.setState({board:[]})} onChange={(e) =>  
                  {this.setState({a: e.target.value})}}></input>
                </div>
                <div className="col">
                <label> Enter coloums</label><br></br>    
                <input type="number" className="form-control" placeholder="Enter a number"  min="0" onInput={()=>this.setState({board:[]})} onChange={(e) => 
                  this.setState({ b: e.target.value})} ></input>
                </div>
            </div>
            <br></br>
            <div className="form-row">
                <div className="col">
                <label> Name a category</label><br></br>
                <input type="text" onChange={(e) => this.setState({ test:true,ab: e.target.value})} className="form-control" placeholder="Enter a name" ></input>
                </div>
                <div className="col">   
                <label> Box color</label><br></br>    
                <MyInput sendDatatoParent={ async data => await this.setState({item: data}) }/>
                
        <button type="button" onClick={()=>{
          if(this.state.k && this.state.ab!==""){
            
          axios.post(
            'http://127.0.0.1:8000/api/todos/',
            {
              catname: `${JSON.stringify(this.state.save)}`,
              objectname: `${this.state.ab}`
        })
     .then(window.location.replace('http://localhost:3000/mydata/')) 
     .catch(errors => console.log(errors))
          }
          else if(this.state.ab===""){
            alert("Please name the category")
          }
          else{
            alert("Please select a box to save the data")
          }
          }} className="btn btn-primary">save the Planogram</button>
                </div>
                
            </div>
           </form>
        </div>
    </div>
  );
    }
}

class MyInput extends React.Component {
  constructor() {
    super();
    this.state = {background: '#fff'};
  }
  handleChangeComplete = (color) => {
    this.setState({ background: color.hex });
    this.props.sendDatatoParent(this.state.background);
  };
  render() {
    return (
      <div>
        <SketchPicker color={ this.state.background }
      onChangeComplete={this.handleChangeComplete }/>
      
        </div>
      
      
    );
  }
}
const change=(Item,c)=> { 
    document.getElementById(`${Item}`).style.background=c;       
        } 


export default RPlanogram;

