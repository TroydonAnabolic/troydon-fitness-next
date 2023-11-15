import getStripe from "@/app/utils/getStripe";
import { UserSubscription } from "@/types";

interface SubscriptionCardProps {
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
  userSubscription: UserSubscription | null;
  onCancelSubscription: () => void; // Callback function to handle subscription cancellation
}

export function SubscriptionCard({
  selectedPlan,
  product,
  userSubscription,
  onCancelSubscription,
}: SubscriptionCardProps) {
  const isBasicAndActiveSubscription =
    userSubscription?.isActive && userSubscription?.isBasic;

  async function handleCancelSubscription(
    subscriptionId: string
  ): Promise<void> {
    try {
      const shouldCancel = window.confirm(
        "Are you sure you want to cancel your subscription?"
      );

      if (!shouldCancel) {
        // User clicked "Cancel" in the confirmation dialog
        return;
      }

      const res = await fetch(`/api/stripe/cancel-subscription`, {
        method: "POST",
        body: JSON.stringify({ activeSubscriptionId: subscriptionId }), // Assuming productId is needed for the session creation
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`Error cancelling subscription: ${res.status}`);
      }

      alert(`Subscription Cancelled`);
      // Invoke the callback to update userSubscription to null in the parent
      onCancelSubscription();

      console.log("Successfully cancelled subscription");
    } catch (error: any) {
      console.error(error.message);
    }
  }

  if (product.active) {
    return (
      <div
        className={`p-10 border-2 hover:cursor-pointer ${
          selectedPlan.plan === product.productId
            ? "-translate-y-2"
            : "hover:-translate-y-2"
        } transition-all w-full max-w-[21rem] min-h-[22rem] bg-black flex flex-col`}
        onClick={() => selectedPlan.setPlan(product.productId)}
      >
        <div className="flex-grow">
          {" "}
          {/* Add flex-grow class */}
          <div className="font-bold text-3xl mb-2 capitalize">
            {product.name}
          </div>
          <div className="flex items-baseline mb-2">
            <div className="text-3xl mr-2">${product.price}</div> Per{" "}
            {product.type}
          </div>
          <ul className="list-disc pl-4">
            {product.description.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Move the "Active" element to the bottom */}
        {isBasicAndActiveSubscription && (
          <div>
            <div className="mt-auto bg-green-500 p-2 text-white text-center mb-2 rounded">
              Active
            </div>
            <button
              className="btn btn-secondary text-white rounded w-full"
              onClick={() =>
                handleCancelSubscription(
                  userSubscription.activeSubscriptionId as string
                )
              }
            >
              Cancel
            </button>
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
