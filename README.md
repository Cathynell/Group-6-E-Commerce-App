# Group 6 E-Commerce Backend

Backend for our e-commerce project.

## What We're Building
- User signup and login
- Product display and filtering
- Product image upload
- Cart management
- Wallet system with demo money
- Checkout and payment
- Order history

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file and add your Supabase credentials:
```env
SUPABASE_URL=your_url
SUPABASE_KEY=your_key
SUPABASE_SECRET_KEY=your_secret_key
PRODUCT_IMAGES_BUCKET=product-images
WALLET_CURRENCY=NGN
JWT_SECRET=your_secret
PORT=5000
```

3. Run the server:
```bash
npm run dev
```

Server runs on `http://localhost:5000`

## Supabase Storage

Create a bucket named `product-images`.

- Bucket name: `product-images`
- Visibility: `Public`

## Roles

Users now have a `role` field:
- `user`: can browse products
- `admin`: can create, edit, delete, and upload product images

## Database Setup

Run the SQL in [database/schema.sql](/abs/c:/Users/ojoje/OneDrive/Desktop/Sen%20Js/E-commerce/Group-6-E-Commerce-App/database/schema.sql) inside Supabase SQL Editor before using cart, wallet, checkout, payments, and orders.

## API Routes

### Signup
```http
POST /api/auth/signup
Content-Type: application/json

{
  "fullName": "John",
  "email": "john@example.com",
  "password": "SecurePass123",
  "confirmPassword": "SecurePass123",
  "phoneNumber": "+1234567890"
}
```

Success response:
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "user-id",
    "fullName": "John",
    "email": "john@example.com",
    "phoneNumber": "+1234567890",
    "role": "user",
    "token": "jwt-token"
  }
}
```

Common status codes:
- `201` success
- `400` validation error
- `409` email already exists

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

Success response:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "id": "user-id",
    "fullName": "John",
    "email": "john@example.com",
    "phoneNumber": "+1234567890",
    "role": "user",
    "token": "jwt-token"
  }
}
```

Common status codes:
- `200` success
- `400` validation error
- `401` invalid email or password

### Verify Token
```http
GET /api/auth/verify
Authorization: Bearer <token>
```

Common status codes:
- `200` token is valid
- `401` token missing, invalid, or expired

### Get Products
```http
GET /api/products?category=Travel&maxPrice=100000&page=1&limit=10&sortBy=price&sortOrder=asc
Authorization: Bearer <token>
```

Success response:
```json
{
  "success": true,
  "message": "Products fetched successfully",
  "filters": {
    "category": "Travel",
    "maxPrice": 100000,
    "sortBy": "price",
    "sortOrder": "asc",
    "limit": 10,
    "page": 1
  },
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1
  },
  "data": [
    {
      "id": "product-id",
      "name": "Travel Bag",
      "description": "Durable travel bag",
      "category": "Travel",
      "price": 75000,
      "image_url": "https://example.com/travel-bag.jpg",
      "stock_quantity": 10,
      "created_at": "2026-04-24T00:00:00.000Z",
      "updated_at": "2026-04-24T00:00:00.000Z"
    }
  ]
}
```

### Create Product
```http
POST /api/products
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Electric Blender",
  "description": "High-speed kitchen blender",
  "category": "Home Appliances",
  "price": 85000,
  "image_url": "https://your-project.supabase.co/storage/v1/object/public/product-images/products/blender.jpg",
  "stock_quantity": 12
}
```

Admin only.

You can also send `image_path` instead of `image_url`.

Common status codes:
- `201` success
- `400` validation error
- `401` no token
- `403` not admin
- `500` server or database error

### Update Product
```http
PUT /api/products/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "price": 90000,
  "stock_quantity": 8
}
```

Admin only.

Common status codes:
- `200` success
- `400` validation error
- `401` no token
- `403` not admin
- `404` product not found

### Delete Product
```http
DELETE /api/products/:id
Authorization: Bearer <token>
```

Admin only.

Common status codes:
- `200` success
- `401` no token
- `403` not admin
- `404` product not found

Supported query parameters:
- `category`: category filter such as `Home Appliances` or `Travel`
- `search`: searches product `name` and `description`
- `minPrice`: minimum product price
- `maxPrice`: maximum product price
- `sortBy`: `created_at`, `name`, `price`, or `category`
- `sortOrder`: `asc` or `desc`
- `page`: page number, starting from `1`
- `limit`: number of products per page, max `100`

Example use cases:
- Less than 100K: `GET /api/products?maxPrice=100000`
- Home appliances under 100K: `GET /api/products?category=Home Appliances&maxPrice=100000`
- Travel items: `GET /api/products?category=Travel`

Product fields returned in `data`:
- `id`
- `name`
- `description`
- `category`
- `price`
- `image_url`
- `stock_quantity`
- `created_at`
- `updated_at`

### Get Categories
```http
GET /api/products/categories
Authorization: Bearer <token>
```

Success response:
```json
{
  "success": true,
  "message": "Categories fetched successfully",
  "data": ["Travel", "Home Appliances"]
}
```

### Upload Product Image
```http
POST /api/products/upload-image
Authorization: Bearer <token>
Content-Type: application/json

{
  "fileName": "blender.jpg",
  "contentType": "image/jpeg",
  "folder": "products",
  "imageBase64": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQ..."
}
```

Accepted content types:
- `image/jpeg`
- `image/png`
- `image/webp`
- `image/gif`

Notes:
- Max image size is `5MB`
- `folder` defaults to `products`
- The API returns both the storage path and public URL

Example response:
```json
{
  "success": true,
  "message": "Product image uploaded successfully",
  "data": {
    "bucket": "product-images",
    "path": "products/550e8400-e29b-41d4-a716-446655440000.jpg",
    "publicUrl": "https://your-project.supabase.co/storage/v1/object/public/product-images/products/550e8400-e29b-41d4-a716-446655440000.jpg",
    "size": 245120
  }
}
```

Common status codes:
- `201` success
- `400` invalid upload data
- `401` no token
- `403` not admin
- `500` storage error

Store either:
- `publicUrl` in `products.image_url`
- `path` in `image_path`

### Cart

All cart routes require `Authorization: Bearer <token>`.

#### Get cart
```http
GET /api/cart
```

#### Add item to cart
```http
POST /api/cart/items
Content-Type: application/json

{
  "productId": "product-uuid",
  "quantity": 2
}
```

#### Update cart item quantity
```http
PUT /api/cart/items/:itemId
Content-Type: application/json

{
  "quantity": 3
}
```

#### Remove a cart item
```http
DELETE /api/cart/items/:itemId
```

#### Clear cart
```http
DELETE /api/cart/clear
```

### Wallet

The wallet uses demo money for now.

#### Get wallet
```http
GET /api/wallet
```

#### Fund wallet with demo money
```http
POST /api/wallet/top-up
Content-Type: application/json

{
  "amount": 500000,
  "description": "Demo funding"
}
```

#### Wallet transactions
```http
GET /api/wallet/transactions
```

### Checkout

#### Checkout preview
```http
GET /api/checkout/preview
```

Returns the current cart totals, wallet balance, and whether the wallet can cover the purchase.

#### Complete checkout
```http
POST /api/checkout
Content-Type: application/json

{
  "paymentMethod": "wallet",
  "notes": "Leave at the front desk",
  "shippingAddress": {
    "fullName": "Jane Doe",
    "phoneNumber": "+2348000000000",
    "line1": "12 Marina Road",
    "city": "Lagos",
    "state": "Lagos",
    "country": "Nigeria"
  }
}
```

What happens during checkout:
- The server reads the cart
- Validates stock availability
- Debits the demo wallet
- Creates a payment record
- Creates the order and order items
- Clears the cart

### Orders

#### Order history
```http
GET /api/orders
```

Returns all orders for the logged-in user, including the items ordered and linked payment records.

#### Single order
```http
GET /api/orders/:orderId
```

## Frontend Notes

- Send the JWT token as `Authorization: Bearer <token>`
- Product management routes are admin only
- Product listing and categories require login
- Cart, wallet, checkout, and order history require login
- Checkout currently supports `wallet` only
- Wallet top-up is demo-only for now
- Prices are numbers
- `stock_quantity` is a number

## Password Rules
- 8+ characters
- 1 uppercase
- 1 lowercase
- 1 number

## Testing and Debugging



## Group Members & Roles

### Team Leader
| Name | Role |
|------|------|
| Ojo Jeremiah | Team Leader & Backend Developer |

---

### Frontend Developers / Design
| Name | Role |
|------|------|
| Mbama Elsie | Frontend Developer & Designer |
| Ajayi Cathynell | Frontend Developer & Designer |
| Balogun Halima | Frontend Developer & Designer |

---

### Backend Developers
| Name | Role |
|------|------|
| Ojo Jeremiah | Backend Developer |

---

### Testing & Documentation
| Name | Role |
|------|------|
| Agolo Rukevwe | Testing & Documentation |
| Oseghale Nehireme | Testing & Documentation |