import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      customer_email, 
      destination, 
      headcount, 
      timeframe_days, 
      target_budget, 
      estimated_cost, 
      currency = 'USD',
      transport_mode, 
      accommodation_tier 
    } = body;

    if (!customer_email) {
      return NextResponse.json({ error: 'Customer email is required' }, { status: 400 });
    }

    const SYMBOLS: Record<string, string> = {
      USD: '$',
      NGN: '₦',
      GHS: 'GH₵',
      XOF: 'CFA',
    };

    const currencySymbol = SYMBOLS[currency] || '$';
    const formattedBudget = typeof target_budget === 'number' ? target_budget.toLocaleString() : target_budget;
    const formattedEstimate = typeof estimated_cost === 'number' ? estimated_cost.toLocaleString() : estimated_cost;

    // Send email to the admin/team
    const adminEmailRes = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: ['agbamaknorkoroh@gmail.com'],
      subject: `New Custom Quote Request: ${destination} (${headcount} travelers)`,
      html: `
        <h2>New Trip Custom Quote Request</h2>
        <p><strong>Customer Email:</strong> ${customer_email}</p>
        <p><strong>Destination:</strong> ${destination}</p>
        <p><strong>Travelers:</strong> ${headcount}</p>
        <p><strong>Duration:</strong> ${timeframe_days} days</p>
        <p><strong>Transport Mode:</strong> ${transport_mode}</p>
        <p><strong>Accommodation Tier:</strong> ${accommodation_tier}</p>
        <p><strong>Target Budget:</strong> ${currencySymbol}${formattedBudget}</p>
        <p><strong>Estimated Cost:</strong> ${currencySymbol}${formattedEstimate}</p>
      `,
    });

    // Send confirmation email to the client
    const clientEmailRes = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: [customer_email],
      subject: `We've received your custom quote request for ${destination}!`,
      html: `
        <h2>Thank you for planning with Adventura Trips!</h2>
        <p>We have received your request for a ${timeframe_days}-day trip to ${destination} for ${headcount} traveler(s).</p>
        <p>Our travel curators are reviewing your preferences and target budget (${currencySymbol}${formattedBudget}). We will contact you shortly with a finalized itinerary and quote by email.</p>
        <br/>
        <p>Warm regards,</p>
        <p><strong>The Adventura Trips Team</strong></p>
      `,
    });

    return NextResponse.json({ success: true, adminEmailRes, clientEmailRes });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to send email' }, { status: 500 });
  }
}