import Lampa from "./Lampa.js";

import EredmenyMegjelenit from "./EredemenyMegjelenit.js";

export default class JatekTer {
    #db = 0; /* felkapcsolt lámpák száma */
    #allapotLista = []; /* melyik lámpa ég, melyik nem */
    #lepes = 0; /* ennyi lépésben sikerült lekapcsolni az összes lámpát */
  
    constructor() {
        this.#setAllapotLista()
        this.#init()
        $(window).on("kapcsolas",(event)=> {
            console.log(event.detail)
            let id=event.detail
            this.#szomszedokKeresese(id)
            this.#lepes++;
        })
    }

    #setAllapotLista(){
        for(let index = 0; index < 9; index++){
            let vel=Math.random();
            if (vel < 0.2) {
                this.#allapotLista[index] = true;
            }else{
                this.#allapotLista[index] = false;
            }
        }
    }

    #szomszedokKeresese(id){
        this.#allapotLista[id]=!this.#allapotLista[id]

        if (id % 3 !== 0) {
            this.#allapotLista[id+1]=!this.#allapotLista[id+1]
        }
        if (id % 3 !== 0) {
            this.#allapotLista[id-1]=!this.#allapotLista[id-1]
        }
        if (id < 6) {
            this.#allapotLista[id+3]=!this.#allapotLista[id+3]
        }
        if(id > 2) {
            this.#allapotLista[id-3]=!this.#allapotLista[id-3]
        }
        this.#init()
    }

    #init(){
         $(".jatekter").empty();
        this.#allapotLista.forEach((elem,index)=>{
            new Lampa(elem, index, $(".jatekter"))
        });
        new EredmenyMegjelenit(this.#db,$(".eredmeny"))
    }

    #ellenorzes(){
        this.#allapotLista.forEach((elem, index) => {
            if (!elem){
                this.#db++;
            }
        })
    }

}