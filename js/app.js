document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    category: "all",
    selectedProduct: null,
    showModal: false,
    searchQuery: "",
    activeSearch: "",

    items: [
      {
        id: 1,
        name: "Phone Strap 1",
        category: "Phone Strap",
        folder: "phone-straps",
        img: "phone-strap-1.jpg",
        price: 15000,
        desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus rem ducimus distinctio incidunt beatae corporis ad, laboriosam suscipit tenetur illo?",
      },
      {
        id: 2,
        name: "Phone Strap 2",
        category: "Phone Strap",
        folder: "phone-straps",
        img: "phone-strap-2.jpg",
        price: 12500,
        desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus rem ducimus distinctio incidunt beatae corporis ad, laboriosam suscipit tenetur illo?",
      },
      {
        id: 3,
        name: "Phone Strap 3",
        category: "Phone Strap",
        folder: "phone-straps",
        img: "phone-strap-3.jpg",
        price: 13000,
        desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus rem ducimus distinctio incidunt beatae corporis ad, laboriosam suscipit tenetur illo?",
      },
      {
        id: 4,
        name: "Phone Strap 4",
        category: "Phone Strap",
        folder: "phone-straps",
        img: "phone-strap-4.jpg",
        price: 14000,
        desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus rem ducimus distinctio incidunt beatae corporis ad, laboriosam suscipit tenetur illo?",
      },
      {
        id: 5,
        name: "Phone Strap 5",
        category: "Phone Strap",
        folder: "phone-straps",
        img: "phone-strap-5.jpg",
        price: 10000,
        desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus rem ducimus distinctio incidunt beatae corporis ad, laboriosam suscipit tenetur illo?",
      },
      {
        id: 6,
        name: "Ring 1",
        category: "Ring",
        folder: "rings",
        img: "1.jpg",
        price: 10000,
        desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus rem ducimus distinctio incidunt beatae corporis ad, laboriosam suscipit tenetur illo?",
      },
      {
        id: 7,
        name: "Ring 2",
        category: "Ring",
        folder: "rings",
        img: "2.jpg",
        price: 10000,
        desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus rem ducimus distinctio incidunt beatae corporis ad, laboriosam suscipit tenetur illo?",
      },
      {
        id: 8,
        name: "Necklace 1",
        category: "Neclace",
        folder: "necklaces",
        img: "1.jpg",
        price: 10000,
        desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus rem ducimus distinctio incidunt beatae corporis ad, laboriosam suscipit tenetur illo?",
      },
      {
        id: 9,
        name: "Necklace 2",
        category: "Neclace",
        folder: "necklaces",
        img: "2.jpeg",
        price: 10000,
        desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus rem ducimus distinctio incidunt beatae corporis ad, laboriosam suscipit tenetur illo?",
      },
      {
        id: 10,
        name: "Necklace 3",
        category: "Neclace",
        folder: "necklaces",
        img: "3.jpeg",
        price: 10000,
        desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus rem ducimus distinctio incidunt beatae corporis ad, laboriosam suscipit tenetur illo?",
      },
      {
        id: 11,
        name: "Bracelet 1",
        category: "Bracelet",
        folder: "bracelets",
        img: "1.jpg",
        price: 10000,
        desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus rem ducimus distinctio incidunt beatae corporis ad, laboriosam suscipit tenetur illo?",
      },
      {
        id: 12,
        name: "Bracelet 2",
        category: "Bracelet",
        folder: "bracelets",
        img: "2.jpg",
        price: 10000,
        desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus rem ducimus distinctio incidunt beatae corporis ad, laboriosam suscipit tenetur illo?",
      },
      {
        id: 13,
        name: "Bracelet 3",
        category: "Bracelet",
        folder: "bracelets",
        img: "3.jpg",
        price: 10000,
        desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus rem ducimus distinctio incidunt beatae corporis ad, laboriosam suscipit tenetur illo?",
      },
      {
        id: 14,
        name: "Bracelet 4",
        category: "Bracelet",
        folder: "bracelets",
        img: "4.jpeg",
        price: 10000,
        desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus rem ducimus distinctio incidunt beatae corporis ad, laboriosam suscipit tenetur illo?",
      },
      {
        id: 15,
        name: "Bracelet 5",
        category: "Bracelet",
        folder: "bracelets",
        img: "5.jpg",
        price: 10000,
        desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus rem ducimus distinctio incidunt beatae corporis ad, laboriosam suscipit tenetur illo?",
      },
    ],

    openModal(product) {
      this.selectedProduct = product;
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
      this.selectedProduct = null;
    },

    applySearch() {
      this.activeSearch = this.searchQuery.trim().toLowerCase();
    },

    get filteredProducts() {
      let result = this.items;

      //filter kategori
      if (this.category !== "all") {
        result = result.filter((item) => item.category === this.category);
      }

      //search 
      if (this.activeSearch) {
        result = result.filter((item) =>
          item.name.toLowerCase().includes(this.activeSearch),
        );
      }

      console.log(result);
      return result;
    },
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
    numPhone: "",
    email: "",
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

      let pesan = `Halo min, saya mau pesan :%0A%0A`;

      this.cart.items.forEach((item) => {
        pesan += `- ${item.name} (${item.quantity} buah) = ${rupiah(item.total)}%0A`;
      });

      pesan += `%0ATotal : ${rupiah(this.cart.total)}%0A`;
      pesan += `%0ANama : ${this.name}%0ANomor HP : ${this.numPhone}%0AEmail : ${this.email}%0AAlamat : ${this.address}`;

      window.open(`https://wa.me/6289512458177?text=${pesan}`, "_blank");

      localStorage.removeItem("cart");

      window.location.href = "index.html";
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

document.addEventListener("alpine:init", () => {
  Alpine.data("navScroll", () => ({
    active: "home",

    init() {
      const sections = document.querySelectorAll("section[id]");

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.active = entry.target.id;
            }
          });
        },
        {
          threshold: 0.15,
          rootMargin: "-80px 0px -40% 0px",
        },
      );

      sections.forEach((section) => observer.observe(section));
    },
  }));
});
