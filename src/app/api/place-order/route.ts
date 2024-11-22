import { NextResponse } from 'next/server';
import twilio from 'twilio';

export async function POST(request: Request) {
  const { name, contact, address, cart } = await request.json();

  // Set up Twilio client
  const client = twilio('AC63c7a55eba2df9586a8160c1654291aa', '450df602a33a6961b272f06ff3ab70c1'); // Replace with your Twilio credentials

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
      from: '+12138954184', // Replace with your Twilio number
      to: '+923312287497', // Replace with your phone number
    });

    return NextResponse.json({ message: 'Order placed successfully!' });
  } catch (error) {
    console.error('Error sending SMS:', error);
    return NextResponse.json({ error: 'Failed to send order message' }, { status: 500 });
  }
}
