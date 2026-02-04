document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      {
        id: 1,
        name: "Phone Strap 1",
        category: "Phone Strap",
        img: "phone-strap-1.jpg",
        price: 15000,
      },
      {
        id: 2,
        name: "Phone Strap 2",
        category: "Phone Strap",
        img: "phone-strap-2.jpg",
        price: 12500,
      },
      {
        id: 3,
        name: "Phone Strap 3",
        category: "Phone Strap",
        img: "phone-strap-3.jpg",
        price: 13000,
      },
      {
        id: 4,
        name: "Phone Strap 4",
        category: "Phone Strap",
        img: "phone-strap-4.jpg",
        price: 14000,
      },
      {
        id: 5,
        name: "Phone Strap 5",
        category: "Phone Strap",
        img: "phone-strap-5.jpg",
        price: 10000,
      },
    ],
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      //cek apakah ada barang yang sama di cart
      const cartItem = this.items.find((item) => item.id === newItem.id);

      //jika belum ada
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        //jika barang ada atau beda
        this.items = this.items.map((item) => {
          //jika barang beda
          if (item.id !== newItem.id) {
            return item;
          } else {
            //jika barang sudah ada
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },

    sync() {
      localStorage.setItem("cart", JSON.stringify(this));
      this.quantity = Math.max(0, this.quantity);
      this.total = Math.max(0, this.total);
    },

    remove(id) {
      const cartItem = this.items.find((item) => item.id === id);
      if (!cartItem) return;

      cartItem.quantity -= 1;
      cartItem.total = cartItem.price * cartItem.quantity;

      this.quantity -= 1;
      this.total -= cartItem.price;

      if (cartItem.quantity === 0) {
        this.items = this.items.filter((item) => item.id !== id);
      }

      this.sync();
    },

    removeAll(id) {
      const cartItem = this.items.find((item) => item.id === id);
      if (!cartItem) return;

      this.quantity -= cartItem.quantity;
      this.total -= cartItem.total;

      this.items = this.items.filter((item) => item.id !== id);

      this.sync();
    },
  });
});

//konversi ke rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};

//ambil data cart di localstorage agar masuk ke laman payment
document.addEventListener("alpine:init", () => {
  Alpine.data("payment", () => ({
    cart: {
      items: [],
      total: 0,
      quantity: 0,
    },

    name: "",
    address: "",

    init() {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        this.cart = JSON.parse(savedCart);
      }
    },

    sendWA() {
      if (!this.cart.items.length) {
        alert("Keranjang masih kosong");
        return;
      }

      let pesan = `Halo, saya mau pesan:%0A%0A`;

      this.cart.items.forEach((item) => {
        pesan += `- ${item.name} x${item.quantity} = ${rupiah(item.total)}%0A`;
      });

      pesan += `%0ATotal: ${rupiah(this.cart.total)}%0A`;
      pesan += `%0ANama: ${this.name}%0AAlamat: ${this.address}`;

      window.open(`https://wa.me/6289512458177?text=${pesan}`, "_blank");

      localStorage.removeItem("cart");
    },

    removeItem(id) {
      const item = this.cart.items.find((i) => i.id === id);
      if (!item) return;

      this.cart.total -= item.total;
      this.cart.quantity -= item.quantity;
      this.cart.items = this.cart.items.filter((i) => i.id !== id);

      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
  }));
});
