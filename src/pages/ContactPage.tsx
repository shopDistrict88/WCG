import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import FadeIn from '../components/FadeIn'

const faqs = [
  {
    question: 'What does Wilson Collective Group actually do?',
    answer: 'WCG LLC is the parent company behind a portfolio of creative brands including District88, Velvair Studios, Canjustalllove, and Divergent Studios. Beyond our own brands, we help people build businesses, brands, online stores, personal portfolios, content, and creative careers across fashion, music, art, and digital culture.',
  },
  {
    question: 'What kind of help do you offer?',
    answer: 'We help with brand building, store creation, content development, portfolio design, business strategy, and more. Whether you are an entrepreneur, artist, musician, or fashion designer — if you have a dream, we help you build it.',
  },
  {
    question: 'Are you accepting new collaborations?',
    answer: 'Yes. We are always looking for passionate creators and entrepreneurs who are ready to put in the work. If you have an idea and the drive to pursue it, apply through our application page and let us know what you are building.',
  },
  {
    question: 'Do you invest in startups?',
    answer: 'We are not a venture capital fund and do not provide direct financial investment. Our support comes in the form of hands-on help — building, strategy, resources, tools, and guidance to help you grow.',
  },
  {
    question: 'How long does the application process take?',
    answer: 'We review every application carefully. Expect to hear back within a few weeks if there is alignment. We want to make sure the fit is right for both sides before moving forward.',
  },
  {
    question: 'Where is Wilson Collective based?',
    answer: 'Wilson Collective Group LLC is based in Raleigh, North Carolina, but our work and collaborations are not limited by geography. We work with creators everywhere.',
  },
]

const WEB3FORMS_KEY = '16754d4d-bc50-4439-9058-cd2d2708502c'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
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
          subject: `Contact Form — ${formData.subject || 'General Inquiry'} — ${formData.name}`,
          from_name: formData.name,
          replyto: formData.email,
          'Name': formData.name,
          'Email': formData.email,
          'Subject': formData.subject || 'General Inquiry',
          'Message': formData.message,
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
        label="Contact"
        title="Let's connect."
        subtitle="Whether you have a question, an idea, or just want to say hello — we are here."
      />

      <section className="section-spacing">
        <div className="page-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20">
            {/* Contact Info */}
            <div>
              <FadeIn>
                <h2 className="text-2xl font-serif mb-8">Get in touch</h2>
              </FadeIn>

              <div className="space-y-8">
                <FadeIn delay={0.1}>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-stone-500 font-sans mb-2">
                      Email
                    </p>
                    <a
                      href="mailto:info@wilsoncollectivegroup.com"
                      className="text-stone-200 hover:text-accent transition-colors"
                    >
                      info@wilsoncollectivegroup.com
                    </a>
                  </div>
                </FadeIn>

                <FadeIn delay={0.13}>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-stone-500 font-sans mb-2">
                      Instagram
                    </p>
                    <a
                      href="https://www.instagram.com/wilsoncollectivegroupllc/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-stone-200 hover:text-accent transition-colors flex items-center gap-2"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                      @wilsoncollectivegroupllc
                    </a>
                  </div>
                </FadeIn>

                <FadeIn delay={0.16}>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-stone-500 font-sans mb-2">
                      Location
                    </p>
                    <p className="text-stone-300">Raleigh, North Carolina</p>
                  </div>
                </FadeIn>

                <FadeIn delay={0.2}>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-stone-500 font-sans mb-2">
                      For Collaboration
                    </p>
                    <Link to="/apply" className="text-stone-200 hover:text-accent transition-colors">
                      Submit an application &rarr;
                    </Link>
                  </div>
                </FadeIn>

                <FadeIn delay={0.25}>
                  <div className="pt-4">
                    <div className="divider mt-0" />
                    <p className="text-stone-500 leading-relaxed text-sm">
                      We read every message that comes through. Response times vary depending
                      on volume, but we make an effort to reply thoughtfully. If your inquiry
                      is about collaboration, we recommend using the{' '}
                      <Link to="/apply" className="text-stone-300 hover:text-accent underline underline-offset-4 decoration-stone-700">
                        application form
                      </Link>{' '}
                      for the best experience.
                    </p>
                  </div>
                </FadeIn>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <FadeIn>
                <h2 className="text-2xl font-serif mb-8">Send a message</h2>
              </FadeIn>

              {submitted ? (
                <FadeIn>
                  <div className="border border-stone-700 p-10 text-center">
                    <h3 className="text-xl font-serif text-stone-200 mb-4">
                      Message received.
                    </h3>
                    <p className="text-stone-400 leading-relaxed text-sm">
                      Thank you for reaching out. We will review your message and
                      respond if appropriate. We appreciate your patience.
                    </p>
                  </div>
                </FadeIn>
              ) : (
                <FadeIn delay={0.1}>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-xs uppercase tracking-[0.15em] text-stone-500 mb-3">
                        Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className="w-full bg-transparent border-b border-stone-700 text-stone-200 py-3 focus:outline-none focus:border-accent transition-colors placeholder:text-stone-700"
                        placeholder="Your name"
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

                    <div>
                      <label className="block text-xs uppercase tracking-[0.15em] text-stone-500 mb-3">
                        Subject
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => handleChange('subject', e.target.value)}
                        className="w-full bg-transparent border-b border-stone-700 text-stone-200 py-3 focus:outline-none focus:border-accent transition-colors placeholder:text-stone-700"
                        placeholder="What is this about?"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-[0.15em] text-stone-500 mb-3">
                        Message *
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        className="w-full bg-transparent border border-stone-700 text-stone-200 p-4 focus:outline-none focus:border-accent transition-colors placeholder:text-stone-700 resize-none"
                        placeholder="What's on your mind?"
                      />
                    </div>

                    {error && (
                      <div className="border border-red-500/30 bg-red-500/5 p-4">
                        <p className="text-sm text-red-400">{error}</p>
                      </div>
                    )}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-10 py-4 bg-stone-100 text-stone-950 text-sm font-medium tracking-wide hover:bg-accent transition-all duration-300 w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                </FadeIn>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-spacing bg-stone-900/30">
        <div className="page-container">
          <FadeIn>
            <p className="text-xs uppercase tracking-[0.25em] text-stone-500 font-sans font-medium mb-4">
              Frequently Asked
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-3xl md:text-4xl font-serif mb-12">
              Common questions.
            </h2>
          </FadeIn>
          <div className="space-y-0 max-w-3xl">
            {faqs.map((faq, i) => (
              <FadeIn key={i} delay={0.05 * i}>
                <div className="py-8 border-b border-stone-800/50">
                  <h3 className="text-lg font-serif text-stone-200 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-stone-400 leading-relaxed text-sm">
                    {faq.answer}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Invitation */}
      <section className="section-spacing">
        <div className="page-container text-center">
          <FadeIn>
            <p className="text-xs uppercase tracking-[0.25em] text-stone-500 font-sans font-medium mb-6">
              An Invitation to Builders
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <blockquote className="text-2xl md:text-3xl font-serif text-stone-200 leading-snug max-w-3xl mx-auto italic">
              "Wilson Collective is a place where ideas are explored, meaningful work is
              created, and people are encouraged to pursue something bigger than themselves."
            </blockquote>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-8 text-stone-500 max-w-lg mx-auto">
              If that resonates with you, we'd love to hear from you. The door is open.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <Link
              to="/apply"
              className="inline-block mt-10 px-10 py-4 bg-stone-100 text-stone-950 text-sm font-medium tracking-wide hover:bg-accent transition-all duration-300"
            >
              Begin the Conversation
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
