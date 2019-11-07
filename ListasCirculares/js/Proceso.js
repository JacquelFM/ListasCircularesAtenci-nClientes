export default class Proceso {
    constructor(ciclos, numero) {
        this._ciclos = ciclos;
        this._numero = numero;
        this._despues = null;
    }

    get despues() {
        return this._despuues;
    }

    get ciclos() {
        return this._ciclos;
    }

    get numero() {
        return this._numero;
    }

    set despues(nuevo) {
        this._despues = nuevo;
    }

    set ciclos(nuevaCantCiclos) {
        this._ciclos = nuevaCantCiclos;
    }

}