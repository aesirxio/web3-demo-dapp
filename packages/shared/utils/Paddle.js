const getCheckout = async (checkout_id) => {
  try {
    let url = `https://checkout.paddle.com/api/1.0/order?checkout_id=${checkout_id}`;

    if (process.env.NEXT_PUBLIC_PADDLE_SANDBOX) {
      url = `https://sandbox-checkout.paddle.com/api/1.0/order?checkout_id=${checkout_id}`;
    }
    const rs = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await rs.json();

    return data;
  } catch (error) {
    console.log("getCheckout", error);
  }

  return null;
};

const getSubscription = async (subscription_id) => {
  try {
    let url = `https://vendors.paddle.com/api/2.0/subscription/users`;

    if (process.env.NEXT_PUBLIC_PADDLE_SANDBOX) {
      url = `https://sandbox-vendors.paddle.com/api/2.0/subscription/users`;
    }

    const bodyData = {
      vendor_id: parseInt(process.env.NEXT_PUBLIC_PADDLE_VENDOR),
      vendor_auth_code: process.env.PADDLE_AUTH_CODE,
      subscription_id: parseInt(subscription_id),
    };

    const rs = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    });

    const { response: subscription } = await rs.json();

    return subscription[0] ? subscription[0] : null;
  } catch (error) {
    console.log("getSubscription", error);
  }

  return null;
};

const getPlans = async (planId) => {
  try {
    let url = `https://vendors.paddle.com/api/2.0/subscription/plans`;

    if (process.env.NEXT_PUBLIC_PADDLE_SANDBOX) {
      url = `https://sandbox-vendors.paddle.com/api/2.0/subscription/plans`;
    }

    const bodyData = {
      vendor_id: parseInt(process.env.NEXT_PUBLIC_PADDLE_VENDOR),
      vendor_auth_code: process.env.PADDLE_AUTH_CODE,
      plan: planId,
    };

    const rs = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    });

    const { response: plans } = await rs.json();

    plans.sort((a, b) => a.recurring_price.USD > b.recurring_price.USD);

    return plans;
  } catch (error) {
    console.log("getPlans", error);
  }

  return [];
};

const getPayments = async (subscription_id) => {
  try {
    let url = `https://vendors.paddle.com/api/2.0/subscription/payments`;

    if (process.env.NEXT_PUBLIC_PADDLE_SANDBOX) {
      url = `https://sandbox-vendors.paddle.com/api/2.0/subscription/payments`;
    }

    const bodyData = {
      vendor_id: parseInt(process.env.NEXT_PUBLIC_PADDLE_VENDOR),
      vendor_auth_code: process.env.PADDLE_AUTH_CODE,
      subscription_id: subscription_id,
    };

    const rs = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    });

    const { response: payments } = await rs.json();

    return payments;
  } catch (error) {
    console.log("getPayments", error);
  }

  return [];
};

export { getCheckout, getSubscription, getPlans, getPayments };
