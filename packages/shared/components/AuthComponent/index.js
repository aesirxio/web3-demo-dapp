import { AuthenticationProvider } from "@shared_auth/AuthenticationProvider";
import { useEffect, useState } from "react";
import { getSubscriptionList } from "@utils/Subscription";
import { useRouter } from "next/router";
import { getMember } from "@utils/Member";

function AuthComponent({ children }) {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const getUser = async (access_token) => {
      if (router.asPath !== "/profile" && router?.query?.access_token) {
        await updateUserData(access_token);
      }
    };
    getUser(router?.query?.access_token);
  }, [router]);

  const updateUserData = async (access_token) => {
    const member = await getMember(access_token);
    const listSubscription = await getSubscriptionList(member?.email, access_token);
    setUserData({
      access_token,
      member,
      listSubscription: listSubscription?._embedded?.item,
    });
  };

  const clearUserData = () => {
    setUserData(null);
  };

  const redirectProfile = (access_token) => {
    router.push({ pathname: "/profile", query: { access_token: access_token } }, "/profile");
  };
  return (
    <AuthenticationProvider
      content={{ userData: userData, updateUserData, clearUserData, redirectProfile }}
    >
      {children}
    </AuthenticationProvider>
  );
}

export default AuthComponent;
