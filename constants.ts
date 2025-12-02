import { SiteContent } from './types';

export const DEFAULT_CONTENT: SiteContent = {
  general: {
    brandName: "TechSpace Labs",
    tagline: "Empowering brands with tech that thinks.",
    contactEmail: "info@techspacelabs.cloud",
    contactPhone: "+254729 407 573",
    address: "Karen office park Nairobi",
    logoUrl: "https://lucide.dev/icons/cpu.svg",
    socialLinks: {
      instagram: "https://www.instagram.com/techspace.labs?igsh=bGJlN28xd2hoOTUx",
      linkedin: "#",
      twitter: "https://x.com/TechSpaceLabs?t=Bm-_oUM3OpV8gWVEPEILdQ&s=09",
      facebook: "#"
    }
  },
  pages: {
    home: {
      heroTitle: "Build What's Next",
      heroSubtitle: "We merge AI, design, and engineering to forge digital products that define the future. Let’s build your vision.",
      heroCta: "Start Your Project",
      heroImage: "https://picsum.photos/1920/1080?grayscale&blur=2"
    },
    about: {
      story: "Founded in 2024, TechSpace Labs began as a collective of AI researchers and UI/UX obsessives. We realized that the future of web isn't just about looking good—it's about thinking smart. Today, we help global brands navigate the digital shift.",
      mission: "To democratize advanced technology for businesses of all sizes, ensuring accessible, scalable, and intelligent digital solutions.",
      vision: "A world where technology serves humanity through seamless, invisible, and magical interfaces."
    }
  },
  services: [
    {
      id: "0",
      title: "Marketing & Ads",
      description: "Deep market research, precision customer profiling, and performance-driven ad campaigns. We curate strategic influencer partnerships to amplify brand authority and reach.",
      icon: "Megaphone"
    },
    {
      id: "1",
      title: "Web & Systems",
      description: "High-performance React applications, scalable cloud architecture, and enterprise-grade CMS solutions.",
      icon: "Globe"
    },
    {
      id: "2",
      title: "Mobile Apps",
      description: "Native and cross-platform mobile experiences that feel fluid, responsive, and intuitive on any device.",
      icon: "Smartphone"
    },
    {
      id: "3",
      title: "AI Integration",
      description: "Custom LLM agents, automated workflows, and predictive analytics integrated directly into your business stack.",
      icon: "Bot"
    },
    {
      id: "4",
      title: "Branding & Graphics",
      description: "Futuristic visual systems, logos, and motion graphics that set your brand apart in a crowded digital space.",
      icon: "Palette"
    }
  ],
  team: [
    {
      id: "t1",
      name: "Alex Chen",
      role: "Lead Engineer",
      image: "https://picsum.photos/200/200?random=1"
    },
    {
      id: "t2",
      name: "Sarah Jenkins",
      role: "Head of Design",
      image: "https://picsum.photos/200/200?random=2"
    },
    {
      id: "t3",
      name: "Marcus Void",
      role: "AI Specialist",
      image: "https://picsum.photos/200/200?random=3"
    }
  ],
  testimonials: [
    {
      id: "tm1",
      name: "Elara Vance",
      role: "CTO",
      company: "Nexus Corp",
      text: "TechSpace Labs didn't just build a website; they built a digital ecosystem that increased our conversion by 300%."
    },
    {
      id: "tm2",
      name: "John Doe",
      role: "Founder",
      company: "Startup X",
      text: "The speed and attention to detail were unmatched. The AI integration saved us 20 hours a week."
    }
  ],
  blog: [
    {
      id: "b1",
      title: "The Future of AI in Web Design",
      category: "AI & Tech",
      date: "Oct 12, 2024",
      image: "https://picsum.photos/800/400?random=10",
      excerpt: "How generative models are changing the way we prototype and deploy user interfaces.",
      content: "Full article content placeholder. In a world driven by speed, AI is the ultimate catalyst..."
    },
    {
      id: "b2",
      title: "Why Glassmorphism is Here to Stay",
      category: "Design",
      date: "Nov 01, 2024",
      image: "https://picsum.photos/800/400?random=11",
      excerpt: "Exploring the aesthetic appeal and usability benefits of frosted glass UI elements.",
      content: "Glassmorphism provides depth and context without cluttering the interface..."
    },
    {
      id: "b3",
      title: "Optimizing React for Performance",
      category: "Development",
      date: "Nov 15, 2024",
      image: "https://picsum.photos/800/400?random=12",
      excerpt: "Deep dive into memoization, lazy loading, and server components.",
      content: "Performance is not just a metric; it's a feature. Here is how we optimize..."
    }
  ],
  tools: [
    {
      id: "tool1",
      title: "AI Meta Tag Generator",
      description: "Generate SEO-optimized meta titles and descriptions instantly using our custom fine-tuned model.",
      icon: "Search",
      link: "#",
      category: "SEO Tools",
      buttonText: "Try It Free"
    },
    {
      id: "tool2",
      title: "Color Palette Synth",
      description: "Create futuristic, accessible color palettes for your next web project.",
      icon: "Palette",
      link: "#",
      category: "Design",
      buttonText: "Launch Tool"
    },
    {
      id: "tool3",
      title: "JSON Formatter Pro",
      description: "Clean, validate, and visualize your JSON data with a developer-friendly interface.",
      icon: "Code",
      link: "#",
      category: "Utility",
      buttonText: "Open Editor"
    }
  ]
};