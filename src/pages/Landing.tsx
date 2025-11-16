import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="h-screen bg-[#000000] flex flex-col relative animate-fade-in" style={{ animationDuration: '300ms' }}>
      {/* Top-Right Navigation */}
      <header className="absolute top-0 right-0 z-50 px-8 py-6">
        <div className="flex gap-2 items-center text-[14px]">
          <Link 
            to="/auth" 
            className="text-white hover:text-[#D4AF37] transition-all duration-150"
          >
            Login
          </Link>
          <span className="text-white/40">·</span>
          <Link 
            to="/about" 
            className="text-white hover:text-[#D4AF37] transition-all duration-150"
          >
            About
          </Link>
        </div>
      </header>

      {/* Center Hero Content */}
      <main className="flex-1 flex items-center justify-center px-8 md:px-6">
        <div className="text-center space-y-6 md:space-y-8">
          {/* Logo - Clickable to home */}
          <Link to="/" className="inline-block group">
            <h1 className="text-[40px] font-bold text-white transition-all duration-150 group-hover:scale-[1.02] group-hover:drop-shadow-[0_0_20px_rgba(212,175,55,0.5)]">
              KaNeXT IQ<span className="text-[#D4AF37]">™</span>
            </h1>
          </Link>

          {/* Primary Tagline */}
          <h2 className="text-[40px] font-bold text-white">
            The Future of Sports Intelligence
          </h2>

          {/* Module Line */}
          <p className="text-[18px] text-white/60 font-normal">
            Basketball IQ™ — Guided by your AI Assistant, Coach K™
          </p>

          {/* Gold Divider Line */}
          <div className="flex justify-center py-4">
            <div className="w-[80px] h-[1px] bg-[#D4AF37]" />
          </div>

          {/* CTAs */}
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center pt-4">
            <Link to="/auth">
              <button className="px-8 py-3 text-[16px] font-semibold text-[#D4AF37] bg-transparent border border-[#D4AF37] rounded transition-all duration-150 hover:bg-[#D4AF37] hover:text-[#000000] hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(212,175,55,0.5)]">
                Enter Platform
              </button>
            </Link>
            <Link to="/about">
              <button className="px-8 py-3 text-[16px] font-semibold text-[#D4AF37] bg-transparent border border-[#D4AF37] rounded transition-all duration-150 hover:bg-[#D4AF37] hover:text-[#000000] hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(212,175,55,0.5)]">
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;
