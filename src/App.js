import React from "react";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Bulbizarre from "../Player/Bulbizarre.png";
import Carapuce from "../Player/Carapuce.png";
import Salamèche from "../Player/Salamèche.png";

function Click() {
  document.getElementById("button").className = "btn btn-primary";
}

function Redirect() {
  let input = document.getElementsByTagName("input");
  let data = "Pikachu";
  for (let i = 0; i < input.length; i++) {
    if (input[i].checked) {
      data = input[i].value;
    }
  }
  localStorage.setItem("Pokemon", data);
  window.location = "Fight";
}

export default function App() {
  return (
    <div className="App">
      <br />
      <h2>Choisi ton Pokémon :</h2>
      <br />
      <div className="row">
        <div className="col-md-4">
          <img src={Bulbizarre} alt="Bulbizarre" width="150em" />
          <br />
          <label>
            <input
              className="mr-2"
              onClick={Click}
              type="radio"
              name="caracter"
              value="Bulbizarre"
            />
            Bulbizarre
          </label>
          <p>
            Bulbizarre passe son temps à faire la sieste sous le soleil. Il y a
            une graine sur son dos. Il absorbe les rayons du soleil pour faire
            doucement pousser la graine.
          </p>
        </div>
        <div className="col-md-4">
          <img src={Salamèche} alt="Salamèche" width="150em" />
          <br />
          <label>
            <input
              className="mr-2"
              onClick={Click}
              type="radio"
              name="caracter"
              value="Salamèche"
            />
            Salamèche
          </label>
          <p>
            La flamme qui brûle au bout de sa queue indique l'humeur de ce
            Pokémon. Elle vacille lorsque Salamèche est content. En revanche,
            lorsqu'il s'énerve, la flamme prend de l'importance et brûle plus
            ardemment.
          </p>
        </div>
        <div className="col-md-4">
          <img src={Carapuce} alt="Carapuce" width="150em" />
          <br />
          <label>
            <input
              className="mr-2"
              onClick={Click}
              type="radio"
              name="caracter"
              value="Carapuce"
            />
            Carapuce
          </label>
          <p>
            La carapace de Carapuce ne sert pas qu'à le protéger. La forme ronde
            de sa carapace et ses rainures lui permettent d'améliorer son
            hydrodynamisme. Ce Pokémon nage extrêmement vite.
          </p>
        </div>
      </div>
      <button
        onClick={Redirect}
        id="button"
        className="btn btn-primary disabled"
      >
        Jouer
      </button>
    </div>
  );
}
