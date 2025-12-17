"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code2, Database, Brain, Sparkles, Cpu, Globe, Zap } from "lucide-react"

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-background">
      {/* Grid pattern - more visible */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(220, 38, 38, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(220, 38, 38, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Gradient orbs - more visible */}
      <div className="absolute top-10 right-0 w-[500px] h-[500px] bg-gradient-to-br from-red-500/30 to-red-600/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-[600px] h-[600px] bg-gradient-to-tr from-blue-500/25 to-blue-600/15 rounded-full blur-3xl" />

      <motion.div
        className="absolute top-32 left-[5%] text-red-500/60"
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        <Code2 className="w-16 h-16 md:w-20 md:h-20" strokeWidth={1.5} />
      </motion.div>

      <motion.div
        className="absolute top-48 right-[8%] text-blue-500/60"
        animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
      >
        <Database className="w-14 h-14 md:w-18 md:h-18" strokeWidth={1.5} />
      </motion.div>

      <motion.div
        className="absolute bottom-32 left-[8%] text-red-500/50"
        animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 4.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
      >
        <Brain className="w-20 h-20 md:w-24 md:h-24" strokeWidth={1.5} />
      </motion.div>

      <motion.div
        className="absolute top-[35%] right-[12%] text-blue-500/50"
        animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 5.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1.5 }}
      >
        <Cpu className="w-16 h-16 md:w-20 md:h-20" strokeWidth={1.5} />
      </motion.div>

      <motion.div
        className="absolute bottom-[25%] right-[5%] text-red-500/40"
        animate={{ y: [0, -10, 0], x: [0, 10, 0] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        <Globe className="w-12 h-12 md:w-16 md:h-16" strokeWidth={1.5} />
      </motion.div>

      <motion.div
        className="absolute top-[55%] left-[12%] text-blue-500/40"
        animate={{ y: [0, 10, 0], x: [0, -10, 0] }}
        transition={{ duration: 3.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.8 }}
      >
        <Zap className="w-10 h-10 md:w-14 md:h-14" strokeWidth={1.5} />
      </motion.div>

      <motion.div
        className="absolute top-[20%] left-[25%] text-red-500/30"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        <Sparkles className="w-8 h-8" strokeWidth={1.5} />
      </motion.div>

      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.15 }}>
        <motion.line
          x1="10%"
          y1="30%"
          x2="25%"
          y2="20%"
          stroke="currentColor"
          strokeWidth="1"
          className="text-red-500"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        />
        <motion.line
          x1="75%"
          y1="25%"
          x2="88%"
          y2="40%"
          stroke="currentColor"
          strokeWidth="1"
          className="text-blue-500"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 0.5 }}
        />
        <motion.line
          x1="12%"
          y1="70%"
          x2="30%"
          y2="55%"
          stroke="currentColor"
          strokeWidth="1"
          className="text-red-500"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 1 }}
        />
      </svg>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 text-balance"
          >
            La technologie vous dépasse ? <span className="text-primary">Parfait.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-pretty leading-relaxed"
          >
            Nous maîtrisons la technologie pour que vous puissiez la vivre sans stress. Des agents IA aux solutions
            blockchain, nous construisons l'avenir de votre entreprise.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 h-12 text-base"
              asChild
            >
              <a href="#contact">
                Démarrer votre projet
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 h-12 text-base border-border hover:bg-muted bg-transparent"
              asChild
            >
              <a href="#services">Découvrir nos services</a>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-border"
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-foreground">50+</div>
              <div className="text-sm text-muted-foreground mt-1">Projets livrés</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-foreground">100%</div>
              <div className="text-sm text-muted-foreground mt-1">Clients satisfaits</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">IA</div>
              <div className="text-sm text-muted-foreground mt-1">Approche prioritaire</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
