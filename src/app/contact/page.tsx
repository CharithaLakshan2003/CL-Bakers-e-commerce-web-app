'use client';
import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Visit Our Bakery',
    lines: ['123 Artisan Lane', 'Colombo 03, Sri Lanka'],
  },
  {
    icon: Phone,
    title: 'Call Us',
    lines: ['+94 11 234 5678', '+94 77 890 1234'],
  },
  {
    icon: Mail,
    title: 'Email Us',
    lines: ['hello@clbakers.com', 'orders@clbakers.com'],
  },
  {
    icon: Clock,
    title: 'Opening Hours',
    lines: ['Mon – Sat: 6:00 AM – 8:00 PM', 'Sunday: 7:00 AM – 5:00 PM'],
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate a network request
    await new Promise(r => setTimeout(r, 1200));
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <>
      <Header />
      <main className="pt-24 pb-16 min-h-screen bg-bg">

        {/* ── Hero Banner ── */}
        <section className="-mt-24 relative py-20 overflow-hidden">
          <div className="container-custom relative z-10 text-center">
            <p className="text-primary-600 font-medium tracking-widest uppercase text-sm mb-3 mt-15">Get In Touch</p>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-4">
              We&apos;d Love to Hear From You
            </h1>
            <p className="text-primary-600 text-lg max-w-xl mx-auto">
              Whether you have a question about an order, want to plan a custom cake, or simply want to say hello — we&apos;re here for you.
            </p>
          </div>
        </section>

        {/* ── Info Cards ── */}
        <section className="container-custom mt-10 z-10 relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactInfo.map(({ icon: Icon, title, lines }) => (
              <div
                key={title}
                className="bg-card-bg border border-border rounded-2xl p-6 shadow-warm flex flex-col gap-3 hover:shadow-warm-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center text-primary-600">
                  <Icon size={22} />
                </div>
                <div>
                  <p className="font-semibold text-text-primary text-sm mb-1">{title}</p>
                  {lines.map(l => (
                    <p key={l} className="text-text-muted text-sm">{l}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Main Content: Form + Map ── */}
        <section className="container-custom mt-14 grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Contact Form */}
          <div className="bg-card-bg border border-border rounded-2xl p-8 shadow-warm">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center gap-4 animate-fade-in-up">
                <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <CheckCircle className="text-green-600" size={32} />
                </div>
                <h2 className="font-display text-2xl font-bold text-text-primary">Message Sent!</h2>
                <p className="text-text-muted max-w-xs">
                  Thank you for reaching out! Our team will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                  className="mt-4 px-6 py-2.5 bg-primary-600 text-white rounded-full text-sm font-medium hover:bg-primary-700 transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <h2 className="font-display text-2xl font-bold text-text-primary mb-1">Send Us a Message</h2>
                <p className="text-text-muted text-sm mb-6">Fill in the form below and we&apos;ll respond as soon as possible.</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-sm font-medium text-text-secondary mb-1.5">Full Name</label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-bg text-text-primary placeholder-text-muted text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-900/50 transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-sm font-medium text-text-secondary mb-1.5">Email Address</label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-bg text-text-primary placeholder-text-muted text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-900/50 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block text-sm font-medium text-text-secondary mb-1.5">Subject</label>
                    <select
                      id="contact-subject"
                      name="subject"
                      required
                      value={form.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-bg text-text-primary text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-900/50 transition-all appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Select a subject...</option>
                      <option value="order">Order Enquiry</option>
                      <option value="custom-cake">Custom Cake Request</option>
                      <option value="feedback">Feedback</option>
                      <option value="wholesale">Wholesale / Catering</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-medium text-text-secondary mb-1.5">Message</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      required
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help you..."
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-bg text-text-primary placeholder-text-muted text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-900/50 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-full transition-all shadow-warm hover:shadow-warm-lg disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>

          {/* Map + Extra Info */}
          <div className="flex flex-col gap-6">
            {/* Embedded Google Map */}
            <div className="rounded-2xl overflow-hidden border border-border shadow-warm h-72 lg:h-auto lg:flex-1">
              <iframe
                title="CL Bakers Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63371.80587396988!2d79.82118425!3d6.9218376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae253d10f7a7003%3A0x320b2e4d32d3838d!2sColombo%2003%2C%20Sri%20Lanka!5e0!3m2!1sen!2sus!4v1715000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '280px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* FAQ-style quick answers */}
            <div className="bg-card-bg border border-border rounded-2xl p-6 shadow-warm space-y-4">
              <h3 className="font-bold text-text-primary">Quick Answers</h3>
              {[
                { q: 'Can I place a custom cake order online?', a: 'Yes! Visit our Custom Cake page to design and request your dream cake.' },
                { q: 'How far in advance should I order?', a: 'We recommend at least 48 hours for standard cakes and 5–7 days for large custom orders.' },
                { q: 'Do you offer delivery?', a: 'We offer home delivery within a 15 km radius of our bakery. Free above Rs. 2,000.' },
              ].map(({ q, a }) => (
                <div key={q} className="border-b border-border last:border-0 pb-4 last:pb-0">
                  <p className="text-sm font-semibold text-text-primary mb-1">{q}</p>
                  <p className="text-sm text-text-muted">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
