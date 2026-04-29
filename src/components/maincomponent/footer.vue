<template>
  <footer class="footer text-white">
    <div class="container py-4">
      <div class="row align-items-center">
        <!-- Brand Side -->
        <div class="col-md-4 text-center text-md-start mb-3 mb-md-0">
          <h5 class="fw-bold mb-1">🌿 GreenMart</h5>
          <p class="mb-0 text-white-50 small">Your favorite store for everything.</p>
        </div>

        <!-- Copyright -->
        <div class="col-md-4 text-center mb-3 mb-md-0">
          <p class="mb-0 small">&copy; 2026 GreenMart. All rights reserved.</p>
        </div>

        <!-- Social Links -->
        <div class="col-md-4 text-center text-md-end social-links">
          <a href="#" class="mx-2"><i class="fab fa-facebook-f"></i></a>
          <a href="#" class="mx-2"><i class="fab fa-twitter"></i></a>
          <a href="#" class="mx-2"><i class="fab fa-instagram"></i></a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
};
</script>

<style scoped>
.footer {
  background: linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%);
  width: 100%;
  margin-top: auto; /* Pushes footer to the bottom if parent is flex col */
  box-shadow: 0 -4px 15px rgba(0, 0, 0, 0.05);
}

.footer p {
  letter-spacing: 0.3px;
}

.social-links a {
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.2rem;
  transition: all 0.3s ease;
  display: inline-block;
}

.social-links a:hover {
  color: #fff;
  transform: translateY(-3px);
}
</style>
