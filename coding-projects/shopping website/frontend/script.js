const products = [
  { id: 1, name: "Zebronics Blanc Slim Wireless Mouse", price: 450, category: "electronics", image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRZe7gtlyZxij-IMcfLT7NofWIO5l8m4QPkipTnej6DfIke-EEdgOKF1CXnpgMK2gmGa3-T85ix3CoD9qlrSIBlsRyCxa0mle8ZDfnzZyi4XJc5FTTL8jp8PQ", desc: "The Zebronics Blanc Slim Wireless Mouse features a sleek, lightweight design with reliable wireless connectivity and smooth tracking. Perfect for work, study, and travel, it ensures comfort and convenience daily." },
  { id: 2, name: "Noise Smart Watch", price: 1499, category: "electronics", image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcT1Bu8aGY5VAvfprXeVT2BBN0iNMS6xcvQdD-BOfMCobXjXfc4ilTwX7ecP2qAGmsq2EzGDDIoHRVmIs-zWQ76ViKUuraIe", desc: "The Noise Smart Watch combines a premium metal body, vibrant display, and seamless connectivity. Designed for everyday style and fitness tracking, it keeps you connected, organized, and efficient throughout the day." },
  { id: 3, name: "Lymio Jackets | Jacket for men", price: 120, category: "fashion", image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRsQHK6ylrPMHkvN0fzKo7NjVzywqVB1Ug7wsm1BMYHCzM_-TpQIHmJ-1U9VpSPLB0eYgZJGlOgkHcjOnuqeUupBCgVrscEAiI7_7kR_OSGPBJQQK7hMga49d0", desc: "The Lymio Lightweight Jacket offers modern style, comfortable fit, and durable fabric for everyday wear. Ideal for layering in mild weather, it delivers versatility, comfort, and reliable performance for daily use." },
];

const productsDiv = document.getElementById("products");
const productModal = document.getElementById("productModal");
const cartDrawer = document.getElementById("cartDrawer");
const cartItems = document.getElementById("cartItems");

let cart = [];
let currentProduct = null;


function renderProducts(list) {
  productsDiv.innerHTML = "";
  list.forEach(p => {
    productsDiv.innerHTML += `
    <div class="card">
      <img src="${p.image}">
      <div class="card-content">
        <h3>${p.name}</h3>
        <p class="price">Rs. ${p.price}</p>
        <p class="description">
          ${p.desc}
        </p>
        <button data-id="${p.id}">Quick View</button>   <!-- MUST be inside -->
      </div>
    </div>


    `;
  });
}
renderProducts(products);


document.querySelectorAll(".filters button").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll(".filters button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const cat = btn.dataset.cat;
    renderProducts(cat === "all" ? products : products.filter(p => p.category === cat));
  };
});


document.getElementById("searchInput").addEventListener("input", e => {
  const val = e.target.value.toLowerCase();
  renderProducts(products.filter(p => p.name.toLowerCase().includes(val)));
});


productsDiv.addEventListener("click", e => {
  if (e.target.tagName === "BUTTON") {
    const id = Number(e.target.dataset.id);
    currentProduct = products.find(p => p.id === id);

    document.getElementById("modalImg").src = currentProduct.image;
    document.getElementById("modalTitle").textContent = currentProduct.name;
    document.getElementById("modalPrice").textContent = currentProduct.price;
    document.getElementById("modalDesc").textContent = currentProduct.desc;

    productModal.classList.add("show");
  }
});


document.querySelectorAll(".close").forEach(btn => {
  btn.onclick = () => {
    productModal.classList.remove("show");
    cartDrawer.classList.remove("open");
    document.getElementById("checkoutModal").classList.remove("show");
  };
});


document.getElementById("addToCartBtn").onclick = () => {
  const existing = cart.find(i => i.id === currentProduct.id);
  if (existing) existing.qty++;
  else cart.push({ ...currentProduct, qty: 1 });

  updateCart();
  productModal.classList.remove("show");
};


function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;
  let count = 0;

  cart.forEach(i => {
    total += i.price * i.qty;
    count += i.qty;

    cartItems.innerHTML += `
      <div class="cart-item">
        <img src="${i.image}">
        <div class="cart-details">
          <h4>${i.name}</h4>
          <p>Rs. ${i.price}</p>
        </div>
        <div class="qty-controls">
          <button data-id="${i.id}" data-change="-1">−</button>
          <span>${i.qty}</span>
          <button data-id="${i.id}" data-change="1">+</button>
        </div>
      </div>
    `;
  });

  document.getElementById("cartCount").textContent = count;
  document.getElementById("cartTotal").textContent = total;
  document.getElementById("drawerTotal").textContent = total;
}


cartItems.addEventListener("click", e => {
  if (e.target.dataset.change) {
    const id = Number(e.target.dataset.id);
    const change = Number(e.target.dataset.change);
    const item = cart.find(i => i.id === id);

    item.qty += change;
    if (item.qty <= 0) cart = cart.filter(i => i.id !== id);

    updateCart();
  }
});


document.getElementById("openCart").onclick = () => cartDrawer.classList.add("open");


document.querySelector(".pay-btn").onclick = () => {
  if (cart.length === 0) return alert("Cart is empty!");
  document.getElementById("checkoutModal").classList.add("show");
};


document.getElementById("confirmPaymentBtn").onclick = () => {

  const name = custName.value.trim();
  const email = custEmail.value.trim();
  const phone = custPhone.value.trim();
  const address = custAddress.value.trim();

  if (!name || !email || !phone || !address)
    return alert("Fill all details!");

  const totalAmount = cart.reduce((sum, i) => sum + (i.price * i.qty), 0);

  fetch("http://localhost:5000/payment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      email,
      phone,
      address,
      items: cart,
      totalAmount
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      alert(data.message);
      cart = [];
      updateCart();
      cartDrawer.classList.remove("open");
      checkoutModal.classList.remove("show");
    } else {
      alert(data.message);
    }
  })
  .catch(() => alert("Server error!"));
};
