export interface StoryConfig {
  herName: string;
  myName: string;
  subtitle: string;
  opening: {
    greeting: string;
    subline: string;
    buttonText: string;
    quote1: string;
    quote2: string;
    quote3: string;
  };
  whoYouAre: {
    title: string;
    subtitle: string;
    cards: {
      id: string;
      title: string;
      tagline: string;
      icon: string;
      preview: string;
      content: string[];
      highlight?: string;
    }[];
  };
  constellation: {
    title: string;
    subtitle: string;
    centerLabel: string;
    nodes: {
      id: string;
      title: string;
      short: string;
      detail: string;
      iconName: string;
    }[];
  };
  whyYou: {
    phrase1: string;
    phrase2: string;
    phrase3: string;
  };
  timeline: {
    title: string;
    subtitle: string;
    items: {
      tag: string;
      title: string;
      description: string;
      quote: string;
      icon: string;
    }[];
  };
  futureScenarios: {
    title: string;
    subtitle: string;
    footerNote: string;
    scenarios: {
      id: string;
      emoji: string;
      title: string;
      story: string;
      tag: string;
    }[];
  };
  theLetter: {
    heading: string;
    salutation: string;
    paragraphs: string[];
    closingQuestion: string;
    signOff: string;
  };
  proposal: {
    leadIn: string;
    question1: string;
    question2: string;
    finalQuestion: string;
    yesButtonText: string;
    thinkButtonText: string;
    thinkResponse: {
      title: string;
      message: string;
      reassureButton: string;
    };
    yesCelebration: {
      heading: string;
      subheading: string;
      signatureNames: string;
      finalMessage: string;
      vows: string[];
    };
  };
  secretEasterEgg: {
    hint: string;
    revealedTitle: string;
    revealedMessage: string;
  };
  audioTrack?: {
    title: string;
    artist: string;
    src?: string; // If provided, uses this audio URL. If empty, uses the built-in procedural romantic piano synth
  };
  notificationConfig?: {
    webhookUrl?: string; // Discord, Telegram, or custom webhook URL for instant phone alerts
    formspreeEndpoint?: string; // Formspree or EmailJS endpoint for instant email notifications
  };
}

export const loveStory: StoryConfig = {
  herName: "Praise",
  myName: "Ernest",
  subtitle: "The Future I Want to Build With You",
  opening: {
    greeting: "Praise…",
    subline: "I made something especially for you.",
    buttonText: "Begin Our Story",
    quote1: "There are some people you meet in this life…",
    quote2: "…and there are some people you realize you want to walk through all of it with.",
    quote3: "This is about you."
  },
  whoYouAre: {
    title: "First, let me tell you what I see.",
    subtitle: "Beyond everything that can be spoken in a single moment, here is what captivates me every day.",
    cards: [
      {
        id: "mind",
        title: "Your Intelligence",
        tagline: "The depth of how you think and reason",
        icon: "Sparkles",
        preview: "Your intelligence is captivating far beyond books or academic accolades...",
        content: [
          "It is the clarity in the way you process the world, your natural instinct to understand deeply, and the grace with which you ask the questions others overlook.",
          "You don't just know things; you reason with compassion and wisdom. Talking with you challenges me, sharpens me, and makes every conversation feel like an open horizon."
        ],
        highlight: "A mind that inspires, elevates, and sees what is truly important."
      },
      {
        id: "brilliance",
        title: "Your Brilliance",
        tagline: "The way you carry your purpose and energy",
        icon: "Sun",
        preview: "The quiet radiance you bring into any room...",
        content: [
          "You carry yourself with a rare poise. You make ideas come alive, effortlessly turning simple thoughts into inspiring perspectives.",
          "Your ambition isn't loud or self-seeking—it is purposeful, grounded, and undeniably brilliant. It is one of the qualities I hold in the highest admiration."
        ],
        highlight: "Your presence doesn't just illuminate rooms; it transforms them."
      },
      {
        id: "beauty",
        title: "And yes… you're beautiful.",
        tagline: "Inside, outside, and in every gentle detail",
        icon: "Heart",
        preview: "I could write an entire book about this...",
        content: [
          "It starts with your smile—the way it reaches your eyes and softens everything around you. But it goes far deeper.",
          "It's the beauty of your character, your genuine kindness, the quiet strength in your spirit, and how effortless you make genuine warmth look.",
          "Every time I look at you, I am reminded of how extraordinarily blessed anyone would be to share this lifetime with you."
        ],
        highlight: "Breathtaking in every dimension—heart, smile, soul, and grace."
      }
    ]
  },
  constellation: {
    title: "The Constellation of You",
    subtitle: "Every point of light is a reason I find myself completely in awe of who you are.",
    centerLabel: "Praise",
    nodes: [
      {
        id: "smile",
        title: "Your Smile",
        short: "Brings warmth to every room",
        detail: "The genuine warmth that lights up your face and disarms any worry.",
        iconName: "Smile"
      },
      {
        id: "mind",
        title: "Your Mind",
        short: "Deep, inquisitive, and sharp",
        detail: "Your thoughtful curiosity and the breathtaking way you understand complex things.",
        iconName: "Brain"
      },
      {
        id: "kindness",
        title: "Your Kindness",
        short: "Gentle and sincerely selfless",
        detail: "The compassion you extend so effortlessly to those around you.",
        iconName: "HeartHandshake"
      },
      {
        id: "strength",
        title: "Your Strength",
        short: "Resilient and grounded",
        detail: "Your steady, unwavering fortitude in navigating every challenge with grace.",
        iconName: "Shield"
      },
      {
        id: "presence",
        title: "Your Presence",
        short: "Calming, comforting, unforgettable",
        detail: "Just sitting quietly beside you feels like coming home.",
        iconName: "Compass"
      },
      {
        id: "conversations",
        title: "Our Conversations",
        short: "Hours feel like minutes",
        detail: "The effortless rhythm of laughter, shared philosophy, and midnight honesty.",
        iconName: "MessageCircleHeart"
      },
      {
        id: "ambition",
        title: "Your Ambition",
        short: "Driven by purpose and vision",
        detail: "The diligence and passion with which you pursue what you believe in.",
        iconName: "TrendingUp"
      },
      {
        id: "heart",
        title: "Your Heart",
        short: "Pure, devoted, and faithful",
        detail: "A heart that loves genuinely, holds values firmly, and stays true.",
        iconName: "Heart"
      },
      {
        id: "uniqueness",
        title: "Your Uniqueness",
        short: "One of one in this world",
        detail: "There is nobody who thinks, laughs, cares, or shines quite like you.",
        iconName: "Star"
      }
    ]
  },
  whyYou: {
    phrase1: "But here is the thing…",
    phrase2: "It isn't only about what I love about you today.",
    phrase3: "It's about what I see when I imagine my entire future."
  },
  timeline: {
    title: "A Life With You",
    subtitle: "Not just a promise for tomorrow, but a deliberate partnership for every season ahead.",
    items: [
      {
        tag: "Growth & Vision",
        title: "Partner in Progress",
        description: "I want us to grow together. To celebrate each other’s wins, challenge each other to be our highest selves, support each other’s biggest dreams, and become better people side by side.",
        quote: "Two people running toward their calling together.",
        icon: "Compass"
      },
      {
        tag: "Faith & Spirit",
        title: "Partner in Prayer",
        description: "I want someone I can pray with, believe with, hold hands with in seasons of uncertainty, and build a steadfast life of faith and purpose together.",
        quote: "Anchored in shared grace, conviction, and deep peace.",
        icon: "Flame"
      },
      {
        tag: "Joy & Exploration",
        title: "Partner in Adventure",
        description: "I want the spontaneous road trips, the late-night conversations over tea, the unprompted laughter, the shared discoveries, and the everyday plans that turn into cherished memories.",
        quote: "Finding wonder in the greatest adventures and the smallest moments.",
        icon: "MapPin"
      },
      {
        tag: "Unwavering Devotion",
        title: "Partner in Everything",
        description: "When life is radiant and triumphant, I want you beside me to rejoice. When life is demanding and difficult, I want to stand as your fortress, facing every storm with you.",
        quote: "Through every season, every change, choosing you consistently.",
        icon: "ShieldCheck"
      },
      {
        tag: "Legacy & Love",
        title: "A Family",
        description: "And someday, if God blesses us with them, I want us to raise incredible children—children who know love, purpose, kindness, faith, and what it means to have parents who chose each other every single day.",
        quote: "A home built on wisdom, warmth, and enduring unconditional love.",
        icon: "Home"
      }
    ]
  },
  futureScenarios: {
    title: "Imagine this with me…",
    subtitle: "Tap into the small fragments of our tomorrow that I constantly catch myself smiling about.",
    footerNote: "And somehow, every single version of the future I imagine has you in it.",
    scenarios: [
      {
        id: "mornings",
        emoji: "☕",
        title: "Sunday Mornings",
        tag: "Peaceful Radiance",
        story: "Soft morning sunlight filtering through curtains, warm coffee or tea in hand, nowhere we have to rush to, just peace, laughter, and your hand in mine."
      },
      {
        id: "travel",
        emoji: "✈️",
        title: "Exploring New Places",
        tag: "Wanderlust",
        story: "Walking through unfamiliar streets in foreign cities, getting delightfully lost, tasting foods we can't pronounce, making lifelong memories together."
      },
      {
        id: "laughs",
        emoji: "😂",
        title: "Private Inside Jokes",
        tag: "Pure Joy",
        story: "Exchanging that one quick glance across a crowded room and bursting into uncontrollable laughter because nobody else gets the joke."
      },
      {
        id: "prayer",
        emoji: "🙏",
        title: "Praying Together",
        tag: "Spiritual Anchor",
        story: "Kneeling at the end of a long day, lifting our family, our dreams, and our gratefulness to God in deep, synchronized peace."
      },
      {
        id: "home",
        emoji: "🏡",
        title: "Building Our Home",
        tag: "Sanctuary",
        story: "Designing a haven filled with books, warmth, beautiful art, delicious dinners, and a doorway that always welcomes friends and family."
      },
      {
        id: "dreams",
        emoji: "💼",
        title: "Supporting Your Dreams",
        tag: "Your #1 Fan",
        story: "Watching you step into your highest potential, cheering louder than anyone in the room, and giving you a secure space to conquer the world."
      },
      {
        id: "family",
        emoji: "👨‍👩‍👧‍👦",
        title: "Building a Family",
        tag: "Generational Grace",
        story: "Seeing your gentle wisdom and radiant smile reflected in little eyes, guiding our children with patience, tenderness, and endless love."
      },
      {
        id: "talks",
        emoji: "🌙",
        title: "Late-Night Conversations",
        tag: "Endless Connection",
        story: "Staying awake well past midnight, whispering about everything from the mysteries of the universe to what we want for breakfast tomorrow."
      }
    ]
  },
  theLetter: {
    heading: "So, Praise… let me say this properly.",
    salutation: "My Dearest Praise,",
    paragraphs: [
      "I don't know if words can ever completely capture what you have come to mean to me, but I want to pour out my heart and try.",
      "I admire your mind. Your brilliance. Your beauty. Your heart. The extraordinary person you are today, and the inspiring woman you continue to become.",
      "More than simply admiring you from afar or enjoying our present moments, I find my soul constantly reaching toward the future—imagining the joy, honor, and beauty of building something eternal with you.",
      "I want to be your partner in progress—someone who grows with you, protects your peace, supports your highest ambitions, celebrates your victories with pride, and stands firmly beside you when life gets unpredictable.",
      "I want to be your partner in prayer. I want us to laugh together through the easy days, hold tight through the stormy ones, learn together, travel together, and keep choosing each other with intention through every season of life.",
      "And someday, if God blesses us with a family, I want us to raise amazing children together—giving them a home overflowing with faith, laughter, wisdom, and unconditional warmth.",
      "I don't look for a flawless fairytale. I want a real life. A meaningful life. A resilient life.",
      "And above all else in this world, I want to walk through every single day of it with you."
    ],
    closingQuestion: "So there is one question I have been waiting to ask you with all my heart…",
    signOff: "With all my love and devotion,"
  },
  proposal: {
    leadIn: "Praise…",
    question1: "Will you let me build this life with you?",
    question2: "Will you be my life partner?",
    finalQuestion: "Will you marry me?",
    yesButtonText: "YES ❤️",
    thinkButtonText: "LET ME THINK 😌",
    thinkResponse: {
      title: "Take all the time you need.",
      message: "There is no rush, no pressure, only patience and genuine love. Just know in your heart… I meant every single word, and I'll be right here.",
      reassureButton: "I'm ready now ❤️"
    },
    yesCelebration: {
      heading: "She Said Yes!",
      subheading: "The beginning of our most beautiful chapter.",
      signatureNames: "Praise & Ernest",
      finalMessage: "Let's build a life that touches eternity.",
      vows: [
        "To honor your mind, protect your peace, and cherish your heart.",
        "To walk beside you as an equal, a supporter, and your greatest friend.",
        "To choose you, celebrate you, and love you faithfully every single day."
      ]
    }
  },
  secretEasterEgg: {
    hint: "✨ Look closely at the stars...",
    revealedTitle: "A Secret Note for Praise",
    revealedMessage: "P.S. I still think you are ridiculously, breathtakingly beautiful, and you make my heart skip a beat every single time you look at me."
  },
  audioTrack: {
    title: "Eternal Promise (Acoustic Piano)",
    artist: "Ernest, for Praise"
  },
  notificationConfig: {
    // Paste a Discord webhook, Telegram webhook, or Formspree email endpoint here
    // Example: webhookUrl: "https://discord.com/api/webhooks/YOUR/WEBHOOK/URL"
    // Example: formspreeEndpoint: "https://formspree.io/f/your_form_id"
    webhookUrl: "",
    formspreeEndpoint: ""
  }
};
