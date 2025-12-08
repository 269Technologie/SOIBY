"use client"

import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"

const values = [
  "Accompagnement de A à Z, sans jargon ni pression",
  "Une équipe d'élite experte en innovation concrète",
  "Vous gagnez du temps, de la clarté et de la puissance technologique",
  "Vous maîtrisez votre image et vos outils sans prise de tête",
  "Un partenaire, pas juste un prestataire",
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

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
}

export function About() {
  return (
    <section id="about" className="py-20 md:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-sm font-medium text-primary uppercase tracking-wider">À propos</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6 text-balance">
              Pourquoi SOIBY existe ?
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Parce qu'aujourd'hui, la technologie n'attend personne. Et pendant que d'autres essaient encore de
              comprendre les bases, nous construisons déjà le futur.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Chez SOIBY, notre mission est claire :{" "}
              <span className="text-foreground font-medium">
                Maîtriser la technologie pour que vous puissiez la vivre, sans jamais la subir.
              </span>
            </p>

            {/* Values List */}
            <motion.ul
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-4"
            >
              {values.map((value, index) => (
                <motion.li key={index} variants={itemVariants} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{value}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 via-secondary/20 to-primary/10 p-8 flex items-center justify-center">
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-6xl md:text-8xl font-bold text-primary mb-4"
                >
                  {"<"}/{">"}
                </motion.div>
                <p className="text-lg text-muted-foreground">
                  On s'occupe de tout. <br />
                  <span className="text-foreground font-medium">Respirez... vous êtes chez SOIBY.</span>
                </p>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-secondary/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
