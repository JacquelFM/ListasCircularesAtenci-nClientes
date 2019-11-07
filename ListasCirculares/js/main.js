import Procesador from './Procesador.js';
import Proceso from './Proceso.js';

class Main {
    constructor() {
        let procesador = new Procesador();

        document.querySelector("#btnComenzar").addEventListener("click", () => {
            procesador.comenzar();
        });

    }
}

let m = new Main();