import { redirect } from "react-router-dom";
import { customFetch } from "../utils/all";

export const action = async ({ params }) => {
  const { id } = params;

  try {
    const {
      data: { productId },
    } = await customFetch.delete(`/review/${id}`);

    return redirect(`/products/${productId}`);
  } catch (error) {
    console.log("Not Authorized to delete the review");
    return redirect(`/products/${error?.response?.data?.msg}`);
  }
};
