class Character {
    constructor(charObject) {
        Object.assign(this, charObject);
        if (this.name === "jigglypuff") {
            this.maxHealth = 100;
        } else {
            this.maxHealth = Math.floor(Math.random() * 20) + 20;
        }
        this.currentHealth = this.maxHealth;
    }
}

export {Character}