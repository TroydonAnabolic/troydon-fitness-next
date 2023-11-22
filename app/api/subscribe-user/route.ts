import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const email = body.email;

  console.log(`Email to subscribe is ${email}`);

  if (!email) {
    return NextResponse.json(
      {
        error: {
          code: "subscription-error",
          message: "Email is required",
        },
      },
      { status: 400 }
    );
  }

  try {
    const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
    const API_KEY = process.env.MAILCHIMP_API_KEY;
    const DATACENTER = process.env.MAILCHIMP_API_SERVER;
    const data = {
      email_address: email,
      status: "subscribed",
    };

    const response = await fetch(
      `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`,
      {
        body: JSON.stringify(data),
        headers: {
          Authorization: `apikey ${API_KEY}`,
          "Content-Type": "application/json",
        },
        method: "POST",
      }
    );

    if (response.status >= 400) {
      const errorMessage = await response.json(); // Extract the error message from the Mailchimp response
      console.log(
        `There was an error subscribing to the newsletter: ${errorMessage.detail}`
      );
      return NextResponse.json(
        {
          error: {
            code: errorMessage.title || "subscription-error",
            message: errorMessage.detail || "Unknown error",
          },
        },
        { status: errorMessage.status }
      );
    }

    return NextResponse.json({ error: "", status: 200 });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.log(`❌ Error message: ${errorMessage}`);

    return NextResponse.json(
      {
        error: {
          message: `Webhook Error: ${errorMessage}`,
        },
      },
      { status: 500 }
    );
  }
}
