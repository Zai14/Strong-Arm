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
  AlertCircle,
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
  Clock,
  Zap,
  BookOpen,
  ShieldAlert,
  Lightbulb,
  Calendar,
  FileText,
  Send,
  Target,
} from "lucide-react";

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

const GETTING_STARTED_STEPS = [
  {
    step: 1,
    title: "Choose Your Membership",
    description:
      "Select the membership plan that fits your goals and schedule. We offer Monthly, Quarterly, Semi-Annual, and Annual plans.",
    details: [
      "Compare all plans on our pricing page",
      "No hidden fees or long-term contracts",
      "Flexible cancellation options",
    ],
  },
  {
    step: 2,
    title: "Book Your Orientation",
    description:
      "Schedule a free orientation session with our trainers to familiarize yourself with the gym layout and equipment.",
    details: [
      "Meet your assigned trainer",
      "Tour of all facilities",
      "Introduction to equipment",
    ],
  },
  {
    step: 3,
    title: "Complete Your Assessment",
    description:
      "We'll assess your fitness level, goals, and any health concerns to create a personalized plan.",
    details: [
      "Body composition analysis",
      "Fitness level evaluation",
      "Goal setting session",
    ],
  },
  {
    step: 4,
    title: "Get Your Personalized Plan",
    description:
      "Receive a customized workout and nutrition plan tailored to your specific goals and fitness level.",
    details: [
      "Personalized workout routine",
      "Nutrition guidance",
      "Progress tracking setup",
    ],
  },
  {
    step: 5,
    title: "Start Your Journey",
    description:
      "Begin your fitness journey with support from our expert trainers and supportive community.",
    details: [
      "Regular progress check-ins",
      "Community support",
      "Continuous coaching",
    ],
  },
];

const FIRST_TIMER_TIPS = [
  {
    icon: Clock,
    title: "Start with Short Sessions",
    description:
      "Begin with 30-45 minute sessions to avoid burnout. Your body needs time to adapt to the new routine.",
    tip: "Gradually increase duration as you build stamina",
  },
  {
    icon: Lightbulb,
    title: "Focus on Form Over Weight",
    description:
      "Perfect form with lighter weights is better than heavy weights with poor technique. This prevents injuries.",
    tip: "Ask trainers to correct your form regularly",
  },
  {
    icon: Heart,
    title: "Warm Up and Cool Down",
    description:
      "Always spend 5-10 minutes warming up before exercise and cooling down afterward. This prevents muscle soreness.",
    tip: "Do light cardio and stretching on both ends",
  },
  {
    icon: TrendingUp,
    title: "Be Consistent, Not Intense",
    description:
      "3-4 regular workouts per week are better than intense sporadic sessions. Consistency builds results.",
    tip: "Set a fixed schedule and stick to it",
  },
  {
    icon: Users,
    title: "Don't Compare Yourself",
    description:
      "Everyone's fitness journey is different. Focus on your own progress, not others in the gym.",
    tip: "Track your personal bests, not others' achievements",
  },
  {
    icon: Dumbbell,
    title: "Learn Equipment Gradually",
    description:
      "Don't try all equipment on day one. Learn a few machines/weights first and gradually expand.",
    tip: "Ask trainers to teach you 3-4 exercises per visit",
  },
  {
    icon: Smartphone,
    title: "Track Your Progress",
    description:
      "Keep a record of your workouts, weights used, and reps completed. This helps you see improvement.",
    tip: "Use a fitness app or notebook to log your sessions",
  },
  {
    icon: Zap,
    title: "Rest is Important Too",
    description:
      "Your muscles grow during rest, not during workouts. Get 7-8 hours of sleep daily.",
    tip: "Take at least 1-2 complete rest days per week",
  },
];

const SAFETY_GUIDELINES = [
  {
    category: "Before You Start",
    icon: AlertCircle,
    rules: [
      "Get medical clearance if you have any health conditions",
      "Inform trainers about any injuries or pain",
      "Wear proper gym attire and shoes",
      "Stay hydrated - drink water throughout your workout",
      "Never exercise on a full stomach; wait 2-3 hours after eating",
    ],
  },
  {
    category: "During Workout",
    icon: ShieldAlert,
    rules: [
      "Always use proper form and technique",
      "Don't lift heavy weights alone - use a spotter or ask trainers",
      "Start with lighter weights to master the movement",
      "Keep the gym area clean - wipe machines after use",
      "Don't use headphones at unsafe volumes",
      "Never leave weights unattended on machines",
      "Keep your phone away during intense exercises",
    ],
  },
  {
    category: "Equipment Safety",
    icon: Dumbbell,
    rules: [
      "Check equipment for damage before using",
      "Know how to properly adjust machines for your body",
      "Never jump on or off treadmills while running",
      "Use safety clips on dumbbells and barbells",
      "Keep equipment in the designated area after use",
      "Report any broken equipment to staff immediately",
    ],
  },
  {
    category: "General Safety",
    icon: Heart,
    rules: [
      "Stop if you feel dizzy, faint, or experience sharp pain",
      "Breathe properly - exhale on exertion, inhale on relaxation",
      "Don't hold your breath during exercises",
      "Cool down properly after workouts",
      "Stretch after every session to reduce soreness",
      "Know your body's limits and don't overdo it",
      "Report any discomfort to trainers immediately",
    ],
  },
];

const BEGINNER_MISTAKES = [
  {
    mistake: "Doing Too Much Too Soon",
    consequence:
      "Leads to overtraining, burnout, and higher injury risk",
    solution: "Start slow, gradually increase intensity and duration",
  },
  {
    mistake: "Ignoring Form for Heavier Weights",
    consequence:
      "Causes injuries like strains, sprains, and muscle tears",
    solution: "Master form first with lighter weights",
  },
  {
    mistake: "Not Warming Up or Cooling Down",
    consequence: "Increases muscle soreness and injury risk",
    solution: "Always spend 5-10 mins warming up and cooling down",
  },
  {
    mistake: "Skipping Rest Days",
    consequence:
      "Prevents muscle recovery and growth, leads to fatigue",
    solution: "Take at least 1-2 complete rest days per week",
  },
  {
    mistake: "Neglecting Nutrition",
    consequence: "Poor energy levels, no muscle growth, no fat loss",
    solution: "Eat balanced meals with protein, carbs, and healthy fats",
  },
  {
    mistake: "Not Drinking Enough Water",
    consequence:
      "Dehydration causes dizziness, fatigue, and reduced performance",
    solution: "Drink 2-3 liters of water daily, more on workout days",
  },
];

const BEGINNER_FAQS = [
  {
    question: "How many days per week should I work out?",
    answer:
      "Start with 3-4 days per week with rest days in between. This gives your muscles time to recover while building consistency.",
  },
  {
    question: "When is the best time to work out?",
    answer:
      "Any time you can be consistent is the best time! Morning workouts boost energy, evening workouts are good if you're tired. Our gym is open from Fajr Namaz (6 AM) to 8 PM.",
  },
  {
    question: "How long before I see results?",
    answer:
      "You'll feel energized within 1-2 weeks. Visible results typically appear in 4-6 weeks with consistent effort.",
  },
  {
    question: "Should I do cardio or weights first?",
    answer:
      "Warm up with light cardio (5-10 mins), then do weights, then finish with cardio and stretching.",
  },
  {
    question: "Is it okay to work out with sore muscles?",
    answer:
      "Light movement can help with soreness, but avoid intense workouts on heavily sore muscles. Give them 24-48 hours to recover.",
  },
  {
    question: "Do I need a personal trainer?",
    answer:
      "Not mandatory, but highly recommended for beginners to learn proper form and create an effective plan.",
  },
  {
    question: "What should I eat before a workout?",
    answer:
      "Eat a light meal 2-3 hours before or a small snack 30 mins before. Include carbs and protein.",
  },
  {
    question: "How much should I spend on gym equipment at home?",
    answer:
      "Start with basics: dumbbells, resistance bands, and a yoga mat. Advanced equipment can come later.",
  },
];

const BEGINNER_EQUIPMENT = [
  {
    name: "Treadmill",
    benefits: "Builds cardiovascular endurance and burns calories",
    beginner_tip: "Start with walking, gradually increase speed and incline",
    time: "20-30 minutes for beginners",
  },
  {
    name: "Dumbbell",
    benefits: "Builds muscle and increases strength",
    beginner_tip: "Start with 2-5 kg and focus on proper form",
    time: "3 sets of 10-12 reps",
  },
  {
    name: "Barbell",
    benefits: "Compound exercises for full-body strength",
    beginner_tip: "Always use a spotter or ask trainer assistance",
    time: "3 sets of 8-10 reps",
  },
  {
    name: "Leg Press Machine",
    benefits: "Strengthens legs and glutes",
    beginner_tip: "Adjust seat so knees are at 90 degrees",
    time: "3 sets of 12-15 reps",
  },
  {
    name: "Chest Press Machine",
    benefits: "Builds chest and arm muscles",
    beginner_tip: "Keep elbows slightly bent throughout",
    time: "3 sets of 10-12 reps",
  },
  {
    name: "Rowing Machine",
    benefits: "Full-body cardio and muscle building",
    beginner_tip: "Focus on using legs first, then back",
    time: "15-20 minutes",
  },
];

const WORKOUT_ROUTINES = [
  {
    name: "Full Body Beginner (3 Days/Week)",
    days: ["Monday", "Wednesday", "Friday"],
    description: "Perfect for complete beginners. Low impact, full body engagement.",
    exercises: [
      { name: "Warm-up Cardio", sets: 1, reps: "5-10 min", rest: "N/A" },
      { name: "Chest Press Machine", sets: 3, reps: "10-12", rest: "60 sec" },
      { name: "Leg Press Machine", sets: 3, reps: "12-15", rest: "60 sec" },
      { name: "Lat Pulldown", sets: 3, reps: "10-12", rest: "60 sec" },
      { name: "Dumbbell Curls", sets: 3, reps: "10-12", rest: "45 sec" },
      { name: "Tricep Dips", sets: 3, reps: "8-10", rest: "45 sec" },
      { name: "Cool-down Stretching", sets: 1, reps: "5-10 min", rest: "N/A" },
    ],
  },
  {
    name: "Push/Pull/Legs Split (3 Days/Week)",
    days: ["Monday", "Wednesday", "Friday"],
    description: "Balanced routine targeting different muscle groups each session.",
    exercises: [
      { day: "Push Day - Monday", name: "Chest Press Machine", sets: 3, reps: "10-12", rest: "60 sec" },
      { day: "Push Day - Monday", name: "Shoulder Press", sets: 3, reps: "8-10", rest: "60 sec" },
      { day: "Push Day - Monday", name: "Tricep Machine", sets: 3, reps: "10-12", rest: "45 sec" },
      { day: "Pull Day - Wednesday", name: "Lat Pulldown", sets: 3, reps: "10-12", rest: "60 sec" },
      { day: "Pull Day - Wednesday", name: "Rowing Machine", sets: 3, reps: "15 reps", rest: "60 sec" },
      { day: "Pull Day - Wednesday", name: "Bicep Curls", sets: 3, reps: "10-12", rest: "45 sec" },
      { day: "Legs Day - Friday", name: "Leg Press", sets: 3, reps: "12-15", rest: "90 sec" },
      { day: "Legs Day - Friday", name: "Leg Curls", sets: 3, reps: "12-15", rest: "60 sec" },
      { day: "Legs Day - Friday", name: "Calf Raises", sets: 3, reps: "15-20", rest: "45 sec" },
    ],
  },
  {
    name: "Cardio + Strength Mix (4 Days/Week)",
    days: ["Monday", "Tuesday", "Thursday", "Saturday"],
    description: "Great for weight loss and overall fitness. Mix cardio with light strength.",
    exercises: [
      { day: "Cardio Days (Mon, Tue)", name: "Treadmill/Rowing", sets: 1, reps: "20-30 min", rest: "N/A" },
      { day: "Cardio Days (Mon, Tue)", name: "Light Weights", sets: 2, reps: "10-12", rest: "45 sec" },
      { day: "Strength Days (Thu, Sat)", name: "Compound Lifts", sets: 3, reps: "8-10", rest: "90 sec" },
      { day: "Strength Days (Thu, Sat)", name: "Isolation Exercises", sets: 3, reps: "12-15", rest: "60 sec" },
    ],
  },
];

const NUTRITION_TIPS = [
  {
    title: "Protein Intake",
    tips: [
      "Consume 0.8-1g of protein per lb of body weight daily",
      "Best sources: Chicken, fish, eggs, legumes, Greek yogurt",
      "Spread protein throughout the day (every meal)",
      "Post-workout protein within 30-60 minutes is ideal",
    ],
  },
  {
    title: "Meal Timing",
    tips: [
      "Eat a full meal 2-3 hours before workout",
      "Have a light snack (banana, granola bar) 30 mins before",
      "Post-workout: Protein + carbs within 1 hour",
      "Eat every 3-4 hours to maintain stable energy",
    ],
  },
  {
    title: "Hydration",
    tips: [
      "Drink at least 2-3 liters of water daily",
      "On workout days: Add 500ml-1L more water",
      "Drink water before, during, and after exercise",
      "Avoid excessive caffeine and sugary drinks",
    ],
  },
  {
    title: "Balanced Diet",
    tips: [
      "40% Carbs (rice, oats, whole grains)",
      "30% Protein (meat, dairy, legumes)",
      "30% Healthy Fats (nuts, olive oil, avocado)",
      "Include fruits and vegetables in every meal",
    ],
  },
];

const WHAT_TO_BRING = [
  { item: "Valid ID & Membership Card", icon: "🆔", description: "For check-in and facility access" },
  { item: "Water Bottle", icon: "💧", description: "Stay hydrated during workouts (2-3 liters)" },
  { item: "Workout Clothes", icon: "👕", description: "Comfortable, breathable athletic wear" },
  { item: "Sports Shoes", icon: "👟", description: "Supportive cross-training or running shoes" },
  { item: "Towel", icon: "🧴", description: "To wipe down machines and dry sweat" },
  { item: "Deodorant & Hygiene", icon: "🚿", description: "Post-workout freshness (optional shower)" },
  { item: "Phone (Optional)", icon: "📱", description: "For tracking workouts or music" },
  { item: "Small Lock", icon: "🔐", description: "For securing personal belongings if needed" },
];

const RECOVERY_STRETCHES = [
  {
    name: "Quad Stretch",
    time: "30 seconds each leg",
    description: "Hold one leg behind you, pull heel to glutes. Great after leg day.",
    targetArea: "Quadriceps",
  },
  {
    name: "Hamstring Stretch",
    time: "30 seconds each leg",
    description: "Keep leg straight, bend forward from hips. Targets back of legs.",
    targetArea: "Hamstrings",
  },
  {
    name: "Chest Stretch",
    time: "30 seconds each side",
    description: "Place arm across body, gently pull. Do after chest workouts.",
    targetArea: "Chest & Shoulders",
  },
  {
    name: "Shoulder Stretch",
    time: "30 seconds each side",
    description: "Bring arm across chest, hold at elbow. Essential after upper body.",
    targetArea: "Shoulders",
  },
  {
    name: "Back Stretch",
    time: "30 seconds",
    description: "Hug knees to chest or do cat-cow pose. Releases tension in lower back.",
    targetArea: "Back & Spine",
  },
  {
    name: "Calf Stretch",
    time: "30 seconds each leg",
    description: "Push heel down on an incline or step. After cardio/legs.",
    targetArea: "Calves",
  },
];

export default function BeginnerGuide() {
  const { isDark, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedStep, setExpandedStep] = useState(0);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [showOrientationForm, setShowOrientationForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    experience: "beginner",
    goals: "",
  });

  // Calculator states
  const [calcHeight, setCalcHeight] = useState("170");
  const [calcWeight, setCalcWeight] = useState("70");
  const [calcAge, setCalcAge] = useState("25");
  const [calcGender, setCalcGender] = useState("male");
  const [calcActivity, setCalcActivity] = useState("moderate");
  const [macroWeight, setMacroWeight] = useState("70");
  const [macroGoal, setMacroGoal] = useState("muscle");

  // Calculate BMI
  const calculateBMI = () => {
    const h = parseFloat(calcHeight) / 100;
    const w = parseFloat(calcWeight);
    return (w / (h * h)).toFixed(1);
  };

  // Calculate Daily Calories
  const calculateCalories = () => {
    const h = parseFloat(calcHeight);
    const w = parseFloat(calcWeight);
    const a = parseFloat(calcAge);
    
    // Harris-Benedict equation
    let bmr = 0;
    if (calcGender === "male") {
      bmr = 88.362 + 13.397 * w + 4.799 * h - 5.677 * a;
    } else {
      bmr = 447.593 + 9.247 * w + 3.098 * h - 4.33 * a;
    }
    
    const activityMultiplier = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      heavy: 1.725,
    };
    
    return (bmr * (activityMultiplier[calcActivity as keyof typeof activityMultiplier] || 1.55)).toFixed(0);
  };

  // Calculate Daily Protein
  const calculateProtein = () => {
    return (parseFloat(macroWeight) * 1.6).toFixed(0);
  };

  // Calculate Macros
  const calculateMacros = () => {
    const calories = parseFloat(calculateCalories());
    const protein = parseFloat(calculateProtein());
    const proteinCalories = protein * 4;
    let carbCalories, fatCalories;
    
    if (macroGoal === "muscle") {
      carbCalories = calories * 0.45;
      fatCalories = calories * 0.25;
    } else if (macroGoal === "weight-loss") {
      carbCalories = calories * 0.35;
      fatCalories = calories * 0.25;
    } else {
      carbCalories = calories * 0.4;
      fatCalories = calories * 0.25;
    }
    
    return {
      protein: protein,
      carbs: (carbCalories / 4).toFixed(0),
      fats: (fatCalories / 9).toFixed(0),
    };
  };

  const bmi = calculateBMI();
  const calories = calculateCalories();
  const macros = calculateMacros();

  const { scrollY } = useScroll();
  const navOpacity = useTransform(scrollY, [0, 80], [0.85, 0.98]);

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
              onClick={() => (window.location.href = "/")}
              className={`px-4 py-2 rounded-xl text-base font-bold transition-all tracking-wide focus:outline-none focus:ring-2 focus:ring-red-400 ${navText} !text-red-400`}
            >
              Back to Home
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
                    window.location.href = "/";
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 rounded-xl transition-all font-semibold ${navText}`}
                >
                  Back to Home
                </motion.button>
                <div className="flex justify-center pt-4">
                  <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ── Hero Section with Video Background ── */}
      <section className="relative w-full min-h-[60vh] flex items-center justify-center pt-20 px-4 overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="123.mp4" type="video/mp4" />
        </video>
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-red-500 font-bold uppercase tracking-widest text-sm mb-3">
              🎯 Your Fitness Journey Starts Here
            </p>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-tight mb-6 text-white">
              Beginner's Guide to Strong Arm
            </h1>
            <p className="text-lg sm:text-xl max-w-3xl mx-auto mb-8 text-white/90">
              Everything you need to know before starting your fitness journey. From first steps to safety guidelines, we've got you covered!
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Getting Started Section ── */}
      <section
        id="getting-started"
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
              Step-by-Step
            </p>
            <h2 className={`text-4xl sm:text-5xl font-black ${textPrimary}`}>
              Getting Started at Strong Arm
            </h2>
          </motion.div>

          <div className="space-y-6">
            {GETTING_STARTED_STEPS.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ translateX: 4 }}
                onClick={() => setExpandedStep(expandedStep === idx ? -1 : idx)}
                className={`rounded-2xl p-6 border cursor-pointer transition-all ${
                  expandedStep === idx
                    ? isDark
                      ? "bg-red-500/20 border-red-500/50 shadow-lg shadow-red-500/20"
                      : "bg-red-50/60 border-red-300 shadow-lg shadow-red-200/50"
                    : isDark
                      ? "bg-white/[0.04] border-white/[0.08] hover:border-red-500/30"
                      : "bg-white border-gray-200 hover:border-red-300/60 shadow-md"
                }`}
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    className="min-w-fit"
                  >
                    <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center font-bold text-white text-lg">
                      {item.step}
                    </div>
                  </motion.div>
                  <div className="flex-1">
                    <h3 className={`font-bold text-xl mb-2 ${textPrimary}`}>
                      {item.title}
                    </h3>
                    <p className={`${textSecondary}`}>{item.description}</p>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      expandedStep === idx ? "rotate-180" : ""
                    }`}
                  />
                </div>

                <AnimatePresence>
                  {expandedStep === idx && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t border-white/[0.08]"
                    >
                      <ul className="space-y-2">
                        {item.details.map((detail, i) => (
                          <li key={i} className="flex gap-2">
                            <CheckCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                            <span className={textSecondary}>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── First Timer Tips ── */}
      <section
        id="first-timer-tips"
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
              💡 Essential Tips
            </p>
            <h2 className={`text-4xl sm:text-5xl font-black mb-6 ${textPrimary}`}>
              First-Timer Tips for Success
            </h2>
            <p className={`text-lg max-w-3xl mx-auto ${textSecondary}`}>
              Learn the key practices that will help you start strong and avoid common beginner mistakes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FIRST_TIMER_TIPS.map((tip, idx) => {
              const Icon = tip.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ translateY: -8 }}
                  className={`rounded-2xl p-6 border transition-all ${
                    isDark
                      ? "bg-white/[0.04] border-white/[0.08] hover:border-red-500/30 hover:bg-white/[0.08]"
                      : "bg-white border-gray-200 hover:border-red-300/60 shadow-md hover:shadow-lg"
                  }`}
                >
                  <motion.div whileHover={{ scale: 1.1 }} className="mb-4">
                    <Icon className="w-10 h-10 text-red-500" />
                  </motion.div>
                  <h3 className={`font-bold text-lg mb-3 ${textPrimary}`}>
                    {tip.title}
                  </h3>
                  <p className={`text-sm mb-4 ${textSecondary}`}>
                    {tip.description}
                  </p>
                  <div className={`p-3 rounded-lg ${isDark ? "bg-red-500/20" : "bg-red-100/50"}`}>
                    <p className="text-xs font-semibold text-red-500">
                      💡 {tip.tip}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Safety Guidelines ── */}
      <section
        id="safety"
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
              ⚠️ Important
            </p>
            <h2 className={`text-4xl sm:text-5xl font-black mb-6 ${textPrimary}`}>
              Safety Guidelines
            </h2>
            <p className={`text-lg max-w-3xl mx-auto ${textSecondary}`}>
              Your safety is our top priority. Follow these guidelines to ensure a safe and injury-free workout experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {SAFETY_GUIDELINES.map((section, idx) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ translateY: -4 }}
                  className={`rounded-3xl p-8 border transition-all ${
                    isDark
                      ? "bg-white/[0.04] border-white/[0.08] hover:border-red-500/30 hover:bg-white/[0.08]"
                      : "bg-white border-gray-200 hover:border-red-300/60 shadow-md hover:shadow-lg"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <motion.div whileHover={{ scale: 1.1 }}>
                      <Icon className="w-8 h-8 text-red-500" />
                    </motion.div>
                    <h3 className={`text-2xl font-bold ${textPrimary}`}>
                      {section.category}
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {section.rules.map((rule, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex gap-3"
                      >
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className={`text-sm ${textSecondary}`}>{rule}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Common Mistakes ── */}
      <section
        id="mistakes"
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
              ❌ Avoid These
            </p>
            <h2 className={`text-4xl sm:text-5xl font-black ${textPrimary}`}>
              Common Beginner Mistakes
            </h2>
          </motion.div>

          <div className="space-y-4">
            {BEGINNER_MISTAKES.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ translateX: 4 }}
                className={`rounded-2xl p-6 border transition-all ${
                  isDark
                    ? "bg-white/[0.04] border-white/[0.08] hover:border-red-500/30"
                    : "bg-white border-gray-200 hover:border-red-300/60 shadow-md"
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex gap-3">
                    <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                    <div>
                      <h4 className={`font-bold ${textPrimary}`}>
                        {item.mistake}
                      </h4>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <AlertCircle className="w-6 h-6 text-orange-500 flex-shrink-0" />
                    <div>
                      <p className={`text-sm ${textMuted}`}>
                        <span className="font-semibold">Consequence:</span> {item.consequence}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <div>
                      <p className={`text-sm ${textSecondary}`}>
                        <span className="font-semibold">Solution:</span> {item.solution}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Equipment for Beginners ── */}
      <section
        id="equipment"
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
              🏋️ Equipment Guide
            </p>
            <h2 className={`text-4xl sm:text-5xl font-black ${textPrimary}`}>
              Beginner-Friendly Equipment
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {BEGINNER_EQUIPMENT.map((eq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ translateY: -4 }}
                className={`rounded-2xl p-6 border transition-all ${
                  isDark
                    ? "bg-white/[0.04] border-white/[0.08] hover:border-red-500/30"
                    : "bg-white border-gray-200 hover:border-red-300/60 shadow-md"
                }`}
              >
                <h3 className={`text-xl font-bold mb-3 ${textPrimary}`}>
                  {eq.name}
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-red-500 uppercase mb-1">Benefits</p>
                    <p className={`text-sm ${textSecondary}`}>{eq.benefits}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-amber-500 uppercase mb-1">Beginner Tip</p>
                    <p className={`text-sm ${textSecondary}`}>{eq.beginner_tip}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-green-500 uppercase mb-1">Recommended Duration</p>
                    <p className={`text-sm ${textSecondary}`}>{eq.time}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* ── Calculators Section ── */}
      <section
        id="calculators"
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
              🧮 Tools
            </p>
            <h2 className={`text-4xl sm:text-5xl font-black mb-6 ${textPrimary}`}>
              Fitness Calculators
            </h2>
            <p className={`text-lg max-w-3xl mx-auto ${textSecondary}`}>
              Use these calculators to determine your personalized fitness metrics.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* BMI & Calories Calculator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className={`rounded-2xl p-8 border ${
                isDark
                  ? "bg-white/[0.04] border-white/[0.08]"
                  : "bg-white border-gray-200 shadow-md"
              }`}
            >
              <h3 className={`text-2xl font-black mb-6 ${textPrimary}`}>BMI & Daily Calories</h3>

              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${textPrimary}`}>
                    Height (cm): {calcHeight}
                  </label>
                  <input
                    type="range"
                    min="140"
                    max="220"
                    value={calcHeight}
                    onChange={(e) => setCalcHeight(e.target.value)}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-semibold mb-2 ${textPrimary}`}>
                    Weight (kg): {calcWeight}
                  </label>
                  <input
                    type="range"
                    min="40"
                    max="150"
                    value={calcWeight}
                    onChange={(e) => setCalcWeight(e.target.value)}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-semibold mb-2 ${textPrimary}`}>
                    Age: {calcAge}
                  </label>
                  <input
                    type="range"
                    min="15"
                    max="80"
                    value={calcAge}
                    onChange={(e) => setCalcAge(e.target.value)}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-semibold mb-2 ${textPrimary}`}>
                    Gender
                  </label>
                  <select
                    value={calcGender}
                    onChange={(e) => setCalcGender(e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg border transition-all ${
                      isDark
                        ? "bg-white/[0.05] border-white/[0.08] text-white"
                        : "bg-gray-50 border-gray-300 text-gray-900"
                    }`}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-semibold mb-2 ${textPrimary}`}>
                    Activity Level
                  </label>
                  <select
                    value={calcActivity}
                    onChange={(e) => setCalcActivity(e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg border transition-all ${
                      isDark
                        ? "bg-white/[0.05] border-white/[0.08] text-white"
                        : "bg-gray-50 border-gray-300 text-gray-900"
                    }`}
                  >
                    <option value="sedentary">Sedentary (little exercise)</option>
                    <option value="light">Light (1-3 days/week)</option>
                    <option value="moderate">Moderate (3-5 days/week)</option>
                    <option value="heavy">Heavy (6-7 days/week)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className={`rounded-xl p-4 ${isDark ? "bg-red-500/20" : "bg-red-100/50"}`}>
                  <p className={`text-xs font-semibold ${textMuted} mb-1`}>BMI</p>
                  <p className="text-3xl font-black text-red-500">{bmi}</p>
                  <p className={`text-xs mt-1 ${textMuted}`}>
                    {bmi < 18.5 ? "Underweight" : bmi < 25 ? "Healthy" : bmi < 30 ? "Overweight" : "Obese"}
                  </p>
                </div>
                <div className={`rounded-xl p-4 ${isDark ? "bg-red-500/20" : "bg-red-100/50"}`}>
                  <p className={`text-xs font-semibold ${textMuted} mb-1`}>Daily Calories</p>
                  <p className="text-3xl font-black text-red-500">{calories}</p>
                  <p className={`text-xs mt-1 ${textMuted}`}>TDEE</p>
                </div>
              </div>
            </motion.div>

            {/* Macro Calculator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`rounded-2xl p-8 border ${
                isDark
                  ? "bg-white/[0.04] border-white/[0.08]"
                  : "bg-white border-gray-200 shadow-md"
              }`}
            >
              <h3 className={`text-2xl font-black mb-6 ${textPrimary}`}>Macronutrient Breakdown</h3>

              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${textPrimary}`}>
                    Body Weight (kg): {macroWeight}
                  </label>
                  <input
                    type="range"
                    min="40"
                    max="150"
                    value={macroWeight}
                    onChange={(e) => setMacroWeight(e.target.value)}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-semibold mb-2 ${textPrimary}`}>
                    Fitness Goal
                  </label>
                  <select
                    value={macroGoal}
                    onChange={(e) => setMacroGoal(e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg border transition-all ${
                      isDark
                        ? "bg-white/[0.05] border-white/[0.08] text-white"
                        : "bg-gray-50 border-gray-300 text-gray-900"
                    }`}
                  >
                    <option value="muscle">Build Muscle</option>
                    <option value="weight-loss">Weight Loss</option>
                    <option value="balanced">Balanced/Maintenance</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4 mt-8">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <p className={`text-sm font-semibold ${textPrimary}`}>Protein</p>
                    <p className="text-lg font-black text-green-500">{macros.protein}g</p>
                  </div>
                  <div className={`w-full h-2 rounded-full ${isDark ? "bg-white/[0.1]" : "bg-gray-200"}`}>
                    <div className="w-1/3 h-full bg-green-500 rounded-full"></div>
                  </div>
                  <p className={`text-xs ${textMuted}`}>~{(parseFloat(macros.protein) * 4).toFixed(0)} kcal</p>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <p className={`text-sm font-semibold ${textPrimary}`}>Carbs</p>
                    <p className="text-lg font-black text-amber-500">{macros.carbs}g</p>
                  </div>
                  <div className={`w-full h-2 rounded-full ${isDark ? "bg-white/[0.1]" : "bg-gray-200"}`}>
                    <div className="w-2/5 h-full bg-amber-500 rounded-full"></div>
                  </div>
                  <p className={`text-xs ${textMuted}`}>~{(parseFloat(macros.carbs) * 4).toFixed(0)} kcal</p>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <p className={`text-sm font-semibold ${textPrimary}`}>Fats</p>
                    <p className="text-lg font-black text-blue-500">{macros.fats}g</p>
                  </div>
                  <div className={`w-full h-2 rounded-full ${isDark ? "bg-white/[0.1]" : "bg-gray-200"}`}>
                    <div className="w-1/4 h-full bg-blue-500 rounded-full"></div>
                  </div>
                  <p className={`text-xs ${textMuted}`}>~{(parseFloat(macros.fats) * 9).toFixed(0)} kcal</p>
                </div>
              </div>

              <p className={`text-xs mt-6 p-4 rounded-lg ${isDark ? "bg-white/[0.04]" : "bg-gray-100"} ${textMuted}`}>
                💡 These are estimates. For personalized nutrition advice, consult our trainers.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      

      {/* ── Workout Routines Section ── */}
      <section
        id="workouts"
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
              💪 Sample Plans
            </p>
            <h2 className={`text-4xl sm:text-5xl font-black mb-6 ${textPrimary}`}>
              Beginner Workout Routines
            </h2>
            <p className={`text-lg max-w-3xl mx-auto ${textSecondary}`}>
              Choose a routine that fits your schedule and goals. Start with lighter weights and focus on form!
            </p>
          </motion.div>

          <div className="space-y-8">
            {WORKOUT_ROUTINES.map((routine, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`rounded-2xl p-8 border transition-all ${
                  isDark
                    ? "bg-white/[0.04] border-white/[0.08] hover:border-red-500/30"
                    : "bg-white border-gray-200 hover:border-red-300/60 shadow-md"
                }`}
              >
                <div className="mb-6">
                  <h3 className={`text-2xl font-black mb-2 ${textPrimary}`}>
                    {routine.name}
                  </h3>
                  <p className={textSecondary}>{routine.description}</p>
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {routine.days.map((day) => (
                      <span key={day} className="px-3 py-1 text-xs font-semibold text-red-500 bg-red-500/20 rounded-full">
                        {day}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className={`border-b ${isDark ? "border-white/[0.08]" : "border-gray-200"}`}>
                        <th className={`text-left py-3 px-3 font-bold ${textPrimary}`}>Exercise</th>
                        <th className={`text-center py-3 px-3 font-bold ${textPrimary}`}>Sets</th>
                        <th className={`text-center py-3 px-3 font-bold ${textPrimary}`}>Reps</th>
                        <th className={`text-center py-3 px-3 font-bold ${textPrimary}`}>Rest</th>
                      </tr>
                    </thead>
                    <tbody>
                      {routine.exercises.map((ex, i) => (
                        <tr key={i} className={`border-b ${isDark ? "border-white/[0.04]" : "border-gray-100"}`}>
                          <td className={`py-3 px-3 ${textSecondary}`}>
                            {ex.name}
                            {"day" in ex && ex.day && (
                              <div className="text-xs text-red-500 font-semibold mt-1">{ex.day}</div>
                            )}
                          </td>
                          <td className={`text-center py-3 px-3 ${textMuted}`}>{ex.sets}</td>
                          <td className={`text-center py-3 px-3 ${textMuted}`}>{ex.reps}</td>
                          <td className={`text-center py-3 px-3 ${textMuted}`}>{ex.rest}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Nutrition Guide Section ── */}
      <section
        id="nutrition"
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
              🥗 Nutrition
            </p>
            <h2 className={`text-4xl sm:text-5xl font-black mb-6 ${textPrimary}`}>
              Beginner Nutrition Guide
            </h2>
            <p className={`text-lg max-w-3xl mx-auto ${textSecondary}`}>
              Diet is 70% of your fitness journey. Learn the basics to fuel your workouts properly.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {NUTRITION_TIPS.map((section, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ translateY: -4 }}
                className={`rounded-2xl p-6 border transition-all ${
                  isDark
                    ? "bg-white/[0.04] border-white/[0.08] hover:border-red-500/30"
                    : "bg-white border-gray-200 hover:border-red-300/60 shadow-md"
                }`}
              >
                <h3 className={`text-lg font-bold mb-4 text-red-500`}>{section.title}</h3>
                <ul className="space-y-3">
                  {section.tips.map((tip, i) => (
                    <li key={i} className="flex gap-2">
                      <CheckCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <span className={`text-sm ${textSecondary}`}>{tip}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      

      {/* ── What to Bring Section ── */}
      <section
        id="what-to-bring"
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
              🎒 Packing List
            </p>
            <h2 className={`text-4xl sm:text-5xl font-black mb-6 ${textPrimary}`}>
              What to Bring on Your First Day
            </h2>
            <p className={`text-lg max-w-3xl mx-auto ${textSecondary}`}>
              Be prepared and make the most of your first gym experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHAT_TO_BRING.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ translateY: -4 }}
                className={`rounded-2xl p-6 border transition-all ${
                  isDark
                    ? "bg-white/[0.04] border-white/[0.08] hover:border-red-500/30"
                    : "bg-white border-gray-200 hover:border-red-300/60 shadow-md"
                }`}
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className={`font-bold text-lg mb-2 ${textPrimary}`}>{item.item}</h3>
                <p className={`text-sm ${textSecondary}`}>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Recovery Guide Section ── */}
      <section
        id="recovery"
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
              🧘 Recovery
            </p>
            <h2 className={`text-4xl sm:text-5xl font-black mb-6 ${textPrimary}`}>
              Post-Workout Recovery Guide
            </h2>
            <p className={`text-lg max-w-3xl mx-auto ${textSecondary}`}>
              Recovery is just as important as training. These stretches help reduce soreness and improve flexibility.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {RECOVERY_STRETCHES.map((stretch, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ translateY: -4 }}
                className={`rounded-2xl p-6 border transition-all ${
                  isDark
                    ? "bg-white/[0.04] border-white/[0.08] hover:border-red-500/30"
                    : "bg-white border-gray-200 hover:border-red-300/60 shadow-md"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className={`font-bold text-lg flex-1 ${textPrimary}`}>{stretch.name}</h3>
                  <span className="text-2xl">🧘</span>
                </div>
                <p className={`text-sm mb-4 ${textSecondary}`}>{stretch.description}</p>
                <div className="space-y-2">
                  <div className="flex gap-2 items-center">
                    <Clock className="w-4 h-4 text-red-500 flex-shrink-0" />
                    <span className={`text-xs font-semibold ${textMuted}`}>{stretch.time}</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Target className="w-4 h-4 text-red-500 flex-shrink-0" />
                    <span className={`text-xs font-semibold ${textMuted}`}>{stretch.targetArea}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Orientation Booking Section ── */}
      <section
        id="orientation"
        className={`py-20 sm:py-28 lg:py-32 px-4 sm:px-6 transition-colors ${bgSecondary}`}
      >
        <div className="w-full max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <p className="text-red-500 font-bold uppercase tracking-widest text-sm mb-3">
              📅 Book Now
            </p>
            <h2 className={`text-4xl sm:text-5xl font-black ${textPrimary}`}>
              Schedule Your Free Orientation
            </h2>
            <p className={`text-lg max-w-2xl mx-auto mt-4 ${textSecondary}`}>
              Get personalized guidance from our expert trainers. Our orientation sessions are completely FREE for new members!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className={`rounded-3xl p-8 border ${
              isDark
                ? "bg-white/[0.04] border-white/[0.08]"
                : "bg-white border-gray-200 shadow-lg"
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left: Info */}
              <div className="space-y-6">
                <div className="flex gap-4">
                  <Clock className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className={`font-bold mb-2 ${textPrimary}`}>
                      Duration
                    </h3>
                    <p className={textSecondary}>
                      30-45 minutes with our expert trainer
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className={`font-bold mb-2 ${textPrimary}`}>
                      What You Get
                    </h3>
                    <ul className={`space-y-1 text-sm ${textSecondary}`}>
                      <li>✓ Gym facility tour</li>
                      <li>✓ Equipment introduction</li>
                      <li>✓ Fitness assessment</li>
                      <li>✓ Personalized plan overview</li>
                    </ul>
                  </div>
                </div>

                <div className="flex gap-4">
                  <MapPin className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className={`font-bold mb-2 ${textPrimary}`}>
                      Location
                    </h3>
                    <p className={`text-sm ${textSecondary}`}>
                      Upstairs Best Bakery<br/>
                      Bemina, Srinagar<br/>
                      6 AM - 8 PM Daily
                    </p>
                  </div>
                </div>
              </div>

              {/* Right: Form */}
               <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${textPrimary}`}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className={`w-full px-4 py-2 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-red-500 ${
                      isDark
                        ? "bg-white/[0.05] border-white/[0.08] text-white"
                        : "bg-gray-50 border-gray-300 text-gray-900"
                    }`}
                    placeholder="Your name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${textPrimary}`}>
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className={`w-full px-4 py-2 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-red-500 ${
                        isDark
                          ? "bg-white/[0.05] border-white/[0.08] text-white"
                          : "bg-gray-50 border-gray-300 text-gray-900"
                      }`}
                      placeholder="Email"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${textPrimary}`}>
                      Phone *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className={`w-full px-4 py-2 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-red-500 ${
                        isDark
                          ? "bg-white/[0.05] border-white/[0.08] text-white"
                          : "bg-gray-50 border-gray-300 text-gray-900"
                      }`}
                      placeholder="Phone"
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-semibold mb-2 ${textPrimary}`}>
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className={`w-full px-4 py-2 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-red-500 ${
                      isDark
                        ? "bg-white/[0.05] border-white/[0.08] text-white"
                        : "bg-gray-50 border-gray-300 text-gray-900"
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-semibold mb-2 ${textPrimary}`}>
                    Your Fitness Experience
                  </label>
                  <select
                    value={formData.experience}
                    onChange={(e) =>
                      setFormData({ ...formData, experience: e.target.value })
                    }
                    className={`w-full px-4 py-2 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-red-500 ${
                      isDark
                        ? "bg-white/[0.05] border-white/[0.08] text-white"
                        : "bg-gray-50 border-gray-300 text-gray-900"
                    }`}
                  >
                    <option value="beginner">Complete Beginner</option>
                    <option value="some-exp">Some Experience</option>
                    <option value="experienced">Experienced</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-semibold mb-2 ${textPrimary}`}>
                    Fitness Goals (Optional)
                  </label>
                  <textarea
                    value={formData.goals}
                    onChange={(e) =>
                      setFormData({ ...formData, goals: e.target.value })
                    }
                    className={`w-full px-4 py-2 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-red-500 resize-none ${
                      isDark
                        ? "bg-white/[0.05] border-white/[0.08] text-white"
                        : "bg-gray-50 border-gray-300 text-gray-900"
                    }`}
                    rows={3}
                    placeholder="Weight loss, muscle gain, fitness, etc."
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 px-4 rounded-lg bg-red-600 text-white font-bold uppercase tracking-widest hover:bg-red-500 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Book Orientation
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section> 
{/* ── FAQ Section ── */}
      <section
        id="faq"
        className={`py-20 sm:py-28 lg:py-32 px-4 sm:px-6 transition-colors ${bg}`}
      >
        <div className="w-full max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <p className="text-red-500 font-bold uppercase tracking-widest text-sm mb-3">
              ❓ Questions
            </p>
            <h2 className={`text-4xl sm:text-5xl font-black ${textPrimary}`}>
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-4">
            {BEGINNER_FAQS.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => setExpandedFAQ(expandedFAQ === idx ? null : idx)}
                className={`rounded-2xl p-6 border cursor-pointer transition-all ${
                  expandedFAQ === idx
                    ? isDark
                      ? "bg-red-500/20 border-red-500/50"
                      : "bg-red-50/60 border-red-300"
                    : isDark
                      ? "bg-white/[0.04] border-white/[0.08] hover:border-red-500/30"
                      : "bg-white border-gray-200 hover:border-red-300/60"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className={`font-bold text-lg ${textPrimary}`}>
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform flex-shrink-0 ${
                      expandedFAQ === idx ? "rotate-180" : ""
                    }`}
                  />
                </div>

                <AnimatePresence>
                  {expandedFAQ === idx && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t border-white/[0.08]"
                    >
                      <p className={textSecondary}>{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* ── CTA Section ── */}
      <section
        className={`py-20 sm:py-28 lg:py-32 px-4 sm:px-6 transition-colors ${bg}`}
      >
        <div className="w-full max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className={`text-4xl sm:text-5xl font-black mb-6 ${textPrimary}`}>
              Ready to Start Your Journey?
            </h2>
            <p className={`text-lg max-w-2xl mx-auto mb-8 ${textSecondary}`}>
              We're here to support you every step of the way. Join Strong Arm today and transform your life!
            </p>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => (window.location.href = "/")}
              className="inline-flex items-center gap-3 px-10 py-5 border-2 border-red-500 bg-red-600/95 hover:bg-red-500/95 text-white text-lg font-extrabold tracking-widest uppercase transition-all group shadow-2xl rounded-full"
            >
              Back to Home
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        className={`py-16 px-4 sm:px-6 border-t transition-colors ${bg} ${isDark ? "border-white/[0.08]" : "border-gray-200"}`}
      >
        <div className="w-full max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
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

            {/* Contact */}
            <div>
              <h4 className={`font-bold mb-4 ${textPrimary}`}>Contact & Location</h4>
              <ul className={`space-y-3 text-sm ${textMuted}`}>
                <li className="flex gap-2 items-start">
                  <MapPin className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <span className="font-semibold block">Upstairs Best Bakery</span>
                    <span className="text-xs">Bemina, Srinagar</span>
                    <span className="text-xs">6 AM - 8 PM Daily</span>
                  </div>
                </li>
                <li className="flex gap-2 items-center">
                  <Phone className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span>+91-7006324503</span>
                </li>
              </ul>
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
    </div>
  );
}