# Group 6 E-Commerce Backend

Backend for our e-commerce project.

## What We're Building
- User signup and login
- Product display and filtering
- Product image upload
- Wallet system
- Checkout and payment

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

## Frontend Notes

- Send the JWT token as `Authorization: Bearer <token>`
- Product management routes are admin only
- Product listing and categories require login
- Prices are numbers
- `stock_quantity` is a number

## Password Rules
- 8+ characters
- 1 uppercase
- 1 lowercase
- 1 number
