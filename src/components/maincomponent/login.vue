<template>
  <div class="login-page">
    <div class="container">
      <div class="login-card shadow-lg rounded-4 overflow-hidden">
        <div class="row g-0">
          
          <!-- Visual Side -->
          <div class="col-md-5 login-visual d-none d-md-flex flex-column justify-content-center align-items-center text-white p-5">
            <h2 class="fw-bold mb-3">Welcome Back!</h2>
            <p class="text-center mb-5 text-white-50">To keep connected with us please login with your personal info.</p>
            <div class="visual-icon">🌿</div>
          </div>

          <!-- Form Side -->
          <div class="col-md-7 p-5 bg-white d-flex flex-column justify-content-center">
            <div class="text-center mb-4">
              <h3 class="fw-bold text-success">Sign In to GreenMart</h3>
              <p class="text-muted">Enter your details below to access your account</p>
            </div>

            <form @submit.prevent="handleLogin" class="login-form">
              <div class="mb-4">
                <label for="email" class="form-label text-muted fw-bold">Email Address</label>
                <div class="input-group">
                  <span class="input-group-text bg-light border-0">✉️</span>
                  <input type="email" v-model="email" class="form-control bg-light border-0 py-2" id="email" placeholder="john@example.com" required />
                </div>
              </div>

              <div class="mb-4">
                <div class="d-flex justify-content-between">
                  <label for="password" class="form-label text-muted fw-bold">Password</label>
                  <a href="#" class="text-success text-decoration-none small fw-bold">Forgot Password?</a>
                </div>
                <div class="input-group">
                  <span class="input-group-text bg-light border-0">🔒</span>
                  <input type="password" v-model="password" class="form-control bg-light border-0 py-2" id="password" placeholder="••••••••" required />
                </div>
              </div>

              <div class="mb-4 form-check">
                <input type="checkbox" class="form-check-input" id="rememberMe" v-model="rememberMe">
                <label class="form-check-label text-muted small" for="rememberMe">Remember me next time</label>
              </div>

              <button type="submit" class="btn btn-success w-100 py-3 rounded-pill fw-bold mb-4">
                Sign In 🚀
              </button>

              <p class="text-center text-muted small mb-0">
                Don't have an account? <a href="#" class="text-success fw-bold text-decoration-none">Sign up here</a>
              </p>
            </form>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      rememberMe: false
    };
  },
  methods: {
    handleLogin() {
      // Dummy login logic
      if (this.email && this.password) {
        alert(`Welcome back, ${this.email}!`);
        this.$router.push('/');
      }
    }
  }
};
</script>

<style scoped>
.login-page {
  background: linear-gradient(135deg, #f0fdf4 0%, #e8f5e9 100%);
  min-height: calc(100vh - 140px); /* Adjust based on header/footer */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 0;
}

.login-card {
  max-width: 900px;
  margin: 0 auto;
  border: none;
}

.login-visual {
  background: linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%);
  position: relative;
}

.login-visual::before {
  content: "";
  position: absolute;
  top: -50px;
  left: -50px;
  width: 200px;
  height: 200px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
}

.visual-icon {
  font-size: 5rem;
  opacity: 0.8;
  animation: float 4s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}

.input-group-text {
  border-radius: 10px 0 0 10px;
}

.form-control {
  border-radius: 0 10px 10px 0;
  box-shadow: none !important;
  transition: background-color 0.3s;
}

.form-control:focus {
  background-color: #fff !important;
  outline: none;
}

.btn-success {
  background-color: #2e7d32;
  border: none;
  transition: all 0.3s ease;
}

.btn-success:hover {
  background-color: #1b5e20;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(46, 125, 50, 0.3);
}

.form-check-input:checked {
  background-color: #2e7d32;
  border-color: #2e7d32;
}
</style>
