import type { CSSProperties, ReactNode } from 'react'

const bars = [42, 58, 47, 72, 63, 88, 76, 96]
const months = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']

type ScatterStyle = CSSProperties & {
  '--af-scatter-x'?: string
  '--af-scatter-y'?: string
  '--af-scatter-r'?: string
  '--af-scatter-s'?: string
}

function scatter(x: number, y: number, rotation: number, scale = 1): ScatterStyle {
  return {
    '--af-scatter-x': `${x}px`,
    '--af-scatter-y': `${y}px`,
    '--af-scatter-r': `${rotation}deg`,
    '--af-scatter-s': String(scale)
  }
}

function TrendIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 17l5-5 4 3 7-8" />
      <path d="M15 7h5v5" />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4" y="6" width="16" height="14" rx="3" />
      <path d="M8 3v6M16 3v6M4 10h16" />
    </svg>
  )
}

function MessageIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 5h14v10H9l-4 4V5Z" />
      <path d="M9 9h6M9 12h4" />
    </svg>
  )
}

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 21s6-5.1 6-11a6 6 0 1 0-12 0c0 5.9 6 11 6 11Z" />
      <circle cx="12" cy="10" r="2" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12 2.2 2.2 4.8-5" />
    </svg>
  )
}

function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <div className="af-hpd__shell" data-af-hero-assemble-shell aria-hidden="true">
      <aside className="af-hpd__shell-side">
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

      <div className="af-hpd__shell-main">
        <div className="af-db__top af-hpd__shell-top">
          <div className="af-db__search">
            <span className="af-db__search-ico" />
            <span className="af-db__search-txt">Growth overview — September</span>
          </div>
          <div className="af-db__top-right">
            <span className="af-db__pill">Live</span>
            <span className="af-db__avatar" />
          </div>
        </div>

        <div className="af-hpd__dock-grid" data-af-hero-dock-grid>
          {children}
        </div>
      </div>
    </div>
  )
}

function PatientChart() {
  return (
    <article
      className="af-hpd__chart-panel af-hpd__part"
      data-af-hero-assemble-part="chart"
      style={scatter(-840, -430, -14, 0.95)}
    >
      <div className="af-db__chart-head">
        <p className="af-db__chart-title">Patient Inquiries</p>
        <div className="af-db__tabs">
          <span>Weekly</span>
          <span className="is-active">Monthly</span>
        </div>
      </div>
      <div className="af-db__bars">
        {bars.map((height, index) => (
          <div className="af-db__bar-col" key={months[index]}>
            <div className={`af-db__bar ${index === bars.length - 1 ? 'is-peak' : ''}`} style={{ height: `${height}%` }} />
            <span className="af-db__bar-label">{months[index]}</span>
          </div>
        ))}
      </div>
    </article>
  )
}

type StatProps = {
  className: string
  label: string
  value: string
  trend: string
  icon: 'trend' | 'calendar' | 'location'
  scatterStyle: ScatterStyle
}

function StatCard({ className, label, value, trend, icon, scatterStyle }: StatProps) {
  const CardIcon = icon === 'calendar' ? CalendarIcon : icon === 'location' ? LocationIcon : TrendIcon
  return (
    <article
      className={`af-db__kpi af-hpd__stat af-hpd__part ${className}`}
      data-af-hero-assemble-part={label.toLowerCase().replace(/\s+/g, '-')}
      style={scatterStyle}
    >
      <span className="af-hpd__ico af-hpd__ico--compact"><CardIcon /></span>
      <p className="af-db__kpi-label">{label}</p>
      <div className="af-db__kpi-row">
        <span className="af-db__kpi-value">{value}</span>
        <span className="af-db__kpi-trend">{trend}</span>
      </div>
      <svg className="af-db__spark" viewBox="0 0 120 34" preserveAspectRatio="none" aria-hidden="true">
        <path d="M2 28 L18 22 L34 25 L50 14 L66 18 L82 9 L98 12 L118 4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </article>
  )
}


function GeneratedResponseCard({ scatterStyle }: { scatterStyle: ScatterStyle }) {
  return (
    <article
      className="af-hpd__generated-stat af-hpd__part af-hpd__card--response-corner"
      data-af-hero-assemble-part="response-rate"
      style={scatterStyle}
      aria-hidden="true"
    >
      <img
        src="/static/generated/hero/response-rate-card-corner.png"
        alt=""
        draggable={false}
      />
    </article>
  )
}

function InfoCard({ className, name, icon, eyebrow, value, meta, scatterStyle }: {
  className: string
  name: string
  icon: ReactNode
  eyebrow: string
  value: string
  meta: string
  scatterStyle: ScatterStyle
}) {
  return (
    <article
      className={`af-hpd__card af-hpd__part ${className}`}
      data-af-hero-assemble-part={name}
      style={scatterStyle}
    >
      <span className="af-hpd__ico">{icon}</span>
      <div>
        <p className="af-hpd__eyebrow">{eyebrow}</p>
        <p className="af-hpd__value">{value}</p>
        <p className="af-hpd__meta">{meta}</p>
      </div>
    </article>
  )
}

function ActivityRow({ className, name, title, subtitle, tag, icon, scatterStyle }: {
  className: string
  name: string
  title: string
  subtitle: string
  tag: string
  icon: 'check' | 'trend'
  scatterStyle: ScatterStyle
}) {
  const RowIcon = icon === 'check' ? CheckIcon : TrendIcon
  return (
    <article
      className={`af-db__row af-hpd__activity af-hpd__part ${className}`}
      data-af-hero-assemble-part={name}
      style={scatterStyle}
    >
      <span className="af-hpd__ico af-hpd__ico--compact"><RowIcon /></span>
      <div className="af-db__row-text">
        <p className="af-db__row-title">{title}</p>
        <p className="af-db__row-sub">{subtitle}</p>
      </div>
      <span className="af-db__row-tag">{tag}</span>
    </article>
  )
}

export default function HeroParallaxDashboard() {
  return (
    <div
      className="af-hpd af-hpd--assemble af-hpd--reference-dock-v33"
      data-af-hero-assemble-root
      data-af-stagger-item
      data-af-source-assembly="true"
      data-af-hero-reference-dock-v33="true"
      role="img"
      aria-label="Afyra growth dashboard with healthcare growth cards, including response rate, assembling into one connected workspace"
    >
      <div className="af-hpd__scene af-hpd__canvas" data-af-hero-assemble-board data-af-hero-reference-canvas>
        <span className="af-hpd__glow af-hpd__glow--teal" data-af-hero-assemble-glow="teal" aria-hidden="true" />
        <span className="af-hpd__glow af-hpd__glow--warm" data-af-hero-assemble-glow="warm" aria-hidden="true" />

        {/*
          V33: the dashboard shell and every moving card are children of this ONE
          positioning box. Their CSS positions are the final docked positions
          inside the dashboard; GSAP only animates temporary scatter transforms.
        */}
        <div
          className="af-hpd__board af-hpd__dashboard af-hpd__unified-box"
          data-af-hero-unified-dashboard
          data-af-hero-unified-box
        >
          <DashboardShell>
            <StatCard
              className="af-hpd__stat--qualified"
              label="Qualified Inquiries"
              value="184"
              trend="+28%"
              icon="trend"
              scatterStyle={scatter(-620, -740, -18, 0.95)}
            />

            <StatCard
              className="af-hpd__stat--appointments"
              label="Appointments"
              value="96"
              trend="+19%"
              icon="calendar"
              scatterStyle={scatter(720, -390, 20, 0.95)}
            />

            <StatCard
              className="af-hpd__stat--views"
              label="Profile Views"
              value="2.4k"
              trend="+41%"
              icon="location"
              scatterStyle={scatter(635, -720, 16, 0.95)}
            />

            <InfoCard
              className="af-hpd__card--schedule"
              name="schedule"
              icon={<CalendarIcon />}
              eyebrow="Today's Schedule"
              value="4 consultation calls"
              meta="09:30 · Growth consultation"
              scatterStyle={scatter(530, -520, -10, 0.97)}
            />

            <PatientChart />

            <InfoCard
              className="af-hpd__card--inquiries"
              name="inquiries"
              icon={<MessageIcon />}
              eyebrow="New Inquiries"
              value="Appointment request"
              meta="WhatsApp inquiry · Consultation booked"
              scatterStyle={scatter(-650, -330, -12, 0.96)}
            />

            <InfoCard
              className="af-hpd__card--visibility"
              name="visibility"
              icon={<LocationIcon />}
              eyebrow="Local Visibility"
              value="2,400 profile views"
              meta="This month"
              scatterStyle={scatter(600, -250, 16, 0.96)}
            />

            <GeneratedResponseCard
              scatterStyle={scatter(680, -60, 10, 0.97)}
            />

            <ActivityRow
              className="af-hpd__activity--gbp"
              name="gbp"
              title="Google Business Profile optimized"
              subtitle="Local visibility"
              tag="Done"
              icon="check"
              scatterStyle={scatter(-40, -105, -7, 0.98)}
            />

            <ActivityRow
              className="af-hpd__activity--campaign"
              name="campaign"
              title="Campaign live — Aesthetic consultations"
              subtitle="Paid campaigns"
              tag="Live"
              icon="trend"
              scatterStyle={scatter(45, -70, 6, 0.98)}
            />
          </DashboardShell>
        </div>
      </div>
    </div>
  )
}
