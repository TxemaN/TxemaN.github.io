document.addEventListener('DOMContentLoaded', () => {

  const form = document.querySelector("#formulario")
  const busqueda = document.querySelector("#busqueda")
  const orientacion = document.querySelector("#orientacion")
  const urlBase = 'https://api.pexels.com/v1'
  let formatoMalo = document.querySelector("#formatoMalo")
  let url = ""
  let urlConOrientacion = ""
  const tendencias = document.querySelector("#tendencias")
  const contenedorFotos = document.querySelector("#contenedorFotos")
  const fragment = document.createDocumentFragment();
  let urlTendencias = 97492
  let refTendencia = 1;
  const cabeceraTendencias = document.querySelector("#cabeceraTendencias")
  const btnMostrar = document.querySelector("#btnMostrar")
  let paginaResultado = 2

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

  const comenzarPintar = () => {
    let valor = busqueda.value
    let valor2 = orientacion.value

    let mensaje = ""

    formatoMalo.textContent = mensaje

    url = `search?query=${valor}&per_page=6&orientation=${valor2}&page=${paginaResultado}`
    urlConOrientacion = `search?query=${valor}&per_page=6&orientation=${valor2}&page=`
    pintarFotos(url)
    form.reset()
    console.log(valor)
    console.log(urlConOrientacion)
  }
  //con este addevent llamamos a los botones de mostrar o no//
  document.addEventListener('click', (ev) => {


    if (ev.target.id == "btnMostrar") {
      tendencias.classList.remove("esconder")
      contenedorFotos.innerHTML = ""

      consultaTendencias(urlTendencias);
      refTendencia += 1
      if (refTendencia == 1) {
        urlTendencias = 97492
      }
      if (refTendencia == 2) {
        urlTendencias = 59523
      }
      if (refTendencia == 3) {
        urlTendencias = 3746214
      }
      if (refTendencia == 4) {
        urlTendencias = 2133
      }
      if (refTendencia > 4) {
        refTendencia = 1
        urlTendencias = 97492
      }
      console.log(refTendencia)
      
      pintarTendencias()
      btnMostrar.textContent = "Mostrar más tendencias"
    }
    if (ev.target.id == "btnOcultar") {
      esconderFotos();

      btnMostrar.textContent = "Mostrar tendencias"
    }
    if (ev.target.id == "anterior") {
      pintarFotos(url)
      paginaResultado = paginaResultado -= 1;
      if (paginaResultado == 0) { paginaResultado = 1 }

      url = `${urlConOrientacion}${paginaResultado}`

    }
    if (ev.target.id == "siguiente") {
      pintarFotos(url)
      paginaResultado = paginaResultado += 1;
      url = `${urlConOrientacion}${paginaResultado}`

    }

  })

  const esconderFotos = () => {
    tendencias.classList.add("esconder")
  }


  //COGER HTML
  const consultaTendencias = async () => {

    try {

      const resp = await fetch(`${urlBase}/photos/${urlTendencias}`, {
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


      const cajaFotos = document.createElement("DIV");
      const caja = document.createElement("FIGURE");
      const imagen = document.createElement("IMG");
      const descripcion = document.createElement("ALT");
      imagen.src = datos.src.medium;
      imagen.id = datos.id;
      descripcion.textContent = datos.alt;
      imagen.classList.add("foto")

      caja.append(imagen);
      cajaFotos.append(caja);
      imagen.append(descripcion)
      fragment.append(cajaFotos);

      tendencias.append(fragment);



    } console.log(datos)
  }
  pintarTendencias()
//REPRODUCIR EL SEARCH DE LA TENDENCIA EN LOS RESULTADOS DE ABAJO//
document.addEventListener("click", ({ target }) => {

    if(target.id==97492){
      contenedorFotos.innerHTML = ""
      let probando = "probando";
      console.log(probando)
      pintarFotos(url)
       url = `search?query=fire&per_page=6&orientation=&page=1`
       urlConOrientacion = `search?query=fire&per_page=6&orientation=&page=1`
       }
    
    if(target.id==59523){
      contenedorFotos.innerHTML = ""
   let probando = "probando";
   console.log(probando)
   pintarFotos(url)
      
      url = `search?query=puppy&per_page=6&orientation=&page=1`
      urlConOrientacion = `search?query=puppy&per_page=6&orientation=&page=1`
    }
    if(target.id==3746214){
      contenedorFotos.innerHTML = ""
      let probando = "probando";
      console.log(probando)
      pintarFotos(url)
         
         url = `search?query=flower&per_page=6&orientation=&page=1`
         urlConOrientacion = `search?query=flower&per_page=6&orientation=&page=1`
       }
       if(target.id==2133){
        contenedorFotos.innerHTML = ""
        let probando = "probando";
        console.log(probando)
        pintarFotos(url)
           
           url = `search?query=father&per_page=6&orientation=&page=1`
           urlConOrientacion = `search?query=father&per_page=6&orientation=&page=1`
         }
  })


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
      photos.forEach(({ alt, src, id }) => {
        console.log(src.small)

        const cajaFotos = document.createElement("DIV");
        const caja = document.createElement("FIGURE");
        const imagen = document.createElement("IMG");
        const descripcion = document.createElement("ALT");

        imagen.src = src.medium;
        imagen.id = id;
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
