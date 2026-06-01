import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthToken } from "../api/auth";

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image_url: string;
  stock_quantity: number;
}

export default function ShopPage() {
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const token = getAuthToken();

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/products`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (result.success) {
        setProducts(result.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Shop</h1>

      <button onClick={() => navigate("/dashboard")}>
        Back to Dashboard
      </button>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))",
            gap: 20,
            marginTop: 20,
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: 8,
                padding: 16,
              }}
            >
              <h3>{product.name}</h3>

              <p>{product.description}</p>

              <p>
                <strong>
                  ₦{Number(product.price).toLocaleString()}
                </strong>
              </p>

              <p>Stock: {product.stock_quantity}</p>

              <button
                style={{
                  padding: "10px 16px",
                  cursor: "pointer",
                }}
                onClick={() =>
                  navigate(`/product/${product.id}`, {
                    state: {
                      product,
                    },
                  })
                }
              >
                View Product
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}