document.addEventListener('DOMContentLoaded', () => {

    const form = document.querySelector("#formulario")
    const busqueda = document.querySelector("#busqueda")
    const orientacion = document.querySelector("#orientacion")
    const urlBase = 'https://api.pexels.com/v1'
    let formatoMalo = document.querySelector("#formatoMalo")

    const tendencia = document.querySelector("#tendencia")
    const contenedorFotos = document.querySelector("#contenedorFotos")
    const fragment = document.createDocumentFragment();
    let refTendencia = 1;
    const cabeceraTendencias = document.querySelector("#cabeceraTendencias")
    const cabeceraResultado = document.querySelector("#cabeceraResultado")
    const anterior = document.querySelector("#anterior")
    const siguiente = document.querySelector("#siguiente")
    const btnMostrar = document.querySelector("#btnMostrar")
    const btnOcultar = document.querySelector("#btnOcultar")
    const piePagina = document.querySelector("#piePagina")
    let paginaResultado = 1
    
    const regExp = {
        loQueBusca: /[\a-zA-Z\s]+/i
    }
    //INPUT USUARIO
    form.addEventListener('submit', (ev) => {
        ev.preventDefault()
        const validado = validar();
        if (!validado) {

            let mensaje = "No parece un formato válido"

            formatoMalo.textContent = mensaje
            form.reset()
        }

        if (validado) {

            //  USAR ESPACIO PARA LA NUEVA FUNCIÓN
            comenzarPintar()
        }

    })
    //con este addevent llamamos a los botones de mostrar más sugerencias o no mostrarlas//
    document.addEventListener('click', (ev) => {


        if (ev.target.id == "btnMostrar") {

            mostrarFotos();
            consulta(urlTendencias2);
            refTendencia += 1

            console.log(refTendencia)

            pintarTendencias()
            btnMostrar.textContent = "Mostrar otra sugerencia"
        }
        if (ev.target.id == "btnOcultar") {
            esconderFotos();

            btnMostrar.textContent = "Mostrar tendencias"
        }
        if (ev.target.id == "anterior") {
            paginaResultado = paginaResultado -= 1;
            url = `${urlConOrientacion}${paginaResultado}`
            pintarFotos(url)

            if (paginaResultado < 1) { paginaResultado = 1 }



        }
        if (ev.target.id == "siguiente") {
            paginaResultado = paginaResultado += 1;
            url = `${urlConOrientacion}${paginaResultado}`
            pintarFotos(url)



        }


    })
    //REPRODUCIR EL SEARCH DE LA TENDENCIA EN LOS RESULTADOS DE ABAJO//
    document.addEventListener("click", ({ target }) => {




        if (target.id == 59523) {
            contenedorFotos.innerHTML = "";
            
            let probando = "probando";
            console.log(probando)
            const url = `search?query=puppy&per_page=6&orientation=&page=1`
            anterior.classList.add("esconder")
            pintarFotos(url)


            urlConOrientacion = `search?query=puppy&per_page=6&orientation=&page=1`

        }
        else if (target.id == 97492) {
            contenedorFotos.innerHTML = ""
            let probando = "probando";
            console.log(probando)
            const url = `search?query=fire&per_page=6&orientation=&page=1`
            pintarFotos(url)


            urlConOrientacion = `search?query=fire&per_page=6&orientation=&page=1`

        }
        else if (target.id == 3746214) {
            contenedorFotos.innerHTML = ""
            let probando = "probando";
            console.log(probando)
            const url = `search?query=flower&per_page=6&orientation=&page=1`
            pintarFotos(url)


            urlConOrientacion = `search?query=flower&per_page=6&orientation=&page=1`

        }

    })
    //VALIDACIÓN

    const validar = () => {

        let busqueda = document.querySelector("#busqueda").value;

        if (!regExp.loQueBusca.test(busqueda)) {
            return false;
        }

        else {
            return true;
        }
    }
    //UNA VEZ VALIDADO//
    const comenzarPintar = () => {
        let valor = busqueda.value
        let valor2 = orientacion.value
        
        siguiente.classList.remove("esconder")
        piePagina.classList.remove("esconder")

        cabeceraResultado.classList.remove("esconder")

        let mensaje = ""

        formatoMalo.textContent = mensaje

        let url = `search?query=${valor}&per_page=6&orientation=${valor2}&page=${paginaResultado}`
        urlConOrientacion = `search?query=${valor}&per_page=6&orientation=${valor2}&page=`
        pintarFotos(url)
        consulta(url)

        form.reset()
        console.log(valor)
        console.log(urlConOrientacion)
    }

    //FUNCIONES A LAS QUE SE LLAMA DESDE EL EVENT LISTENER ANTERIOR
    const esconderFotos = () => {
        tendencia.classList.add("esconder")
        cabeceraTendencias.classList.add("esconder")
        btnOcultar.classList.add("esconder")
    }






    //COGER DEL HTML
    const consulta = async (url) => {

        try {

            const resp = await fetch(`${urlBase}/${url}`, {
                headers: {
                    'Authorization': 'mumVi2YGbikluEcNGTCofbZyeHkJZIPSTUpGcmqVe9173qGbfmzYGzCe',

                }

            })


            if (resp.ok) {
                const datos = await resp.json()
                console.log(resp)
                return {
                    ok: true,
                    datos

                }

            }

            else {
                throw ('no busca lo que pides')

            }


        } catch (error) {
            return {
                ok: false,

                datos: error
            }
        }
    }


    // función crea categorías 


    const pintarTendencias = async () => {
        const tendencias = [59523, 97492, 3746214]
        tendencias.forEach(async (item) => {
            const { ok, datos } = await consulta(`/photos/${item}`)
            if (ok) {
                const caja = document.createElement('FIGURE');
                const foto = document.createElement('IMG');


                foto.src = datos.src.medium;
                foto.id = datos.id;
                caja.append(foto);

                fragment.append(caja);

            } tendencia.append(fragment)
        })
    }


    const pintarFotos = async (url) => {
        contenedorFotos.innerHTML = ""
        
        siguiente.classList.remove("esconder")
        piePagina.classList.remove("esconder")
        const { ok, datos } = await consulta(url)
        

        if (ok) {
            const { photos } = datos
            if (photos.length < 6) {
                siguiente.classList.add("esconder")
            }

            photos.forEach(({ total_results, src, id, }) => {
                const caja = document.createElement("FIGURE");
                const imagen = document.createElement("IMG");

                total_results = total_results;
                imagen.src = src.medium;
                imagen.id = id;


                caja.append(imagen);


                fragment.append(caja);

                contenedorFotos.append(fragment);
            })
            console.log(datos);
        } else {
            console.log(datos)
        }
        // console.log(busqueda)
    }

    pintarTendencias()
})//LOAD
