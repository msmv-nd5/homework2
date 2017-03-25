var Pokemon = require('./pokemon');
module.exports = class PokemonList extends Array {
	constructor (...pokemons) {
		return super(...pokemons);
	}

	add (name, level) {
		let newPokemon = new Pokemon (name, level);
		this.push(newPokemon);
	}

	show(){
		for (let pokemon of this) {
			pokemon.show();
		}
		console.log ("Всего покемонов: " + this.length);
	}
	get max (){
		var maxLevel = Math.max (...this);
		for (var pokemon of this) {
			if (pokemon.getLevel == maxLevel) {return pokemon;}
		}
	}
}