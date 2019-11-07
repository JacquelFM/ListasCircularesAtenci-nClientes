import Proceso from "./Proceso.js";

export default class Procesador {
    constructor() {
        this._primerProceso = null;
        this._ultimoProceso = null;
        this._totalProcesos = 0;
        this._asistencias = 0;
    }

    comenzar() {
        let contador = 1;
        let temp = null;

        for (let i = 1; i <= 300; i++) {
            if (this._primerProceso == null) {
                this._sacarProbabilidad(contador);
                temp = this._primerProceso;
            } else {
                this._sacarProbabilidad(contador);
                if (temp != null) {
                    if (temp.ciclos == 0) {
                        this._asistencias++;
                        this._eliminarProceso(temp);
                        this._totalProcesos--;
                        temp = temp.despues;
                    } else {
                        temp.ciclos--;
                    }
                }
            }
        }

        console.log(
            `Atentidos en total: ${this._asistencias} y 
            Pendientes en total: ${this._totalProcesos}`
        );

    }

    _sacarProbabilidad(contador) {
        if (Math.floor(Math.random() * (100)) <= 39) {
            this._nuevoProceso(contador);
            contador++;
            this._totalProcesos++;
        }
    }

    _nuevoProceso(contador) {
        let proceso = new Proceso(Math.floor(Math.random() * (14)), contador);

        if (this._primerProceso == null) {
            this._primerProceso = proceso;
            this._ultimoProceso = proceso;
            this._primerProceso.despues = proceso;
            this._ultimoProceso.despues = proceso;
        } else {
            proceso.despues = this._primerProceso;
            this._ultimoProceso.despues = proceso;
            this._ultimoProceso = proceso;
        }
    }

    _eliminarProceso(temp) {
        let anterior = this._encontrarBaseAtras(temp);

        if (temp.numero == this._primerProceso.numero && temp.numero == this._ultimoProceso.numero) {
            this._primerProceso = null;
            this._ultimoProceso = null;
        } else if (temp.numero == this._primerProceso.numero) {
            anterior.despues = this._primerProceso.despues;
            this._primerProceso = this._primerProceso.despues;
        } else if (temp.numero == this._ultimoProceso.numero) {
            anterior.despues = this._ultimoProceso.despues;
            this._ultimoProceso = anterior;
        } else {
            anterior.despues = anterior.despues.despues;
        }
    }

    _encontrarBaseAtras(temp) {
        let procBuscado = this._primerProceso;

        if (procBuscado.numero == temp.numero) {
            if (this._ultimoProceso.numero == temp.numero) {
                return this._primerProceso;
            } else {
                return this._ultimoProceso;
            }
        } else {
            while (procBuscado.numero != temp.numero && this._ultimoProceso.numero != temp.numero && procBuscado.despues.numero != temp.numero) {
                procBuscado = procBuscado.despues;
            }
            return procBuscado;
        }
    }

}