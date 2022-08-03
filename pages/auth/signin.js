import { getProviders, signIn as signInToProvider } from "next-auth/react";
import Header from "../../components/Header";

export default function SignIn({ providers }) {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center mt-32">
        <img
          src="https://thumbs.dreamstime.com/b/insta-new-155631943.jpg"
          className="w-48"
        ></img>
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button
              onClick={() =>
                signInToProvider(provider.id, { callbackUrl: "/" })
              }
              className="p-3 bg-blue-500 rounded-lg text-white "
            >
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
