import Link from 'next/link'

const upcomingSolutions = [
  {
    title: 'Digital Experience Platform',
    description: "A modular platform that pairs enterprise-grade content management with ANBU's luxury-grade UI system.",
    status: 'In design'
  },
  {
    title: 'Analytics Command Center',
    description: 'Unified dashboards, executive insights, and anomaly detection tailored to premium service organizations.',
    status: 'Prototype'
  },
  {
    title: 'Client Concierge Tools',
    description: 'Workflow automations, client portals, and communication suites crafted for high-touch teams.',
    status: 'Research'
  },
]

export default function SolutionsPortalLanding() {
  return (
    <main className="min-h-screen bg-black text-anbu-marble">
      <section className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-[0.12]" aria-hidden>
          <div
            className="h-full w-full"
            style={{
              background:
                'linear-gradient(135deg, rgba(255, 215, 0, 0.08), transparent 60%), radial-gradient(circle at 80% 20%, rgba(255, 215, 0, 0.12), transparent 55%)',
            }}
          />
        </div>

        <div className="relative mx-auto max-w-4xl text-center space-y-6">
          <p className="text-sm uppercase tracking-[0.35em] text-anbu-gold/80">Solutions portal</p>
          <h1 className="text-4xl sm:text-5xl font-display font-bold">A curated suite of ANBU offerings</h1>
          <p className="mx-auto max-w-2xl text-base sm:text-lg text-anbu-marble/70">
            We're building a premium experience for partners to discover, configure, and deploy ANBU solutions. Explore the roadmap and reach out if you'd like to pilot upcoming releases.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
            <Link
              href="mailto:contact@anbu.ai"
              className="inline-flex items-center justify-center rounded-md bg-anbu-gold px-6 py-3 text-sm font-semibold text-black transition hover:bg-anbu-gold-accent"
            >
              Join the pilot program
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-md border border-anbu-gold/40 px-6 py-3 text-sm font-semibold text-anbu-gold transition hover:border-anbu-gold hover:text-anbu-gold"
            >
              Return to main site
            </Link>
          </div>
        </div>
      </section>

      <section className="relative px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-6">
          {upcomingSolutions.map((solution) => (
            <div key={solution.title} className="glass rounded-xl border border-anbu-gold/20 p-6">
              <div className="flex flex-col gap-3 text-left sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-anbu-gold">{solution.title}</h2>
                  <p className="mt-3 max-w-2xl text-sm text-anbu-marble/70">{solution.description}</p>
                </div>
                <span className="inline-flex h-8 items-center justify-center rounded-full border border-anbu-gold/40 px-4 text-xs font-semibold uppercase tracking-[0.2em] text-anbu-gold/70">
                  {solution.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
