"use client"

import { motion } from "framer-motion"
import { Linkedin, Twitter, Github } from "lucide-react"

const footerLinks = {
  services: [
    { label: "Solutions IA", href: "#services" },
    { label: "Blockchain", href: "#services" },
    { label: "Fintech", href: "#services" },
    { label: "Marketplace", href: "#services" },
    { label: "WordPress", href: "#services" },
  ],
  company: [
    { label: "À propos", href: "#about" },
    { label: "Méthodologie", href: "#methodology" },
    { label: "Contact", href: "#contact" },
  ],
}

const socialLinks = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Github, href: "#", label: "GitHub" },
]

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-foreground text-background py-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <img src="/images/logo-soiby.png" alt="SOIBY Web Agency" className="h-10 w-auto brightness-0 invert mb-4" />
            <p className="text-background/70 max-w-sm leading-relaxed mb-6">
              Nous maîtrisons la technologie pour que vous puissiez la vivre sans stress. Votre partenaire digital pour
              l'IA, la blockchain, la fintech et le développement web.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-background/70 hover:text-background transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-4">Entreprise</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-background/70 hover:text-background transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-background/50 text-sm">
            © {new Date().getFullYear()} SOIBY Web Agency. Tous droits réservés.
          </p>
          <p className="text-background/50 text-sm">Respirez... vous êtes chez SOIBY.</p>
        </div>
      </div>
    </motion.footer>
  )
}
