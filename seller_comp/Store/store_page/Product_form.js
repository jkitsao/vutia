import { useState, useEffect } from "react";
import { useToast, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import axios from "axios";
import CurrencyInput from "react-currency-input-field";
export default function Product_form({ store, onClose }) {
  const [productTitle, setProductTitle] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [checkoutLink, setCheckoutLink] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);
  const [coverPreview, setCoverPreview] = useState(null);
  const [condition, setCondition] = useState("new");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [storeId] = useState(store?._id);
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const router = useRouter();

  //handle image upload
  const handleImageChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    const file = e.target.files[0];
    setCoverImage(file);

    reader.onloadend = () => {
      setCoverPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };
  //cancel image upload
  const cancelImage = () => {
    setCoverImage(null);
    setCoverPreview(null);
  };
  // create form data
  async function createProduct({ image, data }) {
    setLoading(true);
    const formData = new FormData();
    formData.append("image", image);
    formData.append("data", JSON.stringify(data));

    const result = await axios.post("http://localhost:5000/product", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setLoading(false);
    return result.data;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title: productTitle,
      description: productDescription,
      checkout_link: checkoutLink,
      isAvailable,
      condition,
      quantity,
      price,
      store_id: storeId,
    };
    alert(JSON.stringify(data));
    const result = await createProduct({ image: coverImage, data });
    toast({
      title: result.success
        ? "Product added succesfully."
        : "There was an issue",
      description: result.msg,
      status: result.success ? "success" : "warning",
      duration: 4000,
      isClosable: true,
      position: "top",
    });
    // if (result.success) return router.push("/mystore");
    // console.log(result?.store);
    onClose();
    // trigger("http://localhost:5000/store/stores");
  };

  return (
    <>
      <div>
        <div className="md:grid md:grid-cols-2 md:gap-6">
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={handleSubmit}>
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div className="grid lg:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700">
                        Product image
                      </label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        {!coverPreview ? (
                          <div className="space-y-1 text-center">
                            <svg
                              className="mx-auto h-12 w-12 text-gray-400"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 48 48"
                              aria-hidden="true"
                            >
                              <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <div className="flex text-sm text-gray-600">
                              <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                              >
                                <span>Upload Product image</span>
                                <input
                                  id="file-upload"
                                  name="file-upload"
                                  type="file"
                                  className="sr-only"
                                  onChange={handleImageChange}
                                />
                              </label>
                              {/* <p className="pl-1">or drag and drop</p> */}
                            </div>
                            <p className="text-xs text-gray-500">
                              PNG, JPG, GIF up to 5mb
                            </p>
                          </div>
                        ) : (
                          <div>
                            <img src={coverPreview} className="object-cover " />
                          </div>
                        )}
                      </div>
                      {coverPreview && (
                        <button
                          className="bg-red-600 text-white text-xs p-1"
                          type="button"
                          onClick={cancelImage}
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first_name"
                        className="block text-sm font-semibold text-gray-700"
                      >
                        Product name
                      </label>
                      <input
                        type="text"
                        name="product_title"
                        id="product-title"
                        value={productTitle}
                        onChange={(e) => setProductTitle(e.target.value)}
                        // autoComplete="given-name"
                        className="mt-1 focus:ring-gray-600 focus:border-gray-600 block w-full shadow-sm sm:text-base rounded-md p-3 border border-gray-200"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="about"
                      className="block text-sm font-semibold text-gray-700"
                    >
                      Product description
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="product-description"
                        name="product_description"
                        rows={3}
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                        className="shadow-sm focus:ring-gray-600 focus:border-gray-600 p-3 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder="Describe what the product is about"
                        defaultValue={""}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Brief description of the product
                    </p>
                  </div>
                  <div className="col-span-3 sm:col-span-2">
                    <label
                      htmlFor="company_website"
                      className="block text-sm font-semibold text-gray-700"
                    >
                      Check out website link
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm font-semibold">
                        https://
                      </span>
                      <input
                        type="url"
                        name="checkout_website"
                        id="checkout-website"
                        value={checkoutLink}
                        onChange={(e) => setCheckoutLink(e.target.value)}
                        className="focus:ring-gray-600 focus:border-gray-600 p-3 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border border-gray-300"
                        placeholder="www.example.com"
                      />
                    </div>
                  </div>
                  <div className="col-span-6 sm:col-span-6">
                    <label
                      htmlFor="country"
                      className="block text-sm font-semibold text-gray-700"
                    >
                      Condition
                    </label>
                    <select
                      id="condition"
                      name="condition"
                      // autoComplete="country"
                      value={condition}
                      onChange={(e) => setCondition(e.target.value)}
                      className="mt-1 block w-full py-2 p-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option>New</option>
                      <option>Refurbished</option>
                      <option>Used</option>
                    </select>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="first_name"
                      className="block text-sm font-semibold text-gray-700"
                    >
                      Price
                    </label>

                    <CurrencyInput
                      id="input-example"
                      name="input-name"
                      placeholder="Please enter a number"
                      // defaultValue={1000}
                      value={price}
                      decimalsLimit={2}
                      onValueChange={(value) => setPrice(value)}
                      className="mt-1 focus:ring-gray-600 focus:border-gray-600 block w-full shadow-sm sm:text-sm rounded-md p-3 border border-gray-200"
                    />
                  </div>
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="availability"
                        name="availability"
                        type="checkbox"
                        // value={true}
                        checked={isAvailable}
                        onChange={(e) => setIsAvailable(e.target.checked)}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="comments"
                        className="font-semibold text-gray-700"
                      >
                        Availability
                      </label>
                      <p className="text-gray-500">Is the product available</p>
                    </div>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="first_name"
                      className="block text-sm font-semibold text-gray-700"
                    >
                      Inventory
                    </label>
                    <input
                      type="number"
                      name="inventory"
                      id="inventory"
                      // autoComplete="given-name"
                      placeholder="Quantity available"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="mt-1 focus:ring-gray-600 focus:border-gray-600 block w-full shadow-sm sm:text-sm rounded-md p-3 border border-gray-200"
                    />
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  {!loading ? (
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Save
                    </button>
                  ) : (
                    <Spinner />
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
