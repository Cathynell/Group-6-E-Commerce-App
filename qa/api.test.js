// qa/api.test.js — Full API Test for Group 6 Mini E-Commerce App

const BASE_URL = "http://localhost:5000/api";

let token = ""; // will be filled after login
let productId = "";
let cartItemId = "";
let orderId = "";

// ─── HELPER ───────────────────────────────────────────
async function test(name, fn) {
  try {
    await fn();
  } catch (e) {
    console.log(`❌ ${name} — ERROR: ${e.message}`);
  }
}

function log(name, res, data) {
  if (res.ok) {
    console.log(`✅ ${name} — PASSED (${res.status})`);
  } else {
    console.log(`❌ ${name} — FAILED (${res.status}) →`, data?.message || "No message");
  }
}

// ─── AUTH TESTS ───────────────────────────────────────
async function testAuth() {
  console.log("\n📌 AUTH TESTS");

  // Signup
  await test("POST /api/auth/signup", async () => {
    const res = await fetch(`${BASE_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: "Test User",
        email: "testuser@example.com",
        password: "SecurePass123",
        confirmPassword: "SecurePass123",
        phoneNumber: "+2348000000000"
      })
    });
    const data = await res.json();
    log("POST /api/auth/signup", res, data);
  });

  // Login
  await test("POST /api/auth/login", async () => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "testuser@example.com",
        password: "SecurePass123"
      })
    });
    const data = await res.json();
    log("POST /api/auth/login", res, data);
    if (data?.data?.token) {
      token = data.data.token;
      console.log("   🔑 Token saved for further tests");
    }
  });

  // Verify Token
  await test("GET /api/auth/verify", async () => {
    const res = await fetch(`${BASE_URL}/auth/verify`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    log("GET /api/auth/verify", res, data);
  });
}

// ─── PRODUCT TESTS ────────────────────────────────────
async function testProducts() {
  console.log("\n📌 PRODUCT TESTS");

  // Get all products
  await test("GET /api/products", async () => {
    const res = await fetch(`${BASE_URL}/products`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    log("GET /api/products", res, data);
    if (data?.data?.length > 0) {
      productId = data.data[0].id;
      console.log(`   📦 Product ID saved: ${productId}`);
    }
  });

  // Get products with filters
  await test("GET /api/products?maxPrice=100000", async () => {
    const res = await fetch(`${BASE_URL}/products?maxPrice=100000`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    log("GET /api/products?maxPrice=100000", res, data);
  });

  // Get categories
  await test("GET /api/products/categories", async () => {
    const res = await fetch(`${BASE_URL}/products/categories`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    log("GET /api/products/categories", res, data);
  });
}

// ─── CART TESTS ───────────────────────────────────────
async function testCart() {
  console.log("\n📌 CART TESTS");

  // Get cart
  await test("GET /api/cart", async () => {
    const res = await fetch(`${BASE_URL}/cart`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    log("GET /api/cart", res, data);
  });

  // Add item to cart
  await test("POST /api/cart/items", async () => {
    const res = await fetch(`${BASE_URL}/cart/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ productId: productId, quantity: 2 })
    });
    const data = await res.json();
    log("POST /api/cart/items", res, data);
    if (data?.data?.id) {
      cartItemId = data.data.id;
      console.log(`   🛒 Cart Item ID saved: ${cartItemId}`);
    }
  });

  // Update cart item
  await test("PUT /api/cart/items/:itemId", async () => {
    const res = await fetch(`${BASE_URL}/cart/items/${cartItemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ quantity: 3 })
    });
    const data = await res.json();
    log("PUT /api/cart/items/:itemId", res, data);
  });

  // Remove cart item
  await test("DELETE /api/cart/items/:itemId", async () => {
    const res = await fetch(`${BASE_URL}/cart/items/${cartItemId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    log("DELETE /api/cart/items/:itemId", res, data);
  });
}

// ─── WALLET TESTS ─────────────────────────────────────
async function testWallet() {
  console.log("\n📌 WALLET TESTS");

  // Get wallet
  await test("GET /api/wallet", async () => {
    const res = await fetch(`${BASE_URL}/wallet`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    log("GET /api/wallet", res, data);
  });

  // Fund wallet
  await test("POST /api/wallet/top-up", async () => {
    const res = await fetch(`${BASE_URL}/wallet/top-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ amount: 500000, description: "Demo funding" })
    });
    const data = await res.json();
    log("POST /api/wallet/top-up", res, data);
  });

  // Wallet transactions
  await test("GET /api/wallet/transactions", async () => {
    const res = await fetch(`${BASE_URL}/wallet/transactions`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    log("GET /api/wallet/transactions", res, data);
  });
}

// ─── CHECKOUT TESTS ───────────────────────────────────
async function testCheckout() {
  console.log("\n📌 CHECKOUT TESTS");

  // Add item to cart first before checkout
  await fetch(`${BASE_URL}/cart/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ productId: productId, quantity: 1 })
  });

  // Checkout preview
  await test("GET /api/checkout/preview", async () => {
    const res = await fetch(`${BASE_URL}/checkout/preview`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    log("GET /api/checkout/preview", res, data);
  });

  // Complete checkout
  await test("POST /api/checkout", async () => {
    const res = await fetch(`${BASE_URL}/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        paymentMethod: "wallet",
        notes: "Leave at the front desk",
        shippingAddress: {
          fullName: "Test User",
          phoneNumber: "+2348000000000",
          line1: "12 Marina Road",
          city: "Lagos",
          state: "Lagos",
          country: "Nigeria"
        }
      })
    });
    const data = await res.json();
    log("POST /api/checkout", res, data);
  });
}

// ─── ORDER TESTS ──────────────────────────────────────
async function testOrders() {
  console.log("\n📌 ORDER TESTS");

  // Get all orders
  await test("GET /api/orders", async () => {
    const res = await fetch(`${BASE_URL}/orders`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    log("GET /api/orders", res, data);
    if (data?.data?.length > 0) {
      orderId = data.data[0].id;
      console.log(`   🧾 Order ID saved: ${orderId}`);
    }
  });

  // Get single order
  await test("GET /api/orders/:orderId", async () => {
    const res = await fetch(`${BASE_URL}/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    log("GET /api/orders/:orderId", res, data);
  });
}

// ─── RUN ALL TESTS ────────────────────────────────────
async function runAllTests() {
  console.log("🚀 Starting API Tests — Group 6 Mini E-Commerce App");
  console.log("=".repeat(50));

  await testAuth();
  await testProducts();
  await testCart();
  await testWallet();
  await testCheckout();
  await testOrders();

  console.log("\n" + "=".repeat(50));
  console.log("✅ All tests complete!");
}

runAllTests();