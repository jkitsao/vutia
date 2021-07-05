// import { useContext } from 'react';
// import { UserContext } from '../lib/UserContext';
import Loading from "../components/loading";
import { useUser } from "../firebase/useUser";
const Home = () => {
  // const [user] = useContext(UserContext);
  const { user, logout } = useUser();

  if (user) {
    return (
      <div>
        <p>{user.name}</p>
        <p>{user.email}</p>
        {JSON.stringify(user, null, 2)}

        <div>
          <button onClick={() => logout()}>logout</button>
        </div>
      </div>
    );
  } else {
    return <div>unauthenticated</div>;
  }

  // return <>{user?.loading ? <Loading /> : user?.issuer && <div>You're logged in!</div>}</>;
};

export default Home;
