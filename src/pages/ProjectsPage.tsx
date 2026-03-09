import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import FadeIn from '../components/FadeIn'

const projects = [
  {
    name: 'District88',
    status: 'In Development',
    category: 'Commerce & Culture',
    description:
      'District88 is a sneaker and streetwear marketplace and community hub where people can buy, sell, and learn about culture, fashion, and reselling in one ecosystem. Its goal is to empower creators and sellers with tools like instant payouts, analytics, and education so they can build real businesses around what they love. The dream is to grow into a culture-driven platform that shapes trends, supports entrepreneurship, and becomes a go-to destination for the next generation of streetwear and sneaker culture.',
  },
  {
    name: 'WCG Dashboard',
    status: 'In Development',
    category: 'Platform',
    description:
      'Wilson Collective Group Dashboard (WCGDASH) is a centralized hub for creators, entrepreneurs, artists, musicians, fashion designers, and innovators to manage and grow their projects, businesses, and collaborations all in one place. Its goal is to provide powerful tools — analytics, financial insights, creative resources, and community features — that make building, scaling, and sharing easier for everyone, not just traditional business owners. The dream is to become the ultimate ecosystem where all types of creators can thrive, collaborate, and turn their ideas into culture-defining work.',
  },
  {
    name: 'Canjustalllove',
    status: 'In Development',
    category: 'Lifestyle & Fashion',
    description:
      'Canjustalllove is a lifestyle and fashion brand centered on self-expression, inclusivity, and positivity, offering apparel and experiences that celebrate love in all forms. Its goal is to connect communities through meaningful designs and storytelling that resonate with personal and cultural identity. The dream is to grow into a recognized movement that inspires love, acceptance, and creativity across generations.',
  },
  {
    name: 'Divergent Studios',
    status: 'In Development',
    category: 'Clothing & Culture',
    description:
      'Divergent Studios is a clothing brand that blends futuristic, space-inspired designs with wearable art. Its goal is to push fashion boundaries by creating limited-edition apparel and accessories that stand out while connecting with fans of culture, music, and creativity. The dream is to become a leading trendsetter in fashion, where every drop tells a story and inspires a community of forward-thinking creators.',
  },
  {
    name: 'Velvair Studios',
    status: 'In Development',
    category: 'Streetwear & Fashion',
    description:
      'Velvair Studios is a streetwear brand that fuses bold, edgy fashion with artistic expression, creating apparel that stands out in culture and style. Its goal is to provide fans and creators with high-quality, statement pieces that embody individuality and urban creativity. The dream is to become a trendsetting streetwear label that inspires a community of fashion-forward thinkers and artists worldwide.',
  },
]

const statusColors: Record<string, string> = {
  Active: 'text-green-400/80',
  'In Development': 'text-accent',
  Exploring: 'text-stone-400',
  Ongoing: 'text-blue-400/80',
  'Not Yet Public': 'text-stone-600',
}

const industries = [
  'Streetwear & Fashion',
  'Sneaker Culture',
  'E-Commerce & Marketplaces',
  'Creator Tools & Platforms',
  'Lifestyle & Identity',
  'Community & Social',
  'Education & Learning',
  'Music & Creative Arts',
]

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        label="Projects"
        title="What we're building."
        subtitle="A growing ecosystem of ventures, experiments, and initiatives — each exploring a different question, all connected by a shared philosophy."
      />

      {/* Projects Grid */}
      <section className="section-spacing">
        <div className="page-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, i) => (
              <FadeIn key={project.name} delay={0.05 * i}>
                <div className="border border-stone-800/60 p-8 hover:border-stone-700 transition-all duration-500 group h-full">
                  <div className="flex items-start justify-between mb-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-stone-500 font-sans">
                      {project.category}
                    </p>
                    <span className={`text-xs font-mono ${statusColors[project.status] || 'text-stone-500'}`}>
                      {project.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-serif text-stone-200 mb-4 group-hover:text-stone-100 transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-stone-400 leading-relaxed text-sm">
                    {project.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="section-spacing bg-stone-900/30">
        <div className="page-container">
          <div className="max-w-3xl">
            <FadeIn>
              <p className="text-xs uppercase tracking-[0.25em] text-stone-500 font-sans font-medium mb-4">
                Our Approach
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="text-3xl md:text-4xl font-serif mb-8">
                How we think about projects.
              </h2>
            </FadeIn>
            <div className="space-y-6 text-stone-400 leading-relaxed">
              <FadeIn delay={0.15}>
                <p>
                  Every project at Wilson Collective begins with a question, not a business plan.
                  We explore ideas that feel worth pursuing — ones that sit at the intersection of
                  curiosity and purpose — and we give them space to develop at their own pace.
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p>
                  Some ventures become fully realized businesses. Others remain experiments that
                  teach us something valuable. Both outcomes matter. The point is not to guarantee
                  success for every initiative, but to guarantee that every initiative is approached
                  with sincerity and care.
                </p>
              </FadeIn>
              <FadeIn delay={0.25}>
                <p>
                  We do not chase trends. We do not force timelines. We build with the understanding
                  that the best work is often the work that is given room to breathe.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Industries of Interest */}
      <section className="section-spacing">
        <div className="page-container">
          <FadeIn>
            <p className="text-xs uppercase tracking-[0.25em] text-stone-500 font-sans font-medium mb-4">
              Areas of Interest
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-3xl md:text-4xl font-serif mb-12">
              Industries we explore.
            </h2>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {industries.map((industry, i) => (
              <FadeIn key={industry} delay={0.05 * i}>
                <div className="py-4 px-5 border border-stone-800/40 text-center">
                  <p className="text-sm text-stone-400">{industry}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing bg-stone-900/30 border-t border-stone-800/50">
        <div className="page-container text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-serif mb-6">
              Have an idea worth exploring?
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-stone-400 mb-10 max-w-lg mx-auto">
              If you're working on something that aligns with our philosophy, we'd love to
              hear about it. Every great venture starts as a conversation.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <Link
              to="/apply"
              className="inline-block px-10 py-4 bg-stone-100 text-stone-950 text-sm font-medium tracking-wide hover:bg-accent transition-all duration-300"
            >
              Apply to Collaborate
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
