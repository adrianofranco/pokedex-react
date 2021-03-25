import React, { Component, Suspense } from "react";

import "./styles.scss";

import { loadPokemons, loadPokemon } from "../../utils/load-pokemons";

//import ReactPaginate from 'react-paginate';

import PokedexItens from "../pokemonItens";
import PokeDisplay from "../PokeDisplay";
import { TopFilter } from "../TopFilter";

export default class Pokedex extends Component {
  state = {
    pokemons: [],
    pokemon: 0,
    offset: 0,
    perpage: 5,
    npokemon: 0,
  };

  getPokemon = async (pokemonid) => {
    const pokemon = await loadPokemon(pokemonid);
    this.setState({ pokemon });
  };

  getPokemons = async () => {
    const { offset, perpage } = this.state;
    const pokemons = await loadPokemons(offset, perpage);
    this.setState({ pokemons });
  };

  componentDidMount() {
    this.getPokemons();
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  changePerPage = (event) => {
    let perpage;
    perpage = event.target.value;
    this.setState({ perpage });

    this.getPokemons();
  };

  proximaPagina = async () => {
    let offset;
    offset = parseInt(this.state.offset, 10) + parseInt(this.state.perpage, 10);
    this.setState({ offset: offset });
    await this.getPokemons();
    await this.getLazy();
  };

  anteriorPagina = async () => {
    let offset;
    offset = parseInt(this.state.offset, 10) - parseInt(this.state.perpage, 10);
    this.setState({ offset: offset });
    await this.getPokemons();
    await this.getLazy();
  };

  getLazy = () => {
    const pokelazy = document.getElementsByClassName("poke-lazy");

    for (var i = 0; i < pokelazy.length; i++) {
      pokelazy[i].classList.add("poke-lazy-active");
    }

    setInterval(() => {
      for (var i = 0; i < pokelazy.length; i++) {
        pokelazy[i].classList.remove("poke-lazy-active");
      }
    }, 2000);
  };

  getInicialPokemon = (event) => {
    let offset;

    offset = parseInt(event.target.value) - 1;

    if (offset > 898) {
      alert("Não há mais que 898 Pokémons");
      this.setState({
        [event.target.name]: 0,
      });
      this.setState({ npokemon: 0 });
    } else {
      this.setState({ offset: offset, npokemon: offset });
    }

    this.getPokemons();
  };

  handleScroll = () => {
    this.setState({
      scrollTop: window.pageYOffset,
    });
  };

  render() {
    const { pokemon, scrollTop, perpage, offset, pokemons } = this.state;

    return (
      <div className="main">
        <TopFilter
          perpage={perpage}
          inputOnBlur={this.getInicialPokemon}
          inputOnChange={this.changePerPage}
        />

        <PokeDisplay pokemon={pokemon}></PokeDisplay>
        <aside className="pokemons">
          <Suspense fallback={<div>Loading...</div>}>
            <PokedexItens
              pokemonsItens={pokemons}
              parentCallback={this.getPokemon}
            ></PokedexItens>
          </Suspense>
        </aside>
        <footer>
          {perpage !== 0 && offset !== 0 ? (
            <button
              className={scrollTop > 700 ? "fixo left" : ""}
              onClick={this.anteriorPagina}
            >
              {scrollTop > 700 ? "<<" : "Anterior"}
            </button>
          ) : (
            ""
          )}

          {perpage !== 0 ? (
            <button
              className={scrollTop > 700 ? "fixo right" : ""}
              onClick={this.proximaPagina}
            >
              {scrollTop > 700 ? ">>" : "Próxima"}
            </button>
          ) : (
            ""
          )}
        </footer>
      </div>
    );
  }
}
