import React, { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";

function Onboarding({ user }) {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(user?.email);
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [loading, setloading] = useState(false);
  const toast = useToast();
  const router = useRouter();

  //handle image preview and upload
  const handleImageChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    const file = e.target.files[0];
    setProfileImage(file);

    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
      setProfileImage(file);
    };

    reader.readAsDataURL(file);
  };
  //handle image upload to express server
  async function onboardUser({ image, data }) {
    setloading(true);
    const formData = new FormData();
    formData.append("image", image);
    formData.append("data", JSON.stringify(data));

    const result = await axios.post("http://localhost:5000/onboard", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setloading(false);
    return result.data;
  }
  //handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { username, email, user_details: user };
    const result = await onboardUser({ image: profileImage, data: data });
    // alert(JSON.stringify(result, null, 2));
    toast({
      title: result.success ? "Account created." : "There was an issue",
      description: result.msg,
      status: result.success ? "success" : "warning",
      duration: 4000,
      isClosable: true,
      position: "top",
    });
    if (result.success) return router.push("/");
  };
  return (
    <div classNameName="">
      <form onSubmit={handleSubmit}>
        <div className="grid mt-32 gap-8 grid-cols-1">
          <div className="flex flex-col ">
            <div className="bg-gray-100 shadow-lg rounded-3xl p-5">
              <div className="flex flex-col sm:flex-row items-center">
                <h2 className="font-semibold text-xl mr-auto">User profile</h2>
                <div className="w-full sm:w-auto sm:ml-auto mt-3 sm:mt-0"></div>
              </div>
              <div className="mt-5">
                <div className="form">
                  <div className="md:space-y-2 mb-3">
                    <label className="text-sm font-semibold text-gray-600">
                      Profile picture
                      <abbr className="hidden" title="required">
                        *
                      </abbr>
                    </label>
                    <div className="flex items-center py-6">
                      <div className="w-16 h-16 mr-2 flex-none rounded-xl border overflow-hidden">
                        <img
                          className="w-16 h-16 border-4 border-gray-300 mr-4 object-cover rounded-full"
                          src={
                            imagePreviewUrl
                              ? imagePreviewUrl
                              : "https://picsum.photos/seed/picsum/200/300"
                          }
                          alt="Avatar Upload"
                        />
                      </div>
                      <label className="cursor-pointer ">
                        <span className="focus:outline-none text-white text-sm font-semibold py-2 px-4 rounded-full bg-green-400 hover:bg-green-500 hover:shadow-lg">
                          Browse
                        </span>
                        <input
                          type="file"
                          name="file"
                          className="hidden"
                          onChange={handleImageChange}
                        />
                      </label>
                    </div>
                  </div>
                  <div className="md:flex md:flex-row md:space-x-4 w-full text-xs">
                    <div className="mb-3 md:space-y-2 w-full text-sm">
                      <label className="font-semibold text-gray-600 py-2">
                        Username <abbr title="required">*</abbr>
                      </label>
                      <input
                        placeholder="Username"
                        className="appearance-none block w-full border border-grey-lighter rounded-lg h-10 px-4"
                        required="required"
                        type="text"
                        value={username}
                        name="username"
                        id="username_field"
                        onChange={(e) => setUsername(e.target.value)}
                      />
                      <p className="text-red text-xs hidden">
                        Please fill out this field.
                      </p>
                    </div>
                    <div className="mb-3 md:space-y-2 w-full text-sm">
                      <label className="font-semibold text-gray-600 py-2">
                        Email <abbr title="required">*</abbr>
                      </label>
                      <input
                        placeholder="Your Email"
                        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                        required="required"
                        type="email"
                        value={email}
                        name="email"
                        id="email_field"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <p className="text-red text-xs hidden">
                        Please fill out this field.
                      </p>
                    </div>
                  </div>
                  {/* <div className="mb-3 md:space-y-2 w-full text-xs">
                  <label className=" font-semibold text-gray-600 py-2">
                    Company Website
                  </label>
                  <div className="flex flex-wrap items-stretch w-full mb-4 relative">
                    <div className="flex">
                      <span className="flex items-center leading-normal bg-grey-lighter border-1 rounded-r-none border border-r-0 border-blue-300 px-3 whitespace-no-wrap text-grey-dark text-sm w-12 h-10 bg-blue-300 justify-center  text-xl rounded-lg text-white">
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
                      type="text"
                      className="flex-shrink flex-grow  leading-normal w-px flex-1 border border-l-0 h-10 border-grey-light rounded-lg rounded-l-none px-3 relative focus:border-blue focus:shadow"
                      placeholder="https://"
                    />
                  </div>
                </div> */}
                  {/* <div className="md:flex md:flex-row md:space-x-4 w-full text-xs">
                  <div className="w-full flex flex-col mb-3">
                    <label className="font-semibold text-gray-600 py-2">
                      Company Address
                    </label>
                    <input
                      placeholder="Address"
                      className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                      type="text"
                      name="integration[street_address]"
                      id="integration_street_address"
                    />
                  </div>
                  <div className="w-full flex flex-col mb-3">
                    <label className="font-semibold text-gray-600 py-2">
                      Location<abbr title="required">*</abbr>
                    </label>
                    <select
                      className="block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4 md:w-full "
                      required="required"
                      name="integration[city_id]"
                      id="integration_city_id"
                    >
                      <option value="">Seleted location</option>
                      <option value="">Cochin,KL</option>
                      <option value="">Mumbai,MH</option>
                      <option value="">Bangalore,KA</option>
                    </select>
                    <p className="text-sm text-red-500 hidden mt-3" id="error">
                      Please fill out this field.
                    </p>
                  </div>
                </div> */}
                  {/* <div className="flex-auto w-full mb-1 text-xs space-y-2">
                  <label className="font-semibold text-gray-600 py-2">
                    Description
                  </label>
                  <textarea
                    required=""
                    name="message"
                    id=""
                    className="w-full min-h-[100px] max-h-[300px] h-28 appearance-none block  bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg  py-4 px-4"
                    placeholder="Enter your comapny info"
                    spellcheck="false"
                  ></textarea>
                  <p className="text-xs text-gray-400 text-left my-3">
                    You inserted 0 characters
                  </p>
                </div> */}
                  {/* <p className="text-xs text-red-500 text-right my-3">
                  Required fields are marked with an asterisk{" "}
                  <abbr title="Required field">*</abbr>
                </p> */}
                  <div className="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse">
                    {/* <button className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100">
                    {" "}
                    Cancel{" "}
                  </button> */}
                    <>
                      {!loading ? (
                        <button
                          type="submit"
                          className="mb-2 md:mb-0 font-semibold bg-green-400 px-5 py-2 text-sm shadow-sm tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-500"
                        >
                          Save
                        </button>
                      ) : (
                        <Spinner />
                      )}
                    </>
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

export default Onboarding;
