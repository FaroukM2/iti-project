<template>
  <div class="contact-page">
    <div class="container py-5">
      <div class="contact-wrapper">
        <div class="row g-0 rounded-4 overflow-hidden shadow-lg contact-box">
          
          <!-- Contact Info Side -->
          <div class="col-md-5 contact-info text-white p-5">
            <h2 class="info-title mb-4">Let's talk about your needs.</h2>
            <p class="info-desc mb-5">
              Have any questions or want to collaborate? Reach out to us, and we'll get back to you as soon as possible.
            </p>

            <div class="info-item d-flex align-items-center mb-4">
              <div class="info-icon me-3">📍</div>
              <div>
                <h6 class="mb-1 fw-bold">Our Location</h6>
                <p class="mb-0 text-white-50">123 Green Avenue, Cairo, Egypt</p>
              </div>
            </div>

            <div class="info-item d-flex align-items-center mb-4">
              <div class="info-icon me-3">📞</div>
              <div>
                <h6 class="mb-1 fw-bold">Phone Number</h6>
                <p class="mb-0 text-white-50">+20 123 456 7890</p>
              </div>
            </div>

            <div class="info-item d-flex align-items-center">
              <div class="info-icon me-3">📧</div>
              <div>
                <h6 class="mb-1 fw-bold">Email Address</h6>
                <p class="mb-0 text-white-50">contact@greenmart.com</p>
              </div>
            </div>
          </div>

          <!-- Form Side -->
          <div class="col-md-7 p-5 bg-white">
            <div v-if="submitted" class="success-message">
              <div class="success-icon mb-3">✅</div>
              <h3 class="text-success fw-bold mb-3">Message Sent Successfully!</h3>
              <p class="text-muted mb-4">Thank you, <strong>{{ sentName }}</strong>. We have received your message and will contact you shortly.</p>
              <button @click="resetForm" class="btn btn-outline-success px-4 py-2 rounded-pill fw-bold">Send Another Message</button>
            </div>

            <form v-else @submit.prevent="handleSubmit" class="contact-form">
              <h3 class="form-title mb-4">Send us a Message</h3>
              
              <div class="row">
                <div class="col-md-6 mb-4">
                  <label for="name" class="form-label">Full Name</label>
                  <input type="text" v-model="name" class="form-control" id="name" placeholder="John Doe" required />
                </div>
                <div class="col-md-6 mb-4">
                  <label for="email" class="form-label">Email Address</label>
                  <input type="email" v-model="email" class="form-control" id="email" placeholder="john@example.com" required />
                </div>
              </div>

              <div class="mb-4">
                <label for="subject" class="form-label">Subject</label>
                <input type="text" v-model="subject" class="form-control" id="subject" placeholder="How can we help?" required />
              </div>

              <div class="mb-4">
                <label for="message" class="form-label">Message</label>
                <textarea v-model="message" class="form-control" id="message" rows="4" placeholder="Write your message here..." required></textarea>
              </div>

              <button type="submit" class="btn btn-submit w-100 py-3">Send Message 🚀</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      subject: '',
      message: '',
      submitted: false,
      sentName: ''
    };
  },
  methods: {
    handleSubmit() {
      if (this.name && this.email && this.message) {
        this.sentName = this.name;
        this.submitted = true;
      }
    },
    resetForm() {
      this.name = '';
      this.email = '';
      this.subject = '';
      this.message = '';
      this.submitted = false;
      this.sentName = '';
    }
  }
};
</script>

<style scoped>
.contact-page {
  background: linear-gradient(135deg, #f0fdf4 0%, #e8f5e9 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.contact-wrapper {
  max-width: 1000px;
  margin: 0 auto;
}

.contact-box {
  background-color: #fff;
  border-radius: 20px !important;
}

.contact-info {
  background: linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%);
  position: relative;
  overflow: hidden;
}

.contact-info::before {
  content: "";
  position: absolute;
  top: -50px;
  right: -50px;
  width: 200px;
  height: 200px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
}

.contact-info::after {
  content: "";
  position: absolute;
  bottom: -80px;
  left: -80px;
  width: 300px;
  height: 300px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
}

.info-title {
  font-weight: 800;
  font-size: 2rem;
  line-height: 1.2;
}

.info-desc {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  line-height: 1.6;
}

.info-icon {
  font-size: 1.8rem;
  background: rgba(255, 255, 255, 0.15);
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
}

.form-title {
  color: #1a2e1a;
  font-weight: 800;
}

.form-label {
  font-weight: 600;
  color: #555;
  font-size: 0.9rem;
  margin-bottom: 0.4rem;
}

.form-control {
  border: none;
  border-bottom: 2px solid #e0e0e0;
  border-radius: 0;
  padding: 0.8rem 0.5rem;
  font-size: 1rem;
  background: transparent;
  transition: all 0.3s ease;
  color: #333;
}

.form-control:focus {
  border-color: #2e7d32;
  box-shadow: none;
  outline: none;
  background: rgba(46, 125, 50, 0.02);
}

.form-control::placeholder {
  color: #aaa;
  font-size: 0.9rem;
}

.btn-submit {
  background: #2e7d32;
  color: #fff;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1.1rem;
  border: none;
  transition: all 0.3s ease;
  margin-top: 1rem;
}

.btn-submit:hover {
  background: #1b5e20;
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(46, 125, 50, 0.3);
}

.success-message {
  text-align: center;
  padding: 3rem 1rem;
  animation: fadeIn 0.5s ease-out;
}

.success-icon {
  font-size: 4rem;
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
</style>
