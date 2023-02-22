import { useState } from "react";
import { processBuy, changePlan, cancelPlan } from "@utils/Member";
import { toast } from "react-toastify";
import Toast from "@shared_components/Toast";
import { useAuthentication } from "@shared_auth/AuthenticationProvider";

const usePurchare = () => {
  const [show, setShow] = useState(false);
  const [planId, setPlanid] = useState(0);
  const [loading, setLoading] = useState(false);
  const { userData, updateUserData } = useAuthentication();

  const handleBuy = async (planId) => {
    setPlanid(planId);
    setLoading(true);
    if (!userData) {
      setShow(true);
    } else {
      const subscription = userData?.listSubscription;
      const buyOrChange = true;

      if (subscription) {
        const authorization = subscription?.[0]?.authorization;
        const currentPackage = subscription?.[0]?.package;

        if (authorization && currentPackage !== "community") {
          buyOrChange = false;
          let {
            order: { subscription_id }, // subscription_id from paddle
          } = JSON.parse(userData?.listSubscription?.[0]?.authorization);
          const isConfirm = confirm("Do you want to change your subscription?");
          if (isConfirm) {
            const res = await changePlan(subscription_id, planId);
            if (res?.success) {
              setTimeout(async () => {
                await updateUserData(userData?.access_token);
              }, 2000);
            }
          }
        }
      }

      if (buyOrChange) {
        const currentLicense = subscription?.[0]?.id;

        await processBuy(
          planId,
          userData?.member?.email,
          userData?.member?.member_id,
          userData?.access_token,
          currentLicense // subscription_id from AesirX
        );
      }
    }

    setLoading(false);
  };

  const handleCancel = async () => {
    setPlanid(planId);
    setLoading(true);
    try {
      let {
        order: { subscription_id },
      } = JSON.parse(userData?.listSubscription?.[0]?.authorization);

      const isConfirm = confirm("Do you want to cancel your subscription?");
      if (isConfirm) {
        const res = await cancelPlan(subscription_id);
        if (res?.success) {
          setTimeout(async () => {
            await updateUserData(userData?.access_token);
          }, 2000);
        }
      }
    } catch (error) {
      console.log("error handleCancel", handleCancel);
      toast.error(
        <Toast status={false} message="Something is wrong. Please try again or contact us" />
      );
    }

    setLoading(false);
  };
  return { handleBuy, planId, show, setShow, loading, handleCancel };
};
export default usePurchare;
