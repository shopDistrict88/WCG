import { useState } from 'react'
import type { FormEvent } from 'react'
import PageHeader from '../components/PageHeader'
import FadeIn from '../components/FadeIn'

const lookingFor = [
  'Creators, entrepreneurs, artists, musicians, or designers with a real vision',
  'People who are ready to put in the work — not just talk about it',
  'Ideas rooted in fashion, music, art, culture, or digital innovation',
  'A willingness to collaborate, learn, and grow together',
  'Someone who cares about building something that lasts',
]

const notRightFit = [
  'Looking for someone to do all the work while you sit back',
  'Need direct funding or investment — we are not a VC fund',
  'Want overnight results with no effort',
  'Not willing to take feedback or iterate on your ideas',
  'Just looking for free work with no commitment to the process',
]

const expectations = [
  { title: 'Real Conversation', description: 'We will be honest about what we think, what we can help with, and what we see in your idea. Expect straight talk.' },
  { title: 'Hands-On Support', description: 'If we move forward together, we get involved — helping you build, strategize, create, and launch.' },
  { title: 'Mutual Commitment', description: 'We invest real time and energy. We expect the same level of seriousness and dedication from you.' },
  { title: 'No Pressure', description: 'Applying starts a conversation, not a contract. If there is alignment, we will figure out the best way to work together.' },
]

const WEB3FORMS_KEY = '16754d4d-bc50-4439-9058-cd2d2708502c'

export default function ApplyPage() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: '',
    stage: '',
    description: '',
    why: '',
    timeline: '',
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Collaboration Application — ${formData.project} — ${formData.name}`,
          from_name: formData.name,
          replyto: formData.email,
          'Full Name': formData.name,
          'Email': formData.email,
          'Project / Venture Name': formData.project,
          'Current Stage': formData.stage || 'Not specified',
          'Project Description': formData.description,
          'Why Wilson Collective': formData.why,
          'Timeline': formData.timeline || 'Not specified',
        }),
      })
      const data = await res.json()
      if (data.success) {
        setSubmitted(true)
      } else {
        setError('Something went wrong. Please try again or email us directly.')
      }
    } catch {
      setError('Failed to submit. Please check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <>
      <PageHeader
        label="Apply"
        title="Work with us."
        subtitle="Whether you need help building a business, launching a brand, creating content, or bringing an idea to life — tell us about your dream. This is where it starts."
      />

      {/* Who Should Apply */}
      <section className="section-spacing">
        <div className="page-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Good fit */}
            <div>
              <FadeIn>
                <p className="text-xs uppercase tracking-[0.25em] text-stone-500 font-sans font-medium mb-4">
                  Who Should Apply
                </p>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h3 className="text-2xl font-serif mb-8">We look for...</h3>
              </FadeIn>
              <div className="space-y-4">
                {lookingFor.map((item, i) => (
                  <FadeIn key={i} delay={0.05 * i}>
                    <div className="flex items-start gap-4">
                      <span className="text-green-400/60 mt-1 text-sm">+</span>
                      <p className="text-stone-300 text-sm leading-relaxed">{item}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>

            {/* Not the right fit */}
            <div>
              <FadeIn>
                <p className="text-xs uppercase tracking-[0.25em] text-stone-500 font-sans font-medium mb-4">
                  Probably Not the Right Fit
                </p>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h3 className="text-2xl font-serif mb-8">This may not be for you if...</h3>
              </FadeIn>
              <div className="space-y-4">
                {notRightFit.map((item, i) => (
                  <FadeIn key={i} delay={0.05 * i}>
                    <div className="flex items-start gap-4">
                      <span className="text-stone-600 mt-1 text-sm">—</span>
                      <p className="text-stone-400 text-sm leading-relaxed">{item}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="section-spacing bg-stone-900/30">
        <div className="page-container">
          <FadeIn>
            <p className="text-xs uppercase tracking-[0.25em] text-stone-500 font-sans font-medium mb-4">
              Expectations
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-3xl md:text-4xl font-serif mb-12">
              What happens after you apply.
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-stone-400 leading-relaxed max-w-2xl mb-12">
              After submitting your application, we will review it carefully. If we see potential
              and alignment, we will reach out to start a real conversation about how we can help.
              There is no formal interview process — just an honest exchange about your vision and
              what it will take to make it happen.
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {expectations.map((item, i) => (
              <FadeIn key={item.title} delay={0.05 * i}>
                <div className="border border-stone-800/40 p-6">
                  <h4 className="font-serif text-stone-200 mb-2">{item.title}</h4>
                  <p className="text-sm text-stone-400 leading-relaxed">{item.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="section-spacing">
        <div className="page-container">
          <div className="max-w-2xl">
            <FadeIn>
              <p className="text-xs uppercase tracking-[0.25em] text-stone-500 font-sans font-medium mb-4">
                Application
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="text-3xl md:text-4xl font-serif mb-12">
                Tell us about your idea.
              </h2>
            </FadeIn>

            {submitted ? (
              <FadeIn>
                <div className="border border-stone-700 p-10 text-center">
                  <h3 className="text-2xl font-serif text-stone-200 mb-4">
                    Thank you for applying.
                  </h3>
                  <p className="text-stone-400 leading-relaxed">
                    We have received your application and will review it thoughtfully.
                    If there is alignment, we will be in touch. In the meantime, continue
                    building — that is always the right next step.
                  </p>
                </div>
              </FadeIn>
            ) : (
              <FadeIn delay={0.15}>
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-xs uppercase tracking-[0.15em] text-stone-500 mb-3">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className="w-full bg-transparent border-b border-stone-700 text-stone-200 py-3 focus:outline-none focus:border-accent transition-colors placeholder:text-stone-700"
                        placeholder="Full name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-[0.15em] text-stone-500 mb-3">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className="w-full bg-transparent border-b border-stone-700 text-stone-200 py-3 focus:outline-none focus:border-accent transition-colors placeholder:text-stone-700"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-[0.15em] text-stone-500 mb-3">
                      Project / Venture Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.project}
                      onChange={(e) => handleChange('project', e.target.value)}
                      className="w-full bg-transparent border-b border-stone-700 text-stone-200 py-3 focus:outline-none focus:border-accent transition-colors placeholder:text-stone-700"
                      placeholder="What is it called?"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-[0.15em] text-stone-500 mb-3">
                      Current Stage
                    </label>
                    <select
                      value={formData.stage}
                      onChange={(e) => handleChange('stage', e.target.value)}
                      className="w-full bg-transparent border-b border-stone-700 text-stone-200 py-3 focus:outline-none focus:border-accent transition-colors appearance-none"
                    >
                      <option value="" className="bg-stone-900">Select a stage</option>
                      <option value="idea" className="bg-stone-900">Just an idea</option>
                      <option value="early" className="bg-stone-900">Early development</option>
                      <option value="launched" className="bg-stone-900">Launched but growing</option>
                      <option value="established" className="bg-stone-900">Established, seeking direction</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-[0.15em] text-stone-500 mb-3">
                      Describe Your Project *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.description}
                      onChange={(e) => handleChange('description', e.target.value)}
                      className="w-full bg-transparent border border-stone-700 text-stone-200 p-4 focus:outline-none focus:border-accent transition-colors placeholder:text-stone-700 resize-none"
                      placeholder="What are you building? What problem does it address? Where is it headed?"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-[0.15em] text-stone-500 mb-3">
                      Why Wilson Collective? *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formData.why}
                      onChange={(e) => handleChange('why', e.target.value)}
                      className="w-full bg-transparent border border-stone-700 text-stone-200 p-4 focus:outline-none focus:border-accent transition-colors placeholder:text-stone-700 resize-none"
                      placeholder="What drew you here? What kind of support are you looking for?"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-[0.15em] text-stone-500 mb-3">
                      Your Timeline
                    </label>
                    <input
                      type="text"
                      value={formData.timeline}
                      onChange={(e) => handleChange('timeline', e.target.value)}
                      className="w-full bg-transparent border-b border-stone-700 text-stone-200 py-3 focus:outline-none focus:border-accent transition-colors placeholder:text-stone-700"
                      placeholder="What does your timeline look like? No wrong answer."
                    />
                  </div>

                  <div className="pt-4">
                    {error && (
                      <div className="mb-4 border border-red-500/30 bg-red-500/5 p-4">
                        <p className="text-sm text-red-400">{error}</p>
                      </div>
                    )}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-10 py-4 bg-stone-100 text-stone-950 text-sm font-medium tracking-wide hover:bg-accent transition-all duration-300 w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? 'Submitting...' : 'Submit Application'}
                    </button>
                    <p className="mt-4 text-xs text-stone-600">
                      By submitting, you are starting a conversation — not entering a contract.
                    </p>
                  </div>
                </form>
              </FadeIn>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
