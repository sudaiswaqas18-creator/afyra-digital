type Billing = 'monthly' | 'yearly'
export default function BillingToggle({ value, onChange }: { value: Billing; onChange: (value: Billing) => void }) {
  return <div className="af-billing-toggle" data-yearly={value === 'yearly'} role="group" aria-label="Billing period">
    <button type="button" aria-pressed={value === 'monthly'} onClick={() => onChange('monthly')}>Monthly</button>
    <button className="af-billing-toggle__switch" type="button" role="switch" aria-label="Yearly billing" aria-checked={value === 'yearly'} onClick={() => onChange(value === 'monthly' ? 'yearly' : 'monthly')}><span /></button>
    <button type="button" aria-pressed={value === 'yearly'} onClick={() => onChange('yearly')}>Yearly</button>
  </div>
}
