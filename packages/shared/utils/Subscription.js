const updateSubscription = async (bodyData, accessToken) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_AESIRX_API_ENDPOINT}/index.php?webserviceClient=site&webserviceVersion=1.0.0&option=subscription&api=hal&access_token=${accessToken}`;

    const rs = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(bodyData),
    });

    console.log("updateSubscription", bodyData, url);

    return await rs.json();
  } catch (error) {
    console.log("updateSubscription", error);
  }

  return {};
};

const getSubscriptionList = async (email, accessToken) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_AESIRX_API_ENDPOINT}/index.php?webserviceClient=site&webserviceVersion=1.0.0&option=subscription&api=hal&access_token=${accessToken}&filter[username]=${email}&filter[product]=${process.env.NEXT_PUBLIC_AESIRX_PRODUCT}`;

    const rs = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await rs.json();
  } catch (error) {
    console.log("getSubscriptionList", error);
  }

  return {};
};

export { updateSubscription, getSubscriptionList };
