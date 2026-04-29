<template>
  <div class="home">

    <!-- ══════════════ HERO ══════════════ -->
    <section class="hero">
      <div class="hero-bg-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
      </div>

      <div class="hero-content">
        <span class="hero-badge">🌿 New Arrivals Every Week</span>
        <h1 class="hero-title">
          Discover Products<br />
          <span class="hero-highlight">You'll Love</span>
        </h1>
        <p class="hero-subtitle">
          Shop thousands of high-quality products — from fashion to electronics — all in one place with the best prices.
        </p>
        <div class="hero-actions">
          <router-link to="/products" class="btn-hero-primary">Shop Now →</router-link>
          <router-link to="/contact" class="btn-hero-secondary">Contact Us</router-link>
        </div>
        <div class="hero-stats">
          <div class="stat">
            <span class="stat-num">20+</span>
            <span class="stat-label">Products</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat">
            <span class="stat-num">4</span>
            <span class="stat-label">Categories</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat">
            <span class="stat-num">100%</span>
            <span class="stat-label">Secure</span>
          </div>
        </div>
      </div>

      <div class="hero-visual">
        <div class="hero-card-stack">
          <div class="floating-card card-1">
            <img src="/images/jum1.jpg" alt="Product" />
          </div>
          <div class="floating-card card-2">
            <img src="/images/jum2.jpg" alt="Product" />
          </div>
          <div class="floating-card card-3">
            <img src="/images/jum3.jpg" alt="Product" />
          </div>
          <div class="hero-badge-float">
            <span>⭐ Top Rated</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════ FEATURES ══════════════ -->
    <section class="features">
      <div class="section-header">
        <span class="section-tag">Why Choose Us</span>
        <h2 class="section-title">Everything You Need in One Store</h2>
      </div>
      <div class="features-grid">
        <div class="feature-card" v-for="f in features" :key="f.icon">
          <div class="feature-icon">{{ f.icon }}</div>
          <h3 class="feature-title">{{ f.title }}</h3>
          <p class="feature-desc">{{ f.desc }}</p>
        </div>
      </div>
    </section>

    <!-- ══════════════ CATEGORIES ══════════════ -->
    <section class="categories">
      <div class="section-header">
        <span class="section-tag">Browse By</span>
        <h2 class="section-title">Shop by Category</h2>
      </div>
      <div class="categories-grid">
        <router-link
          v-for="cat in categories"
          :key="cat.name"
          to="/products"
          class="category-card"
          :style="{ background: cat.bg }"
        >
          <span class="cat-icon">{{ cat.icon }}</span>
          <span class="cat-name">{{ cat.name }}</span>
          <span class="cat-arrow">→</span>
        </router-link>
      </div>
    </section>

    <!-- ══════════════ FEATURED PRODUCTS ══════════════ -->
    <section class="featured">
      <div class="section-header">
        <span class="section-tag">Hand-Picked</span>
        <h2 class="section-title">Featured Products</h2>
        <router-link to="/products" class="view-all">View All →</router-link>
      </div>

      <div v-if="loadingProducts" class="loading-row">
        <div class="skeleton-card" v-for="n in 4" :key="n">
          <div class="sk-img"></div>
          <div class="sk-line short"></div>
          <div class="sk-line"></div>
        </div>
      </div>

      <div v-else class="featured-grid">
        <div
          v-for="product in featuredProducts"
          :key="product.id"
          class="feat-card"
          @click="goToProduct(product)"
        >
          <div class="feat-img-wrap">
            <img :src="product.image" :alt="product.title" />
            <button class="quick-add" @click.stop="addToCart(product)">+ Add</button>
          </div>
          <div class="feat-info">
            <p class="feat-category">{{ product.category }}</p>
            <h4 class="feat-title">{{ product.title.length > 40 ? product.title.slice(0, 40) + '…' : product.title }}</h4>
            <div class="feat-bottom">
              <span class="feat-price">${{ product.price.toFixed(2) }}</span>
              <span class="feat-stars">{{ starRating(product.rating?.rate) }} {{ product.rating?.rate }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════ NEWSLETTER ══════════════ -->
    <section class="newsletter">
      <div class="newsletter-inner">
        <div class="nl-text">
          <span class="nl-tag">Stay Updated</span>
          <h2>Get the Best Deals First 🎁</h2>
          <p>Subscribe to our newsletter and never miss a sale or new arrival.</p>
        </div>
        <form class="nl-form" @submit.prevent="subscribeNewsletter">
          <div class="nl-input-wrap" v-if="!subscribed">
            <input type="email" v-model="nlEmail" placeholder="Enter your email address" required />
            <button type="submit">Subscribe</button>
          </div>
          <div class="nl-success" v-else>
            <span>✅ You're subscribed! Thank you.</span>
          </div>
        </form>
      </div>
    </section>

  </div>
</template>

<script>
import { useCartStore } from '@/piniastore/cartstore';
import { useRouter } from 'vue-router';

export default {
  name: 'Home',
  setup() {
    const router = useRouter();
    const cartStore = useCartStore();
    return { router, cartStore };
  },
  data() {
    return {
      featuredProducts: [],
      loadingProducts: true,
      nlEmail: '',
      subscribed: false,
      features: [
        { icon: '🚀', title: 'Fast Delivery', desc: 'Get your orders delivered quickly to your doorstep, anywhere.' },
        { icon: '🔒', title: 'Secure Payments', desc: 'Shop with confidence using our fully encrypted checkout.' },
        { icon: '↩️', title: 'Easy Returns', desc: '30-day hassle-free returns on all products, no questions asked.' },
        { icon: '💎', title: 'Premium Quality', desc: 'Every product is curated and verified to meet high standards.' },
      ],
      categories: [
        { name: 'Electronics', icon: '💻', bg: 'linear-gradient(135deg, #e3f2fd, #bbdefb)' },
        { name: 'Jewelery', icon: '💍', bg: 'linear-gradient(135deg, #fce4ec, #f8bbd0)' },
        { name: "Men's Clothing", icon: '👔', bg: 'linear-gradient(135deg, #e8f5e9, #c8e6c9)' },
        { name: "Women's Clothing", icon: '👗', bg: 'linear-gradient(135deg, #f3e5f5, #e1bee7)' },
      ]
    };
  },
  async created() {
    try {
      const res = await fetch('https://fakestoreapi.com/products?limit=4');
      this.featuredProducts = await res.json();
    } catch (e) {
      console.error(e);
    } finally {
      this.loadingProducts = false;
    }
  },
  methods: {
    addToCart(product) {
      this.cartStore.addToCart(product);
    },
    goToProduct(product) {
      this.router.push(`/product/${product.id}`);
    },
    starRating(rate) {
      if (!rate) return '☆☆☆☆☆';
      const full = Math.round(rate);
      return '★'.repeat(full) + '☆'.repeat(5 - full);
    },
    subscribeNewsletter() {
      if (this.nlEmail) this.subscribed = true;
    }
  }
};
</script>

<style scoped>
/* ─── Base ─── */
.home {
  width: 100%;
  overflow-x: hidden;
}

section {
  padding: 5rem 6%;
}

/* ─── Section Headers ─── */
.section-header {
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
}

.section-tag {
  display: inline-block;
  background: #e8f5e9;
  color: #2e7d32;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  padding: 6px 16px;
  border-radius: 20px;
  margin-bottom: 0.8rem;
}

.section-title {
  font-size: 2.2rem;
  font-weight: 800;
  color: #1a2e1a;
  margin: 0;
  line-height: 1.2;
}

/* ─── HERO ─── */
.hero {
  min-height: 88vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3rem;
  padding: 4rem 6%;
  background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #f0fdf4 100%);
  position: relative;
  overflow: hidden;
}

.hero-bg-shapes .shape {
  position: absolute;
  border-radius: 50%;
  opacity: 0.3;
  pointer-events: none;
}
.shape-1 {
  width: 500px; height: 500px;
  background: radial-gradient(circle, #86efac, transparent);
  top: -150px; right: -100px;
}
.shape-2 {
  width: 300px; height: 300px;
  background: radial-gradient(circle, #bbf7d0, transparent);
  bottom: -80px; left: 30%;
}
.shape-3 {
  width: 200px; height: 200px;
  background: radial-gradient(circle, #4ade80, transparent);
  top: 30%; left: -60px;
}

.hero-content {
  flex: 1;
  max-width: 560px;
  position: relative;
  z-index: 2;
}

.hero-badge {
  display: inline-block;
  background: #fff;
  border: 1.5px solid #86efac;
  color: #15803d;
  font-size: 0.85rem;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: 25px;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 12px rgba(46,125,50,0.1);
}

.hero-title {
  font-size: 3.8rem;
  font-weight: 900;
  color: #1a2e1a;
  line-height: 1.1;
  margin-bottom: 1.2rem;
}

.hero-highlight {
  background: linear-gradient(135deg, #16a34a, #4ade80);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-subtitle {
  font-size: 1.1rem;
  color: #4b7a4b;
  line-height: 1.7;
  margin-bottom: 2rem;
  max-width: 450px;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.btn-hero-primary {
  background: #16a34a;
  color: #fff;
  padding: 14px 32px;
  border-radius: 50px;
  font-weight: 700;
  font-size: 1rem;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 6px 20px rgba(22,163,74,0.35);
}

.btn-hero-primary:hover {
  background: #15803d;
  transform: translateY(-3px);
  box-shadow: 0 10px 28px rgba(22,163,74,0.4);
  color: #fff;
}

.btn-hero-secondary {
  background: transparent;
  color: #16a34a;
  padding: 14px 32px;
  border-radius: 50px;
  font-weight: 700;
  font-size: 1rem;
  text-decoration: none;
  border: 2px solid #86efac;
  transition: all 0.3s ease;
}

.btn-hero-secondary:hover {
  background: #f0fdf4;
  border-color: #16a34a;
  transform: translateY(-3px);
  color: #15803d;
}

.hero-stats {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.stat {
  display: flex;
  flex-direction: column;
}

.stat-num {
  font-size: 1.6rem;
  font-weight: 900;
  color: #16a34a;
}

.stat-label {
  font-size: 0.8rem;
  color: #4b7a4b;
  font-weight: 500;
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: #86efac;
}

/* Hero Visual */
.hero-visual {
  flex: 1;
  max-width: 500px;
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 420px;
}

.hero-card-stack {
  position: relative;
  width: 340px;
  height: 380px;
}

.floating-card {
  position: absolute;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.12);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.floating-card img {
  object-fit: contain;
  width: 85%;
  height: 85%;
}

.card-1 {
  width: 200px; height: 220px;
  top: 0; left: 0;
  animation: float1 4s ease-in-out infinite;
  z-index: 3;
}

.card-2 {
  width: 180px; height: 195px;
  top: 80px; right: 0;
  animation: float2 4s ease-in-out infinite 0.8s;
  z-index: 2;
}

.card-3 {
  width: 160px; height: 175px;
  bottom: 0; left: 50%;
  transform: translateX(-50%);
  animation: float3 4s ease-in-out infinite 1.6s;
  z-index: 1;
}

.hero-badge-float {
  position: absolute;
  top: -18px;
  right: -18px;
  background: #fff;
  border: 2px solid #86efac;
  color: #15803d;
  font-weight: 700;
  font-size: 0.8rem;
  padding: 8px 14px;
  border-radius: 25px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  z-index: 10;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes float1 {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}
@keyframes float2 {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
@keyframes float3 {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(-8px); }
}
@keyframes pulse {
  0%, 100% { box-shadow: 0 4px 15px rgba(22,163,74,0.2); }
  50% { box-shadow: 0 4px 25px rgba(22,163,74,0.45); }
}

/* ─── FEATURES ─── */
.features {
  background: #fff;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

.feature-card {
  background: #f9fdf9;
  border: 1.5px solid #e8f5e9;
  border-radius: 20px;
  padding: 2.5rem 1.8rem;
  text-align: center;
  transition: all 0.35s ease;
}

.feature-card:hover {
  border-color: #86efac;
  transform: translateY(-8px);
  box-shadow: 0 15px 40px rgba(46,125,50,0.1);
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.feature-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1a2e1a;
  margin-bottom: 0.5rem;
}

.feature-desc {
  font-size: 0.9rem;
  color: #666;
  line-height: 1.6;
}

/* ─── CATEGORIES ─── */
.categories {
  background: #f9fdf9;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.category-card {
  border-radius: 20px;
  padding: 2.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;
}

.category-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 40px rgba(0,0,0,0.12);
  border-color: #86efac;
}

.cat-icon {
  font-size: 2.8rem;
}

.cat-name {
  font-size: 1rem;
  font-weight: 700;
  color: #1a2e1a;
}

.cat-arrow {
  font-size: 0.9rem;
  color: #16a34a;
  font-weight: 700;
  opacity: 0;
  transform: translateX(-5px);
  transition: all 0.3s;
}

.category-card:hover .cat-arrow {
  opacity: 1;
  transform: translateX(0);
}

/* ─── FEATURED PRODUCTS ─── */
.featured {
  background: #fff;
}

.section-header {
  position: relative;
}

.view-all {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  color: #16a34a;
  font-weight: 700;
  font-size: 0.95rem;
  text-decoration: none;
  border-bottom: 2px solid #86efac;
  transition: 0.3s;
  padding-bottom: 2px;
}

.view-all:hover {
  color: #15803d;
  border-color: #15803d;
}

.featured-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

.feat-card {
  border-radius: 20px;
  background: #fff;
  border: 1.5px solid #e8f5e9;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.35s ease;
}

.feat-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 40px rgba(46,125,50,0.15);
  border-color: #86efac;
}

.feat-img-wrap {
  position: relative;
  height: 220px;
  background: #f9fdf9;
  display: flex;
  align-items: center;
  justify-content: center;
}

.feat-img-wrap img {
  width: 80%;
  height: 80%;
  object-fit: contain;
  transition: transform 0.35s ease;
}

.feat-card:hover .feat-img-wrap img {
  transform: scale(1.07);
}

.quick-add {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%) translateY(10px);
  opacity: 0;
  background: #16a34a;
  color: #fff;
  border: none;
  border-radius: 25px;
  padding: 8px 22px;
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.feat-card:hover .quick-add {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

.quick-add:hover {
  background: #15803d;
}

.feat-info {
  padding: 1.2rem;
}

.feat-category {
  font-size: 0.75rem;
  color: #16a34a;
  font-weight: 600;
  text-transform: capitalize;
  letter-spacing: 0.5px;
  margin: 0 0 0.4rem;
}

.feat-title {
  font-size: 0.9rem;
  font-weight: 700;
  color: #1a2e1a;
  margin: 0 0 0.8rem;
  line-height: 1.4;
}

.feat-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.feat-price {
  font-size: 1.15rem;
  font-weight: 900;
  color: #16a34a;
}

.feat-stars {
  font-size: 0.75rem;
  color: #f59e0b;
  font-weight: 600;
}

/* Skeleton Loading */
.loading-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

.skeleton-card {
  border-radius: 20px;
  border: 1.5px solid #e8f5e9;
  overflow: hidden;
  padding: 1.2rem;
}

.sk-img {
  height: 200px;
  background: linear-gradient(90deg, #e8f5e9 25%, #f0fdf4 50%, #e8f5e9 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 12px;
  margin-bottom: 1rem;
}

.sk-line {
  height: 14px;
  background: linear-gradient(90deg, #e8f5e9 25%, #f0fdf4 50%, #e8f5e9 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 6px;
  margin-bottom: 0.6rem;
}

.sk-line.short { width: 55%; }

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* ─── NEWSLETTER ─── */
.newsletter {
  background: linear-gradient(135deg, #166534, #16a34a);
  padding: 5rem 6%;
}

.newsletter-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3rem;
  max-width: 1100px;
  margin: 0 auto;
}

.nl-text .nl-tag {
  display: inline-block;
  background: rgba(255,255,255,0.2);
  color: #fff;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  padding: 5px 14px;
  border-radius: 20px;
  margin-bottom: 0.8rem;
}

.nl-text h2 {
  font-size: 2rem;
  font-weight: 800;
  color: #fff;
  margin-bottom: 0.5rem;
  line-height: 1.2;
}

.nl-text p {
  color: rgba(255,255,255,0.8);
  font-size: 1rem;
}

.nl-form {
  flex: 0 0 420px;
}

.nl-input-wrap {
  display: flex;
  border-radius: 50px;
  overflow: hidden;
  box-shadow: 0 6px 25px rgba(0,0,0,0.2);
}

.nl-input-wrap input {
  flex: 1;
  padding: 15px 22px;
  border: none;
  outline: none;
  font-size: 0.95rem;
  background: #fff;
  color: #1a2e1a;
}

.nl-input-wrap button {
  background: #fff;
  color: #16a34a;
  border: none;
  padding: 15px 28px;
  font-weight: 800;
  font-size: 0.95rem;
  cursor: pointer;
  transition: 0.3s;
  border-left: 2px solid #e8f5e9;
}

.nl-input-wrap button:hover {
  background: #f0fdf4;
}

.nl-success {
  background: rgba(255,255,255,0.2);
  border-radius: 50px;
  padding: 15px 25px;
  color: #fff;
  font-weight: 700;
  text-align: center;
  font-size: 1rem;
}
</style>
