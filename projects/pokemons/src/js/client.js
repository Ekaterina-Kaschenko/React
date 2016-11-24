import React, {Component} from "react";
import ReactDOM from "react-dom";

const app = document.getElementById('app');

const PokemonItem = ({pokemon}) => {
  const {pkdx_id: id, name} = pokemon;
  return (<li>
            <img src={'http://pokeapi.co/media/img/${id}.png'} />
            {name}
          </li>);
}

ReactDOM.render(<PokemonItem pokemon={{pkdx_id: 23, name: 'Test'}} />, app);
