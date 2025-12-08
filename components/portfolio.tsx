import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"

const projects = [
  {
    name: "WinEdge.io",
    sector: "Fintech",
    description:
      "AI-powered financial platform with open banking integration, token staking, and crypto savings features.",
    technologies: ["AI", "Open Banking", "Staking Token", "Crypto Savings"],
    color: "bg-primary/10",
  },
  {
    name: "Zara Empire",
    sector: "Marketplace",
    description: "Multi-vendor e-commerce platform with complex payment systems and fractional payment options.",
    technologies: ["Multi-Store", "Fractional Payment", "E-commerce"],
    color: "bg-secondary/10",
  },
  {
    name: "SoibyTrust",
    sector: "Real Estate",
    description: "Construction site audit platform with crypto-based fund release mechanism for secure transactions.",
    technologies: ["Site Audit", "Crypto Fund Release", "Smart Contracts"],
    color: "bg-primary/10",
  },
  {
    name: "Embassy of Comoros",
    sector: "Institutional",
    description: "Dematerialization solution with GDPR compliance and secure forms for government services.",
    technologies: ["Dematerialization", "GDPR", "Secure Forms"],
    color: "bg-secondary/10",
  },
]

export function Portfolio() {
  return (
    <section id="portfolio" className="py-20 md:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-medium text-primary uppercase tracking-wider">Our Work</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6 text-balance">
            Flagship Projects
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            A selection of transformative projects that showcase our expertise across diverse industries.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="group overflow-hidden border-border hover:border-primary/30 transition-all duration-300 bg-card"
            >
              {/* Project Header Bar */}
              <div className={`h-2 ${project.color}`} />
              <CardContent className="p-6 md:p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-card-foreground group-hover:text-primary transition-colors">
                      {project.name}
                    </h3>
                    <Badge variant="secondary" className="mt-2 bg-muted text-muted-foreground">
                      {project.sector}
                    </Badge>
                  </div>
                  <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="outline" className="text-xs border-border text-muted-foreground">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
