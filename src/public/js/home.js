const socket = io();

const form = document.getElementById('productForm');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const title = form.elements.title.value;
  const description = form.elements.description.value;
  const price = form.elements.price.value;
  const code = form.elements.code.value;
  const stock = form.elements.stock.value;
  const category = form.elements.category.value;

  console.log(event);
  socket.emit('newProduct', {
    title,
    description,
    price,
    code,
    stock,
    category
  });
})

socket.on('updateProducts', (data) => {
  const tbody = document.getElementById("productsNow");

  const productsMap = data
    .map((item) => {
      return `<tr>
      <th scope="row">${item.id}</th>
      <td>${item.title}</td>
      <td>${item.description}</td>
      <td>${item.price}</td>
      <td>${item.code}</td>
      <td>${item.stock}</td>
      <td>${item.category}</td>
      <td>${item.status}</td>
      </tr>`;
    })
    .join("");
  tbody.innerHTML = productsMap;
});

    
