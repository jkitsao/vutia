import React, { useState, useContext } from "react";
import Select from "react-select";
import axios from "axios";
import { useToast, Spinner } from "@chakra-ui/react";

import { useRouter } from "next/router";
import { StoreContext } from "../../../context/storeContext";

function Create_store_form({ onClose, trigger }) {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const { user, userDetails } = useContext(StoreContext);

  const [bannerImg, setBannerImg] = useState(
    `https://picsum.photos/200/300?random=${Math.floor(Math.random() * 20)}`
  );
  const [storeName, setStoreName] = useState("");
  const [storeEmail, setStoreEmail] = useState(
    userDetails?.user_details?.email
  );
  const [storeDescription, setStoreDescription] = useState("");
  const [storeCategory, setStoreCategory] = useState(null);
  const [storeImage, setStoreImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const router = useRouter();

  //handle image upload
  const handleImageChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    const file = e.target.files[0];
    setStoreImage(file);

    reader.onloadend = () => {
      setBannerImg(reader.result);
    };
    reader.readAsDataURL(file);
  };
  //create form data
  async function createStore({ image, data }) {
    setLoading(true);
    const formData = new FormData();
    formData.append("image", image);
    formData.append("data", JSON.stringify(data));

    const result = await axios.post("http://localhost:5000/store", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setLoading(false);
    return result.data;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      store_user_id: userDetails._id,
      store_name: storeName,
      store_email: storeEmail,
      store_description: storeDescription,
      store_category: storeCategory,
      store_owner: userDetails,
    };
    // alert(JSON.stringify(userDetails._id));
    const result = await createStore({ image: storeImage, data: data });
    toast({
      title: result.success ? "Store created." : "There was an issue",
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
    <div>
      {/* <!-- component --> */}
      <form onSubmit={handleSubmit}>
        <div className="grid  gap-8 grid-cols-1">
          <div className="flex flex-col ">
            <div className="bg-white shadow-md rounded-3xl p-5">
              <div
                className=" bg-black h-48 overflow-hidden"
                style={{
                  backgroundImage: `url(${bannerImg})`,
                  backgroundPosition: "center",
                }}
              >
                <div
                  className="flex h-full items-end"
                  style={{ backgroundColor: "rgba(1, 4, 20, 0.29)" }}
                >
                  <h2
                    className="text-3xl font-bold text-white bg-black shadow-lg p-3 text-center mx-auto"
                    style={{ backgroundColor: "rgba(1, 4, 20, 0.79)" }}
                  >
                    {storeName}
                  </h2>
                </div>
              </div>
              <div className="mt-5">
                <div className="form">
                  <div className="md:space-y-2 mb-3">
                    <div className="flex items-center py-6">
                      <label className="cursor-pointer ">
                        <span className="focus:outline-none text-white text-sm py-2 px-4 rounded-full bg-green-400 hover:bg-green-500 hover:shadow-lg">
                          Upload banner image
                        </span>
                        <input
                          type="file"
                          className="hidden"
                          onChange={handleImageChange}
                        />
                      </label>
                    </div>
                  </div>
                  <div className="md:flex flex-row md:space-x-4 w-full text-sm">
                    <div className="mb-3 space-y-2 w-full text-sm">
                      <label className="font-semibold text-gray-600 py-2">
                        Store Name <abbr title="required">*</abbr>
                      </label>
                      <input
                        placeholder="Store Name"
                        className="appearance-none block font-semibold w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                        required="required"
                        type="text"
                        value={storeName}
                        onChange={(e) =>
                          setStoreName(e.target.value.split(" ").join(""))
                        }
                        name="store_name"
                        id="store-name"
                      />
                      <p className="text-red-500 hidden text-xs ">
                        Please fill out this field.
                      </p>
                    </div>
                    <div className="mb-3 space-y-2 w-full text-sm">
                      <label className="font-semibold text-gray-600 py-2">
                        Email <abbr title="required">*</abbr>
                      </label>
                      <input
                        placeholder="Email"
                        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                        required="required"
                        type="text"
                        name="store_email"
                        id="store_email"
                        value={storeEmail}
                        onChange={(e) => setStoreEmail(e.target.value)}
                      />
                      <p className="text-red-500 text-xs hidden">
                        Please fill out this field.
                      </p>
                    </div>
                  </div>
                  {/* <div className="mb-3 space-y-2 w-full text-sm">
                  <label className=" font-semibold text-gray-600 py-2">
                    Store Website
                  </label>
                  <div className="flex flex-wrap items-stretch w-full mb-4 relative">
                    <div className="flex">
                      <span className="flex  leading-normal bg-grey-lighter border-1 rounded-r-none border border-r-0 border-blue-300 px-3 whitespace-no-wrap text-grey-dark text-sm w-12 h-10 bg-blue-300 justify-center items-center  text-xl rounded-lg text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                      </span>
                    </div>
                    <input
                      type="url"
                      className="flex-shrink flex-grow flex-auto leading-normal w-px  border border-l-0 h-10 border-grey-light rounded-lg rounded-l-none px-3 relative focus:border-blue focus:shadow"
                      placeholder="https://"
                    />
                  </div>
                </div> */}
                  <div className="md:flex md:flex-row md:space-x-4 w-full text-sm">
                    <div className="w-full flex flex-col mb-3">
                      <label className="font-semibold text-gray-600 py-2">
                        Phone number
                      </label>
                      <input
                        placeholder="Address"
                        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                        type="phone"
                        name="store_phone_number"
                        id="store-phone-number"
                      />
                    </div>
                    <div className="w-full flex flex-col mb-3 text-sm">
                      <label className="font-semibold text-gray-600 py-2">
                        Category <abbr title="required">*</abbr>
                      </label>
                      <Select
                        value={storeCategory}
                        onChange={(selectedOption) =>
                          setStoreCategory(selectedOption)
                        }
                        options={options}
                      />
                      <p
                        className="text-sm text-red-500 hidden mt-3"
                        id="error"
                      >
                        Please fill out this field.
                      </p>
                    </div>
                  </div>
                  <div className="flex-auto w-5/6 mb-1 space-y-2 text-sm">
                    <label className="font-semibold text-gray-600 py-2">
                      Description
                    </label>
                    <textarea
                      required="true"
                      name="store_description"
                      id="store-description"
                      className=" min-h-[100px] max-h-[300px] h-28 appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg  py-4 px-4"
                      placeholder="Tell us something about your store (min chars 30)"
                      spellcheck="false"
                      value={storeDescription}
                      onChange={(e) => setStoreDescription(e.target.value)}
                    ></textarea>
                    <p className="text-xs text-gray-400 text-left my-3">
                      You inserted {storeDescription.length} characters
                    </p>
                  </div>
                  <p className="text-xs text-red-500 text-right my-3">
                    Required fields are marked with an asterisk{" "}
                    <abbr title="Required field">*</abbr>
                  </p>
                  <div className="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse">
                    <button
                      className="mb-2 md:mb-0 bg-red-800 px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-100 rounded-full hover:shadow-lg hover:bg-red-700"
                      onClick={onClose}
                      disabled={loading}
                      type="button"
                    >
                      {" "}
                      Cancel{" "}
                    </button>
                    {!loading ? (
                      <button
                        className="mb-2 md:mb-0 bg-green-600 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-700"
                        type="submit"
                      >
                        create
                      </button>
                    ) : (
                      <Spinner />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Create_store_form;
