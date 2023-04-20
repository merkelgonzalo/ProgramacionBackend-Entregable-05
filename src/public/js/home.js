const socket = io();

socket.on('responseProducts', products => {

  let productsBefore = document.getElementById('responseProducts');
  let productsNow = "";

  products.forEach(product => {
    productsNow += `id: ${product.id}, title: ${product.title} <br>`;
  });

  console.log(productsNow);
  productsBefore.innerHTML = productsNow;

});

    
