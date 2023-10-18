import sendgrid from "@sendgrid/mail";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

sendgrid.setApiKey(String(process.env.SENDGRID_API_KEY));

// const now = new Date(
//   new Date().toLocaleString("en-NZ", {
//     timeZone: "Pacific/Auckland",
//   })
// );

// const dateSchema = z
//   .date()
//   .min(new Date(now.getTime() + 24 * 60 * 60 * 1000))
//   .max(new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000));

const sendEmailSchema = z.object({
  fullName: z.string().min(1).max(255),
  email: z.string().min(1).max(255),
  number: z.string().min(8).max(13),
  subject: z.string().min(1).max(255),
  message: z.string().min(1),
  // selectedDays: z.string().refine(
  //   (data) => {
  //     try {
  //       const dates = JSON.parse(data);
  //       return (
  //         Array.isArray(dates) &&
  //         dates.every((date) => dateSchema.safeParse(date).success)
  //       );
  //     } catch (error) {
  //       return false;
  //     }
  //   },
  //   {
  //     message: "Invalid date format in selectedDays",
  //   }
  // ),
});

const formatSelectedDays = (selectedDays: string): string => {
  const dates: Date[] = JSON.parse(selectedDays);

  const formattedDates = dates.map((date) => {
    const formattedDate = new Date(date).toLocaleString("en-NZ", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    console.log("The formatted date is: " + formattedDate);

    return `<tr><td>${formattedDate}</td></tr>`;
  });

  return `<table>${formattedDates.join("")}</table>`;
};

export async function POST(req: NextRequest) {
  const body = await req.json();

  // Convert date strings to Date objects
  // body.selectedDays = body.selectedDays.map((dateString: string) => {
  //   const date = new Date(dateString);
  //   date.toLocaleString("en-NZ", {
  //     timeZone: "Pacific/Auckland",
  //     year: "numeric",
  //     month: "2-digit",
  //     day: "2-digit",
  //     hour: "2-digit",
  //     minute: "2-digit",
  //   });
  //   return date;
  // });

  const validation = sendEmailSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  try {
    await sendgrid.send({
      to: "troyi@outlook.co.nz", // Your email where you'll receive emails
      from: "admin@troydonfitness.smartaitrainer.com", // your website email address here
      subject: `[Personal Training Enquiry] : ${body.subject}`,
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html lang="en">
      <head>
        <meta charset="utf-8">
      
        <title>The HTML5 Herald</title>
        <meta name="description" content="The HTML5 Herald">
        <meta name="author" content="SitePoint">
      <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
      
        <link rel="stylesheet" href="css/styles.css?v=1.0">
      
      </head>
      
      <body>
        <div class="img-container" style="display: flex;justify-content: center;align-items: center;border-radius: 5px;overflow: hidden; font-family: 'helvetica', 'ui-sans';">              
              </div>
              <div class="container" style="margin-left: 20px;margin-right: 20px;">
              <h3>You've got a new PT Enquiry from ${
                body.fullName
              }, their email is: ✉️${body.email} </h3>
              <p> Contact Number: ${body.number}</p>
              <div style="font-size: 16px;">
              <p>Message:</p>
              <p>${body.message}</p>
              <br>
              <p>Preferred Days Available:</p>
              ${formatSelectedDays(body.selectedDays)}
              <br>
              </div>
              <img src="https://www.troydonfitness.smartaitrainer.com/_next/image?url=%2Ftroydonfitnesslogo.png&w=96&q=75" class="logo-image" style="height: 50px;width: 50px;border-radius: 5px;overflow: hidden;">
              <p class="footer" style="font-size: 16px;padding-bottom: 20px;border-bottom: 1px solid #D1D5DB;">Regards<br>Troydon Fitness Admin<br>Personal Trainers<br>+64 224319560</p>
              <div class="footer-links" style="display: flex;justify-content: center;align-items: center;">
                <a href="https://troydonfitness.smartaitrainer.com/" style="text-decoration: none;margin: 8px;color: #9CA3AF;">Website</a>
                <a href="https://troydonfitness.smartaitrainer.com/blog" style="text-decoration: none;margin: 8px;color: #9CA3AF;">Blog</a>
                <a href="https://github.com/TroydonAnabolic" style="text-decoration: none;margin: 8px;color: #9CA3AF;">GitHub</a>
                <a href="https://www.instagram.com/troyincarnate/" style="text-decoration: none;margin: 8px;color: #9CA3AF;">Instagram</a>
                <a href="https://www.linkedin.com/in/troydon-luicien-6127a762/" style="text-decoration: none;margin: 8px;color: #9CA3AF;">LinkedIn</a>
                <a href="https://twitter.com/TroydSaiyan" style="text-decoration: none;margin: 8px;color: #9CA3AF;">Twitter</a>
                
              </div>
              </div>
      </body>
      </html>`,
    });
  } catch (error: any) {
    // console.log(error);
    // return res.status(error.statusCode || 500).json({ error: error.message });
    return NextResponse.json(error, { status: error.statusCode || 500 });
  }
  return NextResponse.json({ error: "" }, { status: 200 });

  // return res.status(200).json({ error: "" });
}
