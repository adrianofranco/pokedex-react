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
    allPokemons: [],
    pokemon: 0,
    page: 0,
    perpage: 5,
    npokemon: 0,
  };

  getPokemon = async (pokemonid) => {
    const pokemon = await loadPokemon(pokemonid);
    this.setState({ pokemon });
  };

  getPokemons = async () => {
    const allPokemons = await loadPokemons();
    this.setState({ allPokemons });

    const { page, perpage } = this.state;
    
    const nextPage = page ;

    const nextPokemons = allPokemons.slice(nextPage, nextPage + perpage);

    const pokemons = []

    pokemons.push(...nextPokemons);

    this.setState({
      pokemons: pokemons,
      page: nextPage
    })

    this.getLazy();

  };

  componentDidMount() {
    this.getPokemons();
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  changePerPage = async (event) => {

    const perpage = parseInt(event.target.value);
    
    await this.setState({ perpage });

    const { page, allPokemons } = this.state;
    
    const nextPage = page ;

    const nextPokemons = allPokemons.slice(nextPage, nextPage + perpage);

    const pokemons = []

    pokemons.push(...nextPokemons);

    this.setState({
      pokemons: pokemons,
      page: nextPage
    })


  };

  proximaPagina = async () => {
        
    const { page, perpage, allPokemons } = this.state;
    
    const nextPage = page + perpage;

    const nextPokemons = allPokemons.slice(nextPage, nextPage + perpage);

    const pokemons = []

    pokemons.push(...nextPokemons);

    this.setState({
      pokemons: pokemons,
      page: nextPage
    })

    this.getLazy();
  };

  anteriorPagina = async () => {

    const { page, perpage, allPokemons } = this.state;
    
    const nextPage = page - perpage;

    const nextPokemons = allPokemons.slice(nextPage, nextPage + perpage);

    const pokemons = []

    pokemons.push(...nextPokemons);

    this.setState({
      pokemons: pokemons,
      page: nextPage
    })

    await this.getLazy();
  };

  getLazy = async () => {
    const pokelazy = document.getElementsByClassName("poke-lazy");

    

    for (var i = 0; i < pokelazy.length; i++) {
      
      await pokelazy[i].classList.add("poke-lazy-active");
      
    }

    setTimeout(async () => {
      for (var i = 0; i < pokelazy.length; i++) {
        await pokelazy[i].classList.remove("poke-lazy-active");
      }
    }, 500);
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
