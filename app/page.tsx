"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  X,
  Menu,
  Dumbbell,
  Heart,
  Award,
  Users,
  Flame,
  TrendingUp,
  Moon,
  Sun,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Smartphone,
  Star,
  ChevronDown,
  Zap,
  MessageCircle,
} from "lucide-react";

/* Simple X (Twitter) SVG icon to replace deprecated lucide-react Twitter icon */
function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
      <path d="M4 20l6.768 -6.768m2.46 -2.46L20 4" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   WhatsApp Widget Component
───────────────────────────────────────────────────────────── */
interface WhatsAppMessage {
  id: string;
  label: string;
  message: string;
  emoji: string;
}

const WHATSAPP_MESSAGES: WhatsAppMessage[] = [
  {
    id: "trial",
    label: "Free Trial",
    message: "Hi! I'm interested in starting my free trial membership at Strong Arm.",
    emoji: "⭐",
  },
  {
    id: "membership",
    label: "Membership Info",
    message: "Can you tell me more about your membership plans and pricing?",
    emoji: "💪",
  },
  {
    id: "trainer",
    label: "Personal Trainer",
    message: "I'd like to know about personal training services and availability.",
    emoji: "🏋️",
  },
  {
    id: "classes",
    label: "Class Schedule",
    message: "What are the available fitness classes and their timings?",
    emoji: "📅",
  },
  {
    id: "general",
    label: "General Query",
    message: "Hi! I have a question about Strong Arm Fitness Centre.",
    emoji: "❓",
  },
];

function WhatsAppWidget({ isDark }: { isDark: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleWhatsAppClick = (message: string) => {
    const phoneNumber = "917006324503";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-40 p-4 rounded-full shadow-2xl transition-all bg-green-500 hover:bg-green-600 text-white"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open WhatsApp chat"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </motion.button>

      {/* Message Menu - Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2 }}
            className={`fixed bottom-24 right-8 z-40 rounded-2xl shadow-2xl border ${
              isDark
                ? "bg-gray-900 border-white/10"
                : "bg-white border-gray-200"
            } p-3 w-80`}
          >
            {/* Header */}
            <div
              className={`pb-3 mb-3 border-b ${
                isDark ? "border-white/10" : "border-gray-200"
              }`}
            >
              <p
                className={`font-bold text-sm ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                💬 How can we help?
              </p>
              <p
                className={`text-xs ${isDark ? "text-white/60" : "text-gray-500"}`}
              >
                Choose a topic to chat about
              </p>
            </div>

            {/* Message Options */}
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {WHATSAPP_MESSAGES.map((msg) => (
                <motion.button
                  key={msg.id}
                  onClick={() => handleWhatsAppClick(msg.message)}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.97 }}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    isDark
                      ? "bg-white/5 hover:bg-green-500/20 border border-white/5 hover:border-green-500/30"
                      : "bg-gray-50 hover:bg-green-50 border border-gray-200 hover:border-green-300"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-lg mt-0.5">{msg.emoji}</span>
                    <div className="flex-1">
                      <p
                        className={`font-semibold text-sm ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {msg.label}
                      </p>
                      <p
                        className={`text-xs ${
                          isDark ? "text-white/60" : "text-gray-500"
                        }`}
                      >
                        {msg.message}
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Footer with phone number */}
            <div
              className={`mt-3 pt-3 border-t text-xs text-center ${
                isDark ? "border-white/10 text-white/50" : "border-gray-200 text-gray-400"
              }`}
            >
              <p>
                📞 Or call directly: <span className="font-semibold">7006324503</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop - Close on click outside */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-30"
          />
        )}
      </AnimatePresence>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   Theme hook — detects system preference, persists to localStorage
───────────────────────────────────────────────────────────── */
function useTheme() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const stored =
      typeof window !== "undefined"
        ? localStorage.getItem("strongarm-theme")
        : null;
    if (stored) {
      setIsDark(stored === "dark");
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      setIsDark(prefersDark);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      localStorage.setItem("strongarm-theme", next ? "dark" : "light");
      return next;
    });
  }, []);
  return { isDark, toggleTheme };
}

/* ─────────────────────────────────────────────────────────────
   Typing Effect hook
───────────────────────────────────────────────────────────── */
function useTypingEffect(
  text: string,
  speed = 60,
  pause = 1800,
  clearPause = 1200,
) {
  const [displayed, setDisplayed] = useState("");
  const [index, setIndex] = useState(0);
  const [isClearing, setIsClearing] = useState(false);

  useEffect(() => {
    let typingTimeout: NodeJS.Timeout;
    let clearTimeoutId: NodeJS.Timeout;
    if (!isClearing && index < text.length) {
      typingTimeout = setTimeout(() => {
        setDisplayed((prev) => prev + text[index]);
        setIndex((i) => i + 1);
      }, speed);
    } else if (!isClearing && index === text.length) {
      typingTimeout = setTimeout(() => setIsClearing(true), pause);
    } else if (isClearing) {
      clearTimeoutId = setTimeout(() => {
        setDisplayed("");
        setIndex(0);
        setIsClearing(false);
      }, clearPause);
    }
    return () => {
      clearTimeout(typingTimeout);
      clearTimeout(clearTimeoutId);
    };
  }, [index, isClearing, text, speed, pause, clearPause]);
  return displayed;
}

/* ─────────────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────────────── */
interface Plan {
  id: string;
  name: string;
  duration: string;
  monthlyPrice?: string;
  gst: string;
  desc: string;
  featured?: boolean;
  hasTrial: boolean;
  features: string[];
  accentColor?: string;
  gradient?: string;
}

/* ─────────────────────────────────────────────────────────────
   Plan data for Strong Arm
───────────────────────────────────────────────────────────── */
const PLANS: Plan[] = [
  {
    id: "strongarm-monthly",
    name: "Monthly Pass",
    duration: "1 Month",
    gst: "Incl. GST · Cancel anytime",
    desc: "Perfect for trying us out",
    hasTrial: true,
    accentColor: "#ef4444",
    gradient: "from-red-500 to-red-600",
    monthlyPrice: "₹1,999",
    features: [
      "Full gym access",
      "Locker room & facilities",
      "Open 6 AM - 11 PM",
      "Basic fitness orientation",
    ],
  },
  {
    id: "strongarm-quarter",
    name: "Quarterly Pack",
    duration: "3 Months",
    gst: "Incl. GST · Best Value",
    desc: "Kickstart your fitness",
    hasTrial: false,
    accentColor: "#f97316",
    gradient: "from-orange-500 to-orange-600",
    monthlyPrice: "₹5,499",
    features: [
      "All Monthly features",
      "2 complimentary consultations",
      "Priority class booking",
      "Digital fitness tracking app",
      "15% discount on supplements",
    ],
  },
  {
    id: "strongarm-semi-annual",
    name: "Semi-Annual",
    duration: "6 Months",
    gst: "Incl. GST · Greater Savings",
    desc: "Build momentum steadily",
    featured: true,
    hasTrial: true,
    accentColor: "#22c55e",
    gradient: "from-green-500 to-green-600",
    monthlyPrice: "₹9,999",
    features: [
      "All Quarterly features",
      "4 personalized training sessions",
      "Nutrition consultation with expert",
      "Monthly fitness challenges",
      "Access to exclusive workshops",
      "25% discount on premium classes",
    ],
  },
  {
    id: "strongarm-annual",
    name: "Annual Membership",
    duration: "12 Months",
    gst: "Incl. GST · Save ₹4,000+",
    desc: "Commit to your transformation",
    hasTrial: false,
    accentColor: "#3b82f6",
    gradient: "from-blue-500 to-blue-600",
    monthlyPrice: "₹17,999",
    features: [
      "All Semi-Annual features",
      "12 premium training sessions",
      "Unlimited group classes",
      "Body composition analysis (quarterly)",
      "Priority access to new facilities",
      "Free merchandise (T-shirt & towel)",
      "Guest passes (2 per month)",
      "Priority event access",
    ],
  },
  {
    id: "strongarm-elite",
    name: "Elite Premium",
    duration: "12 Months",
    gst: "Incl. GST · Unlimited Benefits",
    desc: "VIP fitness experience",
    hasTrial: false,
    accentColor: "#8b5cf6",
    gradient: "from-purple-500 to-purple-600",
    monthlyPrice: "₹29,999",
    features: [
      "All Annual features",
      "24/7 gym access",
      "Personal trainer (4 sessions/month)",
      "One-on-one nutrition coaching",
      "Priority equipment reservation",
      "Steam & sauna unlimited",
      "Spa & massage services (monthly)",
      "VIP lounge access",
      "Family add-ons available",
    ],
  },
];

const GYM_FEATURES = [
  {
    Icon: Dumbbell,
    title: "State-of-the-Art Equipment",
    features: [
      "Latest strength training machines and free weights",
      "Advanced cardio equipment with personal screens",
      "Functional training zones for CrossFit & HIIT",
    ],
    badge: "Premium",
  },
  {
    Icon: Users,
    title: "Expert Personal Trainers",
    features: [
      "Certified and experienced training professionals",
      "Customized workout plans for every fitness level",
      "One-on-one coaching and group classes",
    ],
    badge: "Professional",
  },
  {
    Icon: Heart,
    title: "Specialized Wellness Programs",
    features: [
      "Yoga, Pilates, and meditation sessions",
      "Nutrition counseling and meal planning",
      "Holistic health and recovery services",
    ],
    badge: "Holistic",
  },
  {
    Icon: Smartphone,
    title: "Digital Fitness Tracking",
    features: [
      "Personalized workout logging and progress tracking",
      "Nutrition and hydration monitoring",
      "Community engagement and challenges",
    ],
    badge: "Technology",
  },
];

const HEALTH_BENEFITS = [
  {
    title: "Cardiovascular Health",
    description: "Regular gym workouts strengthen your heart and improve blood circulation, reducing the risk of heart disease and high blood pressure.",
    impact: "30% reduction in cardiovascular disease risk",
  },
  {
    title: "Weight Management",
    description: "Consistent exercise burns calories and builds lean muscle mass, helping you maintain a healthy weight and boost metabolism.",
    impact: "Burns up to 500+ calories per session",
  },
  {
    title: "Mental Health & Stress Relief",
    description: "Exercise releases endorphins, reducing anxiety and depression while improving mood and mental clarity.",
    impact: "40% improvement in stress levels",
  },
  {
    title: "Strength & Muscle Building",
    description: "Progressive resistance training builds muscle mass, increases bone density, and improves overall functional strength.",
    impact: "25-30% muscle gain in first 3 months",
  },
  {
    title: "Energy & Stamina",
    description: "Regular workouts increase oxygen circulation and improve overall fitness levels, making daily activities easier.",
    impact: "50% increase in energy levels",
  },
  {
    title: "Longevity & Quality of Life",
    description: "Consistent physical activity adds years to your life and improves quality of living with better sleep and disease prevention.",
    impact: "Up to 7 years longer lifespan",
  },
];

const GYM_HOURS = [
  { day: "Sunday", hours: "Closed", color: "text-gray-400" },
  { day: "Monday", hours: "6:00 AM - 8:00 PM", color: "text-green-500" },
  { day: "Tuesday", hours: "6:00 AM - 8:00 PM", color: "text-green-500" },
  { day: "Wednesday", hours: "6:00 AM - 8:00 PM", color: "text-green-500" },
  { day: "Thursday", hours: "6:00 AM - 8:00 PM", color: "text-green-500" },
  { day: "Friday", hours: "6:00 AM - 8:00 PM", color: "text-green-500" },
  { day: "Saturday", hours: "6:00 AM - 8:00 PM", color: "text-green-500" },
];

const TESTIMONIALS = [
  {
    name: "Mohd Arslan",
    role: "Business Professional",
    avatar: "RK",
    color: "from-red-500 to-orange-600",
    quote:
      "Strong Arm has completely transformed my fitness journey. The trainers are incredibly knowledgeable and the community is so supportive. I've lost 15 kg in 6 months!",
    rating: 5,
  },
  {
    name: "Zeeshan",
    role: "Fitness Enthusiast",
    avatar: "PS",
    color: "from-pink-500 to-red-600",
    quote:
      "The variety of classes at Strong Arm is amazing. From yoga to HIIT, there's something for everyone. The facilities are top-notch and the staff is always helpful.",
    rating: 5,
  },
  {
    name: "Ahmed Hassan",
    role: "Athlete",
    avatar: "AH",
    color: "from-blue-500 to-cyan-600",
    quote:
      "As someone serious about fitness, Strong Arm is my go-to gym. The equipment, trainers, and overall atmosphere push me to give my best every single day.",
    rating: 5,
  },
  {
    name: "Neha Malik",
    role: "Working Mother",
    avatar: "NM",
    color: "from-purple-500 to-pink-600",
    quote:
      "Strong Arm's flexible timings and premium facilities make it easy to balance fitness with my busy schedule. The nutrition guidance has been a game-changer for me.",
    rating: 5,
  },
];

/* ─────────────────────────────────────────────────────────────
   Theme Toggle Button
───────────────────────────────────────────────────────────── */
function ThemeToggle({
  isDark,
  onToggle,
}: {
  isDark: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.93 }}
      onClick={onToggle}
      aria-label="Toggle theme"
      className={`relative flex items-center w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-400 ${
        isDark ? "bg-gray-700" : "bg-gray-200"
      }`}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={`absolute flex items-center justify-center w-6 h-6 rounded-full shadow-md ${
          isDark ? "bg-gray-900 translate-x-7" : "bg-white translate-x-0.5"
        }`}
      >
        {isDark ? (
          <Moon className="w-3.5 h-3.5 text-blue-300" />
        ) : (
          <Sun className="w-3.5 h-3.5 text-amber-500" />
        )}
      </motion.span>
    </motion.button>
  );
}

/* ─────────────────────────────────────────────────────────────
   Main Component
───────────────────────────────────────────────────────────── */
export default function StrongArmGym() {
  const { isDark, toggleTheme } = useTheme();

  const heroDescription =
    "Transform Your Body, Elevate Your Mind, Join Our Community";
  const typedHeroDescription = useTypingEffect(heroDescription, 60, 1800, 1200);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  const { scrollY } = useScroll();
  const navOpacity = useTransform(scrollY, [0, 80], [0.85, 0.98]);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    const handleScroll = () => {
      setShowScrollIndicator(scrollY.get() < 50);
    };
    const unsubscribe = scrollY.onChange(handleScroll);
    return () => unsubscribe();
  }, [scrollY]);

  const scrollToPlans = () =>
    document
      .getElementById("plans-section")
      ?.scrollIntoView({ behavior: "smooth" });

  /* ── Color tokens ── */
  const bg = isDark ? "bg-black" : "bg-white";
  const bgSecondary = isDark ? "bg-[#050505]" : "bg-gray-50";
  const textPrimary = isDark ? "!text-white" : "text-gray-900";
  const textSecondary = isDark ? "text-white/85" : "text-gray-600";
  const textMuted = isDark ? "text-white/60" : "text-gray-400";
  const navBg = "bg-transparent";
  const mobileMenuBg = isDark
    ? "bg-black/95 backdrop-blur-xl"
    : "bg-white/95 backdrop-blur-xl border-b border-gray-200";
  const navText = isDark
    ? "text-white hover:text-red-400 hover:bg-red-600/10"
    : "text-red-700 hover:text-red-600 hover:bg-red-50";

  return (
    <div
      className={`min-h-screen w-full overflow-x-hidden transition-colors duration-300 ${bg} ${isDark ? "text-white" : "text-gray-900"}`}
    >
      {/* ── Navigation ── */}
      <motion.nav
        style={{ opacity: navOpacity }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all ${navBg}`}
      >
        <div className="w-full px-0 py-4 flex items-center justify-between relative">
          {/* Logo */}
          <div className="flex items-center gap-3 pl-6 sm:pl-10 lg:pl-14">
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <Dumbbell className="w-8 h-8 text-red-500" />
              <span className="font-black text-xl tracking-tight text-white drop-shadow-lg">
                STRONG ARM
              </span>
            </motion.div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 pr-6 sm:pr-10 lg:pr-14">
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToPlans}
              className={`px-4 py-2 rounded-xl text-base font-bold transition-all tracking-wide focus:outline-none focus:ring-2 focus:ring-red-400 ${navText} !text-red-400`}
            >
              Membership
            </motion.button>
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                document
                  .getElementById("about")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className={`px-4 py-2 rounded-xl text-base font-bold transition-all tracking-wide focus:outline-none focus:ring-2 focus:ring-red-400 ${navText} !text-red-400`}
            >
              About
            </motion.button>
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => (window.location.href = "/beginners-guide")}
              className={`px-4 py-2 rounded-xl text-base font-bold transition-all tracking-wide focus:outline-none focus:ring-2 focus:ring-red-400 ${navText} !text-red-400`}
            >
              Beginner's Guide
            </motion.button>
            <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
          </div>

          {/* Mobile hamburger */}
          <div className="flex md:hidden items-center pr-4">
            <button
              className={`p-2 rounded-xl transition-all ${
                isDark
                  ? "text-white hover:bg-red-600/10"
                  : "text-white hover:bg-red-50"
              }`}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`md:hidden overflow-hidden shadow-lg ${mobileMenuBg}`}
            >
              <div className="px-6 py-4 space-y-2">
                <motion.button
                  whileHover={{ x: 4 }}
                  onClick={() => {
                    scrollToPlans();
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 rounded-xl transition-all font-semibold ${navText}`}
                >
                  Membership
                </motion.button>
                <motion.button
                  whileHover={{ x: 4 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block w-full text-left px-4 py-3 rounded-xl transition-all font-semibold ${navText}`}
                >
                  About
                </motion.button>
                <motion.button
                  whileHover={{ x: 4 }}
                  className={`block w-full text-left px-4 py-3 rounded-xl transition-all font-semibold ${navText}`}
                >
                  Sign In
                </motion.button>
                <div className="flex justify-center pt-4">
                  <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ── Hero with Video ── */}
      <section className="relative w-full min-h-screen h-screen max-h-[100vh] overflow-hidden bg-black pt-0">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster="/poster.jpg"
          >
            <source src="/123.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Gradient Overlay for better text readability */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full z-0"
        >
          <div
            className="w-full h-full"
            style={{
              background: isDark
                ? "linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.6) 100%)"
                : "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 50%, rgba(0,0,0,0.3) 100%)",
            }}
          />
        </motion.div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 sm:px-10 lg:px-14 text-center z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          >
            <p className="text-white/95 drop-shadow-[0_2px_16px_rgba(0,0,0,0.95)] text-lg sm:text-xl font-extrabold tracking-[0.28em] uppercase mb-6 px-6 py-2">
              Srinagar's Premier Fitness Destination
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.5 }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.05] tracking-tight mb-7 drop-shadow-[0_6px_32px_rgba(0,0,0,0.98)] bg-gradient-to-br from-white via-red-200/80 to-red-400/80 bg-clip-text text-transparent">
              <span className="text-white/95 bg-clip-text text-transparent bg-gradient-to-br from-white via-red-200/80 to-red-400/80">
                No Excuses.
              </span>
              <br />
              <span className="text-red-400 bg-clip-text text-transparent bg-gradient-to-br from-red-400 via-red-300/50 to-white/80">
                Only Results.
              </span>
            </h1>

            <motion.p
              className="text-lg sm:text-xl md:text-2xl text-white/95 mb-2 leading-relaxed max-w-[700px] mx-auto font-semibold"
              style={{ minHeight: 60 }}
              initial={{ x: -60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 60,
                damping: 18,
                delay: 0.7,
              }}
            >
              {typedHeroDescription || heroDescription}
            </motion.p>
            <motion.p
              className="text-sm sm:text-base md:text-lg text-amber-300/95 mb-10 leading-relaxed max-w-[700px] mx-auto font-semibold"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 60,
                damping: 18,
                delay: 1.2,
              }}
            >
              ⏰ Starting Time from Fajr Namaz (Morning Prayers)
            </motion.p>

            <motion.button
              whileHover={{ scale: 1.04, boxShadow: "0 20px 50px rgba(239, 68, 68, 0.4)" }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-10 py-5 border-2 border-red-500 bg-red-600/95 hover:bg-red-500/95 text-white text-lg font-extrabold tracking-widest uppercase transition-all group mx-auto shadow-2xl rounded-full backdrop-blur-md hover:shadow-red-500/30 focus:outline-none focus:ring-2 focus:ring-red-400"
              style={{ textShadow: "0 2px 16px rgba(0,0,0,0.45)" }}
            >
              Join Now
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <AnimatePresence>
          {showScrollIndicator && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
            >
              <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                <ChevronDown className="w-6 h-6 text-red-400" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ── Features Section ── */}
      <section
        className={`py-20 sm:py-28 lg:py-32 px-4 sm:px-6 transition-colors ${bgSecondary}`}
      >
        <div className="w-full max-w-[1400px] mx-auto">
          {/* Highlight Card */}
          <div className="flex justify-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className={`flex flex-col sm:flex-row items-center gap-2 sm:gap-4 px-5 py-3 rounded-2xl shadow-lg border font-semibold text-sm sm:text-base backdrop-blur-md ${isDark ? 'bg-white/10 border-red-900 text-red-200' : 'bg-white/60 border-red-200 text-red-800'}`}
              style={{
                background: isDark
                  ? 'linear-gradient(90deg, rgba(28, 16, 17, 0.7) 60%, rgba(239, 68, 68, 0.08) 100%)'
                  : 'linear-gradient(90deg, rgba(253, 236, 236, 0.7) 60%, rgba(239, 68, 68, 0.13) 100%)',
                boxShadow: isDark
                  ? '0 4px 32px 0 rgba(28, 16, 17, 0.18)'
                  : '0 4px 32px 0 rgba(239, 68, 68, 0.10)',
                border: isDark ? '1.5px solid #7f1d1d33' : '1.5px solid #fecaca',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
            >
              <motion.span
                className="flex items-center gap-1"
                whileHover={{ scale: 1.05 }}
              >
                
               
              </motion.span>
              <motion.span
                className="flex items-center gap-1"
                whileHover={{ scale: 1.05 }}
              >
                <Zap className="w-4 h-4 text-red-400" />
                <span className="font-bold">State-of-the-Art</span>
                <span>Equipment</span>
                <span className="hidden sm:inline">|</span>
              </motion.span>
              <motion.span
                className="flex items-center gap-1"
                whileHover={{ scale: 1.05 }}
              >
                <Users className="w-4 h-4 text-red-400" />
                <span className="font-bold">Expert Trainers</span>
              </motion.span>
            </motion.div>
          </div>

          {/* Why Strong Arm Section */}
          <div className="w-full flex flex-col items-center mb-14">
            <h3 className={`text-2xl sm:text-3xl font-bold mb-6 tracking-tight ${isDark ? '!text-white' : 'text-red-700'}`}>
              Why Choose Strong Arm?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 w-full max-w-5xl">
              {[
                { Icon: Dumbbell, title: "Premium Equipment", desc: "Latest machines & free weights" },
                { Icon: Users, title: "Expert Trainers", desc: "Certified professionals" },
                { Icon: Heart, title: "Wellness Programs", desc: "Holistic health focus" },
               
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ translateY: -4 }}
                  className={`flex flex-col items-center p-6 rounded-2xl shadow-md border backdrop-blur-md transition-all ${isDark ? 'bg-white/10 border-red-900 text-red-100 hover:border-red-500/50' : 'bg-white/70 border-red-200 text-red-800 hover:border-red-400'}`}
                >
                  <item.Icon className="w-8 h-8 mb-2 text-red-400" />
                  <span className="font-semibold mb-1">{item.title}</span>
                  <span className="text-xs text-center opacity-80">{item.desc}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Key Features - Detailed Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-16">
            {GYM_FEATURES.map((feature, idx) => {
              const Icon = feature.Icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ translateY: -4, boxShadow: isDark ? "0 20px 40px rgba(239, 68, 68, 0.1)" : "0 20px 40px rgba(239, 68, 68, 0.15)" }}
                  className={`rounded-3xl p-8 border transition-all ${
                    isDark
                      ? "bg-white/[0.04] border-white/[0.08] hover:border-red-500/30 hover:bg-white/[0.08]"
                      : "bg-white border-gray-200 hover:border-red-300/60 hover:bg-red-50/40 shadow-md"
                  }`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="p-3 rounded-xl bg-red-500/20"
                    >
                      <Icon className="w-6 h-6 text-red-500" />
                    </motion.div>
                    <div>
                      <h3 className={`font-bold text-lg ${textPrimary}`}>
                        {feature.title}
                      </h3>
                      <span className="text-xs font-semibold text-red-500 uppercase tracking-wider">
                        {feature.badge}
                      </span>
                    </div>
                  </div>
                  <ul className={`space-y-2 ${textSecondary}`}>
                    {feature.features.map((f, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex gap-2 text-sm"
                      >
                        <CheckCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── About Section ── */}
      <section
        id="about"
        className={`py-20 sm:py-28 lg:py-32 px-4 sm:px-6 transition-colors ${bg}`}
      >
        <div className="w-full max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <p className="text-red-500 font-bold uppercase tracking-widest text-sm mb-3">
              About Strong Arm
            </p>
            <h2 className={`text-4xl sm:text-5xl font-black mb-6 ${textPrimary}`}>
              Your Fitness Journey Starts Here
            </h2>
            <p className={`text-lg max-w-3xl mx-auto ${textSecondary}`}>
              Strong Arm Fitness Centre is Srinagar's premier destination for comprehensive fitness experiences. We combine state-of-the-art facilities with personalized expert guidance to help you achieve your health and fitness goals.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { Icon: Flame, title: "Our Mission", desc: "To provide a comprehensive, state-of-the-art fitness experience that caters to the diverse needs of Srinagar's population." },
              { Icon: Award, title: "Our Values", desc: "Excellence in service, community-driven environment, holistic well-being, and continuous innovation in fitness solutions." },
              { Icon: TrendingUp, title: "Our Promise", desc: "Personalized fitness plans, expert trainers, community support, and cutting-edge technology to help you succeed." },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ translateY: -4 }}
                className={`rounded-2xl p-8 border transition-all ${isDark ? "bg-white/[0.04] border-white/[0.08] hover:border-red-500/30" : "bg-white border-gray-200 shadow-md hover:shadow-lg hover:border-red-300"}`}
              >
                <motion.div whileHover={{ scale: 1.1 }}>
                  <item.Icon className="w-10 h-10 text-red-500 mb-4" />
                </motion.div>
                <h3 className={`font-bold text-xl mb-3 ${textPrimary}`}>
                  {item.title}
                </h3>
                <p className={textSecondary}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Health Benefits Section ── */}
      <section
        className={`py-20 sm:py-28 lg:py-32 px-4 sm:px-6 transition-colors ${bg}`}
      >
        <div className="w-full max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <p className="text-red-500 font-bold uppercase tracking-widest text-sm mb-3">
              Why Gym Matters
            </p>
            <h2 className={`text-4xl sm:text-5xl font-black mb-6 ${textPrimary}`}>
              Impact of Regular Gym Training on Your Health
            </h2>
            <p className={`text-lg max-w-3xl mx-auto ${textSecondary}`}>
              Discover the transformative power of consistent fitness training and how it revolutionizes your physical, mental, and emotional well-being.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {HEALTH_BENEFITS.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ translateY: -4, boxShadow: isDark ? "0 20px 40px rgba(239, 68, 68, 0.1)" : "0 20px 40px rgba(239, 68, 68, 0.15)" }}
                className={`rounded-3xl p-8 border transition-all ${isDark ? "bg-white/[0.04] border-white/[0.08] hover:border-red-500/30 hover:bg-white/[0.08]" : "bg-white border-gray-200 hover:border-red-300/60 shadow-md hover:shadow-lg"}`}
              >
                <motion.div whileHover={{ scale: 1.1 }} className="mb-4">
                  <Heart className="w-10 h-10 text-red-500" />
                </motion.div>
                <h3 className={`font-bold text-xl mb-3 ${textPrimary}`}>
                  {benefit.title}
                </h3>
                <p className={`text-sm mb-4 ${textSecondary}`}>
                  {benefit.description}
                </p>
                <div className={`p-3 rounded-lg ${isDark ? "bg-red-500/20" : "bg-red-100/50"}`}>
                  <p className="text-sm font-bold text-red-500">
                    📊 {benefit.impact}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section
        className={`py-20 sm:py-28 lg:py-32 px-4 sm:px-6 transition-colors ${bgSecondary}`}
      >
        <div className="w-full max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <p className="text-red-500 font-bold uppercase tracking-widest text-sm mb-3">
              Success Stories
            </p>
            <h2 className={`text-4xl sm:text-5xl font-black ${textPrimary}`}>
              Member Testimonials
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ translateY: -4 }}
                className={`rounded-3xl p-8 transition-all border ${
                  isDark
                    ? "bg-white/[0.04] border-white/[0.08] hover:border-red-500/30 hover:bg-white/[0.08]"
                    : "bg-white border-gray-200 hover:border-red-300/60 shadow-md hover:shadow-lg"
                }`}
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, si) => (
                    <Star
                      key={si}
                      className="w-4 h-4 text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>
                <p
                  className={`text-sm sm:text-base leading-relaxed mb-6 italic ${isDark ? "text-white/85" : "text-gray-600"}`}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div
                  className={`flex items-center gap-3 pt-4 border-t ${isDark ? "border-white/[0.06]" : "border-gray-100"}`}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}
                  >
                    {t.avatar}
                  </motion.div>
                  <div>
                    <div className={`font-semibold text-sm ${isDark ? "text-white" : "text-gray-900"}`}>
                      {t.name}
                    </div>
                    <div className={`text-xs ${isDark ? "text-white/70" : "text-gray-400"}`}>
                      {t.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Membership Plans ── */}
      <section
        id="plans-section"
        className={`py-20 sm:py-28 lg:py-32 px-4 sm:px-6 transition-colors ${bg}`}
      >
        <div className="w-full max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <p className="text-red-500 font-bold uppercase tracking-widest text-sm mb-3">
              Pricing
            </p>
            <h2 className={`text-4xl sm:text-5xl font-black mb-6 ${textPrimary}`}>
              Find Your Perfect Plan
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${textSecondary}`}>
              Flexible membership options designed for every fitness level and lifestyle
            </p>
          </motion.div>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PLANS.map((plan, idx) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ translateY: -8 }}
                className={`relative rounded-3xl border transition-all overflow-hidden ${
                  plan.featured
                    ? isDark
                      ? "border-red-500/50 shadow-2xl shadow-red-500/20"
                      : "border-red-300 shadow-2xl shadow-red-300/30"
                    : isDark
                      ? "border-white/[0.08] hover:border-red-500/30 hover:shadow-lg"
                      : "border-gray-200 hover:border-red-300/60 shadow-md hover:shadow-lg"
                } ${isDark ? "bg-[#0a0a0a]" : "bg-white"}`}
              >
                {plan.featured && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-red-400 to-transparent" />
                )}

                <div className="p-8">
                  {plan.featured && (
                    <motion.div
                      initial={{ scale: 0.8 }}
                      whileInView={{ scale: 1 }}
                      className="inline-block mb-4 px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider"
                    >
                      Most Popular
                    </motion.div>
                  )}

                  <h3 className={`text-2xl font-black mb-2 ${textPrimary}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-sm font-medium mb-6 ${textMuted}`}>
                    {plan.desc}
                  </p>

                  <div className="mb-6">
                    <span className={`text-4xl font-black ${textPrimary}`}>
                      {plan.monthlyPrice}
                    </span>
                    <span className={`text-sm ${textMuted} ml-2`}>
                      {plan.gst}
                    </span>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-3 rounded-xl font-bold uppercase tracking-wider transition-all mb-8 ${
                      plan.featured
                        ? "bg-red-600 text-white hover:bg-red-500 shadow-lg shadow-red-600/30"
                        : isDark
                          ? "bg-white/[0.08] text-white hover:bg-white/[0.14]"
                          : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                    }`}
                  >
                    {plan.hasTrial ? "Start Free Trial" : "Join Now"}
                  </motion.button>

                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className={`flex gap-3 text-sm ${textSecondary}`}
                      >
                        <CheckCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        className={`py-16 px-4 sm:px-6 border-t transition-colors ${bg} ${isDark ? "border-white/[0.08]" : "border-gray-200"}`}
      >
        <div className="w-full max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Dumbbell className="w-6 h-6 text-red-500" />
                <span className="font-black text-lg">STRONG ARM</span>
              </div>
              <p className={`text-sm ${textMuted}`}>
                Srinagar's premier fitness centre, dedicated to your health and wellness journey.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className={`font-bold mb-4 ${textPrimary}`}>Quick Links</h4>
              <ul className={`space-y-2 text-sm ${textMuted}`}>
                <li>
                  <motion.button
                    whileHover={{ x: 4 }}
                    onClick={scrollToPlans}
                    className="hover:text-red-500 transition-colors"
                  >
                    Membership
                  </motion.button>
                </li>
                <li>
                  <motion.button whileHover={{ x: 4 }} className="hover:text-red-500 transition-colors">
                    About
                  </motion.button>
                </li>
                <li>
                  <motion.button whileHover={{ x: 4 }} className="hover:text-red-500 transition-colors">
                    Classes
                  </motion.button>
                </li>
                <li>
                  <motion.button whileHover={{ x: 4 }} className="hover:text-red-500 transition-colors">
                    Trainers
                  </motion.button>
                </li>
              </ul>
            </div>

            {/* Contact & Hours */}
            <div>
              <h4 className={`font-bold mb-4 ${textPrimary}`}>Contact & Location</h4>
              <ul className={`space-y-3 text-sm ${textMuted}`}>
                <li className="flex gap-2 items-start">
                  <MapPin className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <span className="font-semibold block">Upstairs Best Bakery</span>
                    <span className="text-xs">Alamdar Colony, Main Rd</span>
                    <span className="text-xs">Bemina, Srinagar</span>
                    <span className="text-xs">Jammu & Kashmir 190018</span>
                  </div>
                </li>
                <li className="flex gap-2 items-center">
                  <Phone className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span>+91-7006324503</span>
                </li>
                <li className="flex gap-2 items-center">
                  <Mail className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span>info@strongarm.com</span>
                </li>
              </ul>
            </div>

            {/* Hours */}
            <div>
              <h4 className={`font-bold mb-4 ${textPrimary}`}>Opening Hours</h4>
              <div className={`space-y-1 text-sm ${textMuted}`}>
                {GYM_HOURS.map((h, i) => (
                  <div key={i} className="flex justify-between">
                    <span className="font-medium">{h.day}</span>
                    <span className={`${h.color} font-semibold`}>{h.hours}</span>
                  </div>
                ))}
                <p className="text-xs text-amber-500 font-semibold mt-3 pt-3 border-t border-white/10">
                  ⏰ Opens from Fajr Namaz (Morning Prayers)
                </p>
              </div>
            </div>

            {/* Social */}
            <div>
              <h4 className={`font-bold mb-4 ${textPrimary}`}>Follow Us</h4>
              <div className="flex flex-col gap-3">
                <div className="flex gap-3">
                  <motion.a
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://www.facebook.com/Arshiddarr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-lg transition-all ${isDark ? "bg-white/[0.08] hover:bg-red-500/20 text-white" : "bg-gray-100 hover:bg-red-100 text-gray-900"}`}
                    title="Follow us on Facebook"
                  >
                    <Facebook className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    href="#"
                    className={`p-2 rounded-lg transition-all ${isDark ? "bg-white/[0.08] hover:bg-red-500/20 text-white" : "bg-gray-100 hover:bg-red-100 text-gray-900"}`}
                  >
                    <Instagram className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    href="#"
                    className={`p-2 rounded-lg transition-all ${isDark ? "bg-white/[0.08] hover:bg-red-500/20 text-white" : "bg-gray-100 hover:bg-red-100 text-gray-900"}`}
                  >
                    <XIcon className="w-5 h-5" />
                  </motion.a>
                </div>
                <a
                  href="https://www.facebook.com/Arshiddarr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-xs font-semibold text-red-500 hover:text-red-400 transition-colors`}
                >
                  Strong Arm Fitness Centre
                </a>
              </div>
            </div>
          </div>

          <div
            className={`border-t pt-8 text-center text-sm ${isDark ? "border-white/[0.08] text-white/60" : "border-gray-200 text-gray-600"}`}
          >
            <p>&copy; 2026 Strong Arm Fitness Centre. All rights reserved.</p>
            <p className="mt-3 text-xs">
              Made with ❤️ by{" "}
              <a
                href="https://github.com/Zai14"
                target="_blank"
                rel="noopener noreferrer"
                className={`font-semibold transition-colors ${
                  isDark
                    ? "text-red-400 hover:text-red-300"
                    : "text-red-600 hover:text-red-500"
                }`}
              >
                Zai14
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* ── WhatsApp Widget ── */}
      <WhatsAppWidget isDark={isDark} />
    </div>
  );
}
