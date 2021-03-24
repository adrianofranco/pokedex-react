import React, { Component } from "react";
import Pokedex from "../../components/Pokedex";
import { Header } from "../../components/Header";

import "./styles.scss";

export class Home extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Pokedex></Pokedex>
      </div>
    );
  }
}
