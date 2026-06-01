import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuthToken } from "../api/auth";

export default function ProductPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const product = location.state?.product;

  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  if (!product) {
    return (
      <div style={{ padding: 24 }}>
        <h2>Product Not Found</h2>

        <button onClick={() => navigate("/shop")}>
          Back To Shop
        </button>
      </div>
    );
  }

  async function addToCart() {
    try {
      setLoading(true);

      const token = getAuthToken();

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/cart/items`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            productId: product.id,
            quantity,
          }),
        }
      );

      const result = await response.json();

      if (result.success) {
        alert("Product added to cart successfully");
      } else {
        alert(result.message || "Failed to add product");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        maxWidth: 800,
        margin: "0 auto",
        padding: 24,
      }}
    >
      <button
        onClick={() => navigate("/shop")}
        style={{
          marginBottom: 20,
        }}
      >
        ← Back To Shop
      </button>

      <h1>{product.name}</h1>

      <p>{product.description}</p>

      <p>
        <strong>
          ₦{Number(product.price).toLocaleString()}
        </strong>
      </p>

      <p>Category: {product.category}</p>

      <p>Stock Available: {product.stock_quantity}</p>

      <div
        style={{
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        <label>Quantity:</label>

        <input
          type="number"
          min={1}
          max={product.stock_quantity}
          value={quantity}
          onChange={(e) =>
            setQuantity(Number(e.target.value))
          }
          style={{
            marginLeft: 10,
            width: 80,
          }}
        />
      </div>

      <button
        onClick={addToCart}
        disabled={loading}
        style={{
          padding: "12px 20px",
          cursor: "pointer",
        }}
      >
        {loading ? "Adding..." : "Add To Cart"}
      </button>
    </div>
  );
}