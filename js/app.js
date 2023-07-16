import { newUser } from "./functions";

newUser('pepe', 30, false, [])
/**
 * Alnmacena el cargo
 * @type {String} cargo del usuario
 */

const cargo='developer'
/**
 * @type {Array<Number | String>}
 */
const articulos = ['', 3, '',]
/**
 * Creamos una definición de tipo
 * @typedef {Object} usuario
 * @property {Number} id id del usuario
 * @property {String} nombre nombre del usuario
 * @property {String} email email del usuario
 * @property {Boolean} repite valor booleano si repite o
 */

/**
 * @type {usuario}
 */

const datosUsuario = {
    id: 1,
    nombre: 'Txema',
    email: 'txalcala@hotmail.com',
    repite: false

}
/**
 * Trabajar con las noticias
 */

class Noticia {

    /**
     * 
     * @param {String} titulo Título de la noticia
     * @param {String} extracto Extracto de la noticia
     * @param {String} noticia Cuerpo de la noticia
     */

    constructor(titulo, extracto, noticia) {
        this.titulo = titulo
        this.extracto = extracto
        this.noticia = noticia
    }

    /**
     * Borra un artículo por su id
     * @param {String} id Ide del artículo que queremos borrar
     * @returns {Boolean}   retorna si se ha eliminado o no
     */

    static borrarNoticia(id) {
        //...
        return false

    }

}

const noticia1 = new Noticia('titulo', 'Extracto de la noticia', 'Cuerpo de la noticia')