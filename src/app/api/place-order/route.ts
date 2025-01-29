import { NextResponse } from 'next/server';
import twilio from 'twilio';

export async function POST(request: Request) {
  const { name, contact, address, cart } = await request.json();

  // Validate input
  if (!name || !contact || !address || !Array.isArray(cart) || cart.length === 0) {
    return NextResponse.json({ error: 'Invalid order details' }, { status: 400 });
  }

  // Twilio credentials
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER || '+17755469469';
  const recipientPhoneNumber = '+923303347041'; // Replace with your phone number

  if (!accountSid || !authToken) {
    return NextResponse.json({ error: 'Twilio credentials are missing' }, { status: 500 });
  }

  // Initialize Twilio client
  const client = twilio(accountSid, authToken);

  // Create order message
  let message = `New Order:\nName: ${name}\nContact: ${contact}\nAddress: ${address}\n\nOrder Items:\n`;
  cart.forEach((item: { name: string; quantity: number; price: number }) => {
    message += `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}\n`;
  });
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  message += `\nTotal: $${total.toFixed(2)}`;

  try {
    // Send SMS
    await client.messages.create({
      body: message,
      from: twilioPhoneNumber,
      to: recipientPhoneNumber,
    });

    return NextResponse.json({ message: 'Order placed successfully!' });
  } catch (error: unknown) {
    const e = error as Error;
    console.error('Error sending SMS:', e.message);
    return NextResponse.json({ error: 'Failed to send order message', details: e.message }, { status: 500 });
  }
}