export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-32">

      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="mb-16 text-center">

          <div className="inline-block bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-4 py-2 rounded-full text-sm mb-6">
            Smart Utility Tools
          </div>

          <h1 className="text-5xl font-bold mb-6">
            Free IT &
            <span className="text-cyan-400"> Productivity Tools</span>
          </h1>

          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
            Powerful online utilities designed to simplify
            IT operations, productivity tasks and business workflows.
          </p>

        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Tool 1 */}
          <div className="group bg-black border border-gray-800 hover:border-cyan-400 rounded-3xl p-8 transition duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]">

            <div className="text-5xl mb-6">📄</div>

            <h2 className="text-2xl font-semibold mb-4 text-cyan-400">
              PDF Tools
            </h2>

            <p className="text-gray-400 leading-relaxed">
              Merge PDF, compress files,
              split PDF and image-to-PDF utilities.
            </p>

          </div>

          {/* Tool 2 */}
          <div className="group bg-black border border-gray-800 hover:border-cyan-400 rounded-3xl p-8 transition duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]">

            <div className="text-5xl mb-6">🌐</div>

            <h2 className="text-2xl font-semibold mb-4 text-cyan-400">
              Network Tools
            </h2>

            <p className="text-gray-400 leading-relaxed">
              IP checker, DNS lookup,
              port checker and password generators.
            </p>

          </div>

          {/* Tool 3 */}
          <div className="group bg-black border border-gray-800 hover:border-cyan-400 rounded-3xl p-8 transition duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]">

            <div className="text-5xl mb-6">📹</div>

            <h2 className="text-2xl font-semibold mb-4 text-cyan-400">
              CCTV Calculators
            </h2>

            <p className="text-gray-400 leading-relaxed">
              Storage calculators, bitrate estimators
              and surveillance planning utilities.
            </p>

          </div>

          {/* Tool 4 */}
          <div className="group bg-black border border-gray-800 hover:border-cyan-400 rounded-3xl p-8 transition duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]">

            <div className="text-5xl mb-6">🤖</div>

            <h2 className="text-2xl font-semibold mb-4 text-cyan-400">
              AI Writing Tools
            </h2>

            <p className="text-gray-400 leading-relaxed">
              Generate emails, SOPs,
              complaint letters and IT documentation.
            </p>

          </div>

          {/* Tool 5 */}
          <div className="group bg-black border border-gray-800 hover:border-cyan-400 rounded-3xl p-8 transition duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]">

            <div className="text-5xl mb-6">🧾</div>

            <h2 className="text-2xl font-semibold mb-4 text-cyan-400">
              Office Utilities
            </h2>

            <p className="text-gray-400 leading-relaxed">
              GST invoice generators,
              quotation creators and salary slip tools.
            </p>

          </div>

          {/* Tool 6 */}
          <div className="group bg-black border border-gray-800 hover:border-cyan-400 rounded-3xl p-8 transition duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]">

            <div className="text-5xl mb-6">⚙️</div>

            <h2 className="text-2xl font-semibold mb-4 text-cyan-400">
              Automation Tools
            </h2>

            <p className="text-gray-400 leading-relaxed">
              Smart utilities for automation,
              monitoring and workflow management.
            </p>

          </div>

        </div>

      </div>

    </main>
  );
}