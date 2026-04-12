'use client'

import { motion } from 'framer-motion'

const companies = [
  { name: 'Siemens', sector: 'Technology' },
  { name: 'Bosch', sector: 'Industrial' },
  { name: 'Volkswagen', sector: 'Automotive' },
  { name: 'Schneider Electric', sector: 'Energy' },
  { name: 'ABB', sector: 'Industrial' },
  { name: 'Philips', sector: 'Healthcare' },
]

function CompanyLogo({ name, sector, index }: { name: string; sector: string; index: number }) {
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2)
  
  const colors: Record<string, string> = {
    Technology: 'from-blue-500 to-blue-600',
    Industrial: 'from-slate-600 to-slate-700',
    Automotive: 'from-red-500 to-red-600',
    Energy: 'from-green-500 to-green-600',
    Healthcare: 'from-cyan-500 to-cyan-600',
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex items-center gap-3 px-6 py-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all group"
    >
      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colors[sector] || 'from-gray-500 to-gray-600'} flex items-center justify-center text-white font-bold text-lg shadow-sm`}>
        {initials}
      </div>
      <div>
        <p className="font-semibold text-gray-800 group-hover:text-primary transition-colors">{name}</p>
        <p className="text-xs text-gray-500">{sector}</p>
      </div>
    </motion.div>
  )
}

function StatCard({ value, label, delay }: { value: string; label: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="text-center p-6"
    >
      <p className="text-3xl md:text-4xl font-bold text-white mb-1">{value}</p>
      <p className="text-sm text-white/70">{label}</p>
    </motion.div>
  )
}

export function TrustedBy() {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-4">
            <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium text-primary">Trusted by Industry Leaders</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Trusted by Leading European Companies
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Over 1,000 businesses across Europe rely on PrintGround EU for their corporate merchandise needs
          </p>
        </motion.div>

        {/* Company Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {companies.map((company, index) => (
            <CompanyLogo key={company.name} {...company} index={index} />
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gradient-to-r from-primary via-primary to-primary/90 rounded-2xl p-8 md:p-12 text-white"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard value="1,000+" label="Happy Clients" delay={0.5} />
            <StatCard value="27" label="EU Countries" delay={0.6} />
            <StatCard value="1,500+" label="Products" delay={0.7} />
            <StatCard value="15+" label="Years Experience" delay={0.8} />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
