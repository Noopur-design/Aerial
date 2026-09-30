'use client';

import Modal from '@/components/ui/Modal';
import { sizeChart } from '@/data/faqs';

export default function SizeGuideModal({ open, onClose, gender = 'women' }) {
  const chart = gender === 'men' ? sizeChart.mens : sizeChart;
  return (
    <Modal open={open} onClose={onClose} title="Size guide" className="max-w-2xl">
      <div className="p-6 sm:p-10">
        <p className="eyebrow text-stone">Fit &amp; sizing</p>
        <h2 className="display-sm mt-2">Size Guide</h2>
        <p className="mt-3 text-[0.88rem] text-muted">
          Body measurements in centimetres. Our tailoring has a relaxed, oversized cut — if you are between sizes or prefer a closer fit, size down.
        </p>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[420px] border-collapse text-left text-[0.82rem]">
            <caption className="sr-only">{gender === 'men' ? "Men's" : "Women's"} size chart</caption>
            <thead>
              <tr className="border-b border-charcoal">
                {chart.headers.map((h) => (
                  <th key={h} scope="col" className="py-3 pr-4 font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {chart.rows.map((row) => (
                <tr key={row[0]} className="border-b border-line">
                  {row.map((cell, i) =>
                    i === 0 ? (
                      <th key={i} scope="row" className="py-3 pr-4 font-medium">
                        {cell}
                      </th>
                    ) : (
                      <td key={i} className="py-3 pr-4 text-muted">
                        {cell}
                      </td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8 grid gap-6 border-t border-line pt-6 text-[0.84rem] sm:grid-cols-3">
          <div>
            <p className="font-medium">Bust / Chest</p>
            <p className="mt-1 text-muted">Measure around the fullest part, keeping the tape level.</p>
          </div>
          <div>
            <p className="font-medium">Waist</p>
            <p className="mt-1 text-muted">Measure around the narrowest part of your natural waist.</p>
          </div>
          <div>
            <p className="font-medium">Hip</p>
            <p className="mt-1 text-muted">Stand with feet together and measure the fullest part.</p>
          </div>
        </div>
      </div>
    </Modal>
  );
}
