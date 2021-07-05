import React, { useState, useEffect } from "react";
import axios from "axios";
function useRedirectAuth(user) {
  useEffect(() => {
    axios
      .get("http://localhost:5000/onboard", user.id)
      .then((res) => {
        alert(res.data.success);
      })
      .catch((err) => alert(err));
  }, []);
}

export default useRedirectAuth;
