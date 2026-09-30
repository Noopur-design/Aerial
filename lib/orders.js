// Demo order helpers — no real order management system is connected.

export function addBusinessDays(from, days) {
  const d = new Date(from);
  let added = 0;
  while (added < days) {
    d.setDate(d.getDate() + 1);
    const day = d.getDay();
    if (day !== 0) added++; // we deliver Monday – Saturday
  }
  return d;
}

export function makeOrderNumber() {
  return `AE${Math.floor(100000 + Math.random() * 899999)}`;
}

export const ORDER_STAGES = ['Confirmed', 'Packed', 'Shipped', 'Out for delivery', 'Delivered'];

// Status of a demo order is derived from how long ago it was placed.
export function orderStage(order, now = Date.now()) {
  if (order.status) return ORDER_STAGES.indexOf(order.status);
  const hours = (now - new Date(order.placedAt).getTime()) / 36e5;
  if (hours < 2) return 0;
  if (hours < 24) return 1;
  if (hours < 72) return 2;
  if (hours < 96) return 3;
  return 4;
}

// Seed orders shown for the demo account.
export const demoOrders = [
  {
    number: 'AE458721',
    placedAt: '2025-10-06T10:12:00+05:30',
    deliveredBy: '2025-10-10T18:00:00+05:30',
    status: 'Delivered',
    email: 'noopur@example.com',
    items: [{ slug: 'oversized-tailored-blazer', color: 'Dark Brown', size: 'M', qty: 1 }],
    total: 8990,
  },
  {
    number: 'AE452310',
    placedAt: '2025-09-28T15:40:00+05:30',
    deliveredBy: '2025-10-03T18:00:00+05:30',
    status: 'Shipped',
    email: 'noopur@example.com',
    items: [{ slug: 'satin-slip-dress', color: 'Burgundy', size: 'S', qty: 1 }],
    total: 7490,
  },
  {
    number: 'AE441209',
    placedAt: '2025-09-17T12:05:00+05:30',
    deliveredBy: '2025-09-21T18:00:00+05:30',
    status: 'Delivered',
    email: 'noopur@example.com',
    items: [{ slug: 'tailored-wide-leg-trousers', color: 'Taupe', size: 'M', qty: 1 }],
    total: 6990,
  },
];
