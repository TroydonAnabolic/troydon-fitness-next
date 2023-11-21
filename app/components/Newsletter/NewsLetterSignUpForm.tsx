"use client";
import { useRef } from "react";

export default function NewsLetterSignUpForm() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const subscribeUser = async (e: React.FormEvent) => {
    e.preventDefault();

    const email = inputRef.current?.value;

    if (!email) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      const res = await fetch("/api/subscribe-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      const emailSubscription = await res.json();

      if (!res.ok) {
        throw new Error(emailSubscription.error.code);
      }

      if (emailSubscription.error || !emailSubscription) {
        alert("Error subscribing to newsletter");
        throw new Error(
          `Error subscribing to newsletter: ${emailSubscription.error.message}`
        );
      } else if (!emailSubscription.error) {
        alert("Successfully subscribed to newsletter!");
      }
    } catch (error: any) {
      if (error.message == "Member Exists") {
        alert("Already subscribed to newsletter!");
      } else {
        alert("Error subscribing to newsletter");
      }
    }
  };

  return (
    <form onSubmit={subscribeUser}>
      <header className="footer-title">Newsletter</header>
      <fieldset className="form-control w-80">
        <label htmlFor="email-input" className="label form__label">
          <span className="label-text">Enter your email address</span>
        </label>
        <div className="relative">
          <input
            type="email"
            id="email-input"
            name="email"
            placeholder="your best email"
            ref={inputRef}
            required
            autoCapitalize="off"
            autoCorrect="off"
            className="input input-bordered w-full pr-16"
          />

          <button
            type="submit"
            value=""
            name="subscribe"
            className="btn btn-primary absolute top-0 right-0 rounded-l-none"
          >
            Subscribe
          </button>
        </div>
      </fieldset>
    </form>
  );
}
