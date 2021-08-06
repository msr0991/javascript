/* Selectores */
const stockP = document.querySelector('.productos');
const tablaC = document.querySelector('tbody');
const vaciarBoton = document.querySelector('#vaciar-carrito');
let carrito = [];

/* Listeners */
stockP.addEventListener('click', agregarP);
tablaC.addEventListener('click', borrarP);
vaciarBoton.addEventListener('click', vaciarC);
document.addEventListener('DOMContentLoaded', () => {
    
	if (JSON.parse(localStorage.getItem('carrito'))) {
		carrito = JSON.parse(localStorage.getItem('carrito'));
		productoAgregadoHTML();
	}
});

/* Vaciar carrito */
function vaciarC() {
	carrito = [];
	productoAgregadoHTML();
}

/* Borrar producto en particular */
function borrarP(e) {
	e.preventDefault();

	if (e.target.classList.contains("borrar-producto")) {
		const idP = e.target.getAttribute('data-id');
		carrito = carrito.filter(producto => producto.id !== idP);
		productoAgregadoHTML();
	}
}

/* Agregar producto */
function agregarP(e) {
	e.preventDefault();

	if (e.target.classList.contains("botn")) {
		const divPadre = e.target.parentElement.parentElement;

		datosP(divPadre);
	}
}

/* Datos del producto agregado */
function datosP(divPadre) {

	const productoAgregado = {
		imagen: divPadre.querySelector('img').src,
		nombre: divPadre.querySelector('h2').textContent,
		precio: divPadre.querySelector('p').textContent,
		cantidad: 1,
		id: divPadre.querySelector('button').getAttribute('data-id')
	};

	const estaEnCarrito = carrito.some(producto => producto.id === productoAgregado.id);

	if (estaEnCarrito) {
		const productos = carrito.map(producto => {
			if (producto.id === productoAgregado.id) {
				producto.cantidad++;
				producto.precio = `$${Number(productoAgregado.precio.slice(1)) * producto.cantidad}`;
                return producto;
			} else {
				return producto;
			}
		});
		carrito = [...productos];
	} else {
		carrito = [...carrito, productoAgregado];
	}

	productoAgregadoHTML();
}

/* HTML a agregar en carrito */
function productoAgregadoHTML() {

	productoBorradoHTML();

	carrito.forEach(producto => {
		const { imagen, nombre, precio, cantidad, id } = producto;

		const row = document.createElement('tr');
		row.innerHTML = `
		<td>
			<img class="img-fluid lala" src="${imagen}" width="30%">
		</td>
		<td>${nombre} </td>
		<td class="text-right font-weight-bold">${precio} </td>
		<td class="text-center lolo">${cantidad} </td>
		<td>
			<button type="button" class="btn btn-danger borrar-producto" data-id="${id}">X</button>
		</td>
		`
		tablaC.appendChild(row);
	});

	guardarCarritoStorage();
}

/* HTML a borrar en carrito */
function productoBorradoHTML() {
	while (tablaC.firstChild) {
		tablaC.removeChild(tablaC.firstChild);
	}
}

/* Storage carrito */
function guardarCarritoStorage() {
	localStorage.setItem('carrito', JSON.stringify(carrito));
}


/* Boton CheckOut con jQuery */
$("#vaciar-carrito").append('<button class="btn btn-outline-danger nuevoBoton">Checkout</button>');

$(document).on("click", ".nuevoBoton", function(e) {
	swal(
		'Gracias por su compra!',
		'Nos contactaremos con usted a la brevedad',
		'SALIR',
	)
	return false;
});


/* SPA */

document.addEventListener('DOMContentLoaded', router);
window.addEventListener('hashchange', router);


const NosotrosComponent = {
	render: () => {
		return `
		<h1 class="text-center font-weight-bold">Quiénes somos</h1><br>
		<div class="container">
		<div class="row justify-content-md-center">
		  <div class="col">
			<p class="p0"> Somos una tienda-taller situada en el barrio Florida, en Vicente Lopez. Especialistas en la venta de violines, violas y violonchelos, así como de sus distintos accesorios tales como cuerdas, arcos, estuches, sordinas, almohadillas, etc... En nuestro taller llevamos a cabo todo tipo de restauraciones y realizamos la puesta a punto y el control de calidad de los instrumentos que vendemos y alquilamos gracias a un equipo formado por luthiers experimentados.</p>
			<p class="p0"> También disponemos de un amplio catálogo de instrumentos y arcos antiguos, de los cuales garantizamos su perfecto funcionamiento gracias al exhaustivo proceso de restauración y revisión realizado en nuestro taller. Todos ellos vienen acompañados de sus respectivos certificados de autenticidad y/o valoración y ofreciendo además la posibilidad de asegurarlos.</p>
			<p class="p0"> Más de 30 años de experiencia nos permiten ofrecer la mejor selección y la más amplia gama de instrumentos tanto nacionales como internacionales, ya sea para estudiantes recién iniciados o para los profesionales más exigentes. Nuestra atención personalizada, calidad y garantía nos han proporcionado el constante reconocimiento de nuestros clientes, tanto en la buena relación personal como en el trabajo realizado a lo largo de toda nuestra trayectoria.</p>
		  </div>
		  <div class="col-md-auto">
			<img src="../img/violines.jpg" width="500vh" alt="lala" class="rounded mx-auto d-block">
		  </div>
		</div>
		`
	}
}
const ContactoComponent = {
	render: () => {
		return `
		<h1 class="text-center font-weight-bold">Contactanos</h1><br>
		<div class="container">
		<div class="row justify-content-md-center">
		  <div class="col">
			<p class="p0">Antes que nada te invito a ver mi página de Facebook donde vas a poder ver todas las fotos del taller actualizadas y todos los arreglos que hago día a día. Debajo de este texto tenés el link para ingresar directo.</p>
			<p class="p0">Podés enviarme WhatsApp al 11-0000-0000. Estoy en Florida, Vicente López.</p>
			<p class="p0">El taller abre días hábiles de 14 a 20. La dirección es Moreno 5700, Vicente López, Buenos Aires, Argentina.</p>
		  </div>
		  <div class="col-md-auto">
			<img src="../img/celloContactos.jpg" width="500vh" alt="lala" class="rounded mx-auto d-block">
		  </div>
		</div><br>
		<div class="d-flex justify-content-center">
            <a class="btn btn-dark btn-social mx-2 bg-danger" href="#!"><i class="fab fa-instagram"></i></a>
            <a class="btn btn-dark btn-social mx-2 bg-primary" href="#!"><i class="fab fa-facebook-f"></i></a>
            <a class="btn btn-dark btn-social mx-2 bg-success" href="#!"><i class="fab fa-whatsapp"></i></a>
        </div><br>
		`
	}
}

const links = [
	{ path: '/nosotros', component: NosotrosComponent },
	{ path: '/contacto', component: ContactoComponent }
];

function parseLocation() {
	return location.hash.slice(1) || "/";
}

function findComponent(noHash) {
	return links.find(route => route.path === noHash);
}

function router() {
	const noHash = parseLocation();

	const { component = [] } = findComponent(noHash) || {};

	const app = document.querySelector('.productos');
	app.innerHTML = component.render();
}