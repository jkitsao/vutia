import React from "react";
import Onboarding from "../../components/Onboarding";
import { useContext } from "react";
import { UserContext } from "../../lib/UserContext";
import Loading from "../../components/loading";
import { useUser } from "../../firebase/useUser";

function onboard() {
  // const [user] = useContext(UserContext);
  const { user } = useUser();

  return (
    <div className="">
      <div className="">
        <>
          <div className="sm:w-2/3 lg:w-2/5 mx-3 xl:w-1/3 sm:mx-auto">
            {user && <Onboarding user={user} />}
          </div>
        </>
      </div>
    </div>
  );
}

export default onboard;
