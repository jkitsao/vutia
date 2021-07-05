/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import Store_products from "./Store_products";
import Store_header from "./Store_header";
const navigation = ["Dashboard"];
const profile = ["Your Profile", "Settings", "Sign out"];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Store_page({ store }) {
  return (
    <div>
      <header className="bg-white shadow sticky top-0">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {/* <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1> */}
          <Store_header store={store} />
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Replace with your content */}
          <div className="px-4 py-6 sm:px-0">
            {/* <div className="border-4 border-dashed border-gray-200 rounded-lg h-96" /> */}
            <Store_products store={store} />
          </div>
          {/* /End replace */}
        </div>
      </main>
    </div>
  );
}
