export default function AdminLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return <div>
      <div className="bg-white/25 p-4 rounded-lg backdrop-blur xl:mx-64 lg:mx-32 md:mx-16 mx-8 mt-4 mb-8">
        {children}
      </div>
      <div className="bg-white/25 p-4 rounded-lg backdrop-blur xl:mx-64 lg:mx-32 md:mx-16 mx-8 mt-4 mb-8">
        <a href="https://giessen.dlrg.de/impressum-und-datenschutz/">Impressum</a>
      </div>
    </div>
  }