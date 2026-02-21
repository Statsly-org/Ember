'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'

const FAQ_ITEMS = [
  {
    question: 'What services do you offer?',
    answer: 'We specialize in custom Minecraft plugin development, server setup, optimization, and consulting. Our team of Trusted Minecraft Developers delivers premium solutions tailored to your needs.',
  },
  {
    question: 'How can I get started?',
    answer: 'Reach out through our Discord server with your project details. We\'ll schedule a consultation to discuss your requirements and provide a custom quote.',
  },
  {
    question: 'What does "Trusted Minecraft Developer" mean?',
    answer: 'We only work with developers who have worked or are working at well-known servers and can demonstrate proven code quality. Our team maintains professional standards through experience and portfolio.',
  },
  {
    question: 'Do you offer support after delivery?',
    answer: 'Yes. All our projects include post-delivery support. We stand behind our work and are committed to ensuring your project runs smoothly.',
  },
  {
    question: 'What is your typical turnaround time?',
    answer: 'Timeline depends on project scope. Simple plugins may take 1–2 weeks, while larger custom solutions can take several weeks. We provide estimates during consultation.',
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="faq-section">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      <div className="faq-list">
        {FAQ_ITEMS.map((item, index) => (
          <motion.div
            key={index}
            className={`faq-item ${openIndex === index ? 'open' : ''}`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.4, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              className="faq-question"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              aria-expanded={openIndex === index}
            >
              {item.question}
              <Plus className="faq-icon" size={20} aria-hidden />
            </button>
            <div className="faq-answer">
              <p>{item.answer}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
