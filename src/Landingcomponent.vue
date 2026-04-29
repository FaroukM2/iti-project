<template>
  <div class="page-wrapper">
    <Header />
    <main class="main-content">
      <router-view></router-view>
    </main>
    <Footer />
  </div>
</template>

<script>
import Footer from './components/maincomponent/footer.vue';
import Header from './components/maincomponent/header.vue';

export default {
  components: {
    Header,
    Footer
  },
  data() {
    return {
      cart: []
    };
  },
  provide() {
    return {
      cart: this.cart,
      addToCart: this.addToCart
    };
  },
  methods: {
    addToCart(product) {
      const existingProduct = this.cart.find(item => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        this.cart.push({ ...product, quantity: 1 });
      }
    }
  }
};
</script>

<style scoped>
.page-wrapper {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  background: linear-gradient(180deg, #f9fafb 0%, #e8f5e9 100%);
  font-family: "Poppins", sans-serif;
}

.main-content {
  flex: 1;
  width: 100%;
  margin: 0;
  padding: 0;
}

* {
  box-sizing: border-box;
}
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  overflow-x: hidden;
}
</style>
