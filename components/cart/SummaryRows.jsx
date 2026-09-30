import { Info } from 'lucide-react';
import { formatINR } from '@/lib/format';
import { shipping } from '@/data/site';

/** Subtotal / discount / shipping / total rows shared by bag, checkout and confirmation. */
export default function SummaryRows({ totals, showCod = false, large = false }) {
  const { subtotal, count, discount, discountAmount, shippingFee, codFee, total, toFree } = totals;
  return (
    <dl className="space-y-3 text-[0.9rem]">
      <div className="flex justify-between">
        <dt>
          Subtotal <span className="text-muted">({count} item{count === 1 ? '' : 's'})</span>
        </dt>
        <dd>{formatINR(subtotal)}</dd>
      </div>
      {discountAmount > 0 && (
        <div className="flex justify-between text-sage">
          <dt>Discount ({discount.code})</dt>
          <dd>−{formatINR(discountAmount)}</dd>
        </div>
      )}
      <div className="flex justify-between">
        <dt className="flex items-center gap-1.5">
          Shipping
          <span title={`Free standard shipping on orders above ${formatINR(shipping.freeThreshold)}`} className="inline-flex text-muted">
            <Info size={13} strokeWidth={1.25} aria-hidden="true" />
          </span>
        </dt>
        <dd>{shippingFee ? formatINR(shippingFee) : 'Free'}</dd>
      </div>
      {toFree > 0 && subtotal > 0 && (
        <p className="-mt-2 text-[0.72rem] text-muted">Add {formatINR(toFree)} more for free standard shipping.</p>
      )}
      {showCod && (
        <div className="flex justify-between">
          <dt>Handling fee (COD)</dt>
          <dd>{codFee ? formatINR(codFee) : '—'}</dd>
        </div>
      )}
      <div className="flex items-end justify-between border-t border-line pt-5">
        <dt>
          <span className="block text-[1.15rem] font-medium">Total</span>
          <span className="text-[0.75rem] text-muted">Inclusive of all taxes</span>
        </dt>
        <dd className={large ? 'font-editorial text-[2rem] leading-none' : 'text-[1.2rem]'}>{formatINR(total)}</dd>
      </div>
    </dl>
  );
}
