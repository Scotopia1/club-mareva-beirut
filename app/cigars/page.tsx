'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';
import VideoBackground from '@/components/ui/VideoBackground';

// Enhanced Brand Interface
interface Brand {
  name: string;
  origin: string;
  established?: string;
  description: string;
  logo: string;
  hashtags?: string[];
  testimonial?: {
    quote: string;
    author: string;
    title: string;
  };
  website?: string;
}

const brands: Brand[] = [
  {
    name: "Habanos",
    origin: "Cuba",
    established: "Est. 1994",
    description: "Habanos S.A is a highly reputable and renowned Cuban manufacturing company that was founded in 1994. As the official government-run tobacco company of Cuba, Habanos S.A is responsible for controlling the promotion, distribution, and export of premium Cuban cigars worldwide. The name \"Habanos\" itself is derived from the Spanish term for Havana, the capital city of Cuba. In essence, the company's name pays homage to the city where Cuban cigars have been traditionally produced since the 16th century. Habanos S.A is well known for producing some of the most highly-regarded and sought-after premium cigar brands in the world, including Cohiba, Montecristo, and Romeo y Julieta. These brands are considered to be some of the finest examples of the cigar-making craft and are highly valued by cigar enthusiasts worldwide. With a deep-rooted history and legacy that spans centuries, Habanos S.A has become synonymous with premium cigar culture and is highly regarded as a symbol of luxury and refinement. The company's unwavering commitment to quality, tradition, and innovation has made it one of the most respected and influential players in the global cigar industry.",
    logo: "/images/external/habanos-sa-logo-vector.png",
    hashtags: ["#CubanCigars", "#Habanos", "#ClubMareva"],
    testimonial: {
      quote: "The Cohiba Behike is simply unmatched. Club Mareva's selection and service made it an unforgettable experience.",
      author: "Michel R.",
      title: "Founding Member"
    },
    website: "https://www.habanos.com"
  },
  {
    name: "Davidoff",
    origin: "Dominican Republic",
    established: "Est. 1968",
    description: "In their single-minded pursuit to create only the very best cigars, Davidoff believes in the importance of time. Taking precious time to craft an exceptional cigar, and equally taking the time to enjoy that cigar, lies at the very heart of Davidoff's philosophy. Davidoff cigars are widely regarded as a top-shelf luxury selection. Handmade in the Dominican Republic, Davidoff offers a burgeoning portfolio of premium blends with a distinctly mellow and approachable profile. Each cigar is flawlessly constructed with enticing flavors connoisseurs choose for their rich signature of cedar, coffee and nuts and their smooth and creamy finishes.",
    logo: "/images/external/davidoff_cigars_logo.png",
    hashtags: ["#Davidoff", "#LuxuryCigars", "#Refinement"],
    testimonial: {
      quote: "For special occasions, nothing compares to a Davidoff. The presentation and quality at Club Mareva elevate the entire experience.",
      author: "Antoine K.",
      title: "Premium Member"
    },
    website: "https://www.davidoff.com"
  },
  {
    name: "Caldwell",
    origin: "Various",
    established: "Est. 2014",
    description: "All of Caldwell's creations are unique, but they all share that signature, expert Caldwell care\u2014 expertly aged tobaccos, complex blends, and top-notch construction that keeps the flavor consistently good and delicious right down to the nub on each stick. Caldwell has grown a considerable portfolio of diverse offerings, and they have a blend to suit just about any palate preference. Eastern Standard is an interesting take on Connecticut blends, using vintage Dominican and Nicaraguan Cuban-seed tobaccos under a top-shelf hybrid wrapper that is a cross between Connecticut Shade and Brazilian Mata Fina varietals.",
    logo: "/images/external/7085500fef0c5d55f740aa2b82a20d69_Caldwell-Cigar-Co-logo.jpg",
    hashtags: ["#Caldwell", "#BoutiqueCigars", "#Innovation"],
    testimonial: {
      quote: "Caldwell's Eastern Standard is my go-to. The staff at Club Mareva always knows exactly what I'm looking for.",
      author: "Georges M.",
      title: "Regular Member"
    },
    website: "https://caldwellcigars.com"
  },
  {
    name: "Hiram & Solomon",
    origin: "Dominican Republic",
    established: "Est. 2016",
    description: "Hiram & Solomon Cigars are all about bringing Mason brothers together in the harmony of a good cigar. In the beginning, WB Kashouty and Brother George Dakrat, the founders of Hiram & Solomon, established their first location in the beauty of the Dominican Republic, before moving shortly after to Nicaragua, harvesting shockingly delicious and full-bodied tobacco to rival the flavors and quality of the world's best cigar brands.",
    logo: "/images/external/hiram-solomon.png",
    hashtags: ["#HiramAndSolomon", "#MasonicHeritage", "#Craftsmanship"],
    testimonial: {
      quote: "The Traveling Man is a masterpiece. Finding it at Club Mareva was a revelation—truly a hidden gem.",
      author: "Fadi S.",
      title: "Cigar Enthusiast"
    },
    website: "https://www.hiramandsolomoncigars.com"
  },
  {
    name: "Patoro",
    origin: "Dominican Republic",
    established: "Est. 2005",
    description: "The main goal of Patrik J. Martin when he created his brand Patoro in 2001 was and still is to offer cigar aficionados positive emotions during moments of intense pleasure, enjoyment and relaxation thanks to the excellence of his cigars. While the tobacco used in Patoro cigars is grown on the best soils of the Dominican Republic, the seeds are essentially of Cuban origin and the result of long development and research.",
    logo: "/images/external/logo-patoro.png",
    hashtags: ["#Patoro", "#CubanSeed", "#Elegance"],
    testimonial: {
      quote: "Patoro's Gran Añejo is pure silk. The humidor at Club Mareva keeps them in perfect condition.",
      author: "Karim H.",
      title: "Connoisseur"
    },
    website: "https://www.patoro.com"
  },
  {
    name: "Drew Estate",
    origin: "Nicaragua",
    established: "Est. 1996",
    description: "Jonathan Drew first entered the industry when he began selling cigars from a small kiosk in New York City's World Trade Center in 1995. The following year, his former fraternity brother Marvin Samel would join him, and the pair would go on to found Drew Estate Inc. Drew Estate would find success in the premium cigar industry when it released Liga Privada in 2007, followed by brands such as Undercrown, Herrera Esteli and Norte\u00f1o. The company has grown into the largest producer of handmade cigars in Nicaragua, where its modern La Gran Fabrica Drew Estate factory is located. Liga Privada means \"private blend.\" Seven different tobaccos from seven distinct vegas are included. Wrapper is hand fermented for 18+ months, no sweat allowed. Only four pairs within our factory are certified to produce. Each pair is allowed to craft only 250 cigars per day. Cigars are aged a full year before being offered for sale. Very limited production.",
    logo: "/images/external/drew-estate-logo.svg",
    hashtags: ["#DrewEstate", "#LigaPrivada", "#BoldFlavors"],
    testimonial: {
      quote: "The Liga Privada No. 9 paired with aged rum—pure magic. Club Mareva's pairing suggestions are always spot-on.",
      author: "Ziad B.",
      title: "Regular Guest"
    },
    website: "https://drewestate.com"
  },
  {
    name: "Rocky Patel",
    origin: "Nicaragua/Honduras",
    established: "Est. 1996",
    description: "Charismatic cigar-maker Rocky Patel blends a popular and ever-growing portfolio of top-rated cigars. The 95-rated Rocky Patel Decade, 94-rated Rocky Patel, The Edge Habano, and 90-rated Rocky Patel Renaissance represent just a few of his most prominent releases. Rocky Patel cigars are handcrafted in Nicaragua and Honduras from a wide diversity of premium long-filler tobaccos and well-known wrapper varieties, including Connecticut Shade, Ecuador Habano, Connecticut Broadleaf, San Andr\u00e9s, and more.",
    logo: "/images/external/rocky-patel-logo.png",
    hashtags: ["#RockyPatel", "#PremiumCigars", "#BoldFlavors"],
    testimonial: {
      quote: "The Decade is my daily companion. Consistent, reliable, and always available at Club Mareva.",
      author: "Nabil F.",
      title: "Daily Visitor"
    },
    website: "https://rockypatel.com"
  },
  {
    name: "Casdagli",
    origin: "Dominican/Costa Rica",
    established: "Est. 2014",
    description: "Casdagli Cigars was founded in 1997, but the history starts in the 1800s when the Casdagli family started trading grain, tobacco, cotton, and breeding of Arabian horses. The original production of Casdagli Cigars in 1990s was produced in Cuba, 100% hand rolled by the master torcedor Carlos Valdez Mosquera, but on Carlos's retirement in 2013 the search for a new trustworthy producer led to the discovery of the newly opened Kelner Boutique Factory in the Dominican Republic. One line of Casdagli cigars is made in Costa Rica: The Daughters of the Wind. These cigars are hand crafted in Costa Rica by Don Olman Guzman. These blends are dominated by the rich flavours emanating from Peru, Ecuador, and Nicaragua. \"The Daughters of the Wind\" is a famous Arabian poem written in the 6th century inspired by the beauty of Bedouin horses. In the early 1900s Demy & Alick Casdagli purchased the Sheikh Obeyd stables just outside Cairo and became celebrated breeders of Arabian racehorses. They gained success with breeding the Dahman strain with a famous mare called Bint Durra. \"The Dahman is a very rare breed famed for its strength, elegance and refinement.\"",
    logo: "/images/external/casdagli-cigars-logo.png",
    hashtags: ["#Casdagli", "#BritishHeritage", "#Refined"],
    testimonial: {
      quote: "Casdagli's Daughters of the Wind is exceptional. Club Mareva introduced me to this brand—forever grateful.",
      author: "Jean-Pierre L.",
      title: "Member Since 2020"
    },
    website: "https://www.casdaglicigars.com"
  },
  {
    name: "Saga",
    origin: "Dominican Republic",
    established: "Est. 2016",
    description: "The Saga Cigars try to tell stories with their lines. In fact, the cigar boxes they come in look like very rustic books or tomes with each line holding a new 'chapter' of flavors. The Saga Short Tales are made at the De Los Reyes Cigars factory in the Dominican Republic and saw their debut in 2016 thanks to the young Nirka Reyes who took over her father's company recently.",
    logo: "/images/external/SAGA.png",
    hashtags: ["#SagaCigars", "#ExceptionalValue", "#Quality"],
    testimonial: {
      quote: "Perfect for a quick smoke break. Saga delivers quality at an accessible price point.",
      author: "Sami T.",
      title: "Regular Guest"
    },
    website: "https://www.sagacigars.com"
  },
  {
    name: "Smoking Jacket",
    origin: "Dominican Republic",
    established: "Est. 2018",
    description: "Influenced by legends in the cigar world, Hendrik Kelner always dreamed of opening an independently owned cigar factory, enabling him to create unique cigar blends with his own personal touch. After almost 20 years of working with his father Henke, Hendrik's dream, Kelner Boutique Factory (KBF), has finally become a reality and opened in San Jose, Costa Rica. Smoking Jacket is a new cigar brand released in the US market in September of 2013. Only 75 cigar stores will carry them as supply is extremely limited. The line consists of 4 cigar sizes, each with its own blend to offer a unique smoking experience.",
    logo: "/images/external/Smoking_Jacket_Cigars_logo.png",
    hashtags: ["#SmokingJacket", "#ModernBoutique", "#Innovation"],
    testimonial: {
      quote: "Hendrik Jr.'s vision shines through every blend. A must-try for any serious aficionado.",
      author: "Rami D.",
      title: "Cigar Collector"
    },
    website: "https://www.smokingcigarjacket.com"
  },
];

const philosophyPillars = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
      </svg>
    ),
    title: "Heritage",
    description: "Our state-of-the-art Spanish cedar humidor maintains perfect conditions at 70% humidity and 70°F, preserving each cigar's character exactly as the master blenders intended."
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
    title: "Curation",
    description: "Every cigar in our collection is hand-selected from the world's premier growing regions—Cuba, Nicaragua, Dominican Republic, Honduras, and Costa Rica—representing over 220 varieties from legendary houses."
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
    title: "Pairing",
    description: "Our knowledgeable staff are here to guide your journey, whether you seek a bold Nicaraguan to match your single malt or a refined Dominican for your evening cognac."
  }
];

// Brand Card Component
function InstagramBrandCard({ brand, index }: { brand: Brand; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isExpanded, setIsExpanded] = useState(false);

  return (
      <motion.article
        ref={ref}
        id={brand.name.toLowerCase().replace(/\s+/g, '-')}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{
          duration: 0.6,
          delay: index * 0.1,
          ease: [0.22, 1, 0.36, 1]
        }}
        className="bg-black-800 border border-black-900 rounded-lg overflow-hidden max-w-lg mx-auto"
      >
        {/* Header: Logo + Brand Name + Follow */}
        <div className="flex items-center justify-between p-4 border-b border-black-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-gold/30 bg-black-900 flex items-center justify-center">
              <Image
                src="/images/club-mareva-logo-gold.svg"
                alt="Club Mareva Beirut"
                width={40}
                height={40}
                className="object-contain p-1"
              />
            </div>
            <div>
              <h3 className="text-cream font-semibold text-sm">Club Mareva Beirut</h3>
              <p className="text-cream/60 text-xs">
                {brand.name} • {brand.origin}
              </p>
            </div>
          </div>
          <a
            href="https://instagram.com/clubmarevabeirut"
            target="_blank"
            rel="noopener noreferrer"
            className="font-playfair font-medium tracking-wide uppercase transition-all duration-300 relative inline-flex items-center justify-center bg-transparent border-2 border-gold text-gold hover:bg-gold/10 px-4 py-2 text-sm text-xs py-1.5 px-3"
          >
            Follow
          </a>
        </div>

        {/* Hero Image - 4:5 Instagram ratio */}
        <motion.div
          className="aspect-[4/5] relative bg-black-900 overflow-hidden"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 bg-white">
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <Image
                src={brand.logo}
                alt={`${brand.name} logo`}
                fill
                className="object-contain p-8"
              />
            </div>
          </div>
        </motion.div>

        {/* Bio */}
        <div className="px-5 py-4">
          <p className="text-cream text-sm leading-relaxed">
            <span className="font-semibold">{brand.name}</span>{' '}
            {isExpanded || brand.description.length <= 150
              ? brand.description
              : `${brand.description.slice(0, 150).trimEnd()}...`}
            {brand.description.length > 150 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-cream/50 hover:text-cream/70 ml-1 transition-colors"
              >
                {isExpanded ? 'less' : 'more'}
              </button>
            )}
          </p>
        </div>


      </motion.article>
  );
}

function PhilosophyPillar({ pillar, index }: { pillar: typeof philosophyPillars[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="text-center px-6"
    >
      <div className="inline-flex items-center justify-center w-16 h-16 mb-6 border border-gold/30 text-gold">
        {pillar.icon}
      </div>
      <h3 className="font-playfair text-xl text-gold mb-4 tracking-wide font-semibold">
        {pillar.title}
      </h3>
      <p className="font-playfair text-cream/80 text-sm leading-relaxed">
        {pillar.description}
      </p>
    </motion.div>
  );
}

function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 1.5 }}
    >
      <span className="font-playfair text-cream/60 text-xs uppercase tracking-[0.2em]">
        Discover Our Collection
      </span>
      <div className="animate-scroll-bounce">
        <svg
          className="w-6 h-6 text-gold"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
    </motion.div>
  );
}

export default function CigarsPage() {
  const philosophyRef = useRef(null);
  const isPhilosophyInView = useInView(philosophyRef, { once: true, margin: "-50px" });

  return (
    <div className="min-h-screen bg-black pt-24">
      {/* Hero Banner */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Video/Image Background */}
        <VideoBackground
          posterSrc="/images/clubmarevabeirut/2025/Delamain-Sig-Cigar-Bottles-at-Club-Mareva-Beirut-scaled.jpg"
          fallbackImageSrc="/images/clubmarevabeirut/2025/Delamain-Sig-Cigar-Bottles-at-Club-Mareva-Beirut-scaled.jpg"
          alt="Club Mareva Beirut Cigars"
          overlayClassName="bg-black/70"
          enableKenBurns={true}
        />

        {/* Radial gradient overlay for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] z-10" />

        {/* Noise texture */}
        <div className="absolute inset-0 opacity-40 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')] z-10" />

        {/* Hero content */}
        <div className="relative z-20 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="font-playfair text-6xl md:text-7xl lg:text-8xl text-gold mb-6 tracking-tight font-bold">
              THE CIGARS
            </h1>
            <motion.div
              className="w-24 h-[2px] bg-gold mx-auto mb-6"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
            <motion.p
              className="font-playfair text-cream text-lg md:text-xl max-w-2xl mx-auto tracking-wide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.7 }}
            >
              Over 220 premium varieties from the world's finest regions
            </motion.p>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <ScrollIndicator />
      </section>

      {/* Philosophy Section - "The Art of Selection" */}
      <section className="py-24 px-4 bg-black relative overflow-hidden">
        {/* Subtle background accent */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black-800/20 to-black" />

        <motion.div
          ref={philosophyRef}
          className="max-w-6xl mx-auto relative z-10"
          initial={{ opacity: 0 }}
          animate={isPhilosophyInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Section Title */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isPhilosophyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-playfair text-gold/70 text-sm uppercase tracking-[0.3em] mb-4">
                Our Philosophy
              </p>
              <h2 className="font-playfair text-4xl md:text-5xl text-gold mb-6 tracking-tight font-bold">
                THE ART OF SELECTION
              </h2>
              <div className="w-16 h-[2px] bg-gold mx-auto" />
            </motion.div>
          </div>

          {/* Three Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {philosophyPillars.map((pillar, index) => (
              <PhilosophyPillar key={pillar.title} pillar={pillar} index={index} />
            ))}
          </div>

          {/* Bottom decorative divider */}
          <motion.div
            className="flex items-center gap-4 mt-20"
            initial={{ opacity: 0 }}
            animate={isPhilosophyInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
          </motion.div>
        </motion.div>
      </section>

      {/* Instagram-Style Brand Feed */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-4xl mx-auto">
          {/* Section title */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-playfair text-gold/70 text-sm uppercase tracking-[0.3em] mb-4">
              Curated Excellence
            </p>
            <h2 className="font-playfair text-5xl md:text-6xl text-gold mb-4 tracking-tight font-bold">
              OUR BRANDS
            </h2>
            <div className="w-16 h-[2px] bg-gold mx-auto mb-6" />
            <p className="font-playfair text-cream/70 text-sm max-w-xl mx-auto">
              Explore our carefully curated selection of the world's finest cigar brands,
              each chosen for their exceptional quality and heritage.
            </p>
          </motion.div>

          {/* Instagram-style feed - 2 column layout on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {brands.map((brand, index) => (
              <InstagramBrandCard key={brand.name} brand={brand} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom spacing */}
      <div className="h-20 bg-black" />
    </div>
  );
}
