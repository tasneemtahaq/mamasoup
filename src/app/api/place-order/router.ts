/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from 'next';
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromWhatsAppNumber = 'whatsapp:+14155238886'; // Twilio sandbox number

if (!accountSid || !authToken) {
  throw new Error('Twilio credentials are not set in environment variables.');
}

const client = twilio(accountSid, authToken);

type OrderRequestBody = {
  name: string;
  contact: string;
  address: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, contact, address } = req.body as OrderRequestBody;

  if (!name || !contact || !address) {
    return res.status(400).json({ error: 'All fields are required: name, contact, and address.' });
  }

  try {
    const message = await client.messages.create({
      from: fromWhatsAppNumber,
      to: `whatsapp:${contact}`,
      body: `Hello ${name}, your order has been placed! We will deliver it to: ${address}. Thank you for choosing us!`,
    });

    res.status(200).json({ success: true, messageSid: message.sid });
  } catch (error: any) {
    console.error('Twilio Error:', error.message);
    res.status(500).json({ error: 'Failed to send WhatsApp notification. Please try again later.' });
  }
}
