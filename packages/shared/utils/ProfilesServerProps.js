import { getSubscriptionList } from "@utils/Subscription";
import { getMember } from "@utils/Member";
import { getSubscription, getPlans, getPayments } from "@utils/Paddle";

export async function profilesServerProps(access_token) {
  if (!access_token) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }
  const data = await getMember(access_token);
  const getdataSubscription = await getSubscriptionList(data?.username, access_token);

  let subscription = null;
  let payments = null;
  let plans = await getPlans();
  let myplan = {
    id: 99999,
    name: "Community",
  };

  if (data?.payment_data) {
    const { order } = JSON.parse(data?.payment_data);
    if (order?.subscription_id) {
      subscription = await getSubscription(order?.subscription_id);
      payments = await getPayments(order?.subscription_id);

      if (subscription) {
        myplan = plans.find((plan) => plan.id === subscription?.plan_id);
      }
    }
  }

  return {
    props: {
      ...data,
      ...{ subscription: subscription },
      ...{ plans: plans },
      ...{ myplan: myplan },
      ...{ payments: payments },
      ...{ getdataSubscription: getdataSubscription },
    },
  };
}
