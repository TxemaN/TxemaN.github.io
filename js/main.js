document.addEventListener('DOMContentLoaded', () => {

  const form = document.querySelector("#formulario")
  const busqueda = document.querySelector("#busqueda")
  const orientacion = document.querySelector("#orientacion")
  const urlBase = 'https://api.pexels.com/v1'
  let formatoMalo = document.querySelector("#formatoMalo")
  const tendencias = document.querySelector("#tendencias")
  const contenedorFotos = document.querySelector("#contenedorFotos")
  const fragment = document.createDocumentFragment();
  const urlTendencias = 'curated?page=2&per_page='
  const cabeceraTendencias = document.querySelector("#cabeceraTendencias")
  const btnMostrar = document.querySelector("#btnMostrar")
  let cantidadFotosBusqueda = 25;
  let cantidadMaximaBusqueda = 5;
  let cantidadFotosCurated = 3;
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
      let valor = busqueda.value
      let valor2 = orientacion.value
      let mensaje = ""

      formatoMalo.textContent = mensaje

      let url = `search?query=${valor}&per_page=${cantidadFotosBusqueda}&orientation=${valor2}&page=1`
      pintarFotos(url)
      form.reset()
      console.log(valor)
      console.log(valor2)
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

  //con este addevent IF llamamos a los botones de mostrar o no//
  document.addEventListener('click', (ev) => {


    if (ev.target.id == "btnMostrar") {
      tendencias.classList.remove("esconder")

      consultaTendencias(cantidadFotosCurated);
      cantidadFotosCurated += 3
      pintarTendencias()
      btnMostrar.textContent = "Mostrar más tendencias"
    }
    if (ev.target.id == "btnOcultar") {
      esconderFotos();
      consultaTendencias(cantidadFotosCurated);
      cantidadFotosCurated = 0
      btnMostrar.textContent = "Mostrar tendencias"
    }


  })
  const esconderFotos = () => {

    tendencias.classList.add("esconder")

  }

  //COGER HTML
  const consultaTendencias = async () => {

    try {

      const resp = await fetch(`${urlBase}/${urlTendencias}${cantidadFotosCurated}`, {
        headers: {
          'Authorization': 'mumVi2YGbikluEcNGTCofbZyeHkJZIPSTUpGcmqVe9173qGbfmzYGzCe'

        }
      })

      if (resp.ok) {
        const datos = await resp.json()
        return {
          ok: true,
          datos
        }
      } else {
        throw ('no busca lo que pides')
      }


    } catch (error) {
      return {
        ok: false,
        datos: error
      }
    }

  }
  const pintarTendencias = async (urlTendencias) => {
    tendencias.innerHTML = ""
    const { ok, datos } = await consultaTendencias(urlTendencias)

    if (ok) {
      const { photos } = datos

      photos.forEach(({ alt, src, }) => {

        const cajaFotos = document.createElement("DIV");
        const caja = document.createElement("FIGURE");
        const imagen = document.createElement("IMG");
        const descripcion = document.createElement("ALT");
        imagen.src = src.medium;
        descripcion.textContent = alt;
        imagen.value = "caca"
        imagen.classList.add("foto")



        caja.append(imagen);


        cajaFotos.append(caja);

        imagen.append(descripcion)
        fragment.append(cajaFotos);

        tendencias.append(fragment);
      })


    } console.log(datos)
  }
  pintarTendencias()




  const consulta = async (url) => {

    try {

      const resp = await fetch(`${urlBase}/${url}`, {
        headers: {
          'Authorization': 'mumVi2YGbikluEcNGTCofbZyeHkJZIPSTUpGcmqVe9173qGbfmzYGzCe'
        }
      })

      if (resp.ok) {
        const datos = await resp.json()
        return {
          ok: true,
          datos
        }
      } else {
        throw ('no busca lo que pides')
      }


    } catch (error) {
      return {
        ok: false,
        datos: error
      }
    }

  }


  const pintarFotos = async (url) => {
    contenedorFotos.innerHTML = ""

    const { ok, datos } = await consulta(url)


    if (ok) {
      const { photos } = datos
      photos.forEach(({ alt, src }) => {
        console.log(src.small)

        const cajaFotos = document.createElement("DIV");
        const caja = document.createElement("FIGURE");
        const imagen = document.createElement("IMG");
        const descripcion = document.createElement("ALT");

        imagen.src = src.medium;
        descripcion.textContent = alt;

        caja.append(imagen);


        cajaFotos.append(caja);

        imagen.append(descripcion)
        fragment.append(cajaFotos);

        contenedorFotos.append(fragment);
      });
    } else {
      console.log(datos)
    }
    // console.log(busqueda)
  }





})//LOAD
