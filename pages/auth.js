import FirebaseAuth from "../components/auth/FirebaseAuth";

const Auth = () => {
  return (
    <div className="flex h-screen items-center">
      <div className="w-3/4 lg:w-1/4 mx-auto   shadow-lg bg-gray-100 py-32 ">
        <FirebaseAuth />
      </div>
    </div>
  );
};

export default Auth;
