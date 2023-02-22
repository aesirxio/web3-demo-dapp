import Toast from "@shared_components/Toast";
import { toast } from "react-toastify";
const getMember = async (accessToken) => {
  try {
    const urlToken = `${process.env.NEXT_PUBLIC_AESIRX_API_ENDPOINT}/index.php?webserviceClient=site&webserviceVersion=1.0.0&option=persona&api=hal&task=getTokenByUser&access_token=${accessToken}`;

    const rsToken = await fetch(urlToken, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await rsToken.json();

    if (data?.result?.member_id) {
      const url = `${process.env.NEXT_PUBLIC_AESIRX_API_ENDPOINT}/index.php?webserviceClient=site&webserviceVersion=1.0.0&option=member&api=hal&id=${data?.result?.member_id}&access_token=${accessToken}`;

      const rs = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      return await rs.json();
    }
  } catch (error) {
    console.log("getMember", error);
  }

  return {};
};

const updateMember = async (bodyData, accessToken) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_AESIRX_API_ENDPOINT}/index.php?webserviceClient=site&webserviceVersion=1.0.0&option=member&api=hal&access_token=${accessToken}`;

    const rs = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    });

    console.log("updateMember", bodyData, url);

    return await rs.json();
  } catch (error) {
    console.log("updateMember", error);
  }

  return {};
};

const createMember = async (bodyData) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_AESIRX_API_ENDPOINT}/index.php?webserviceClient=site&webserviceVersion=1.0.0&option=member&api=hal`;

    const rs = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    });

    console.log("createMember", bodyData);

    return await rs.json();
  } catch (error) {
    console.log("createMember", error);
  }

  return {};
};

const getMemberByEmail = async (email, accessToken) => {
  const url = `${process.env.NEXT_PUBLIC_AESIRX_API_ENDPOINT}/index.php?webserviceClient=site&webserviceVersion=1.0.0&option=member&api=hal&id=0&email=${email}&access_token=${accessToken}`;

  console.log("getMemberByEmail", url);

  const rs = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await rs.json();
};

const getServerToken = async () => {
  try {
    const url = `${process.env.NEXT_PUBLIC_AESIRX_API_ENDPOINT}/index.php?option=token&api=oauth2`;

    const data = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: process.env.AESIRX_CLIENT_ID,
        client_secret: process.env.AESIRX_CLIENT_SECRET,
        grant_type: "client_credentials",
      }),
    });

    const { access_token } = await data.json();

    console.log("getServerToken", access_token);

    return access_token;
  } catch (error) {
    console.log("getServerToken", error);
  }

  return "";
};

const processBuy = async (planId, email, member_id, accessToken, subcription_id) => {
  try {
    if (planId) {
      window.Paddle.Checkout.open({
        product: planId,
        email: email,
        passthrough: {
          subcription_id: subcription_id,
          accessToken: accessToken,
        },
      });
    } else {
      toast.success(
        <Toast
          status={true}
          message="Congratulations. Your subscription is active, please check your mail to confirm it."
        />
      );
    }
  } catch (error) {
    console.log("processBuy error", processBuy);
  }
};
const upgradeFromFree = async (planId, email, member_id, license_code) => {
  try {
    window.Paddle.Checkout.open({
      product: planId,
      email: email,
      passthrough: {
        member_id: member_id,
        license_key: license_code,
      },
    });
  } catch (error) {
    console.log("upgrade error", error);
    toast.error(
      <Toast status={false} message="Something is wrong. Please try again or contact us" />
    );
  }
};

const changePlan = async (subcription_id, planId) => {
  try {
    const result = await fetch(process.env.NEXT_PUBLIC_PARTNERS_URL + "/api/paddle/changeplan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
      body: JSON.stringify({ planId, subcription_id }),
    });
    const data = await result.json();
    if (data?.success) {
      toast.success(<Toast status={true} message="Change Plan successfully !" />);
    } else {
      toast.error(
        <Toast status={false} message="Something is wrong. Please try again or contact us" />
      );
    }
    return data;
  } catch (error) {
    console.log("changePlan error", changePlan);
  }
};

const cancelPlan = async (subcription_id) => {
  try {
    const result = await fetch(process.env.NEXT_PUBLIC_PARTNERS_URL + "/api/paddle/cancel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
      body: JSON.stringify({ subcription_id }),
    });
    const data = await result.json();
    if (data?.success) {
      toast.success(<Toast status={true} message="Cancel Plan successfully !" />);
    } else {
      toast.error(
        <Toast status={false} message="Something is wrong. Please try again or contact us" />
      );
    }
    return data;
  } catch (error) {
    console.log("cancelPlan error", cancelPlan);
  }
};

export {
  getMember,
  createMember,
  updateMember,
  getMemberByEmail,
  getServerToken,
  processBuy,
  upgradeFromFree,
  changePlan,
  cancelPlan,
};
