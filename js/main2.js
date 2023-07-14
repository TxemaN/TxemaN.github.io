const urlBase = 'https://api.pexels.com/v1'
let urlTendencias = 'photos/59525'
const tendencias = document.querySelector("#tendencias")
const fragment = document.createDocumentFragment()
const consultaTendencias = async () => {
    try {
        const resp = await fetch(`${urlBase}/${urlTendencias}`, {
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
    }
    catch (error) {
        return {
            ok: false,
            datos: error
        }
    }
}

const generarCategoria = async (urlTendencias) => {

    const { ok, datos } = await consultaTendencias(urlTendencias)

    if (ok) {
        const { photos } = datos
        photos.forEach(({ src, id }) => {
            const caja = document.createElement("FIGURE")
            const foto = document.createElement("IMG")
            foto.src = src.medium;
            foto.id = id;

            caja.append(foto);



            fragment.append(caja);

            tendencias.append(fragment)
        });
        
         }
}
generarCategoria()

const mostrarCategoria = async () => {

    const arrayCategoria = [{
        url: 'photo/2014422',
        cat: 'car'
    },
    {
        url: 'photo/2014423',
        cat: 'baby'
    },
    {
        url: 'photo/2014424',
        cat: 'flower'
    },]

    arrayCategoria.forEach(async ({ url, cat }) => {
        const tarjeta = await generarCategoria(url, cat)
        tendencias.append(tarjeta)


    })

}