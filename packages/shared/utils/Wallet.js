import Toast from "@shared_components/Toast";
import { toast } from "react-toastify";

const connectWallet = async (publicAddress, wallet, access_token, username) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_AESIRX_API_ENDPOINT}/index.php?webserviceClient=site&webserviceVersion=1.0.0&option=member&task=setWallet&api=hal&access_token=${access_token}`;

    const result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        publicAddress,
        wallet,
        username,
      }),
    });
    const data = await result.json();
    if (data?.result) {
      toast.success(
        <Toast
          status={true}
          message={`${data?._messages?.[0]?.message ?? `Connect ${wallet} successfully !`}`}
        />
      );
    } else {
      toast.error(
        <Toast
          status={false}
          message={`${data?._messages?.[0]?.message ?? `Connect ${wallet} successfully !`}`}
        />
      );
    }
    return data;
  } catch (error) {
    console.log("connectWallet", error);
    toast.error(
      <Toast status={false} message="Something wrong please try again or contact us !" />
    );
  }
};
export { connectWallet };
