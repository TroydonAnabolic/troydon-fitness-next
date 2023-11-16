import { useRef } from "react";

export default function NewsLetterSignUpForm() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const subscribeUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/subscribeuser", {
      body: JSON.stringify({
        email: inputRef.current?.value,
      }),

      headers: {
        "Content-Type": "application/json",
      },

      method: "POST",
    });
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
