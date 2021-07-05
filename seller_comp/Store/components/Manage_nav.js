import React from "react";

function Manage_nav({ user }) {
  // alert(JSON.stringify(user));
  return (
    <div>
      <div className="mr-6">
        <h2 className="text-3xl md:text-3xl font-semibold tracking-tight leading-7 md:leading-10 mb-1 text-green-600 truncate">
          Hey {user?.name}
        </h2>
        <div className="font-xl font-semibold tracking-tight text-gray-600">
          You Can Manage your stores from here
        </div>
      </div>
    </div>
  );
}

export default Manage_nav;
