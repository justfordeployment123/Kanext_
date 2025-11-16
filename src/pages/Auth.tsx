import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get("mode") === "create" ? "create" : "signin";
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [selectedLeague, setSelectedLeague] = useState<string>("");

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError("");
    
    // Simulate authentication check
    setTimeout(() => {
      const email = (e.target as HTMLFormElement).email.value;
      const password = (e.target as HTMLFormElement).password.value;
      
      // Simple validation example - replace with actual auth logic
      if (email && password.length >= 6) {
        navigate("/office");
      } else {
        setLoginError("Invalid email or password. Please check your credentials.");
        setIsLoading(false);
      }
    }, 800);
  };

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate account creation
    setTimeout(() => {
      navigate("/office");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#000000] px-4 py-8 animate-fade-in" style={{ animationDuration: '300ms' }}>
      <div className="w-full max-w-[480px] mx-auto my-8">
        {/* Logo - Clickable back to landing */}
        <Link to="/" className="flex justify-center mb-8 group">
          <h1 className="text-[32px] font-bold text-white transition-all duration-150 group-hover:text-[#D4AF37]">
            KaNeXT IQ<span className="text-[#D4AF37]">™</span>
          </h1>
        </Link>

        {/* Auth Card */}
        <div className="bg-[#1a1a1a] border border-[#333333] rounded-lg overflow-hidden">
          {/* Tab Header */}
          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-[#0a0a0a] border-b border-[#333333] rounded-none h-14">
              <TabsTrigger 
                value="signin" 
                className="text-[14px] font-semibold text-white/60 data-[state=active]:text-[#D4AF37] data-[state=active]:bg-[#1a1a1a] data-[state=active]:border-b-2 data-[state=active]:border-[#D4AF37] rounded-none"
              >
                Sign In
              </TabsTrigger>
              <TabsTrigger 
                value="create" 
                className="text-[14px] font-semibold text-white/60 data-[state=active]:text-[#D4AF37] data-[state=active]:bg-[#1a1a1a] data-[state=active]:border-b-2 data-[state=active]:border-[#D4AF37] rounded-none"
              >
                Create Account
              </TabsTrigger>
            </TabsList>

            {/* Sign In Form */}
            <TabsContent value="signin" className="p-8">
              <form onSubmit={handleSignIn} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[14px] text-white">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="coach@example.com"
                    required
                    className="bg-[#0a0a0a] border-[#333333] text-white text-[14px] focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-[14px] text-white">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="bg-[#0a0a0a] border-[#333333] text-white text-[14px] focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                  />
                </div>
                
                {loginError && (
                  <div className="text-[12px] text-red-400 bg-red-900/20 border border-red-900/50 rounded px-3 py-2">
                    {loginError}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-transparent border border-[#D4AF37] text-[#D4AF37] text-[14px] font-semibold hover:bg-[#D4AF37] hover:text-[#000000] transition-all duration-150"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    className="text-[14px] text-white/60 hover:text-[#D4AF37] transition-colors"
                    onClick={() => {
                      // Add forgot password logic here
                      alert("Password reset link will be sent to your email");
                    }}
                  >
                    Forgot Password?
                  </button>
                </div>
              </form>
            </TabsContent>

            {/* Create Account Form */}
            <TabsContent value="create" className="p-8">
              <form onSubmit={handleCreateAccount} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="fullname" className="text-[14px] text-white">Full Name</Label>
                  <Input
                    id="fullname"
                    type="text"
                    placeholder="John Smith"
                    required
                    className="bg-[#0a0a0a] border-[#333333] text-white text-[14px] focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-new" className="text-[14px] text-white">Email</Label>
                  <Input
                    id="email-new"
                    type="email"
                    placeholder="coach@example.com"
                    required
                    className="bg-[#0a0a0a] border-[#333333] text-white text-[14px] focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-new" className="text-[14px] text-white">Password</Label>
                  <Input
                    id="password-new"
                    type="password"
                    placeholder="Min 8 characters"
                    minLength={8}
                    required
                    className="bg-[#0a0a0a] border-[#333333] text-white text-[14px] focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="team" className="text-[14px] text-white">Team Name</Label>
                  <Input
                    id="team"
                    type="text"
                    placeholder="Your Team"
                    required
                    className="bg-[#0a0a0a] border-[#333333] text-white text-[14px] focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="league" className="text-[14px] text-white">League</Label>
                  <Select required onValueChange={(value) => setSelectedLeague(value)}>
                    <SelectTrigger className="bg-[#0a0a0a] border-[#333333] text-white text-[14px]">
                      <SelectValue placeholder="Select League" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a1a1a] border-[#333333]">
                      <SelectItem value="ncaa" className="text-white">NCAA</SelectItem>
                      <SelectItem value="naia" className="text-white">NAIA</SelectItem>
                      <SelectItem value="uscaa" className="text-white">USCAA</SelectItem>
                      <SelectItem value="nccaa" className="text-white">NCCAA</SelectItem>
                      <SelectItem value="juco" className="text-white">JUCO</SelectItem>
                      <SelectItem value="pro" className="text-white">Pro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {selectedLeague === "ncaa" && (
                  <div className="space-y-2">
                    <Label htmlFor="division" className="text-[14px] text-white">Division</Label>
                    <Select required>
                      <SelectTrigger className="bg-[#0a0a0a] border-[#333333] text-white text-[14px]">
                        <SelectValue placeholder="Select Division" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a1a1a] border-[#333333]">
                        <SelectItem value="d1" className="text-white">D1</SelectItem>
                        <SelectItem value="d2" className="text-white">D2</SelectItem>
                        <SelectItem value="d3" className="text-white">D3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="offense" className="text-[14px] text-white">Offensive System</Label>
                  <Select required>
                    <SelectTrigger className="bg-[#0a0a0a] border-[#333333] text-white text-[14px]">
                      <SelectValue placeholder="Select System" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a1a1a] border-[#333333]">
                      <SelectItem value="five-out" className="text-white">Five-Out</SelectItem>
                      <SelectItem value="motion" className="text-white">Motion / Read & React</SelectItem>
                      <SelectItem value="pace-space" className="text-white">Pace & Space</SelectItem>
                      <SelectItem value="post-centric" className="text-white">Post-Centric</SelectItem>
                      <SelectItem value="moreyball" className="text-white">Moreyball</SelectItem>
                      <SelectItem value="spread-pnr" className="text-white">Spread Pick-and-Roll</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="defense" className="text-[14px] text-white">Defensive System</Label>
                  <Select required>
                    <SelectTrigger className="bg-[#0a0a0a] border-[#333333] text-white text-[14px]">
                      <SelectValue placeholder="Select System" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a1a1a] border-[#333333]">
                      <SelectItem value="pack-line" className="text-white">Pack Line</SelectItem>
                      <SelectItem value="havoc" className="text-white">Havoc</SelectItem>
                      <SelectItem value="switch-heavy" className="text-white">Switch-Heavy</SelectItem>
                      <SelectItem value="zone" className="text-white">Zone</SelectItem>
                      <SelectItem value="no-middle" className="text-white">No-Middle</SelectItem>
                      <SelectItem value="base-man" className="text-white">Base Man-to-Man</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Avatar Upload - Beautiful Design */}
                <div className="flex justify-center pt-4">
                  <div className="relative">
                    <input
                      id="avatar"
                      type="file"
                      accept="image/png,image/jpeg,image/jpg"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="avatar"
                      className="flex items-center justify-center w-24 h-24 rounded-full bg-[#0a0a0a] border-2 border-dashed border-[#D4AF37] cursor-pointer hover:bg-[#1a1a1a] transition-all duration-150 overflow-hidden group"
                    >
                      {avatarPreview ? (
                        <img src={avatarPreview} alt="Avatar preview" className="w-full h-full object-cover" />
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                          <User className="w-8 h-8 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                          <Upload className="w-4 h-4 text-[#D4AF37]/60" />
                        </div>
                      )}
                    </label>
                    {avatarPreview && (
                      <button
                        type="button"
                        onClick={() => setAvatarPreview(null)}
                        className="absolute -top-1 -right-1 w-6 h-6 bg-[#D4AF37] rounded-full flex items-center justify-center text-[#000000] text-xs font-bold hover:bg-[#D4AF37]/80 transition-all"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>
                <p className="text-center text-[12px] text-white/40">Upload Avatar (Optional)</p>

                <Button
                  type="submit"
                  className="w-full bg-transparent border border-[#D4AF37] text-[#D4AF37] text-[14px] font-semibold hover:bg-[#D4AF37] hover:text-[#000000] transition-all duration-150 mt-6"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer Links */}
        <div className="mt-6 text-center text-[14px]">
          <Link to="/privacy" className="text-white/60 hover:text-[#D4AF37] transition-colors">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Auth;
