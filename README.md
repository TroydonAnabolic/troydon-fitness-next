# Welcome to TroydonFitness

## Email Newsletter

Component located
app\components\Newsletter\NewsLetterSignUpForm.tsx
The function renders the newsletter form in the footer of the page
![Email newsletter form](/readme/email-newsletter.png)

```JavaScript
export  default  function  NewsLetterSignUpForm() {
const  inputRef  =  useRef<HTMLInputElement  |  null>(null);
const  subscribeUser  =  async (e:  React.FormEvent) => {

e.preventDefault();
const  email  =  inputRef.current?.value;

if (!email) {
alert("Please enter a valid email address.");
return;
}

try {
const  res  =  await  fetch("/api/subscribe-user", {
method:  "POST",
headers: {
"Content-Type":  "application/json",
},
body:  JSON.stringify({
email:  email,
}),
});

const  emailSubscription  =  await  res.json();
if (!res.ok) {
throw  new  Error(emailSubscription.error.code);
}

...

```

The following api route is called from the above function, which adds the user to a list of customers on Mailchimp:
app\api\subscribe-user\route.ts

```JavaScript
export  async  function  POST(req:  NextRequest) {
const  body  =  await  req.json();
const  email  =  body.email;

try {
const  data  = {
email_address:  email,
status:  "subscribed",
};

const  response  =  await  fetch(
`https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`,
{
body:  JSON.stringify(data),
headers: {
Authorization:  `apikey ${API_KEY}`,
"Content-Type":  "application/json",
},

method:  "POST",
}
);
...

```

The user can only be added once, if they try to resubscribe they will recive a notification they are already subscribed.

## Authentication

Authentication uses NextAuth.js for authentication, currently only email signup is available. User must click the Sign In button, it will direct them to NextAuth'built in sign in page. When they fill in the email they are
if they do not have an account, it will create a new account and create a customer in the Stripe records (this is used to perform payments via the Stripe API).
This is setup in the app\utils\authOptions.ts file, there is event handler in the authoptions where the create user via nextauth, triggers a function to create a stripe user via it's API, it then updates the prisma database with the created stripe customer id.

```JavaScript
events: {

createUser:  async ({ user }:  any) => {
const  stripe  =  new  Stripe(
process.env.NODE_ENV  ===  "production"
?  process.env.STRIPE_SECRET_KEY!
:  process.env.STRIPE_SECRET_KEY_LOCAL!,
{
apiVersion:  "2023-10-16",
}
);

await  stripe.customers
.create({
email:  user.email!,
name:  user.name!,
})

.then(async (customer) => {
return  prisma.user.update({
where: { id:  user.id },
data: {
stripeCustomerId:  customer.id,
},
});
});
```

## Prisma Database

To add new tables to the schema we must edit the file

Then run the following commands in a powershell terminal

```Powershell
# Update prisma db with schema
npx prisma db push

# Create migration file
npx prisma migrate dev

# Update Prisma client with updated schema
npx prisma generate

```

## Website Host

The website is hosted on vercel

## Subscription Plans

Users can choose Basic Package only at the moment, this will allow the user to gain unlimited access to the blog page. This is setup in app\components\Modals\SubscriptionPlansModal.tsx where we define a handler handleCreateCheckoutSession, this makes an internal api call to the api route `/api/stripe/checkout-session`

## Contact Form

Contact form is done via route app\api\sendgrid\route.ts and component app\contact\page.tsx
