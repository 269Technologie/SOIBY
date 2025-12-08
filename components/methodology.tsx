"use client"

import { motion } from "framer-motion"

const steps = [
  {
    number: "01",
    title: "Cadrage & Compréhension",
    description: "Nous écoutons. Nous challengeons. Nous clarifions les zones d'ombre.",
  },
  {
    number: "02",
    title: "Prototype & UX Storytelling",
    description: "Nous concevons un parcours client qui donne envie d'acheter, de cliquer, de s'abonner.",
  },
  {
    number: "03",
    title: "Développement",
    description:
      "Nous codons, connectons, sécurisons. Tech : React, Laravel, Flask, Solidity, WordPress, Bridge API, GPT-4o, et plus.",
  },
  {
    number: "04",
    title: "Tests & Lancement",
    description: "Votre projet passe en mode production, avec un contrôle qualité renforcé.",
  },
  {
    number: "05",
    title: "Suivi & Évolution",
    description: "Vous ne serez jamais seul. Chaque projet est accompagné dans le temps.",
  },
]

export function Methodology() {
  return (
    <section id="methodology" className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-sm font-medium text-primary uppercase tracking-wider">Comment nous travaillons</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6 text-balance">
            La Méthodologie SOIBY
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Simple, agile et efficace. Notre processus éprouvé assure le succès de votre projet.
          </p>
        </motion.div>

        {/* Steps - Improved layout */}
        <div className="relative max-w-4xl mx-auto">
          {/* Connection Line */}
          <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-border" />

          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex items-start gap-6 md:gap-12 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Center Dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                  className="absolute left-6 md:left-1/2 w-3 h-3 bg-primary rounded-full -translate-x-1/2 top-2 z-10"
                />

                {/* Content */}
                <div
                  className={`flex-1 pl-12 md:pl-0 ${index % 2 === 0 ? "md:text-right md:pr-12" : "md:text-left md:pl-12"}`}
                >
                  <span className="text-4xl md:text-5xl font-bold text-primary/20">{step.number}</span>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mt-2 mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>

                {/* Empty space for alignment on desktop */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
