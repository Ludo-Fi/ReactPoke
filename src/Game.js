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
            MyPokStatus: String,
            Ennemie: Array,
            EnemyStatus: String,
        };
    }

    async componentDidMount() {
        let pokemon = localStorage.getItem("Pokemon");
        await pokemonData[pokemon] ? this.setState({MyPokemon: pokemonData[pokemon]}) : this.setState({MyPokemon: pokemonData["Pikachu"]});
        await this.setState({Ennemie: pokemonData["Smogo"]});
        this.setState({EnemyStatus: "Normal"});
        this.setState({MyPokStatus: "Normal"});
        //On Définit les stats des pokémon
        await this.InitStat(this.state.MyPokemon);
        await this.InitStat(this.state.Ennemie);
        document.getElementById("info").innerHTML = this.state.MyPokemon[2] + "/" + this.state.MyPokemon[this.state.MyPokemon.length - 1]
    }

    InitStat(Pokemon) {
        let niveau = 5;
        Pokemon[2] = Math.floor((1 + 2 * Pokemon[2] + 1) * (niveau / 100) + 10 + niveau);
        Pokemon[3] = Math.floor((1 + 2 * Pokemon[3] + 1) * (niveau / 100) + 5);
        Pokemon[4] = Math.floor((1 + 2 * Pokemon[4] + 1) * (niveau / 100) + 5);
        Pokemon[5] = Math.floor((1 + 2 * Pokemon[5] + 1) * (niveau / 100) + 5);
        Pokemon[6] = Math.floor((1 + 2 * Pokemon[6] + 1) * (niveau / 100) + 5);
        Pokemon[7] = Math.floor((1 + 2 * Pokemon[7] + 1) * (niveau / 100) + 5);
        Pokemon.push(Pokemon[2]);
    }

    Attack(att, def, hp, cap) {
        let niveau = 5;
        hp -= Math.floor(((((niveau * 0.4 + 2) * att * cap) / (def * 50)) + 2));
        return (hp)
    }

    Battle(cap) {
        if (this.state.MyPokemon[2] > 0 && this.state.Ennemie[2] > 0) {
            let numCap = this.state.Ennemie.length - 9;
            let rand = Math.floor(Math.random() * numCap);
            let cap1;
            switch (rand) {
                case 0:
                    cap1 = this.state.Ennemie[8];
                    break;
                case 1:
                    cap1 = this.state.Ennemie[9];
                    break;
                case 2:
                    cap1 = this.state.Ennemie[10];
                    break;
                case 3:
                    cap1 = this.state.Ennemie[11];
                    break;
                default:
                    cap1 = this.state.Ennemie[8];
                    break;
            }
            if (this.state.MyPokemon[7] > this.state.Ennemie[7]) {
                this.Attack1(this.state.MyPokemon, this.state.Ennemie, capData[cap][1], 1);
                if (this.state.Ennemie[2] >= 0) {
                    this.Attack1(this.state.Ennemie, this.state.MyPokemon, capData[cap1][1], 0);
                }
            } else if (this.state.MyPokemon[7] > this.state.Ennemie[7]) {
                this.Attack1(this.state.MyPokemon, this.state.MyPokemon, capData[cap1][1], 0);
                if (this.state.MyPokemon[2] >= 0) {
                    this.Attack1(this.state.MyPokemon, this.state.Ennemie, capData[cap1][1], 1);
                }
            } else {
                let rand = Math.floor(Math.random() * 2);
                if (rand === 0) {
                    this.Attack1(this.state.MyPokemon, this.state.Ennemie, capData[cap][1], 1);
                    if (this.state.Ennemie[2] >= 0) {
                        this.Attack1(this.state.Ennemie, this.state.MyPokemon, capData[cap1][1], 0);
                    }
                } else {
                    this.Attack1(this.state.Ennemie, this.state.MyPokemon, capData[cap1][1], 0);
                    if (this.state.MyPokemon[2] >= 0) {
                        this.Attack1(this.state.MyPokemon, this.state.Ennemie, capData[cap1][1], 1);
                    }
                }
            }
            if (this.state.EnemyStatus === "Poison") {
                let Ennemie = this.state.Ennemie;
                Ennemie[2] -= Math.floor(Ennemie[2] * 1 / 8);
                let pourcent = (this.state.Ennemie[2] * 100) / this.state.Ennemie[this.state.Ennemie.length - 1];
                if (pourcent <= 50 && pourcent > 20) {
                    document.getElementById(this.state.Ennemie[1]).className = "life bg-warning"
                } else if (pourcent <= 20 && pourcent > 0) {
                    document.getElementById(this.state.Ennemie[1]).className = "life bg-danger"
                } else if (pourcent < 0) {
                    pourcent = 0;
                }
                document.getElementById(this.state.Ennemie[1]).style.width = pourcent + "%";
            }
            if (this.state.MyPokStatus === "Poison") {
                let Ennemie = this.state.MyPokemon;
                Ennemie[2] -= Math.floor(Ennemie[2] * 1 / 8);
                let pourcent = (this.state.MyPokemon[2] * 100) / this.state.MyPokemon[this.state.MyPokemon.length - 1];
                if (pourcent <= 50 && pourcent > 20) {
                    document.getElementById(this.state.MyPokemon[1]).className = "life bg-warning"
                } else if (pourcent <= 20 && pourcent > 0) {
                    document.getElementById(this.state.MyPokemon[1]).className = "life bg-danger"
                } else if (pourcent < 0) {
                    pourcent = 0;
                }
                document.getElementById(this.state.MyPokemon[1]).style.width = pourcent + "%";
            }
        }
    };

    Attack1(Pokemon, Ennemie, cap, status) {
        if (cap === -1) {
            if (status === 1 && this.state.EnemyStatus === "Normal") {
                this.setState({EnemyStatus: "Poison"});
                document.getElementById("info2").innerHTML = document.getElementById("info2").innerHTML +
                    "<div class='bg-purple'>Poison</div>"
            } else if (status === 0 && this.state.MyPokStatus === "Normal") {
                this.setState({MyPokStatus: "Poison"});
                document.getElementById("info").innerHTML = document.getElementById("info").innerHTML +
                    "<div class='bg-purple'>Poison</div>"
            }
        } else {
            Ennemie[2] = this.Attack(Pokemon[3], Ennemie[4], Ennemie[2], cap);
            let pourcent = (Ennemie[2] * 100) / Ennemie[Ennemie.length - 1];
            if (pourcent <= 50 && pourcent > 20) {
                document.getElementById(Ennemie[1]).className = "life bg-warning"
            } else if (pourcent <= 20 && pourcent > 0) {
                document.getElementById(Ennemie[1]).className = "life bg-danger"
            } else if (pourcent < 0) {
                pourcent = 0;
            }
            document.getElementById(Ennemie[1]).style.width = pourcent + "%";
        }

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
                            <div className="life bg-success" id={this.state.MyPokemon[1]}>
                            </div>
                        </div>
                        <div id="info" className="m-auto  w-50 text-left">
                        </div>
                    </div>
                    <div className="col-md-6">
                        <img src={this.state.Ennemie[0]}
                             alt={this.state.Ennemie[1]}/>
                        <div className="border border-dark m-auto w-50">
                            <div className="life bg-success" id={this.state.Ennemie[1]}>
                            </div>
                        </div>
                        <div id="info2" className="m-auto w-50 text-left">
                        </div>
                    </div>
                </div>
                <div className="mt-5">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="w-50 m-auto">
                                <button className="btn w-100 text-left bg-light"
                                        onClick={() => this.Battle(this.state.MyPokemon[8])}>
                                    <span className="cap">{this.state.MyPokemon[8]}</span>
                                    <div className="float-right">
                                        <span>{this.displayIndex(this.state.MyPokemon[8], 2)}</span>
                                        <span>/{this.displayIndex(this.state.MyPokemon[8], 2)}</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                        {this.state.MyPokemon[9] !== undefined && this.state.MyPokemon[9] instanceof String &&
                        <div className="col-md-6">
                            <div className="w-50 m-auto">
                                <button className="btn w-100 text-left bg-light"
                                        onClick={() => this.Battle(this.state.MyPokemon[9])}>
                                    {this.state.MyPokemon[9]}
                                    <div className="float-right">
                                        <span>{this.displayIndex(this.state.MyPokemon[9], 2)}</span>
                                        <span>/{this.displayIndex(this.state.MyPokemon[9], 2)}</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                        }
                        {this.state.MyPokemon[10] !== undefined && this.state.MyPokemon[10] instanceof String &&
                        <div className="col-md-6 mt-2">
                            <div className="w-50 m-auto">

                                <button className="btn w-100 text-left bg-light"
                                        onClick={() => this.Battle(this.state.MyPokemon[10])}>
                                    {this.state.MyPokemon[10]}
                                    <div className="float-right">

                                        <span>{this.displayIndex(this.state.MyPokemon[10], 2)}</span>

                                        <span>/{this.displayIndex(this.state.MyPokemon[10], 2)}</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                        }
                        {this.state.MyPokemon[11] !== undefined && this.state.MyPokemon[11] instanceof String &&
                        <div className="col-md-6 mt-2">
                            <div className="w-50 m-auto">

                                <button className="btn w-100 text-left bg-light"
                                        onClick={() => this.Battle(this.state.MyPokemon[11])}>
                                    {this.state.MyPokemon[11]}
                                    <div className="float-right">
                                        <span>{this.displayIndex(this.state.MyPokemon[11], 2)}</span>
                                        <span>/{this.displayIndex(this.state.MyPokemon[11], 2)}</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                        }

                    </div>

                </div>


            </div>
        );
    }
}
