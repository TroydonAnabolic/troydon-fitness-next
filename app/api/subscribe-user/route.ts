import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const email = body.email;

  console.log(email);

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
      return NextResponse.json(
        {
          error: {
            code: "subscription-error",
            message: `There was an error subscribing to the newsletter.
            Hit me up troydonfitness@smartaitrainer.com and I'll add you the old fashioned way :(.`,
          },
        },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: "" }, { status: 200 });
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
