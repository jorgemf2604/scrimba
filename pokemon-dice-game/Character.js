class Character {
  constructor(charObject) {
    Object.assign(this, charObject);
    if (this.name === "jigglypuff") {
        this.maxHealth = 100;
        this.role = "hero";
        this.numberOfDice = 3;
    } else {
        this.maxHealth = Math.floor(Math.random() * 20) + 20;
        this.role = "foe";
        this.numberOfDice = Math.floor(Math.random() * 3) + 1;
    }
    this.currentHealth = this.maxHealth;
    this.diceHtml = this.getDicePlaceholderHtml(this.numberOfDice);
  } 
  
  getDicePlaceholderHtml(numberOfDice) {
    return new Array(numberOfDice).fill(0).map(() => `<div class="placeholder-dice"></div>`).join("")
  }

  getDiceHtml() {
    const diceValues = new Array(this.numberOfDice).fill(0).map(() => Math.floor(Math.random() * 6) + 1);
    this.diceHtml = diceValues.map(value => `<div class="dice">${value}</div>`).join("");
  };


  getHealthBarHtml() {
    const healthPercentage = (this.currentHealth / this.maxHealth) * 100;
    const conditionalClass = healthPercentage < 25 ? "danger" : "";

    return `
        <div class="outer-health-bar">
            <div class="inner-health-bar ${conditionalClass}" style="width:${healthPercentage}%;"></div>
        </div>
    `;
  }

  getCharacterHtml() {
    return `
      <p>${this.name}</p>
      <img src="${this.image}" />
      <p>Health: ${this.currentHealth}</p>
      ${this.getHealthBarHtml()}
      <div class="dice-container">
        ${this.diceHtml}
      </div>
    `;
  }
}

export {Character}