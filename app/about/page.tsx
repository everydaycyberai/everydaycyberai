export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-24">

      <div className="max-w-5xl mx-auto">

        <div className="mb-12">

          <div className="inline-block bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-4 py-2 rounded-full text-sm mb-6">
            About Everyday Cyber AI
          </div>

          <h1 className="text-5xl font-bold mb-6">
            Professional IT &
            <span className="text-cyan-400"> Cyber Solutions</span>
          </h1>

          <p className="text-gray-400 text-lg leading-relaxed">
            Everyday Cyber AI provides modern IT support,
            surveillance infrastructure assistance,
            cybersecurity solutions and AI-powered business tools
            designed for businesses, offices and enterprise environments.
          </p>

        </div>

        <div className="grid md:grid-cols-2 gap-10">

          <div className="bg-black border border-gray-800 rounded-3xl p-8">

            <h2 className="text-2xl font-semibold mb-4 text-cyan-400">
              Our Mission
            </h2>

            <p className="text-gray-400 leading-relaxed">
              To provide reliable, scalable and modern IT solutions
              that help businesses operate efficiently and securely.
            </p>

          </div>

          <div className="bg-black border border-gray-800 rounded-3xl p-8">

            <h2 className="text-2xl font-semibold mb-4 text-cyan-400">
              Our Expertise
            </h2>

            <p className="text-gray-400 leading-relaxed">
              Remote IT support, firewall management,
              surveillance systems, networking,
              data center assistance and automation solutions.
            </p>

          </div>

        </div>

      </div>

    </main>
  );
}