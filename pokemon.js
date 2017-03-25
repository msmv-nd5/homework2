module.exports = class Pokemon {
	constructor (name, level) {
		this.name = name;
		this.level = level;
	}
	show(){
		console.log (`Имя: ${this.name}, уровень: ${this.level}`);
	}
	get getName (){
		return this.name;
	}
	get getLevel (){
		return this.level;
	}

	valueOf() {
    return this.level;
  }
}