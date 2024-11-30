import { NextResponse } from 'next/server';
import twilio from 'twilio';

export async function POST(request: Request) {
  const { name, contact, address, cart } = await request.json();

  // Set up Twilio client
  const accountSid = process.env.TWILIO_ACCOUNT_SID; 
  const authToken = process.env.TWILIO_AUTH_TOKEN; 

  if (!accountSid || !authToken) {
    return NextResponse.json({ error: 'Twilio credentials are missing' }, { status: 500 });
  }

  const client = twilio(accountSid, authToken);

  // Create the message body with order details
  let message = `New Order:\nName: ${name}\nContact: ${contact}\nAddress: ${address}\n\nOrder Items:\n`;

  // Add each item in the cart to the message
  cart.forEach((item: { name: string; quantity: number; price: number }) => {
    message += `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}\n`;
  });

  // Add total cost to the message
  const total = cart.reduce((sum: number, item: { price: number; quantity: number }) => sum + item.price * item.quantity, 0);
  message += `\nTotal: $${total.toFixed(2)}`;

  try {
    // Send the message to your phone via Twilio
    await client.messages.create({
      body: message,
      from: 'process.env.TWILIO_PHONE_NUMBER', // Replace with your Twilio number
      to: 'process.env.RECIPIENT_PHONE_NUMBER', // Replace with your phone number
    });

    return NextResponse.json({ message: 'Order placed successfully!' });
  } catch (error: unknown) {
    // Cast error to 'Error' type to access 'message' and handle it
    const e = error as Error;
    console.error('Error sending SMS:', e.message);
    return NextResponse.json({ error: 'Failed to send order message', details: e.message }, { status: 500 });
  }
}
