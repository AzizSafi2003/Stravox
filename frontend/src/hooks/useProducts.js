import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getMyProducts,
  getProductById,
} from "../lib/api";

export const useProducts = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  return { data, isLoading, error };
};

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: createProduct,
  });
};

export const useProduct = (id) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    enabled:
      !!id /* Double bang operator --> which only run the query if there is an ID. `id` itself is a string we convert it into boolean using `!!id`. */,
  });
};

export const useDeleteProduct = () => {
  return useMutation({
    mutationFn: deleteProduct,
  });
};

export const useMyProducts = () => {
  return useQuery({ queryKey: ["myProducts"], queryFn: getMyProducts });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProduct,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["myProducts"] });
    },
  });
};
