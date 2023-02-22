import { Button } from "react-bootstrap";
import Image from "next/image";
import user_img from "@styles/images/user_img.png";
import useTrans from "@hook/useTrans";
import en from "@shared_lang/en";
import vi from "@shared_lang/vi";
import { useAuthentication } from "@shared_auth/AuthenticationProvider";
import concordium from "@public/images/concordium.png";
import { detectConcordiumProvider } from "@concordium/browser-wallet-api-helpers";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Toast from "./Toast";

export default function User({ buttonText }) {
  const trans = useTrans(en, vi);
  const { userData, clearUserData, redirectProfile } = useAuthentication();
  const [provider, setProvider] = useState();
  const [accountAddress, setAccountAddress] = useState();

  const handleConnect = async () => {
    const accountAddress = await provider.connect();

    if (accountAddress) {
      setAccountAddress(accountAddress);
    }
  };

  useEffect(() => {
    (async () => {
      const provider = await detectConcordiumProvider();

      if (provider) {
        setProvider(provider);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const provider = await detectConcordiumProvider();
      setProvider(provider);
    })();
  }, [provider]);

  if (userData) {
    return (
      <>
        <div className="header-account position-relative  ps-2 px-lg-3 font-robotoslab">
          <div className="position-relative" style={{ top: "3px" }}>
            <Image
              quality={100}
              className="cursor-pointer"
              src={user_img}
              width={33}
              height={33}
              alt="user icon"
            />
          </div>
          <div className="header-account-hidden text-center p-4 position-absolute top-100 bg-white end-0 mt-3 border border-1 rounded-4 z-4">
            <p className="fs-6 ws-nowrap">
              {" "}
              {trans.profile.txt_welcome} {userData?.member?.full_name}
            </p>
            <ul className="m-0 p-0 list-unstyled ">
              <li>
                <Button
                  variant="outline-info"
                  onClick={() => redirectProfile(userData?.access_token)}
                  className="btn w-100 mt-3 mt-lg-0 text-uppercase rounded-4 font-opensans fw-bold px-4 py-2 fs-10"
                >
                  {trans.profile.txt_profile}
                </Button>
              </li>
              <li>
                <Button
                  onClick={clearUserData}
                  className="btn w-100 btn-danger mt-2 text-uppercase rounded-4 font-opensans fw-bold text-white px-4 py-2 fs-10"
                >
                  {trans.profile.txt_signout}
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  }
  return provider ? (
    <>
      {accountAddress ? (
        <> Address: ...{accountAddress.substring(accountAddress.length - 6)}</>
      ) : (
        <button className="btn btn-blue" onClick={handleConnect}>
          <Image quality={100} src={concordium} width={30} height={30} alt="concordium"></Image>
          Connect to Concordium
        </button>
      )}
    </>
  ) : (
    "Please install Concordium extension"
  );
}
