import { shipping, site } from './site';

export const faqTopics = [
  { id: 'orders', label: 'Orders', icon: 'Package' },
  { id: 'shipping', label: 'Shipping', icon: 'Truck' },
  { id: 'returns', label: 'Returns', icon: 'Undo2' },
  { id: 'exchanges', label: 'Exchanges', icon: 'ArrowLeftRight' },
  { id: 'payments', label: 'Payments', icon: 'CreditCard' },
  { id: 'sizing', label: 'Sizing', icon: 'Ruler' },
];

export const faqs = {
  orders: [
    {
      q: 'How can I track my order?',
      a: 'Once your order is shipped, you’ll receive a confirmation email with a tracking link. You can also track your order by signing in to your account and visiting the Orders section, or by entering your order number on our Track Your Order page.',
    },
    {
      q: 'Can I modify or cancel my order?',
      a: 'Orders can be modified or cancelled within 2 hours of being placed. Please contact our Client Services team as soon as possible — once an order has been packed, we are unable to make changes.',
    },
    {
      q: 'What if an item is out of stock?',
      a: 'We produce in small runs, so some pieces sell out. Most bestsellers are restocked within 4–6 weeks; out-of-stock items are clearly marked on the product page.',
    },
    {
      q: 'How will I know if my order has been confirmed?',
      a: 'You’ll see an order confirmation page immediately after checkout, followed by a confirmation email with your order number and a summary of your purchase.',
    },
    {
      q: 'Do you offer gift wrapping?',
      a: 'Every order is packed in our signature recycled-paper box with tissue. For gifts, add a note at checkout and we will omit prices from the packing slip.',
    },
  ],
  shipping: [
    {
      q: 'What are your shipping options and delivery times?',
      a: `Standard delivery takes 3–5 business days across India. Express delivery (₹${shipping.expressFee}) arrives in 1–2 business days to most metro cities.`,
    },
    {
      q: 'Do you ship internationally?',
      a: 'We currently ship within India only. International shipping to select countries is coming soon — join our newsletter to be the first to know.',
    },
    {
      q: 'How much is shipping?',
      a: `Standard shipping is complimentary on orders above ₹${shipping.freeThreshold.toLocaleString('en-IN')}. Below that, a flat fee of ₹${shipping.standardFee} applies.`,
    },
    {
      q: 'Will I be charged customs duties or taxes?',
      a: 'All prices on our website are inclusive of GST. There are no additional duties for deliveries within India.',
    },
  ],
  returns: [
    {
      q: 'What is your return policy?',
      a: `You may return unworn, unwashed items with original tags attached within ${shipping.returnDays} days of delivery for a full refund to your original payment method.`,
    },
    {
      q: 'How do I start a return?',
      a: 'Sign in to your account, open the order and select “Request a return”. We will arrange a free pickup from your address within 48 hours.',
    },
    {
      q: 'When will I receive my refund?',
      a: 'Refunds are processed within 3 business days of your return reaching our studio. Banks may take a further 5–7 days to reflect the amount.',
    },
    {
      q: 'Are any items non-returnable?',
      a: 'For hygiene reasons, earrings and items marked “Final Sale” cannot be returned. Limited Edition evening pieces can be exchanged but not refunded.',
    },
  ],
  exchanges: [
    {
      q: 'Can I exchange an item for a different size?',
      a: `Yes — size exchanges are free within ${shipping.returnDays} days of delivery, subject to availability. Request an exchange from your account and we’ll collect the original item when we deliver the new one.`,
    },
    {
      q: 'Can I exchange for a different product?',
      a: 'Absolutely. Return the original item for a refund and place a new order, or contact Client Services and we will help you arrange it.',
    },
    {
      q: 'What if my exchange size is sold out?',
      a: 'We will let you know immediately and issue a full refund, or hold the piece for you until it is restocked.',
    },
  ],
  payments: [
    {
      q: 'Which payment methods do you accept?',
      a: 'We accept Visa, Mastercard and RuPay cards, UPI (Google Pay, PhonePe, Paytm), net banking and Cash on Delivery.',
    },
    {
      q: 'Is Cash on Delivery available?',
      a: `Yes, on orders up to ₹25,000. A handling fee of ₹${shipping.codFee} applies to COD orders.`,
    },
    {
      q: 'Is my payment information secure?',
      a: 'Payments are processed by PCI-DSS compliant partners over encrypted connections. We never store your full card details.',
    },
    {
      q: 'Do you offer EMI?',
      a: 'No-cost EMI is available on select credit cards for orders above ₹9,999.',
    },
  ],
  sizing: [
    {
      q: 'How do I find my size?',
      a: 'Every product page includes a Size Guide with garment measurements. Our tailoring is cut with a relaxed, oversized fit — if you prefer a closer fit, size down.',
    },
    {
      q: 'What if I’m between sizes?',
      a: 'For tailoring and outerwear, choose the larger size. For knitwear and fitted tops, choose the smaller.',
    },
    {
      q: 'Can I get personal styling advice?',
      a: `Of course. Write to ${site.email} or call ${site.phone} and a member of our styling team will help you choose.`,
    },
  ],
};

export const sizeChart = {
  headers: ['Size', 'UK', 'Bust (cm)', 'Waist (cm)', 'Hip (cm)'],
  rows: [
    ['XS', '6', '80–83', '62–65', '87–90'],
    ['S', '8', '84–87', '66–69', '91–94'],
    ['M', '10', '88–92', '70–74', '95–99'],
    ['L', '12', '93–97', '75–79', '100–104'],
    ['XL', '14', '98–103', '80–85', '105–110'],
  ],
  mens: {
    headers: ['Size', 'Chest (cm)', 'Waist (cm)', 'Neck (cm)'],
    rows: [
      ['S', '90–95', '76–81', '37'],
      ['M', '96–101', '82–87', '39'],
      ['L', '102–107', '88–93', '41'],
      ['XL', '108–113', '94–99', '43'],
      ['XXL', '114–119', '100–105', '45'],
    ],
  },
};
