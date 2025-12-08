"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Link, Wallet, ShoppingCart, Globe, Search, Server } from "lucide-react"

const services = [
  {
    icon: Brain,
    title: "Intelligence Artificielle Appliquée",
    description:
      "Agents IA, chatbots ultra-contextuels, génération de contenu, automatisation. Nous connectons la puissance des LLM (GPT, Claude, Mistral...) à votre business.",
  },
  {
    icon: Link,
    title: "Solutions Blockchain",
    description:
      "Création de tokens, smart contracts, wallets, staking, traçabilité. Oui, nous avons conçu un écosystème crypto complet. Ça s'appelle WinEdge.",
  },
  {
    icon: Wallet,
    title: "Développement Fintech",
    description:
      "APIs bancaires, automatisation de virements, dashboards temps réel. Nous avons connecté des banques à des interfaces simples pour des projets complexes.",
  },
  {
    icon: ShoppingCart,
    title: "Marketplace & Plateformes Scalables",
    description:
      "Multi-vendeurs, paiements complexes, dropshipping, back-offices sur mesure. Nous créons des mini-Amazon... pour vous.",
  },
  {
    icon: Globe,
    title: "Sites WordPress Premium",
    description:
      "Ultra-rapides, design pixel-perfect, SEO optimisé, évolutifs. Notre propre site, Soiby.fr, tourne sur WordPress. Et ça se voit.",
  },
  {
    icon: Search,
    title: "Audits & Restructurations",
    description:
      "Vous avez déjà un site ou une app ? Laissez-nous l'auditer. On vous dit ce qui marche, ce qui cloche, et ce qu'il faut faire pour exploser vos objectifs.",
  },
  {
    icon: Server,
    title: "Hébergement + Maintenance Managée",
    description: "Serveurs premium, sauvegardes automatiques, monitoring. Vous n'y pensez plus. Nous, si. Chaque jour.",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function Services() {
  return (
    <section id="services" className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-sm font-medium text-primary uppercase tracking-wider">Ce que nous faisons</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6 text-balance">
            Notre collection de services tech
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Couvrant divers besoins à chaque étape du processus de transformation digitale. Découvrez comment nous
            accompagnons les entreprises dans leur transformation.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={cardVariants}>
              <Card className="group h-full hover:shadow-lg transition-all duration-300 border-border hover:border-primary/30 bg-card">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-card-foreground">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
