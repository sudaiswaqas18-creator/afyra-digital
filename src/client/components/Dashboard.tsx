/**
 * Pure CSS/SVG "growth dashboard" mockup used as the hero visual.
 * Replaces the reference theme's static screenshot images so the
 * layout stays crisp at every resolution and stays on-brand.
 */

const bars = [42, 58, 47, 72, 63, 88, 76, 96]
const months = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']

export default function Dashboard() {
  return (
    <div className="af-db" role="img" aria-label="Afyra growth dashboard preview">
      {/* sidebar */}
      <aside className="af-db__side">
        <div className="af-db__side-logo">
          <img src="/static/img/logo-mark.png" alt="" />
        </div>
        <ul className="af-db__side-nav">
          <li className="is-active" />
          <li />
          <li />
          <li />
          <li />
        </ul>
      </aside>

      <div className="af-db__main">
        {/* top bar */}
        <div className="af-db__top">
          <div className="af-db__search">
            <span className="af-db__search-ico" />
            <span className="af-db__search-txt">Growth overview — September</span>
          </div>
          <div className="af-db__top-right">
            <span className="af-db__pill">Live</span>
            <span className="af-db__avatar" />
          </div>
        </div>

        {/* KPI cards */}
        <div className="af-db__kpis">
          {[
            { label: 'Qualified Inquiries', value: '184', trend: '+28%' },
            { label: 'Appointments', value: '96', trend: '+19%' },
            { label: 'Profile Views', value: '2.4k', trend: '+41%' }
          ].map((k) => (
            <div className="af-db__kpi" key={k.label}>
              <p className="af-db__kpi-label">{k.label}</p>
              <div className="af-db__kpi-row">
                <span className="af-db__kpi-value">{k.value}</span>
                <span className="af-db__kpi-trend">{k.trend}</span>
              </div>
              <svg className="af-db__spark" viewBox="0 0 120 34" preserveAspectRatio="none">
                <path
                  d="M2 28 L18 22 L34 25 L50 14 L66 18 L82 9 L98 12 L118 4"
                  fill="none"
                  stroke="url(#afSpark)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="afSpark" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#FF960D" />
                    <stop offset="100%" stopColor="#00BBA0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          ))}
        </div>

        {/* chart panel */}
        <div className="af-db__chart">
          <div className="af-db__chart-head">
            <p className="af-db__chart-title">Patient Inquiries</p>
            <div className="af-db__tabs">
              <span>Weekly</span>
              <span className="is-active">Monthly</span>
            </div>
          </div>
          <div className="af-db__bars">
            {bars.map((h, i) => (
              <div className="af-db__bar-col" key={i}>
                <div
                  className={`af-db__bar ${i === bars.length - 1 ? 'is-peak' : ''}`}
                  style={{ height: `${h}%` }}
                />
                <span className="af-db__bar-label">{months[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* activity list */}
        <div className="af-db__list">
          {[
            { t: 'Google Business Profile optimized', s: 'Local visibility' },
            { t: 'Campaign live — Aesthetic consultations', s: 'Paid campaigns' }
          ].map((r) => (
            <div className="af-db__row" key={r.t}>
              <span className="af-db__row-ico" />
              <div className="af-db__row-text">
                <p className="af-db__row-title">{r.t}</p>
                <p className="af-db__row-sub">{r.s}</p>
              </div>
              <span className="af-db__row-tag">Done</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
