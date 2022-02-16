export default class Balance {
    constructor(balance) {
        this.rao = balance;
        this.tao = this.rao / Math.pow(10, 9);
    }

    static from_float(amount) {
        let rao = Math.floor(amount * Math.pow(10, 9));
        return new Balance(rao);
    }

    static from_tao(amount) {
        let rao = Math.floor(amount * Math.pow(10, 9));
        return new Balance(rao);
    }

    static from_rao(amount) {
        return new Balance(amount);
    }

    to_tao() {
        return this.tao;
    }

    to_rao() {
        return this.rao;
    }

    to_string() {
        return `\u03C4${this.tao.toFixed(9)},${this.tao.toFixed(9).split('.')[1]}`;
    }

    to_rich() {
        return `[green]\u03C4[/green][green]${this.tao.toFixed(9).split('.')[0]}[/green][green].[/green][dim green]${this.tao.toFixed(9).split('.')[1]}[/dim green]`;
    }

    to_repr() {
        return this.to_string();
    }

    eq(other) {
        return this.rao === other.rao;
    }

    ne(other) {
        return this.rao !== other.rao;
    }

    gt(other) {
        return this.rao > other.rao;
    }

    lt(other) {
        return this.rao < other.rao;
    }

    le(other) {
        return this.rao <= other.rao;
    }

    ge(other) {
        return this.rao >= other.rao;
    }
}

module.exports = Balance;