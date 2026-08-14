import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, price, amount, reason } = body;

    const emailTo = process.env.ALERT_EMAIL || 'tomiwaoluwaseun16@gmail.com';

    const data = await resend.emails.send({
      from: 'Vectra AI <onboarding@resend.dev>',
      to: [emailTo],
      subject: `🚨 [Vectra AI Alert] Trade Executed: ${action} BTC`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #0f172a; color: #ffffff; border-radius: 10px;">
          <h2 style="color: ${action === 'BUY' ? '#10b981' : '#f43f5e'};">⚡ Trade Alert: ${action} BTC</h2>
          <p><strong>Price:</strong> ${price}</p>
          <p><strong>Position Size:</strong> ${amount}</p>
          <p><strong>Strategy Rationale:</strong> ${reason}</p>
          <hr style="border: 1px solid #1e293b;" />
          <p style="font-size: 12px; color: #94a3b8;">Sent automatically by Vectra AI Multi-Agent Execution Engine.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error: any) {
    console.error('Email API Error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to send email' },
      { status: 500 }
    );
  }
}