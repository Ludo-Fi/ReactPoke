import "./styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component} from 'react';
import capData from "./Data/Cap"
import pokemonData from "./Data/Pokemon"


import Fight from "./Fight/Fight.mp3";

export default class Game extends Component {

    constructor(props) {
        super(props);
        this.state = {
            MyPokemon: Array,
            Ennemie: Array
        };
    }

    componentDidMount() {
        let pokemon = localStorage.getItem("Pokemon");
        pokemonData[pokemon] ? this.setState({MyPokemon: pokemonData[pokemon]}) : this.setState({MyPokemon: pokemonData["Pikachu"]});
        this.setState({Ennemie: pokemonData["Smogo"]})
    }

    Attack(att, def, hp, cap) {
        let puissance = parseInt(this.displayIndex(cap, 1), 10); //renvoie la puissance
        return (
            hp -= Math.floor((((2.4 * att * puissance) / (def * 50)) + 2))
        )
    }

    Battle(cap) {
        console.log(capData[cap])
    };

    Attack1(Pokemon, Ennemie, cap) {
        Ennemie[2] = this.Attack(Pokemon[3], Ennemie[4], Ennemie[2], cap)
    }

    // NewEnnemies() {
    //     let rand = Math.random() * 100 % 5;
    //     switch (rand) {
    //         case 0:
    //             this.setState({Ennemie: this.Salameche1});
    //             break;
    //         case 1:
    //             this.setState({Ennemie: this.Carapuce1});
    //             break;
    //         case 2:
    //             this.setState({Ennemie: this.Bulbizarre1});
    //             break;
    //         case 3:
    //             this.setState({Ennemie: this.Smogo1});
    //             break;
    //         default:
    //             this.setState({Ennemie: this.Pikachu1});
    //             break;
    //     }
    // }


    displayIndex(tab, index) {
        let sort;
        capData[tab] ? sort = capData[tab][index] : sort = "...";
        return sort
    }

    render() {
        return (
            <div>
                <audio className="d-none" ref="audio_tag" src={Fight} controls autoPlay/>

                <div className="row text-center">
                    <div className="col-md-6">
                        <img src={this.state.MyPokemon[0]}
                             alt={this.state.MyPokemon[1]}/>
                        <div className="border border-dark m-auto  w-50">
                            <div className="life bg-success" id="Pokemon">
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <img src={this.state.Ennemie[0]}
                             alt={this.state.Ennemie[1]}/>
                        <div className="border border-dark m-auto w-50">
                            <div className="life bg-success" id="Ennemie">
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-5">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="w-50 m-auto">
                                <button className="btn w-100 text-left bg-light" onClick={(e) => this.Battle(this.state.MyPokemon[8])}>
                                    <span className="cap">{this.state.MyPokemon[8]}</span>
                                    <div className="float-right">
                                        <span>{this.displayIndex(this.state.MyPokemon[8], 2)}</span>
                                        <span>/{this.displayIndex(this.state.MyPokemon[8], 2)}</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="w-50 m-auto">
                                <button className="btn w-100 text-left bg-light" onClick={(e) => this.Battle(this.state.MyPokemon[8])}>
                                    {this.state.MyPokemon[9] !== undefined ? this.state.MyPokemon[9] : ""}
                                    <div className="float-right">
                                        {this.state.MyPokemon[9] !== undefined &&
                                        <span>{this.displayIndex(this.state.MyPokemon[9], 2)}</span>
                                        }
                                        {this.state.MyPokemon[9] !== undefined &&
                                        <span>/{this.displayIndex(this.state.MyPokemon[9], 2)}</span>
                                        }
                                    </div>
                                </button>
                            </div>
                        </div>
                        <div className="col-md-6 mt-2">
                            <div className="w-50 m-auto">
                                <button className="btn w-100 text-left bg-light" onClick={(e) => this.Battle(this.state.MyPokemon[8])}>
                                    {this.state.MyPokemon[10] !== undefined ? this.state.MyPokemon[10] : ""}
                                    <div className="float-right">
                                        {this.state.MyPokemon[10] !== undefined &&
                                        <span>{this.displayIndex(this.state.MyPokemon[10], 2)}</span>
                                        }
                                        {this.state.MyPokemon[10] !== undefined &&
                                        <span>/{this.displayIndex(this.state.MyPokemon[10], 2)}</span>
                                        }
                                    </div>
                                </button>
                            </div>
                        </div>
                        <div className="col-md-6 mt-2">
                            <div className="w-50 m-auto">
                                <button className="btn w-100 text-left bg-light" onClick={(e) => this.Battle(this.state.MyPokemon[8])}>
                                    {this.state.MyPokemon[11] !== undefined ? this.state.MyPokemon[11] : ""}
                                    <div className="float-right">
                                        {this.state.MyPokemon[11] !== undefined &&
                                        <span>{this.displayIndex(this.state.MyPokemon[11], 2)}</span>
                                        }
                                        {this.state.MyPokemon[11] !== undefined &&
                                        <span>/{this.displayIndex(this.state.MyPokemon[11], 2)}</span>
                                        }
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        );
    }
}
