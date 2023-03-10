import dynamic from "next/dynamic";
import { useAuthentication } from "@shared_auth/AuthenticationProvider";

const CreateComponent = dynamic(() => import("@components/Create"), {
  ssr: false,
});

export default function Create() {
  const { accountAddress } = useAuthentication();

  return (
    <div className="container sso-demo py-5">
      {accountAddress ? <CreateComponent /> : "Please connect the wallet"}
    </div>
  );
}
