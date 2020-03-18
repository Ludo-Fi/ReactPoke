import "./styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component} from 'react';

import Bulbizarre from "../Player/Bulbizarre.png";
import Carapuce from "../Player/Carapuce.png";
import Salamèche from "../Player/Salamèche.png";
import Pikachu from "../Player/Pikachu.png";
import Smogo from "../Player/Smogo.png";

import Fight from"../Fight/Fight.mp3";

export default class Game extends Component { 
  Griffe = ["Griffe",40,35,35,100]
  Charge = ["Charge",50,35,35,100]
  Eclair = ["Eclair",40,30,30,100]


  Salamèche1 = [Salamèche,"Salamèche",39,52,43,60,50,65,"Griffe"]
  Carapuce1 = [Carapuce,"Carapuce",44,48,65,50,64,43,"Charge"]
  Bulbizarre1 = [Bulbizarre,"Bulbizarre",45,49,49,65,65,45,"Charge"]
  Pikachu1 = [Pikachu,"Pikachu",35,55,40,50,50,90,"Eclair"]
  Smogo1 = [Smogo,"Smogo",40,65,95,60,45,35,"Charge"]


  constructor(props) {
    super(props);
    this.state = {
      MyPokemon: Array,
      Ennemie: Array
    };
  }
  componentDidMount() {
    let pokemon = localStorage.getItem("Pokemon")
    switch (pokemon){
      case 'Salamèche':
        this.setState({MyPokemon: this.Salamèche1 })
        break;
      case 'Carapuce': 
        this.setState({MyPokemon: this.Carapuce1 })
        break;
      case 'Bulbizarre': 
        this.setState({MyPokemon: this.Bulbizarre1 })
        break;
      default:
          this.setState({MyPokemon: this.Pikachu1 })
      break;
    }
    this.setState({Ennemie: this.Smogo1 })
  }

  NewEnnemies(){
    let rand = Math.random() * 100 % 5
    switch (rand){
      case 0:
        this.setState({Ennemie: this.Salamèche1 })
        break;
      case 1: 
        this.setState({Ennemie: this.Carapuce1 })
        break;
      case 2: 
        this.setState({Ennemie: this.Bulbizarre1 })
        break;
      case 3: 
      this.setState({Ennemie: this.Smogo1 })
      break;
      default:
          this.setState({Ennemie: this.Pikachu1 })
      break;
    }
  }

  Attack(att, def, hp, cap){
    let puissance = parseInt(this.displayIndex(cap,1),10) //renvoie la puissance
    return (
      hp -= Math.floor((((2,4 * att * puissance) / (def * 50))+2) * 1)
    )
  }

  Battle(cap){
    console.log(cap)
  }

  Attack1(Pokemon,Ennemie,cap){
    Ennemie[2] = this.Attack(Pokemon[3],Ennemie[4],Ennemie[2],cap)
  }
  
  displayIndex(tab,index){
    let sort
    switch (tab){
      case "Eclair":
        sort = this.Eclair[index]
        break;
      case "Charge": 
      sort = this.Charge[index]        
      break;
      case "Griffe": 
      sort = this.Griffe[index]        
      break;
      default:
        sort = "..."      
        break;
    }
    return sort
  }

  render() {
    return (
       <div>
         <audio ref="audio_tag" src={Fight} controls autoPlay></audio>
         
         <div className="row text-center">
           <div className="col-md-4">
             <img src={this.state.MyPokemon[0]} 
             alt={this.state.MyPokemon[1]}/>
             <div className="border border-dark mb-2">
               <div className="life bg-success" id="Pokemon">
               </div>
             </div> 
           </div>
           <div className="col-md-4"></div>
           <div className="col-md-4">
             <img src={this.state.Ennemie[0]} 
             alt={this.state.Ennemie[1]}/>
             <div className="border border-dark mb-2">
               <div className="life bg-success" id="Ennemie">
               </div>
             </div> 
           </div>
         </div>
         <div>
           <div className="row">
               <div className="col-md-6" onClick={this.Battle(this)}>
                 <div>
                    <div className="bg-light">
                      <span className="cap">{this.state.MyPokemon[8]}</span>
                      <span className="float-right">{this.displayIndex(this.state.MyPokemon[8],2)} / {this.displayIndex(this.state.MyPokemon[8],3)}</span>
                    </div>
                  </div>
               </div>
               <div className="col-md-6">
                 <div>
                    <div className="bg-light">
                      {this.state.MyPokemon[9] !== undefined ? this.state.MyPokemon[9] : ""}
                      <span className="float-right">{ this.state.MyPokemon[9] === undefined ? "" : (this.displayIndex(this.state.MyPokemon[9],2) + " / " +this.displayIndex(this.state.MyPokemon[9],3))}</span>
                    </div>
                  </div>
               </div>


               <div className="col-md-6 mt-2">
                 <div>
                    <div className="bg-light">
                      {this.state.MyPokemon[10] === undefined ? "" : this.state.MyPokemon[10]}
                      <span className="float-right">{this.state.MyPokemon[10] === undefined ? "" : (this.displayIndex(this.state.MyPokemon[10],2) + " / " +this.displayIndex(this.state.MyPokemon[10],3))}</span>
                    </div>
                  </div>
               </div>
               <div className="col-md-6 mt-2">
                 <div>
                    <div className="bg-light">
                      {this.state.MyPokemon[11] === undefined ? "" : this.state.MyPokemon[11]}
                      <span className="float-right">
                      {this.state.MyPokemon[11] === undefined ? "" :  (this.displayIndex(this.state.MyPokemon[11],2) + " / " +this.displayIndex(this.state.MyPokemon[11],3))}
                      </span>
                    </div>
                  </div>
             </div>
           </div>
         </div>


       </div>
    );
  }
}