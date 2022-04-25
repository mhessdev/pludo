import { getProviders, signIn, getCsrfToken } from "next-auth/react";
import Logo from "../components/Logo";

export default function SignIn({ providers, csrfToken }) {
  return (
    <>
      <div
        id="defaultModal"
        tabIndex="-1"
        aria-hidden="true"
        className={`overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 
     w-screen h-screen flex z-10`}
      >
        <div className="relative p-4 w-full max-w-2xl h-full md:h-auto m-auto">
          <div className="relative p-4 w-full max-w-2xl h-full md:h-auto m-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 z-30 p-10 w-full">
              <Logo />
              <form
                method="post"
                action="/api/auth/signin/email"
                className="w-full grid grid-cols-1 space-y-6"
              >
                <input
                  name="csrfToken"
                  type="hidden"
                  defaultValue={csrfToken}
                />

                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Email address
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="bg-gray-50 border border-gray-300 
                      text-gray-900 text-sm rounded-lg 
                      focus:ring-blue-500 focus:border-blue-500
                      block w-full p-2.5 dark:bg-gray-700 
                      dark:border-gray-600 dark:placeholder-gray-400 
                      dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </label>
              </form>
              {Object.values(providers).map((provider) => (
                <div key={provider.name}>
                  <button
                    onClick={() => signIn(provider.id)}
                    className="text-white bg-blue-700 hover:bg-blue-800 
                      focus:ring-4 focus:outline-none focus:ring-blue-300 
                      font-medium rounded-lg text-sm w-full 
                      px-5 py-2.5 text-center dark:bg-blue-600 
                      dark:hover:bg-blue-700 dark:focus:ring-blue-800 
                     "
                  >
                    Sign in with {provider.name}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);
  return {
    props: { providers, csrfToken },
  };
}
