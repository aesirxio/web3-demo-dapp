import CreateComponent from "@components/Create";
import { useAuthentication } from "@shared_auth/AuthenticationProvider";

export default function Create() {
  const { accountAddress } = useAuthentication();

  return (
    <div className="container sso-demo py-5">
      {accountAddress ? <CreateComponent /> : "Please connect the wallet"}
    </div>
  );
}
