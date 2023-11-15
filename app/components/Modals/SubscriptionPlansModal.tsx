import getStripe from "@/app/utils/getStripe";
import getUserSubscriptionStatus from "@/app/utils/prisma";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { UserSubscription } from "@/types";
import { SubscriptionCard } from "../Subscription/SubscriptionCard";

const subscriptionPlans = [
  {
    subscriptions: [
      {
        name: "Basic Package",
        type: "month",
        price: "4.99",
        productId:
          process.env.NODE_ENV === "production"
            ? "price_1O8gTXBYYYaaMgOAAlgsSdiz"
            : "price_1OANZ0BYYYaaMgOAItOcV9X7",
        description: ["Unlimited access to blog"],
        active: true,
        isBasic: true,
      },
      //TODO: Other plans need to have automated scheduling with auto availability update on booking built in, incase too many clients book and pay in short term. Use manual booking via contact forms for now
      {
        name: "Pro Trainer Plan (Coming soon)",
        type: "month",
        price: "66.99",
        productId: "price_1O9LjFBYYYaaMgOAcaEDBXfQ",
        description: [
          "1 phone/video session for workout review per month",
          "Unlimited access to blog",
          "1 personal training session in any mode",
        ],
        active: false,
      },
      {
        name: "Elite Fitness Plan (Coming soon)",
        type: "month",
        price: "99.99",
        productId: "price_1O9LjuBYYYaaMgOAVm4i4Mvk",
        description: [
          "3 phone/video session for workout review per month",
          "Unlimited access to blog",
          "2 personal training session in any mode",
        ],
        active: false,
      },
    ],
  },
];

interface SubscriptionPlansModalProps {
  openModal: () => void;
  modalRef: React.RefObject<HTMLDialogElement>;
}

export async function generateMetadata({ params: { id } }: any) {
  const userSubscription: UserSubscription = await getUserSubscriptionStatus(
    id
  );
  return userSubscription ? userSubscription : notFound();
}

function SubscriptionPlansModal({
  openModal,
  modalRef,
}: SubscriptionPlansModalProps) {
  const [plan, setPlan] = useState<string>(
    process.env.NODE_ENV === "production"
      ? "price_1O8gTXBYYYaaMgOAAlgsSdiz"
      : "price_1OANZ0BYYYaaMgOAItOcV9X7"
  );
  const [userSubscription, setUserSubscription] =
    useState<UserSubscription | null>(null);

  const { data: session } = useSession();

  const onCancelSubscription = () => {
    // Callback function to handle subscription cancellation
    setUserSubscription(null);
  };

  useEffect(() => {
    async function fetchUserSubscription() {
      if (session) {
        const fetchedSubscription = await getUserSubscriptionStatus(
          session?.user?.id
        );
        setUserSubscription(fetchedSubscription);
      }
    }

    fetchUserSubscription();
  }, [session]);

  const closeModalHandler = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  // Find the subscription with isBasic set to true
  const activeSubscription = subscriptionPlans[0].subscriptions.find(
    (subscription) => subscription.isBasic
  );

  // const isSameAsActivePlan = false; // Uncomment for testing
  const isSameAsActivePlan =
    userSubscription?.isBasic && plan === activeSubscription?.productId;

  async function handleCreateCheckoutSession(plan: string): Promise<void> {
    try {
      if (isSameAsActivePlan) {
        // Plan is the same as the active plan, handle accordingly
        alert("Plan is the same as the active plan.");
        return;
      }

      const res = await fetch(`/api/stripe/checkout-session`, {
        method: "POST",
        body: JSON.stringify({ productId: plan }), // Assuming productId is needed for the session creation
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`Error fetching checkout session: ${res.status}`);
      }

      const checkoutSession = await res.json();
      const stripe = await getStripe();

      console.log("Attempting to re-direct to checkout");

      const { error } = await stripe!.redirectToCheckout({
        sessionId: checkoutSession.session.id,
      });

      if (error) {
        throw new Error(`Error redirecting to checkout: ${error.message}`);
      }

      console.log("Successfully redirected to checkout");
    } catch (error: any) {
      console.error(error.message);
    }
  }

  if (!session) {
    return null; // Render nothing if there is no active session
  }

  return (
    <div className="ml-4">
      <button className="btn btn-secondary" onClick={openModal}>
        Subscription
      </button>
      <dialog
        id="subscription_modal"
        className="modal modal-middle 5xl:modal-middle"
        ref={modalRef}
      >
        <div className="modal-box w-11/12 max-w-5xl">
          <h2 className="text-2xl font-bold mb-4">Subscription Plans</h2>
          <div className="modal-action">
            {subscriptionPlans[0].subscriptions.map((product, index) => (
              <SubscriptionCard
                selectedPlan={{ plan: plan, setPlan: setPlan }}
                product={product}
                userSubscription={userSubscription} // Pass userSubscription to the card component
                key={index}
                onCancelSubscription={onCancelSubscription} // Pass the callback function
              />
            ))}

            {/* Add buttons for other plans */}
          </div>
          <div className="mt-4">
            <button
              className={`btn btn-accent mr-2 ${
                isSameAsActivePlan ? "cursor-not-allowed" : ""
              }`}
              onClick={() => handleCreateCheckoutSession(plan)}
              disabled={isSameAsActivePlan}
            >
              Got To Checkout
            </button>
            <button className="btn btn-neutral" onClick={closeModalHandler}>
              Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default SubscriptionPlansModal;
