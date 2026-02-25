import { useNavigate, useParams, Link } from "react-router";
import { useAuth } from "@clerk/clerk-react";
import { useProduct, useUpdateProduct } from "../hooks/useProducts";
import LoaderSpinner from "../components/LoadingSpinner";
import EditProductForm from "../components/EditProductForm";

function EditProductPage() {
  const { id } = useParams();
  const { userId, isLoaded: isAuthLoaded } = useAuth();
  const navigate = useNavigate();

  const { data: product, isLoading, error } = useProduct(id);
  const updateProduct = useUpdateProduct();

  if (error) {
    return (
      <div className="card bg-base-300 max-w-md mx-auto">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-error">Failed to load product</h2>
          <p className="text-sm text-base-content/60">{error.message}</p>
        </div>
      </div>
    );
  }

  if (isLoading || !isAuthLoaded) return <LoaderSpinner />;

  if (!product || product.userId !== userId) {
    return (
      <div className="card bg-base-300 max-w-md mx-auto">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-error">
            {!product ? "Not Found" : "Access Denied"}
          </h2>
          <Link to="/" className="btn btn-primary btn-sm">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <EditProductForm
      product={product}
      isPending={updateProduct.isPending}
      isError={updateProduct.isError}
      onSubmit={(formData) => {
        updateProduct.mutate(
          { id, ...formData },
          { onSuccess: () => navigate(`/product/${id}`) },
        );
      }}
    />
  );
}

export default EditProductPage;
