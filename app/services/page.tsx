export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-32">

      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="mb-16 text-center">

          <div className="inline-block bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-4 py-2 rounded-full text-sm mb-6">
            Professional IT Services
          </div>

          <h1 className="text-5xl font-bold mb-6">
            Complete Technology &
            <span className="text-cyan-400"> Infrastructure Support</span>
          </h1>

          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
            Professional IT support, surveillance solutions,
            cybersecurity services and enterprise infrastructure
            assistance for businesses and organizations.
          </p>

        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Card 1 */}
          <div className="bg-black border border-gray-800 rounded-3xl p-8 hover:border-cyan-400 transition duration-300 hover:-translate-y-2">

            <div className="text-5xl mb-6">💻</div>

            <h2 className="text-2xl font-semibold mb-4 text-cyan-400">
              Remote IT Support
            </h2>

            <p className="text-gray-400 leading-relaxed">
              Fast troubleshooting, software installation,
              Windows support, printer setup and remote assistance
              for office environments.
            </p>

          </div>

          {/* Card 2 */}
          <div className="bg-black border border-gray-800 rounded-3xl p-8 hover:border-cyan-400 transition duration-300 hover:-translate-y-2">

            <div className="text-5xl mb-6">🛡️</div>

            <h2 className="text-2xl font-semibold mb-4 text-cyan-400">
              Firewall & Security
            </h2>

            <p className="text-gray-400 leading-relaxed">
              Firewall configuration, VPN setup,
              access management, network security
              and cybersecurity assistance.
            </p>

          </div>

          {/* Card 3 */}
          <div className="bg-black border border-gray-800 rounded-3xl p-8 hover:border-cyan-400 transition duration-300 hover:-translate-y-2">

            <div className="text-5xl mb-6">📹</div>

            <h2 className="text-2xl font-semibold mb-4 text-cyan-400">
              Surveillance Support
            </h2>

            <p className="text-gray-400 leading-relaxed">
              CCTV setup, DVR/NVR troubleshooting,
              ATM surveillance systems and remote monitoring support.
            </p>

          </div>

          {/* Card 4 */}
          <div className="bg-black border border-gray-800 rounded-3xl p-8 hover:border-cyan-400 transition duration-300 hover:-translate-y-2">

            <div className="text-5xl mb-6">🏢</div>

            <h2 className="text-2xl font-semibold mb-4 text-cyan-400">
              Data Center Support
            </h2>

            <p className="text-gray-400 leading-relaxed">
              Rack installation, hardware replacement,
              smart hands support and infrastructure assistance.
            </p>

          </div>

          {/* Card 5 */}
          <div className="bg-black border border-gray-800 rounded-3xl p-8 hover:border-cyan-400 transition duration-300 hover:-translate-y-2">

            <div className="text-5xl mb-6">♻️</div>

            <h2 className="text-2xl font-semibold mb-4 text-cyan-400">
              E-Waste Management
            </h2>

            <p className="text-gray-400 leading-relaxed">
              Safe IT asset disposal, e-waste handling,
              hardware recycling and office equipment management.
            </p>

          </div>

          {/* Card 6 */}
          <div className="bg-black border border-gray-800 rounded-3xl p-8 hover:border-cyan-400 transition duration-300 hover:-translate-y-2">

            <div className="text-5xl mb-6">🤖</div>

            <h2 className="text-2xl font-semibold mb-4 text-cyan-400">
              AI Automation
            </h2>

            <p className="text-gray-400 leading-relaxed">
              AI-powered tools, workflow automation,
              reporting utilities and smart business solutions.
            </p>

          </div>

        </div>

      </div>

    </main>
  );
}