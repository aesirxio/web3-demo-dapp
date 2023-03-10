import { Button } from "react-bootstrap";
import Image from "next/image";
import { useAuthentication } from "@shared_auth/AuthenticationProvider";
import concordium from "@public/images/concordium.png";

import Link from "next/link";

export default function User() {
  const { accountAddress, provider, handleConnect } = useAuthentication();

  return provider ? (
    <>
      {accountAddress ? (
        <div className="d-flex flex-wrap align-items-center">
          <div className="me-2">
            <Link href={"/create"}>
              <Button className="btn w-100 btn-success">Create new Product</Button>
            </Link>
          </div>
          <div className="ms-2">
            Address: ...{accountAddress.substring(accountAddress.length - 6)}
          </div>
        </div>
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
