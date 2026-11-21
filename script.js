// بيانات المنتجات (يمكنك تعديلها لتناسب منتجات المحل الذي ستعرض عليه الموقع)
const products = [
  { id: 1, name: "ساعة كرونوغراف ملكية", category: "watches", catLabel: "ساعات", price: 250, icon: "⌚" },
  { id: 2, name: "عطر عود الليل الفاخر", category: "perfumes", catLabel: "عطور", price: 140, icon: "🧴" },
  { id: 3, name: "نظارة شمسية كلاسيك", category: "accessories", catLabel: "إكسسوارات", price: 110, icon: "🕶️" },
  { id: 4, name: "ساعة ذكية إصدار التيتانيوم", category: "watches", catLabel: "ساعات", price: 320, icon: "⏱️" },
  { id: 5, name: "عطر العنبر والزعفران", category: "perfumes", catLabel: "عطور", price: 160, icon: "✨" },
  { id: 6, name: "محفظة جلد طبيعي 100%", category: "accessories", catLabel: "إكسسوارات", price: 85, icon: "👛" }
];

let cart = [];

const productsGrid = document.getElementById("productsGrid");
const cartCount = document.getElementById("cartCount");
const cartItemsEl = document.getElementById("cartItems");
const cartTotalEl = document.getElementById("cartTotal");
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");

// عرض المنتجات حسب التصنيف
function renderProducts(filter = "all") {
  productsGrid.innerHTML = "";
  const filtered = filter === "all" ? products : products.filter(p => p.category === filter);

  filtered.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <div class="product-img">${product.icon}</div>
      <div class="product-info">
        <span class="product-cat">${product.catLabel}</span>
        <h3>${product.name}</h3>
        <div class="product-bottom">
          <span class="price">$${product.price}</span>
          <button class="add-btn" onclick="addToCart(${product.id})">+ أضف للسلة</button>
        </div>
      </div>
    `;
    productsGrid.appendChild(card);
  });
}

// إضافة للسلة
window.addToCart = function(id) {
  const item = products.find(p => p.id === id);
  cart.push(item);
  updateCartUI();
  openCart();
};

// حذف من السلة
window.removeFromCart = function(index) {
  cart.splice(index, 1);
  updateCartUI();
};

// تحديث واجهة السلة
function updateCartUI() {
  cartCount.textContent = cart.length;
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartTotalEl.textContent = `$${total}`;

  if (cart.length === 0) {
    cartItemsEl.innerHTML = `<p class="empty-msg">السلة فارغة حالياً</p>`;
    return;
  }

  cartItemsEl.innerHTML = cart.map((item, idx) => `
    <div class="cart-item">
      <div>
        <strong>${item.name}</strong>
        <div style="color:#f59e0b; font-size:0.9rem;">$${item.price}</div>
      </div>
      <button class="remove-item" onclick="removeFromCart(${idx})">حذف</button>
    </div>
  `).join("");
}

// فتح وإغلاق السلة
function openCart() {
  cartDrawer.classList.add("open");
  cartOverlay.classList.add("open");
}
function closeCart() {
  cartDrawer.classList.remove("open");
  cartOverlay.classList.remove("open");
}

document.getElementById("openCartBtn").addEventListener("click", openCart);
document.getElementById("closeCartBtn").addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

// أزرار الفلترة
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".filter-btn.active").classList.remove("active");
    btn.classList.add("active");
    renderProducts(btn.dataset.filter);
  });
});

// إرسال الطلب مباشرة إلى واتساب صاحب المحل
document.getElementById("whatsappOrderBtn").addEventListener("click", () => {
  if (cart.length === 0) return alert("أضف منتجاً واحداً على الأقل للسلة.");

  const name = document.getElementById("customerName").value.trim() || "عميل جديد";
  const address = document.getElementById("customerAddress").value.trim() || "غير محدد";
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const itemsList = cart.map(i => `- ${i.name} ($${i.price})`).join("\n");

  const message = `مرحباً، أرغب بطلب المنتجات التالية:\n${itemsList}\n\nالمجموع: $${total}\nالاسم: ${name}\nالعنوان: ${address}`;
  const phone = "212695520065"; // ضع رقم واتساب صاحب المحل هنا
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
});

renderProducts();


