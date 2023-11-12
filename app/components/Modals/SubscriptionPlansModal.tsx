import getStripe from "@/app/utils/getStripe";
import getUserSubscriptionStatus from "@/app/utils/prisma";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { getServerSession } from "next-auth";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

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

// This gets called on every request
// export const getServerSideProps = (async (context) => {
//   // Fetch data from external API
//   const session = await getServerSession();
//   const userSubscription = await getUserSubscriptionStatus(session?.user);

//   const userData: UserData = { userSubscription, session };

//   // Pass data to the page via props
//   return { props: { userData } };
// }) satisfies GetServerSideProps<{
//   userData: UserData;
// }>;

export async function getServerSideProps() {
  const session = await getServerSession();
  const userSubscription = await getUserSubscriptionStatus(session?.user);
  const userData: UserData = { userSubscription, session };

  return userData;
}

type UserData = {
  userSubscription: {
    isActive: boolean;
    isBasic: boolean;
  } | null;
  session: any;
};

function SubscriptionPlansModal({
  openModal,
  modalRef,
}: SubscriptionPlansModalProps) {
  const [plan, setPlan] = useState<string>(
    process.env.NODE_ENV === "production"
      ? "price_1O8gTXBYYYaaMgOAAlgsSdiz"
      : "price_1OANZ0BYYYaaMgOAItOcV9X7"
  );
  const [userSubscription, setUserSubscription] = useState<any>(null);

  const { data: session } = useSession();

  useEffect(() => {
    async function fetchUserSubscription() {
      const userData: UserData = await getServerSideProps();
      setUserSubscription(userData.userSubscription);
    }

    fetchUserSubscription();
  }, [session]);

  const closeModalHandler = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  async function handleCreateCheckoutSession(plan: string): Promise<void> {
    try {
      console.log("Selected plan: " + plan);

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
        Subscribe
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
              />
            ))}

            {/* Add buttons for other plans */}
          </div>
          <div className="mt-4">
            <button
              className="btn btn-accent mr-2"
              onClick={() => handleCreateCheckoutSession(plan)}
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

export function SubscriptionCard({
  selectedPlan,
  product,
  userSubscription,
}: {
  selectedPlan: {
    plan: string;
    setPlan: React.Dispatch<React.SetStateAction<string>>;
  };
  product: {
    name: string;
    type: string;
    price: string;
    productId: string;
    description: string[];
    active: boolean;
  };
  userSubscription: any;
}) {
  const isBasicAndActiveSubscription =
    userSubscription?.isActive && userSubscription?.isBasic;

  if (product.active) {
    return (
      <div
        className={`p-10 border-2 hover:cursor-pointer ${
          selectedPlan.plan === product.productId
            ? "-translate-y-2"
            : "hover:-translate-y-2"
        } transition-all w-full max-w-[21rem] min-h-[22rem] bg-black`}
        onClick={() => selectedPlan.setPlan(product.productId)}
      >
        <div className="font-bold text-3xl mb-2 capitalize">{product.name}</div>
        <div className="flex items-baseline mb-2">
          <div className="text-3xl mr-2">${product.price}</div> Per{" "}
          {product.type}
        </div>
        <ul className="list-disc pl-4 ">
          {product.description.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        {isBasicAndActiveSubscription && (
          <div className="bg-green-500 p-2 text-white mb-2 rounded">
            Active Subscription
          </div>
        )}
      </div>
    );
  }
  return (
    <div
      className={`p-10 border-2 border-neutral-400 text-neutral-400 w-full max-w-[21rem] min-h-[22rem] bg-black`}
    >
      <div className="font-bold text-3xl mb-2 capitalize">{product.name}</div>
      <div className="flex items-baseline mb-2">
        <div className="text-3xl mr-2">${product.price}</div> Per {product.type}
      </div>
      <ul className="list-disc pl-4 ">
        {product.description.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
