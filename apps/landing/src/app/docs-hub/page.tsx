import Link from 'next/link'

const highlights = [
  {
    title: 'API Reference',
    description: 'Endpoints, schemas, and integration guides to help your team ship faster.',
  },
  {
    title: 'Design System',
    description: 'Tokens, components, and UX patterns that keep ANBU experiences consistent.',
  },
  {
    title: 'Playbooks',
    description: 'Implementation blueprints for common digital transformation challenges.',
  },
]

export default function DocsHubLanding() {
  return (
    <main className="min-h-screen bg-black text-anbu-marble">
      <section className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-[0.15]" aria-hidden>
          <div
            className="h-full w-full"
            style={{
              background:
                'radial-gradient(circle at 20% 20%, rgba(255, 215, 0, 0.18), transparent 55%), radial-gradient(circle at 80% 20%, rgba(255, 215, 0, 0.08), transparent 60%)',
            }}
          />
        </div>

        <div className="relative mx-auto max-w-5xl text-center space-y-6">
          <p className="text-sm uppercase tracking-[0.35em] text-anbu-gold/80">Documentation hub</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold">
            Everything you need to build with ANBU
          </h1>
          <p className="mx-auto max-w-3xl text-base sm:text-lg text-anbu-marble/70">
            The hub is under active construction. In the meantime, explore a snapshot of what's coming and contact us if you need early access to our internal playbooks.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
            <Link
              href="mailto:contact@anbu.ai"
              className="inline-flex items-center justify-center rounded-md bg-anbu-gold px-6 py-3 text-sm font-semibold text-black transition hover:bg-anbu-gold-accent"
            >
              Request documentation access
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
        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2">
          {highlights.map((item) => (
            <div key={item.title} className="glass rounded-xl border border-anbu-gold/20 p-6">
              <h2 className="text-xl font-semibold text-anbu-gold">{item.title}</h2>
              <p className="mt-3 text-sm text-anbu-marble/70">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
