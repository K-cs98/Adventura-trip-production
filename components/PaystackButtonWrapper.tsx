'use client';
import { useState } from 'react';
import { usePaystackPayment } from 'react-paystack';
import type { Tour, CurrencyCode } from '@/types';

export default function PaystackButtonWrapper({
  tour,
  name,
  email,
  currency,
  convertedPrice,
  onClose,
}: {
  tour: Tour;
  name: string;
  email: string;
  currency: CurrencyCode;
  convertedPrice: number;
  onClose: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const SYMBOLS: Record<string, string> = {
    USD: '$',
    NGN: '₦',
    GHS: 'GH₵',
    XOF: 'CFA',
  };

  const symbol = SYMBOLS[currency] || '₦';

  // Fallback to NGN if currency is USD so Paystack accepts it
  const paystackCurrency = currency === 'USD' ? 'NGN' : currency;
  const finalAmount = currency === 'USD' ? convertedPrice * 1500 : convertedPrice;

  const paystackConfig = {
    reference: `tour_${tour.id}_${Date.now()}`,
    email: email,
    amount: finalAmount * 100, // Paystack expects amount in minor units (Kobo/Cents)
    currency: paystackCurrency,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '',
  };

  const initializePayment = usePaystackPayment(paystackConfig);

  const handleSuccess = async (reference: any) => {
    setLoading(true);
    try {
      await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tourId: tour.id,
          tourTitle: tour.title,
          customerName: name,
          customerEmail: email,
          amountPaid: finalAmount,
          currency: paystackCurrency,
          paymentReference: reference.reference,
        }),
      });
    } catch {
      // Non-blocking catch
    } finally {
      setLoading(false);
      onClose();
    }
  };

  function handlePayClick() {
    setError(null);

    if (!name.trim() || !email.trim()) {
      setError('Please provide your name and email.');
      return;
    }

    if (!process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY) {
      setError('Paystack public key is missing.');
      return;
    }

    setLoading(true);

    try {
      initializePayment({
        onSuccess: (ref) => handleSuccess(ref),
        onClose: () => setLoading(false),
      });
    } catch {
      setError('Could not initialize payment window.');
      setLoading(false);
    }
  }

  return (
    <div className="space-y-2">
      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
      <button
        type="button"
        disabled={loading}
        onClick={handlePayClick}
        className="w-full bg-[#09a5db] hover:bg-[#0892c2] disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors shadow-sm"
      >
        {loading ? 'Processing…' : `Pay ${symbol}${finalAmount.toLocaleString()} with Paystack`}
      </button>
    </div>
  );
}