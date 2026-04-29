<template>
  <nav class="navbar navbar-expand-lg navbar-light custom-navbar shadow-sm">
    <div class="container-fluid px-4">
      <!-- Logo & Brand -->
      <router-link class="navbar-brand d-flex align-items-center" to="/">
        <i class="fas fa-leaf logo-icon me-2"></i>
        <span class="brand-name">My Store</span>
      </router-link>

      <!-- Navigation Links -->
      <div class="collapse navbar-collapse justify-content-between" id="navbarNav">
        <ul class="navbar-nav mx-auto">
          <li class="nav-item">
            <router-link class="nav-link hover-effect" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link hover-effect" to="/products">Products</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link hover-effect" to="/contact">Contact</router-link>
          </li>
        </ul>

        <!-- Right Buttons -->
        <div class="d-flex align-items-center gap-3">
          <router-link class="btn-login" to="/login">Sign In</router-link>
          <router-link class="btn-cart hover-effect" to="/cart">
            <i class="fas fa-shopping-cart"></i>
            <span v-if="cartCount > 0" class="cart-badge">{{ cartCount }}</span>
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.custom-navbar {
  backdrop-filter: blur(10px);
  background: rgba(215, 245, 220, 0.85);
  width: 100%;
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  transition: background 0.4s ease, box-shadow 0.4s ease;
}

.custom-navbar.scrolled {
  background: rgba(215, 245, 220, 0.95);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}

.brand-name {
  font-weight: 700;
  color: #2e7d32;
  font-size: 1.4rem;
  letter-spacing: 0.5px;
}

.logo-icon {
  font-size: 2rem;
  color: #2e7d32;
  transition: transform 0.3s ease, color 0.3s;
}

.logo-icon:hover {
  color: #1b5e20;
  transform: rotate(-8deg) scale(1.1);
}

.nav-link {
  color: #2e2e2e;
  font-weight: 500;
  margin: 0 0.8rem;
  position: relative;
  transition: all 0.3s ease;
}

.nav-link::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -5px;
  width: 0%;
  height: 2px;
  background-color: #388e3c;
  transition: width 0.3s ease;
}

.nav-link:hover {
  color: #388e3c;
  transform: translateY(-2px);
}

.nav-link:hover::after {
  width: 100%;
}

.router-link-active.nav-link {
  color: #388e3c;
  font-weight: 600;
}

.router-link-active.nav-link::after {
  width: 100%;
}

.btn-cart {
  position: relative;
  background-color: #388e3c;
  color: #fff;
  padding: 0.6rem 0.8rem;
  border-radius: 50%;
  font-size: 1.3rem;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-cart:hover {
  background-color: #2e7d32;
  transform: scale(1.1);
  color: #fff;
}

.cart-badge {
  position: absolute;
  top: -6px;
  right: -6px;
  background: #e53935;
  color: #fff;
  font-size: 0.65rem;
  font-weight: 700;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #fff;
  animation: pop 0.3s ease;
}

@keyframes pop {
  0% { transform: scale(0); }
  70% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

.btn-login {
  background-color: transparent;
  border: 2px solid #388e3c;
  color: #388e3c;
  padding: 0.4rem 1rem;
  border-radius: 25px;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s;
  text-decoration: none;
}

.btn-login:hover {
  background-color: #388e3c;
  color: white;
  transform: translateY(-2px);
}
</style>

<script>
import { computed } from 'vue';
import { useCartStore } from '@/piniastore/cartstore';

export default {
  name: "Header",
  setup() {
    const cartStore = useCartStore();
    return {
      cartCount: computed(() => cartStore.totalItems)
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      const navbar = document.querySelector(".custom-navbar");
      if (window.scrollY > 20) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    },
  },
};
</script>
