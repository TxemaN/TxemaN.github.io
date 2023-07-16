/**
 * Función para registrar un nuevo usuario
 * @param {String} name Nombre de usuario
 * Acepta tipo Number y String
 * @param {Number | String} age Edad del usuario
 * @param {Boolean} admin Especifica si es o ono administración (valor opcional)
 * los corchetes indican que el valor es opcional
 * @param {Array} [data] Mas información del usuario (valor opcional)
 * @returns {Boolean} Devuelve true si el registro es correcto y false si no lo es
 */

const newUser = (name, age, admin, data) => {
    name = "Txema"
    age = 39  
    admin = true;
    console.log('user registered in DB ...')
    return true
}

export {
    newUser
}