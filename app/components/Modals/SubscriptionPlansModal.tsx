import getStripe from "@/app/utils/getStripe";
import React from "react";

const subscriptionPlans = [
  {
    subscriptions: [
      {
        name: "Basic Package",
        type: "month",
        price: "39.99",
        productId: "price_1O8gTXBYYYaaMgOAAlgsSdiz",
        description: [
          "1 phone/video session for workout review per month",
          "Unlimited access to blog",
        ],
        active: true,
      },
      {
        name: "Pro Trainer Plan",
        type: "month",
        price: "66.99",
        productId: "price_1O9LjFBYYYaaMgOAcaEDBXfQ",
        description: [
          "1 phone/video session for workout review per month",
          "Unlimited access to blog",
          "1 personal training session in any mode",
        ],
        active: true,
      },
      {
        name: "Elite Fitness Plan",
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
  selectedPlan: {
    plan: string;
    setPlan: React.Dispatch<React.SetStateAction<string>>;
  };
}

function SubscriptionPlansModal({
  openModal,
  modalRef,
  selectedPlan,
}: SubscriptionPlansModalProps) {
  const closeModalHandler = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  async function handleCreateCheckoutSession(plan: string): Promise<void> {
    const res = await fetch(`/api/stripe/checkout-session`, {
      method: "POST",
      body: JSON.stringify({ productId: plan }), // Assuming productId is needed for the session creation
      headers: {
        "Content-Type": "application/json",
      },
    });
    const checkoutSession = await res.json().then((value) => {
      return value.session;
    });
    const stripe = await getStripe();
    const { error } = await stripe!.redirectToCheckout({
      sessionId: checkoutSession.id,
    });
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    console.warn(error.message);
  }

  return (
    <div>
      <button className="btn btn-secondary" onClick={openModal}>
        Subscribe
      </button>
      <dialog
        id="subscription_modal"
        className="modal modal-bottom sm:modal-middle"
        ref={modalRef}
      >
        <div className="modal-box">
          <h2 className="text-2xl font-bold mb-4">Subscription Plans</h2>
          <div className="modal-action">
            {/* {subscriptionPlans.map((plan) => (
          <button
            key={plan.subscriptions.}
            className="btn btn-primary mb-4"
            onClick={() => handleCreateCheckoutSession(plan.productId)}
          >
            {plan.name} - ${plan.price}
          </button>
        ))} */}
            {subscriptionPlans[0].subscriptions.map((product, index) => (
              <SubscriptionCard
                selectedPlan={selectedPlan}
                product={product}
                key={index}
              />
            ))}

            {/* Add buttons for other plans */}
          </div>
          <button className="btn" onClick={closeModalHandler}>
            Close
          </button>
        </div>
      </dialog>
    </div>
  );
}

export default SubscriptionPlansModal;

export function SubscriptionCard({
  selectedPlan,
  product,
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
}) {
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
        <div className="font-bold text-3xl mb-2 capitalize">
          {product.name} Plan
        </div>
        <div className="flex items-baseline mb-2">
          <div className="text-3xl mr-2">${product.price}</div> Per{" "}
          {product.type}
        </div>
        <ul className="list-disc pl-4 ">
          {product.description.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    );
  }
  return (
    <div
      className={`p-10 border-2 border-neutral-400 text-neutral-400 w-full max-w-[21rem] min-h-[22rem] bg-black`}
    >
      <div className="font-bold text-3xl mb-2 capitalize">
        {product.name} Plan
      </div>
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
