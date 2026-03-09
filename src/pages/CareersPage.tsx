import { useState } from 'react'
import type { FormEvent } from 'react'
import PageHeader from '../components/PageHeader'
import FadeIn from '../components/FadeIn'

interface Role {
  title: string
  department: string
  type: string
  responsibilities: string[]
}

const roles: Role[] = [
  {
    title: 'Operations Manager',
    department: 'Operations',
    type: 'Full-Time',
    responsibilities: [
      'Oversee daily business operations across all brands.',
      'Coordinate order fulfillment, shipping, and inventory management.',
      'Streamline workflows between production, packing, and shipping teams.',
      'Ensure deadlines are met and quality standards are maintained.',
    ],
  },
  {
    title: 'Marketing & Growth Manager',
    department: 'Marketing',
    type: 'Full-Time',
    responsibilities: [
      'Plan and execute marketing campaigns for product launches and brand growth.',
      'Run paid ads, email campaigns, and promotions.',
      'Track analytics and adjust strategies to increase sales.',
      'Collaborate with content creators to maintain brand consistency.',
    ],
  },
  {
    title: 'Customer Experience / Support Lead',
    department: 'Customer Experience',
    type: 'Full-Time',
    responsibilities: [
      'Respond to customer inquiries via email, social media, and chat.',
      'Handle returns, exchanges, and complaints professionally.',
      'Collect customer feedback to improve products and services.',
      'Maintain a high level of customer satisfaction and loyalty.',
    ],
  },
  {
    title: 'Content Creator / Media Specialist',
    department: 'Creative',
    type: 'Full-Time / Contract',
    responsibilities: [
      'Produce photography, video content, reels, and graphics for social media.',
      'Ensure visual content aligns with brand aesthetics.',
      'Assist in product photography and campaign media.',
      'Edit and optimize media for multiple platforms.',
    ],
  },
  {
    title: 'Sales & Outreach Coordinator',
    department: 'Sales',
    type: 'Full-Time',
    responsibilities: [
      'Manage direct sales and wholesale partnerships.',
      'Build relationships with influencers, collaborators, and potential clients.',
      'Track leads and follow up on sales opportunities.',
      'Support marketing campaigns with promotional efforts.',
    ],
  },
  {
    title: 'Order Fulfillment / Warehouse Associate',
    department: 'Operations',
    type: 'Full-Time / Part-Time',
    responsibilities: [
      'Pick, pack, and ship customer orders accurately and efficiently.',
      'Maintain organized inventory and storage systems.',
      'Track shipments and coordinate with shipping carriers.',
      'Assist Operations Manager in improving fulfillment processes.',
    ],
  },
  {
    title: 'E-commerce / Website Support Specialist',
    department: 'Technology',
    type: 'Full-Time / Contract',
    responsibilities: [
      'Update products, pricing, and promotions on all online stores.',
      'Ensure checkout, payment systems, and website functionality run smoothly.',
      'Troubleshoot minor technical issues and report larger issues.',
      'Assist in improving site navigation and user experience.',
    ],
  },
  {
    title: 'Social Media Manager',
    department: 'Marketing',
    type: 'Full-Time',
    responsibilities: [
      'Manage posting schedules and maintain brand voice across social platforms.',
      'Engage with followers and respond to comments/messages.',
      'Monitor trends and optimize content for audience growth.',
      'Work with Marketing & Content teams to maximize reach.',
    ],
  },
  {
    title: 'Packaging & Quality Control Specialist',
    department: 'Operations',
    type: 'Full-Time / Part-Time',
    responsibilities: [
      'Inspect products for quality before shipment.',
      'Pack orders with attention to brand presentation and protection.',
      'Ensure correct items and quantities are sent to customers.',
      'Maintain organization in the packing and shipping area.',
    ],
  },
  {
    title: 'Finance & Admin Coordinator',
    department: 'Finance & Admin',
    type: 'Full-Time',
    responsibilities: [
      'Track sales, expenses, and daily financial transactions.',
      'Assist with bookkeeping, payroll, and budget tracking.',
      'Prepare reports for management review.',
      'Support operational planning and administrative tasks.',
    ],
  },
]

const departmentColors: Record<string, string> = {
  Operations: 'border-blue-400/30 text-blue-400/80',
  Marketing: 'border-purple-400/30 text-purple-400/80',
  'Customer Experience': 'border-green-400/30 text-green-400/80',
  Creative: 'border-accent/30 text-accent',
  Sales: 'border-amber-400/30 text-amber-400/80',
  Technology: 'border-cyan-400/30 text-cyan-400/80',
  'Finance & Admin': 'border-stone-400/30 text-stone-400',
}

const brands = [
  'District88',
  'Velvair Studios',
  'Canjustalllove',
  'Divergent Studios',
  'WCG Dashboard',
  'Future Ventures',
]

const values = [
  {
    title: 'Creativity',
    description: 'We push boundaries across fashion, culture, and digital innovation. Every team member contributes creatively.',
  },
  {
    title: 'Dedication',
    description: 'We show up, put in the work, and take pride in what we build. Consistency matters here.',
  },
  {
    title: 'Efficiency',
    description: 'We move with purpose. Streamlined workflows and smart execution keep all brands running smoothly.',
  },
  {
    title: 'Adaptability',
    description: 'You may work across different brands and projects. Flexibility and willingness to learn are essential.',
  },
  {
    title: 'Professionalism',
    description: 'Every interaction — with teammates, customers, and partners — reflects the standard we hold ourselves to.',
  },
  {
    title: 'Collaboration',
    description: 'No one builds alone. Cross-brand teamwork is how we create something bigger than any single project.',
  },
]

const roleOptions = roles.map((r) => r.title)

const inputClass =
  'w-full bg-transparent border-b border-stone-700 text-stone-200 py-3 focus:outline-none focus:border-accent transition-colors placeholder:text-stone-700'
const selectClass =
  'w-full bg-transparent border-b border-stone-700 text-stone-200 py-3 focus:outline-none focus:border-accent transition-colors appearance-none'
const textareaClass =
  'w-full bg-transparent border border-stone-700 text-stone-200 p-4 focus:outline-none focus:border-accent transition-colors placeholder:text-stone-700 resize-none'
const labelClass =
  'block text-xs uppercase tracking-[0.15em] text-stone-500 mb-3'

const WEB3FORMS_KEY = '16754d4d-bc50-4439-9058-cd2d2708502c'

function CareerApplicationForm() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    positionApplying: '',
    secondChoice: '',
    employmentType: '',
    startDate: '',
    linkedIn: '',
    portfolio: '',
    instagram: '',
    yearsExperience: '',
    highestEducation: '',
    previousEmployer: '',
    previousRole: '',
    previousDuration: '',
    previousResponsibilities: '',
    relevantSkills: '',
    softwareTools: '',
    whyWCG: '',
    whatYouBring: '',
    multiBrandComfort: '',
    workStyle: '',
    availableHours: '',
    willingToTravel: '',
    salaryExpectation: '',
    heardAboutUs: '',
    additionalInfo: '',
    agreeToTerms: false,
  })

  const update = (field: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const payload = {
        access_key: WEB3FORMS_KEY,
        subject: `Career Application — ${form.positionApplying} — ${form.firstName} ${form.lastName}`,
        from_name: `${form.firstName} ${form.lastName}`,
        replyto: form.email,

        'Full Name': `${form.firstName} ${form.lastName}`,
        'Email': form.email,
        'Phone': form.phone,
        'Location': `${form.city}, ${form.state}`,

        'Position Applying For': form.positionApplying,
        'Second Choice Position': form.secondChoice || 'N/A',
        'Employment Type': form.employmentType,
        'Earliest Start Date': form.startDate,

        'LinkedIn': form.linkedIn || 'Not provided',
        'Portfolio / Website': form.portfolio || 'Not provided',
        'Instagram': form.instagram || 'Not provided',

        'Years of Experience': form.yearsExperience,
        'Highest Education': form.highestEducation || 'Not provided',
        'Previous Employer': form.previousEmployer || 'Not provided',
        'Previous Role': form.previousRole || 'Not provided',
        'Previous Duration': form.previousDuration || 'Not provided',
        'Previous Responsibilities': form.previousResponsibilities || 'Not provided',
        'Relevant Skills': form.relevantSkills,
        'Software & Tools': form.softwareTools || 'Not provided',

        'Why WCG': form.whyWCG,
        'What They Bring': form.whatYouBring,
        'Multi-Brand Comfort': form.multiBrandComfort,
        'Work Style': form.workStyle,

        'Available Hours/Week': form.availableHours,
        'Willing to Travel': form.willingToTravel || 'Not specified',
        'Salary Expectation': form.salaryExpectation || 'Not specified',
        'How They Heard About Us': form.heardAboutUs || 'Not specified',
        'Additional Info': form.additionalInfo || 'None',
      }

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (data.success) {
        setSubmitted(true)
      } else {
        setError('Something went wrong. Please try again or email us directly.')
      }
    } catch {
      setError('Failed to submit. Please check your connection and try again, or email us directly.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <FadeIn>
        <div className="border border-stone-700 p-12 text-center">
          <h3 className="text-2xl font-serif text-stone-200 mb-4">
            Application received.
          </h3>
          <p className="text-stone-400 leading-relaxed mb-6">
            Thank you for applying to Wilson Collective Group LLC. We review every
            application thoroughly. If your skills and experience align with our needs,
            we will reach out to schedule a conversation.
          </p>
          <p className="text-sm text-stone-500">
            In the meantime, follow us on{' '}
            <a
              href="https://www.instagram.com/wilsoncollectivegroupllc/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent-light transition-colors underline underline-offset-4"
            >
              Instagram
            </a>{' '}
            to stay updated.
          </p>
        </div>
      </FadeIn>
    )
  }

  return (
    <FadeIn delay={0.2}>
      <form onSubmit={handleSubmit} className="space-y-12">
        {/* Section 1: Personal Information */}
        <div>
          <h3 className="text-lg font-serif text-stone-200 mb-6 pb-3 border-b border-stone-800/50">
            Personal Information
          </h3>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>First Name *</label>
                <input type="text" required value={form.firstName} onChange={(e) => update('firstName', e.target.value)} className={inputClass} placeholder="First name" />
              </div>
              <div>
                <label className={labelClass}>Last Name *</label>
                <input type="text" required value={form.lastName} onChange={(e) => update('lastName', e.target.value)} className={inputClass} placeholder="Last name" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Email Address *</label>
                <input type="email" required value={form.email} onChange={(e) => update('email', e.target.value)} className={inputClass} placeholder="your@email.com" />
              </div>
              <div>
                <label className={labelClass}>Phone Number *</label>
                <input type="tel" required value={form.phone} onChange={(e) => update('phone', e.target.value)} className={inputClass} placeholder="(000) 000-0000" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>City *</label>
                <input type="text" required value={form.city} onChange={(e) => update('city', e.target.value)} className={inputClass} placeholder="Your city" />
              </div>
              <div>
                <label className={labelClass}>State *</label>
                <input type="text" required value={form.state} onChange={(e) => update('state', e.target.value)} className={inputClass} placeholder="Your state" />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Position Details */}
        <div>
          <h3 className="text-lg font-serif text-stone-200 mb-6 pb-3 border-b border-stone-800/50">
            Position Details
          </h3>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Position Applying For *</label>
                <select required value={form.positionApplying} onChange={(e) => update('positionApplying', e.target.value)} className={selectClass}>
                  <option value="" className="bg-stone-900">Select a position</option>
                  {roleOptions.map((role) => (
                    <option key={role} value={role} className="bg-stone-900">{role}</option>
                  ))}
                  <option value="Other" className="bg-stone-900">Other (specify below)</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Second Choice (Optional)</label>
                <select value={form.secondChoice} onChange={(e) => update('secondChoice', e.target.value)} className={selectClass}>
                  <option value="" className="bg-stone-900">Select if applicable</option>
                  {roleOptions.map((role) => (
                    <option key={role} value={role} className="bg-stone-900">{role}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Preferred Employment Type *</label>
                <select required value={form.employmentType} onChange={(e) => update('employmentType', e.target.value)} className={selectClass}>
                  <option value="" className="bg-stone-900">Select type</option>
                  <option value="Full-Time" className="bg-stone-900">Full-Time</option>
                  <option value="Part-Time" className="bg-stone-900">Part-Time</option>
                  <option value="Contract" className="bg-stone-900">Contract</option>
                  <option value="Freelance" className="bg-stone-900">Freelance</option>
                  <option value="Internship" className="bg-stone-900">Internship</option>
                  <option value="Open to Any" className="bg-stone-900">Open to Any</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Earliest Start Date *</label>
                <input type="date" required value={form.startDate} onChange={(e) => update('startDate', e.target.value)} className={inputClass} />
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Online Presence */}
        <div>
          <h3 className="text-lg font-serif text-stone-200 mb-6 pb-3 border-b border-stone-800/50">
            Online Presence & Resume
          </h3>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>LinkedIn Profile URL</label>
                <input type="url" value={form.linkedIn} onChange={(e) => update('linkedIn', e.target.value)} className={inputClass} placeholder="https://linkedin.com/in/yourname" />
              </div>
              <div>
                <label className={labelClass}>Portfolio / Personal Website</label>
                <input type="url" value={form.portfolio} onChange={(e) => update('portfolio', e.target.value)} className={inputClass} placeholder="https://yoursite.com" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Instagram Handle</label>
                <input type="text" value={form.instagram} onChange={(e) => update('instagram', e.target.value)} className={inputClass} placeholder="@yourhandle" />
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Experience & Skills */}
        <div>
          <h3 className="text-lg font-serif text-stone-200 mb-6 pb-3 border-b border-stone-800/50">
            Experience & Skills
          </h3>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Years of Relevant Experience *</label>
                <select required value={form.yearsExperience} onChange={(e) => update('yearsExperience', e.target.value)} className={selectClass}>
                  <option value="" className="bg-stone-900">Select</option>
                  <option value="0-1" className="bg-stone-900">Less than 1 year</option>
                  <option value="1-2" className="bg-stone-900">1–2 years</option>
                  <option value="3-5" className="bg-stone-900">3–5 years</option>
                  <option value="5-10" className="bg-stone-900">5–10 years</option>
                  <option value="10+" className="bg-stone-900">10+ years</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Highest Education Level</label>
                <select value={form.highestEducation} onChange={(e) => update('highestEducation', e.target.value)} className={selectClass}>
                  <option value="" className="bg-stone-900">Select</option>
                  <option value="High School" className="bg-stone-900">High School / GED</option>
                  <option value="Some College" className="bg-stone-900">Some College</option>
                  <option value="Associate" className="bg-stone-900">Associate Degree</option>
                  <option value="Bachelor" className="bg-stone-900">Bachelor's Degree</option>
                  <option value="Master" className="bg-stone-900">Master's Degree</option>
                  <option value="Self-Taught" className="bg-stone-900">Self-Taught / Bootcamp</option>
                  <option value="Other" className="bg-stone-900">Other</option>
                </select>
              </div>
            </div>

            <p className="text-xs uppercase tracking-[0.15em] text-stone-600 pt-2">
              Most Recent Employment
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className={labelClass}>Company / Employer</label>
                <input type="text" value={form.previousEmployer} onChange={(e) => update('previousEmployer', e.target.value)} className={inputClass} placeholder="Company name" />
              </div>
              <div>
                <label className={labelClass}>Your Role / Title</label>
                <input type="text" value={form.previousRole} onChange={(e) => update('previousRole', e.target.value)} className={inputClass} placeholder="Job title" />
              </div>
              <div>
                <label className={labelClass}>Duration</label>
                <input type="text" value={form.previousDuration} onChange={(e) => update('previousDuration', e.target.value)} className={inputClass} placeholder="e.g. 2 years" />
              </div>
            </div>
            <div>
              <label className={labelClass}>Key Responsibilities in That Role</label>
              <textarea rows={3} value={form.previousResponsibilities} onChange={(e) => update('previousResponsibilities', e.target.value)} className={textareaClass} placeholder="Briefly describe what you were responsible for." />
            </div>
            <div>
              <label className={labelClass}>Relevant Skills *</label>
              <textarea required rows={3} value={form.relevantSkills} onChange={(e) => update('relevantSkills', e.target.value)} className={textareaClass} placeholder="List your top skills relevant to the position you're applying for. Be specific." />
            </div>
            <div>
              <label className={labelClass}>Software, Tools & Platforms You Know</label>
              <textarea rows={2} value={form.softwareTools} onChange={(e) => update('softwareTools', e.target.value)} className={textareaClass} placeholder="e.g. Shopify, Canva, Adobe Suite, Google Analytics, Excel, Figma, social media platforms, etc." />
            </div>
          </div>
        </div>

        {/* Section 5: About You */}
        <div>
          <h3 className="text-lg font-serif text-stone-200 mb-6 pb-3 border-b border-stone-800/50">
            About You
          </h3>
          <div className="space-y-6">
            <div>
              <label className={labelClass}>Why do you want to work at Wilson Collective Group? *</label>
              <textarea required rows={4} value={form.whyWCG} onChange={(e) => update('whyWCG', e.target.value)} className={textareaClass} placeholder="Be real. Tell us what drew you here and why this opportunity matters to you." />
            </div>
            <div>
              <label className={labelClass}>What do you bring to the team that sets you apart? *</label>
              <textarea required rows={4} value={form.whatYouBring} onChange={(e) => update('whatYouBring', e.target.value)} className={textareaClass} placeholder="What makes you different? What can you contribute that others can't?" />
            </div>
            <div>
              <label className={labelClass}>
                Are you comfortable working across multiple brands and projects simultaneously? *
              </label>
              <select required value={form.multiBrandComfort} onChange={(e) => update('multiBrandComfort', e.target.value)} className={selectClass}>
                <option value="" className="bg-stone-900">Select</option>
                <option value="Yes, absolutely" className="bg-stone-900">Yes, absolutely — I thrive in that environment</option>
                <option value="Yes, willing to learn" className="bg-stone-900">Yes, I'm willing to learn and adapt</option>
                <option value="Prefer one focus" className="bg-stone-900">I'd prefer to focus on one brand but I'm open</option>
                <option value="Need more info" className="bg-stone-900">I'd need more information before deciding</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>How would you describe your work style? *</label>
              <select required value={form.workStyle} onChange={(e) => update('workStyle', e.target.value)} className={selectClass}>
                <option value="" className="bg-stone-900">Select</option>
                <option value="Self-starter" className="bg-stone-900">Self-starter — I take initiative without being told</option>
                <option value="Collaborative" className="bg-stone-900">Collaborative — I do my best work with a team</option>
                <option value="Structured" className="bg-stone-900">Structured — I like clear tasks and deadlines</option>
                <option value="Flexible" className="bg-stone-900">Flexible — I adapt to whatever the situation needs</option>
                <option value="Creative-driven" className="bg-stone-900">Creative-driven — I need creative freedom to perform</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 6: Availability & Logistics */}
        <div>
          <h3 className="text-lg font-serif text-stone-200 mb-6 pb-3 border-b border-stone-800/50">
            Availability & Logistics
          </h3>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Hours Available Per Week *</label>
                <select required value={form.availableHours} onChange={(e) => update('availableHours', e.target.value)} className={selectClass}>
                  <option value="" className="bg-stone-900">Select</option>
                  <option value="10-20" className="bg-stone-900">10–20 hours</option>
                  <option value="20-30" className="bg-stone-900">20–30 hours</option>
                  <option value="30-40" className="bg-stone-900">30–40 hours</option>
                  <option value="40+" className="bg-stone-900">40+ hours (full-time)</option>
                  <option value="Flexible" className="bg-stone-900">Flexible / Varies</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Willing to Travel or Work On-Site if Needed?</label>
                <select value={form.willingToTravel} onChange={(e) => update('willingToTravel', e.target.value)} className={selectClass}>
                  <option value="" className="bg-stone-900">Select</option>
                  <option value="Yes" className="bg-stone-900">Yes</option>
                  <option value="Occasionally" className="bg-stone-900">Occasionally</option>
                  <option value="Remote only" className="bg-stone-900">Remote only</option>
                  <option value="Open to discuss" className="bg-stone-900">Open to discuss</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Salary / Pay Expectation</label>
                <input type="text" value={form.salaryExpectation} onChange={(e) => update('salaryExpectation', e.target.value)} className={inputClass} placeholder="e.g. $20/hr, $45K/year, negotiable" />
              </div>
              <div>
                <label className={labelClass}>How Did You Hear About Us?</label>
                <select value={form.heardAboutUs} onChange={(e) => update('heardAboutUs', e.target.value)} className={selectClass}>
                  <option value="" className="bg-stone-900">Select</option>
                  <option value="Instagram" className="bg-stone-900">Instagram</option>
                  <option value="Website" className="bg-stone-900">WCG Website</option>
                  <option value="Word of mouth" className="bg-stone-900">Word of Mouth</option>
                  <option value="Job board" className="bg-stone-900">Job Board</option>
                  <option value="Google" className="bg-stone-900">Google Search</option>
                  <option value="Other" className="bg-stone-900">Other</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Section 7: Anything Else */}
        <div>
          <h3 className="text-lg font-serif text-stone-200 mb-6 pb-3 border-b border-stone-800/50">
            Anything Else
          </h3>
          <div>
            <label className={labelClass}>Is there anything else you want us to know?</label>
            <textarea rows={4} value={form.additionalInfo} onChange={(e) => update('additionalInfo', e.target.value)} className={textareaClass} placeholder="Additional context, links, availability notes, or anything that helps us understand you better." />
          </div>
        </div>

        {/* Agreement & Submit */}
        <div className="border-t border-stone-800/50 pt-8">
          <label className="flex items-start gap-4 cursor-pointer mb-8 group">
            <input
              type="checkbox"
              required
              checked={form.agreeToTerms}
              onChange={(e) => update('agreeToTerms', e.target.checked)}
              className="mt-1 w-4 h-4 accent-accent shrink-0"
            />
            <span className="text-sm text-stone-400 leading-relaxed group-hover:text-stone-300 transition-colors">
              I confirm that all information provided is accurate and truthful. I understand
              that Wilson Collective Group LLC may work across multiple brands and projects,
              and I am open to contributing wherever needed. I consent to WCG LLC storing
              this information for recruitment purposes.
            </span>
          </label>

          {error && (
            <div className="mb-6 border border-red-500/30 bg-red-500/5 p-4">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              disabled={submitting}
              className="px-12 py-4 bg-stone-100 text-stone-950 text-sm font-medium tracking-wide hover:bg-accent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Submitting...' : 'Submit Application'}
            </button>
            <a
              href="mailto:info@wilsoncollectivegroup.com?subject=Career Inquiry — Wilson Collective Group"
              className="px-12 py-4 border border-stone-700 text-stone-300 text-sm font-medium tracking-wide hover:border-stone-400 hover:text-stone-100 transition-all duration-300 text-center"
            >
              Or Email Directly
            </a>
          </div>
          <p className="mt-4 text-xs text-stone-600">
            You can also send your resume directly to{' '}
            <a href="mailto:info@wilsoncollectivegroup.com" className="text-stone-400 hover:text-accent transition-colors underline underline-offset-4 decoration-stone-700">
              info@wilsoncollectivegroup.com
            </a>
          </p>
        </div>
      </form>
    </FadeIn>
  )
}

export default function CareersPage() {
  return (
    <>
      <PageHeader
        label="Careers"
        title="Join the Wilson Collective Group LLC Team."
        subtitle="We are building something bigger than any single brand. If you're talented, creative, and ready to work across a multi-brand ecosystem — we want to hear from you."
      />

      {/* Intro */}
      <section className="section-spacing">
        <div className="page-container">
          <div className="max-w-3xl">
            <FadeIn>
              <p className="text-lg md:text-xl text-stone-300 leading-relaxed">
                Wilson Collective Group LLC is home to multiple innovative businesses,
                including our clothing brands and District88. We are looking for dedicated,
                talented individuals to help us grow and innovate. You may be asked to work
                on different projects and studios, collaborating across all brands under
                WCG LLC. We value creativity, efficiency, and dedication, and we are looking
                for team members ready to make an impact in a fast-paced, multi-brand environment.
              </p>
            </FadeIn>
          </div>

          {/* Brands strip */}
          <FadeIn delay={0.15}>
            <div className="mt-14 flex flex-wrap gap-3">
              {brands.map((brand) => (
                <span
                  key={brand}
                  className="text-xs uppercase tracking-[0.15em] px-4 py-2 border border-stone-800/60 text-stone-500"
                >
                  {brand}
                </span>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-4 text-sm text-stone-600 italic">
              Team members may work across any of these brands and projects.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Values */}
      <section className="section-spacing bg-stone-900/30">
        <div className="page-container">
          <FadeIn>
            <p className="text-xs uppercase tracking-[0.25em] text-stone-500 font-sans font-medium mb-4">
              What We Value
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-3xl md:text-4xl font-serif mb-14">
              The qualities that define our team.
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, i) => (
              <FadeIn key={value.title} delay={0.05 * i}>
                <div className="border border-stone-800/40 p-7 h-full hover:border-stone-700 transition-colors duration-500">
                  <h3 className="text-lg font-serif text-stone-200 mb-3">{value.title}</h3>
                  <p className="text-sm text-stone-400 leading-relaxed">{value.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section className="section-spacing">
        <div className="page-container">
          <FadeIn>
            <p className="text-xs uppercase tracking-[0.25em] text-stone-500 font-sans font-medium mb-4">
              Open Positions
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-3xl md:text-4xl font-serif mb-6">
              Roles we're hiring for.
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-stone-400 leading-relaxed max-w-2xl mb-14">
              Each role supports the entire Wilson Collective Group ecosystem. You won't
              just work on one brand — you'll contribute across multiple projects, studios,
              and initiatives. Below are the positions we're currently looking to fill.
            </p>
          </FadeIn>

          <div className="space-y-6">
            {roles.map((role, i) => (
              <FadeIn key={role.title} delay={0.03 * i}>
                <div className="border border-stone-800/50 hover:border-stone-700/70 transition-all duration-500 group">
                  {/* Role header */}
                  <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-800/30">
                    <div>
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <span className="text-stone-600 font-mono text-xs">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <h3 className="text-xl font-serif text-stone-200 group-hover:text-stone-100 transition-colors">
                          {role.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className={`text-[10px] uppercase tracking-[0.15em] px-3 py-1 border ${departmentColors[role.department] || 'border-stone-700 text-stone-500'}`}>
                          {role.department}
                        </span>
                        <span className="text-xs text-stone-600">
                          {role.type}
                        </span>
                      </div>
                    </div>
                    <div className="shrink-0">
                      <span className="text-xs uppercase tracking-[0.15em] text-accent/70 font-sans">
                        Multi-Brand Role
                      </span>
                    </div>
                  </div>

                  {/* Responsibilities */}
                  <div className="p-6 md:p-8 pt-5 md:pt-6">
                    <p className="text-xs uppercase tracking-[0.15em] text-stone-600 mb-4 font-sans">
                      Key Responsibilities
                    </p>
                    <ul className="space-y-3">
                      {role.responsibilities.map((resp, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <span className="text-accent/60 mt-1.5 shrink-0">
                            <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor">
                              <rect width="8" height="8" rx="1" />
                            </svg>
                          </span>
                          <span className="text-stone-300 text-sm leading-relaxed">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Culture / Expectations */}
      <section className="section-spacing bg-stone-900/30">
        <div className="page-container">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn>
              <p className="text-xs uppercase tracking-[0.25em] text-stone-500 font-sans font-medium mb-4">
                Our Culture
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="text-3xl md:text-4xl font-serif mb-8">
                This is not a standard job.
              </h2>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="text-lg text-stone-300 leading-relaxed mb-8">
                At Wilson Collective Group LLC, every team member may be asked to work
                across different brands and projects. We value creativity, efficiency,
                and dedication. If you're ready to grow with us and make an impact,
                we want you on our team.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-stone-400 leading-relaxed">
                Working here means being part of a multi-brand creative ecosystem.
                You'll collaborate across studios, contribute to launches for different
                brands, and help shape the direction of an entire portfolio of ventures.
                We don't just want employees — we want people who think like builders,
                who adapt, who care about the work, and who are ready to grow alongside
                something real.
              </p>
            </FadeIn>
          </div>

          {/* Multi-brand visual */}
          <FadeIn delay={0.25}>
            <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {brands.map((brand) => (
                <div
                  key={brand}
                  className="py-5 px-4 border border-stone-800/40 text-center hover:border-accent/20 transition-colors duration-500"
                >
                  <p className="text-xs text-stone-400 font-sans">{brand}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-stone-600 mt-4">
              You may contribute to any brand or project within the WCG LLC ecosystem.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Application Form */}
      <section className="section-spacing" id="apply">
        <div className="page-container">
          <div className="max-w-3xl mx-auto">
            <FadeIn>
              <p className="text-xs uppercase tracking-[0.25em] text-stone-500 font-sans font-medium mb-4">
                Apply Now
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="text-3xl md:text-4xl font-serif mb-4">
                Submit your application.
              </h2>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="text-stone-400 leading-relaxed mb-12">
                Fill out the form below completely and honestly. We review every application
                carefully. If there's a fit, we will reach out to schedule a conversation.
              </p>
            </FadeIn>

            <CareerApplicationForm />
          </div>
        </div>
      </section>
    </>
  )
}
