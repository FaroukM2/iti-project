<template>
  <div class="products-page">
    <div class="row g-0">
      <!-- Sidebar -->
      <div class="col-3 sidebar">
        <h4 class="sidebar-title">Categories</h4>
        <a href="#" @click.prevent="filterByCategory('all')" :class="['category-link', selectedCategory === 'all' ? 'active' : '']">All</a>
        <a href="#" @click.prevent="filterByCategory('electronics')" :class="['category-link', selectedCategory === 'electronics' ? 'active' : '']">Electronics</a>
        <a href="#" @click.prevent="filterByCategory('jewelery')" :class="['category-link', selectedCategory === 'jewelery' ? 'active' : '']">Jewelery</a>
        <a href="#" @click.prevent="filterByCategory('men\'s clothing')" :class="['category-link', selectedCategory === 'men\'s clothing' ? 'active' : '']">Men's Clothing</a>
        <a href="#" @click.prevent="filterByCategory('women\'s clothing')" :class="['category-link', selectedCategory === 'women\'s clothing' ? 'active' : '']">Women's Clothing</a>

        <div class="price-filter">
          <h5>Filter by Price</h5>
          <label for="min-price">Min: ${{ minPrice }}</label>
          <input id="min-price" type="range" v-model.number="minPrice" min="0" :max="maxPrice" @input="filterProducts" />
          <label for="max-price">Max: ${{ maxPrice }}</label>
          <input id="max-price" type="range" v-model.number="maxPrice" :min="minPrice" max="1000" @input="filterProducts" />
        </div>

        <div class="results-count" v-if="!loading">
          <span>{{ filteredProducts.length }} product{{ filteredProducts.length !== 1 ? 's' : '' }} found</span>
        </div>
      </div>

      <!-- Products Grid -->
      <div class="col-9 p-4">
        <!-- Loading Spinner -->
        <div v-if="loading" class="loading-container">
          <div class="spinner"></div>
          <p>Loading products...</p>
        </div>

        <div v-else>
          <div class="row" v-if="filteredProducts.length > 0">
            <div class="col-lg-4 col-md-6 mb-4" v-for="product in displayedProducts" :key="product.id">
              <div class="card product-card">
                <div class="product-image">
                  <img :src="product.image" alt="Product Image" />
                  <div class="overlay">
                    <button @click.stop="goToDetails(product)" class="info-btn">Info</button>
                    <button @click.stop="addToCart(product)" class="add-btn">Add to Cart</button>
                  </div>
                </div>
                <div class="card-body text-center">
                  <h6 class="product-title">{{ product.title.length > 30 ? product.title.slice(0, 30) + '...' : product.title }}</h6>
                  <div class="rating-row">
                    <span class="stars">{{ starRating(product.rating?.rate) }}</span>
                    <span class="rating-count">({{ product.rating?.count }})</span>
                  </div>
                  <p class="product-price">${{ product.price.toFixed(2) }}</p>
                </div>
              </div>
            </div>

            <div class="col-12 text-center mt-2">
              <button v-if="canLoadMore" @click="loadMore" class="btn more-btn">Load More</button>
            </div>
          </div>

          <div v-else class="no-results">
            <p>😕 No products match your filters.</p>
            <button @click="resetFilters" class="btn reset-btn">Reset Filters</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useCartStore } from '@/piniastore/cartstore';

export default {
  data() {
    return {
      products: [],
      filteredProducts: [],
      rowsToShow: 3,
      minPrice: 0,
      maxPrice: 1000,
      selectedCategory: 'all',
      loading: true
    };
  },
  computed: {
    displayedProducts() {
      return this.filteredProducts.slice(0, this.rowsToShow * 3);
    },
    canLoadMore() {
      return this.filteredProducts.length > this.displayedProducts.length;
    }
  },
  async created() {
    await this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      this.loading = true;
      try {
        const res = await fetch('https://fakestoreapi.com/products');
        const data = await res.json();
        this.products = data;
        this.filteredProducts = data;
      } catch (e) {
        console.error('Failed to load products', e);
      } finally {
        this.loading = false;
      }
    },
    loadMore() {
      this.rowsToShow += 3;
    },
    addToCart(product) {
      const cartStore = useCartStore();
      cartStore.addToCart(product);
    },
    goToDetails(product) {
      this.$router.push(`/product/${product.id}`);
    },
    filterProducts() {
      this.filteredProducts = this.products.filter(p => {
        const inRange = p.price >= this.minPrice && p.price <= this.maxPrice;
        const matchCategory = this.selectedCategory === 'all' || p.category === this.selectedCategory;
        return inRange && matchCategory;
      });
      this.rowsToShow = 3;
    },
    filterByCategory(category) {
      this.selectedCategory = category;
      this.filterProducts();
    },
    resetFilters() {
      this.minPrice = 0;
      this.maxPrice = 1000;
      this.selectedCategory = 'all';
      this.filteredProducts = this.products;
      this.rowsToShow = 3;
    },
    starRating(rate) {
      if (!rate) return '☆☆☆☆☆';
      const full = Math.round(rate);
      return '★'.repeat(full) + '☆'.repeat(5 - full);
    }
  }
};
</script>

<style scoped>
.products-page {
  width: 100%;
  min-height: 100vh;
  background-color: #f8faf8;
  display: block;
  overflow-x: hidden;
}

.sidebar {
  background-color: #e8f5e9;
  padding: 2rem;
  min-height: 100vh;
  border-right: 2px solid #c8e6c9;
  position: sticky;
  top: 70px;
  height: fit-content;
}

.sidebar-title {
  font-weight: 700;
  color: #2e7d32;
  margin-bottom: 1rem;
}

.category-link {
  display: block;
  color: #333;
  background: #fff;
  margin: 8px 0;
  padding: 10px;
  border-radius: 8px;
  text-align: center;
  text-decoration: none;
  transition: 0.3s;
  border: 2px solid transparent;
}

.category-link:hover {
  background-color: #2e7d32;
  color: #fff;
}

.category-link.active {
  background-color: #2e7d32;
  color: #fff;
  border-color: #1b5e20;
  font-weight: 600;
}

.price-filter {
  margin-top: 1.5rem;
}

.price-filter h5 {
  color: #2e7d32;
  font-weight: 600;
  margin-bottom: 0.8rem;
}

.price-filter label {
  font-size: 0.9rem;
  color: #555;
  display: block;
  margin-bottom: 4px;
  font-weight: 500;
}

.price-filter input[type="range"] {
  width: 100%;
  accent-color: #2e7d32;
  margin-bottom: 0.8rem;
  cursor: pointer;
}

.results-count {
  margin-top: 1.5rem;
  text-align: center;
  color: #888;
  font-size: 0.85rem;
  background: #fff;
  padding: 6px 12px;
  border-radius: 20px;
}

/* Loading */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
  color: #666;
  gap: 1rem;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #c8e6c9;
  border-top-color: #2e7d32;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Cards */
.product-card {
  border: none;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
  transition: 0.3s ease;
  height: 100%;
}

.product-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 10px 25px rgba(46,125,50,0.2);
}

.product-image {
  position: relative;
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fafafa;
}

.product-image img {
  width: 80%;
  height: 85%;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image img {
  transform: scale(1.05);
}

.overlay {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(255,255,255,0.85);
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  transition: opacity 0.3s;
}

.product-card:hover .overlay {
  opacity: 1;
}

.info-btn, .add-btn {
  border: none;
  border-radius: 25px;
  padding: 8px 18px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
  font-size: 0.85rem;
}

.info-btn {
  background-color: #81c784;
  color: #fff;
}

.add-btn {
  background-color: #388e3c;
  color: #fff;
}

.info-btn:hover { background-color: #66bb6a; }
.add-btn:hover { background-color: #2e7d32; }

.product-title {
  font-size: 0.88rem;
  font-weight: 600;
  color: #333;
  min-height: 2.5rem;
}

.rating-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 4px 0;
}

.stars {
  color: #f59e0b;
  font-size: 0.8rem;
}

.rating-count {
  color: #999;
  font-size: 0.75rem;
}

.product-price {
  color: #2e7d32;
  font-size: 1.1rem;
  font-weight: bold;
  margin: 4px 0 0;
}

.more-btn {
  background-color: #2e7d32;
  color: #fff;
  padding: 12px 40px;
  border-radius: 25px;
  border: none;
  font-weight: 600;
  transition: 0.3s;
  letter-spacing: 0.5px;
}

.more-btn:hover {
  background-color: #1b5e20;
  transform: translateY(-2px);
}

.no-results {
  text-align: center;
  padding: 4rem;
  color: #888;
  font-size: 1.1rem;
}

.reset-btn {
  background: #388e3c;
  color: #fff;
  border: none;
  border-radius: 25px;
  padding: 10px 30px;
  margin-top: 1rem;
  transition: 0.3s;
  font-weight: 600;
}

.reset-btn:hover {
  background: #2e7d32;
  color: #fff;
}
</style>
