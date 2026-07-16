"use client";

import { useMemo, useState } from "react";

function inr(n: number) {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)} L`;
  return `₹${new Intl.NumberFormat("en-IN").format(Math.round(n))}`;
}

export default function RoiCalculator() {
  const [fleet, setFleet] = useState(6);
  const [rate, setRate] = useState(3500); // per vehicle per day
  const [util, setUtil] = useState(72); // utilisation %

  const model = useMemo(() => {
    const investment = fleet * 385000; // capex per vehicle
    const grossDay = fleet * rate * (util / 100);
    const monthly = grossDay * 26; // operating days
    const opex = monthly * 0.42;
    const net = monthly - opex;
    const annualNet = net * 12;
    const paybackMonths = annualNet > 0 ? investment / (annualNet / 12) : 0;
    const roi = (annualNet / investment) * 100;
    return { investment, monthly, net, annualNet, paybackMonths, roi };
  }, [fleet, rate, util]);

  return (
    <div className="glass rounded-[26px] p-6 md:p-7">
      <div className="flex items-center justify-between mb-6">
        <p className="font-display text-xl">ROI projection</p>
        <span className="chip !text-amber !border-[var(--amber)]/40">Indicative</span>
      </div>

      <Slider label="Fleet size" value={fleet} min={2} max={50} step={1} onChange={setFleet} display={`${fleet} vehicles`} />
      <Slider label="Day rate / vehicle" value={rate} min={1500} max={8000} step={100} onChange={setRate} display={inr(rate)} />
      <Slider label="Utilisation" value={util} min={40} max={95} step={1} onChange={setUtil} display={`${util}%`} />

      <div className="mt-6 grid grid-cols-2 gap-3">
        <Result k="Investment" v={inr(model.investment)} />
        <Result k="Monthly revenue" v={inr(model.monthly)} accent />
        <Result k="Monthly net" v={inr(model.net)} />
        <Result k="Annual net" v={inr(model.annualNet)} accent />
        <Result k="Payback" v={`${model.paybackMonths.toFixed(1)} mo`} />
        <Result k="Year-1 ROI" v={`${model.roi.toFixed(0)}%`} accent />
      </div>
      <p className="mt-4 text-xs text-[var(--faint)]">
        Illustrative model with placeholder figures. Actual returns vary by city,
        contracts and operations.
      </p>
    </div>
  );
}

function Slider({
  label, value, min, max, step, onChange, display,
}: {
  label: string; value: number; min: number; max: number; step: number; onChange: (n: number) => void; display: string;
}) {
  return (
    <div className="mb-5">
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-[0.65rem] uppercase tracking-wider text-[var(--faint)]">{label}</span>
        <span className="text-sm text-amber font-medium">{display}</span>
      </div>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[var(--amber)] cursor-pointer"
      />
    </div>
  );
}

function Result({ k, v, accent }: { k: string; v: string; accent?: boolean }) {
  return (
    <div className="rounded-2xl border border-[var(--line)] bg-[var(--bg)] p-4">
      <p className="font-mono text-[0.58rem] uppercase tracking-wider text-[var(--faint)]">{k}</p>
      <p className={`font-display text-xl mt-1 ${accent ? "text-amber" : "text-[var(--ink)]"}`}>{v}</p>
    </div>
  );
}
