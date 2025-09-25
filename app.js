// Lista de productos simples
const productos = [
  { id: 1, nombre: "Camiseta Rojinegra", precio: 79.9, img: "imagenes/camiseta.png" },
  { id: 2, nombre: "Gorra Rojinegra", precio: 39.9, img: "imagenes/gorra.jpg" },
  { id: 3, nombre: "Bufanda de Hinchada", precio: 29.9, img: "imagenes/bufanda.jpeg" }
];

let carrito = [];

// Renderizar catálogo
function renderCatalogo() {
  document.getElementById('listaProductos').innerHTML = productos.map(p => `
    <div class="card p-3 text-center">
      <img src="${p.img}" class="card-img-top mb-2" alt="${p.nombre}" style="max-height:150px; object-fit:contain;">
      <h5>${p.nombre}</h5>
      <p>S/ ${p.precio.toFixed(2)}</p>
      <button class="btn btn-sm btn-danger w-100" onclick="agregar(${p.id})">Agregar al carrito</button>
    </div>
  `).join('');
}


// Renderizar carrito
function renderCarrito() {
  let total = 0;
  document.getElementById('tbodyCarrito').innerHTML = carrito.map(i => {
    total += i.precio * i.cantidad;
    return `
      <tr>
        <td>${i.nombre}</td>
        <td>S/ ${i.precio.toFixed(2)}</td>
        <td>${i.cantidad}</td>
      </tr>
    `;
  }).join('');
  document.getElementById('total').innerText = `Total: S/ ${total.toFixed(2)}`;
}

// Agregar al carrito
function agregar(id) {
  let prod = productos.find(p => p.id === id);
  let item = carrito.find(i => i.id === id);
  if (item) {
    item.cantidad++;
  } else {
    carrito.push({ ...prod, cantidad: 1 });
  }
  renderCarrito();
}

// Mostrar secciones (SPA)
function showSection(id) {
  ['home','catalogo','carrito','contacto'].forEach(s => {
    document.getElementById(s).classList.toggle('d-none', s !== id);
  });
}

// Control de navegación
window.addEventListener('hashchange', () => {
  showSection(location.hash.replace('#','') || 'home');
});

window.addEventListener('DOMContentLoaded', () => {
  renderCatalogo();
  showSection('home');
});
