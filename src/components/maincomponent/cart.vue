<template>
  <div class="cart-page">
    <div class="container py-5">
      <h2 class="text-center mb-5 cart-title">🛍️ Your Shopping Cart</h2>

      <div v-if="cart.length === 0" class="empty-cart text-center">
        <img src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png" alt="Empty" width="150" class="mb-3" />
        <p class="text-muted fs-5">Your cart is empty. Start shopping now!</p>
        <router-link to="/products" class="btn btn-go-shop mt-3">🛒 Shop Now</router-link>
      </div>

      <div v-else>
        <div
          v-for="item in cart"
          :key="item.id"
          class="cart-item card shadow-sm p-3 mb-4 rounded-4 border-0"
        >
          <div class="row align-items-center">
            <div class="col-md-2 text-center">
              <img :src="item.image" class="img-fluid rounded-3 cart-img" alt="Product" />
            </div>
            <div class="col-md-4">
              <h5 class="item-title">{{ item.title }}</h5>
              <p class="item-price">{{ item.price.toFixed(2) }} USD</p>
            </div>
            <div class="col-md-3 d-flex justify-content-center align-items-center gap-2">
              <button class="qty-btn" @click="decreaseQuantity(item)">−</button>
              <span class="qty-value">{{ item.quantity }}</span>
              <button class="qty-btn" @click="increaseQuantity(item)">+</button>
            </div>
            <div class="col-md-2 text-end">
              <strong class="total-label">Total:</strong>
              <span class="item-total"> ${{ (item.price * item.quantity).toFixed(2) }}</span>
            </div>
            <div class="col-md-1 text-end">
              <button class="remove-btn" @click="removeItem(item)" title="Remove">🗑️</button>
            </div>
          </div>
        </div>

        <div class="cart-summary text-center mt-5">
          <div class="summary-box mx-auto">
            <div class="d-flex justify-content-between mb-2">
              <span class="text-muted">Items ({{ totalItems }})</span>
              <span class="fw-semibold">${{ totalPrice.toFixed(2) }}</span>
            </div>
            <hr />
            <div class="d-flex justify-content-between mb-4">
              <span class="fw-bold fs-5">Grand Total</span>
              <span class="fw-bold fs-5 text-success">${{ totalPrice.toFixed(2) }}</span>
            </div>
            <button class="btn btn-checkout w-100">Proceed to Checkout →</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useCartStore } from '@/piniastore/cartstore';

export default {
  setup() {
    const cartStore = useCartStore();
    return {
      cart: cartStore.cart,
      totalPrice: computed(() => cartStore.totalPrice),
      totalItems: computed(() => cartStore.totalItems),
      cartStore
    };
  },
  methods: {
    increaseQuantity(item) {
      this.cartStore.increaseQuantity(item);
    },
    decreaseQuantity(item) {
      if (item.quantity > 1) this.cartStore.decreaseQuantity(item);
      else this.cartStore.removeItem(item);
    },
    removeItem(item) {
      this.cartStore.removeItem(item);
    }
  }
};
</script>

<style scoped>
.cart-page {
  background: linear-gradient(135deg, #f0fdf4 0%, #f8faf8 100%);
  min-height: 100vh;
}

.cart-title {
  color: #2e7d32;
  font-weight: 800;
  letter-spacing: -0.5px;
}

.cart-img {
  max-height: 90px;
  object-fit: contain;
}

.cart-item {
  border-left: 4px solid #81c784 !important;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.cart-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.12) !important;
}

.item-title {
  color: #1a1a2e;
  font-size: 0.95rem;
  font-weight: 600;
}

.item-price {
  color: #388e3c;
  font-weight: 500;
  margin: 0;
}

.item-total {
  color: #2e7d32;
  font-weight: 700;
}

.total-label {
  color: #555;
  font-size: 0.85rem;
}

.qty-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid #81c784;
  background: transparent;
  color: #2e7d32;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

.qty-btn:hover {
  background: #2e7d32;
  color: #fff;
  border-color: #2e7d32;
}

.qty-value {
  font-size: 1.1rem;
  font-weight: 700;
  min-width: 30px;
  text-align: center;
  color: #1a1a2e;
}

.remove-btn {
  background: transparent;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.2s, transform 0.2s;
  padding: 4px;
}

.remove-btn:hover {
  opacity: 1;
  transform: scale(1.2);
}

.summary-box {
  background: #fff;
  border-radius: 16px;
  padding: 2rem;
  max-width: 400px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  border-top: 4px solid #388e3c;
}

.btn-checkout {
  background: #2e7d32;
  color: #fff;
  padding: 14px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1rem;
  border: none;
  transition: all 0.3s ease;
  letter-spacing: 0.5px;
}

.btn-checkout:hover {
  background: #1b5e20;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(46, 125, 50, 0.35);
}

.btn-go-shop {
  background: #388e3c;
  color: #fff;
  padding: 10px 30px;
  border-radius: 25px;
  font-weight: 600;
  text-decoration: none;
  transition: 0.3s;
  border: none;
}

.btn-go-shop:hover {
  background: #2e7d32;
  color: #fff;
}
</style>
