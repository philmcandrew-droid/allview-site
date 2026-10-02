export type DermSlug =
  | "overview"
  | "vhi"
  | "process"
  | "gp"
  | "surgery"
  | "anaesthetic"
  | "skin"
  | "telederm"
  | "stories";

export type DermLink = {
  to: string;
  label: string;
  hint: string;
};

export const dermNav: { slug: DermSlug; to: string; label: string }[] = [
  { slug: "overview", to: "/dermatology", label: "Overview" },
  { slug: "vhi", to: "/dermatology/process-vhi", label: "Vhi members" },
  { slug: "process", to: "/dermatology/process", label: "Price & process" },
  { slug: "gp", to: "/dermatology/gp-referral", label: "GP or HSE" },
  { slug: "surgery", to: "/dermatology/surgery", label: "If you need surgery" },
  { slug: "skin", to: "/dermatology/skin", label: "Skin conditions" },
  { slug: "telederm", to: "/dermatology/teledermatology", label: "How photos work" },
  { slug: "stories", to: "/dermatology/case-studies", label: "Patient stories" },
];

export const dermSuggested: DermLink[] = [
  { to: "/book", label: "Book a visit", hint: "We’ll call you back and book the nearest clinic." },
  { to: "/process", label: "See what happens", hint: "A short walkthrough of the appointment." },
  { to: "/locations", label: "Find a clinic", hint: "Six clinics — Dublin, Cork, Galway, Waterford." },
  { to: "/patient-information/teledermatology", label: "What to bring", hint: "Prepare for the nurse scan." },
  { to: "/contact", label: "Talk to us", hint: "Mon–Fri, 9am–5pm." },
];

export const conditions = [
  "Moles and lesions",
  "Eczema",
  "Acne",
  "Psoriasis",
  "Rosacea",
  "Dermatitis",
  "Alopecia",
  "Possible skin cancer",
];

export type AbcdeLetter = "A" | "B" | "C" | "D" | "E";
export type AbcdeAnswer = "match" | "no" | "unsure";

export type AbcdeItem = {
  letter: AbcdeLetter;
  word: string;
  body: string;
  question: string;
  typical: string;
  concerning: string;
  lookFor: string[];
  extra: string;
};

export const abcde: AbcdeItem[] = [
  {
    letter: "A",
    word: "Asymmetry",
    body: "One half of the mark does not match the other.",
    question: "If you imagine a line down the middle, do the two halves look different?",
    typical: "Round or oval. Both halves look much the same.",
    concerning: "An irregular shape. One half is unlike the other.",
    lookFor: ["Two very different halves", "An uneven outline", "A shape that does not look like your other moles"],
    extra: "The HSE says melanomas are often asymmetrical. A harmless mole is usually a fairly even circle or oval.",
  },
  {
    letter: "B",
    word: "Border",
    body: "The edge is uneven, blurred or notched.",
    question: "Is the edge ragged, notched, blurred or poorly defined?",
    typical: "A smooth, clear edge you can follow with your eye.",
    concerning: "A notched, ragged, scalloped or blurry edge.",
    lookFor: ["Jagged or notched edges", "A border that fades into the skin", "Red or inflamed skin around the mark"],
    extra: "The Irish Cancer Society asks you to look for a change in the edges — blurred or jagged.",
  },
  {
    letter: "C",
    word: "Colour",
    body: "More than one colour, or it has changed.",
    question: "Does the mark have more than one colour, or has the colour changed?",
    typical: "One even shade of brown or tan.",
    concerning: "A mix of colours — tan, brown, black, or patches of white, red, pink or blue.",
    lookFor: ["Two or more colours in one mark", "A mark that has got darker", "White, red or blue areas inside it"],
    extra: "The HSE says melanomas are usually a mix of two or more colours. Colour that is changing matters as much as mixed colour.",
  },
  {
    letter: "D",
    word: "Diameter",
    body: "Larger than about 6mm — the size of a pencil top.",
    question: "Is the mark larger than about 6mm, or is it getting bigger?",
    typical: "Smaller than a pencil eraser, and not growing.",
    concerning: "Wider than about 6mm, or any mark that is getting larger.",
    lookFor: ["Wider than the blunt end of a pencil", "A mark that keeps growing", "A small mark that is changing in other ways"],
    extra: "Most melanomas are larger than 6mm when found — but the American Academy of Dermatology notes they can be smaller. Size alone does not rule a mark in or out.",
  },
  {
    letter: "E",
    word: "Evolution",
    body: "It is new, changing, or unusual for you.",
    question: "Is the mark new, or has it changed in size, shape, colour or height?",
    typical: "It looks the same month after month.",
    concerning: "It is new, or it has changed — including becoming raised, crusty, itchy or sore.",
    lookFor: ["A new mole, especially after your mid-30s", "Change over weeks or months", "A mark that looks different from all your others"],
    extra: "The HSE says normal moles do not change. About half of melanomas start as a new mole. Only about a third start in a mole you already had.",
  },
];

export const abcdeOtherSigns = [
  "Itching, tingling or pain",
  "Bleeding, oozing, flaking or crusting",
  "Becoming more raised from the skin",
  "Looking different from all your other moles — the “ugly duckling”",
  "A new mole after your mid-30s",
];

export const abcdeHowToCheck = [
  "Once a month, in a bright room, using a full-length mirror.",
  "Check your face, ears, neck, chest, tummy, arms and between your fingers.",
  "Sit to check your legs, the soles of your feet and between your toes.",
  "Use a hand mirror — or ask someone you trust — for your back, buttocks and scalp.",
  "Look at your nails. Melanoma under a nail is uncommon, but it happens.",
  "Note anything new or changing. A photo with a coin beside it can help you compare next month.",
];

export const abcdeSources = [
  {
    href: "https://www2.hse.ie/conditions/skin-cancer-melanoma/symptoms/",
    label: "HSE — melanoma symptoms",
    hint: "ABCDE for Ireland, plus when to contact a GP.",
  },
  {
    href: "https://www2.hse.ie/conditions/moles/",
    label: "HSE — moles",
    hint: "Harmless moles versus changes that need a check.",
  },
  {
    href: "https://www.cancer.ie/cancer-information/cancer-types/melanoma/melanoma-signs-and-symptoms",
    label: "Irish Cancer Society — melanoma signs",
    hint: "ABCDE, other symptoms, and how to check monthly.",
  },
  {
    href: "https://www.aad.org/public/diseases/skin-cancer/abcdes-melanoma",
    label: "American Academy of Dermatology — ABCDE",
    hint: "The original public checklist, including that small marks can still matter.",
  },
];

export type DermSection = {
  heading: string;
  body: string[];
  list?: string[];
};

export type DermTopic = {
  slug: DermSlug;
  kicker: string;
  title: string;
  lead: string;
  bookPath?: "vhi" | "hse" | "private";
  phone?: { href: string; label: string };
  sections: DermSection[];
  next: DermLink[];
};

export const dermTopics: Record<Exclude<DermSlug, "overview" | "stories">, DermTopic> = {
  vhi: {
    slug: "vhi",
    kicker: "Vhi members",
    title: "A dedicated line and about 10 days to an appointment.",
    lead: "If you have Vhi, you do not need a GP letter. We book a nurse scan at a clinic you can get to. A consultant dermatologist then makes the diagnosis.",
    bookPath: "vhi",
    phone: { href: "tel:+35312248111", label: "01 224 8111" },
    sections: [
      {
        heading: "What you pay",
        body: [
          "The teledermatology appointment is €299. Many Vhi plans pay towards this under the Consultant benefit. Check Cover Check on Vhi.ie, then claim with Snap & Send.",
        ],
      },
      {
        heading: "Who we can see",
        body: ["Vhi members aged 14 and over."],
      },
      {
        heading: "What we treat",
        body: ["The same skin problems as our other pathways — moles, rashes, acne, psoriasis, and marks that might be cancer."],
      },
      {
        heading: "How it works",
        body: [
          "Book on the Vhi line or ask us to call you back.",
          "A nurse photographs the area at clinic — not a phone selfie.",
          "A consultant dermatologist reviews the images.",
          "Our medical team contacts you with the result and a plan.",
        ],
      },
    ],
    next: [
      { to: "/book?path=vhi", label: "Request a Vhi call back", hint: "Or ring 01 224 8111." },
      { to: "/process?path=vhi", label: "Walk through the visit", hint: "See each step before you come." },
      { to: "/locations", label: "Choose a clinic", hint: "Including Vhi 360 in Carrickmines." },
    ],
  },
  process: {
    slug: "process",
    kicker: "Private patients",
    title: "€309 all-in. Usually within 4 weeks.",
    lead: "One price covers the nurse scan, the consultant diagnosis, and a follow-up call if you need one. Medical-card holders pay the same. You do not need a GP letter.",
    bookPath: "private",
    phone: { href: "tel:+35312248100", label: "01 224 8100" },
    sections: [
      {
        heading: "What happens at the clinic",
        body: [
          "You meet a registered nurse, not the consultant. The nurse takes your history and high-definition photos of the area you are worried about.",
        ],
      },
      {
        heading: "What the consultant decides",
        body: ["There are three usual outcomes:"],
        list: [
          "No treatment needed — we send you the result.",
          "A prescription — an AllView GP calls you and issues it.",
          "A next step — a face-to-face visit, biopsy, or removal. We arrange that.",
        ],
      },
      {
        heading: "What the price includes",
        body: [
          "Nurse appointment, consultant diagnosis, results to you and your GP if you ask, and a receipt for insurance or Revenue.",
        ],
      },
    ],
    next: [
      { to: "/book?path=private", label: "Book privately", hint: "We’ll call you back." },
      { to: "/process?path=private", label: "See the visit first", hint: "Five short steps." },
      { to: "/dermatology/process-vhi", label: "I’m on Vhi", hint: "Different line and wait." },
    ],
  },
  gp: {
    slug: "gp",
    kicker: "GP and HSE",
    title: "Your GP or hospital sends us. There is nothing for you to pay.",
    lead: "This is the public pathway. Once the referral arrives, we call you and book the nearest clinic. Results go back to your GP on Healthmail.",
    bookPath: "hse",
    phone: { href: "tel:+35312248100", label: "01 224 8100" },
    sections: [
      {
        heading: "If you are the patient",
        body: [
          "Ask your GP or hospital team to refer you to AllView. You do not book this yourself unless they have already sent us.",
          "We then phone you — usually more than once — and send a letter.",
        ],
      },
      {
        heading: "If you are the GP",
        body: [
          "Send the referral on Healthmail to allview@healthmail.ie, or call 01 224 8100. We accept lesions, moles, eczema, acne, dermatitis, psoriasis, rosacea, alopecia, and possible cancerous growths.",
        ],
      },
      {
        heading: "After the scan",
        body: [
          "We treat you fully, or we refer you on ourselves and discharge. Your GP gets the result.",
        ],
      },
    ],
    next: [
      { to: "/book?path=hse", label: "Ask us to place a referral", hint: "Have your GP details ready." },
      { to: "/process?path=hse", label: "See the public pathway", hint: "What happens after we are sent you." },
      { to: "/patient-information/teledermatology", label: "Public patient leaflet", hint: "What to expect on the day." },
    ],
  },
  surgery: {
    slug: "surgery",
    kicker: "If you need a procedure",
    title: "Local anaesthetic. Arrive a little early. Bring a list of your medicines.",
    lead: "Only some people need a procedure after the photo visit. If you do, we book it. You stay awake. You do not need to fast.",
    sections: [
      {
        heading: "Before you come",
        body: [],
        list: [
          "Arrive 10–15 minutes early.",
          "Bring someone with you if you can.",
          "Wear comfortable clothes. No make-up if the area is on your face.",
          "Bring a list of your medicines.",
          "Tell us if you take warfarin or any other blood thinner. Warfarin: have your INR checked 2–3 days before. It should be under 3.",
          "If you have diabetes, bring a snack. Lists can run late.",
        ],
      },
      {
        heading: "On the day",
        body: [
          "The surgeon may change the plan after examining you in person. That is normal.",
          "Vhi members usually attend Vhi 360 in Carrickmines. Everyone else is booked to the clinic we confirm with you.",
        ],
      },
    ],
    next: [
      { to: "/dermatology/surgery/anaesthetic", label: "Local anaesthetic, in plain words", hint: "You will not be put to sleep." },
      { to: "/patient-information/wound-care", label: "Wound care after surgery", hint: "How to look after the site." },
      { to: "/locations", label: "Clinic details", hint: "Map, phone and Eircode." },
    ],
  },
  anaesthetic: {
    slug: "anaesthetic",
    kicker: "Local anaesthetic",
    title: "It numbs the area. You stay awake.",
    lead: "Local anaesthetic blocks pain signals. You may still feel pressure or movement. The procedure does not start until the area is numb.",
    sections: [
      {
        heading: "How it is given",
        body: ["It can be injected, sprayed, or rubbed on. An injection can sting for a moment."],
      },
      {
        heading: "How long it lasts",
        body: ["Usually two to eight hours, depending on the medicine."],
      },
      {
        heading: "Afterwards",
        body: [
          "This is an outpatient visit — no dressing gown needed.",
          "When the numbness wears off, you may take paracetamol (Panadol) or Solpadeine unless your doctor has said not to.",
          "Do not wear make-up if the surgery is on your face.",
        ],
      },
    ],
    next: [
      { to: "/dermatology/surgery", label: "Back to surgery information", hint: "What to bring on the day." },
      { to: "/contact", label: "Ask a question", hint: "We’ll point you to the right person." },
    ],
  },
  skin: {
    slug: "skin",
    kicker: "Know your skin",
    title: "Look for new, changing, or unusual.",
    lead: "Skin conditions can be visible and exhausting. We diagnose the mark you are worried about — we are not a full-body screening service unless the consultant asks for one.",
    sections: [
      {
        heading: "The three words to remember",
        body: [
          "New. Changing. Unusual. If a mark fits those words, get it checked. Skin cancer is often something you can see.",
        ],
      },
      {
        heading: "Conditions people come to us with",
        body: ["We regularly see moles, eczema, acne, psoriasis, rosacea, dermatitis, hair loss, and possible skin cancers including basal cell carcinoma, squamous cell carcinoma, and melanoma."],
      },
    ],
    next: [
      { to: "/book", label: "Get a mark checked", hint: "Tell us which areas — up to three." },
      { to: "/dermatology/case-studies", label: "Read patient stories", hint: "Real people, real waits cut." },
      { to: "/dermatology/teledermatology", label: "Why photos are enough", hint: "How the consultant sees your skin." },
    ],
  },
  telederm: {
    slug: "telederm",
    kicker: "How photos work",
    title: "A nurse takes clinical photos. A consultant diagnoses them.",
    lead: "You do not video-call the consultant. You do not send a selfie. Specialist cameras take the images the consultant needs.",
    sections: [
      {
        heading: "Is it as safe as sitting in the room?",
        body: [
          "Studies — and the American Academy of Dermatology — find teledermatology as accurate as a face-to-face skin exam when it is used properly. If the consultant needs to see you in person, they will say so.",
        ],
      },
      {
        heading: "What “teledermoscopy” means",
        body: [
          "Dermoscopy is looking at the skin under magnification. Those pictures travel securely to an Irish consultant dermatologist on the Specialist Register.",
        ],
      },
    ],
    next: [
      { to: "/process", label: "Walk through the visit", hint: "From the phone call to your result." },
      { to: "/the-economic-aspects-of-teledermatology", label: "Why hospitals use this", hint: "Waiting lists and earlier diagnosis." },
      { to: "/book", label: "Book a scan", hint: "Choose Vhi, HSE or private." },
    ],
  },
};

export const dermStories = [
  {
    to: "/carmel-60-dublin-referral-for-growth-on-her-arm",
    name: "Carmel, 60, Dublin",
    about: "A growth on her arm. “My feet never touched the ground.”",
  },
  {
    to: "/deirdre-53-dublin-referral-for-mole-on-her-back",
    name: "Deirdre, 53, Dublin",
    about: "Over a year on the Beaumont list for a mole on her back.",
  },
  {
    to: "/pat-70-dublin-referral-for-facial-discolouration",
    name: "Pat, 70, Dublin",
    about: "Referred on a Monday. Called two days later.",
  },
  {
    to: "/patient-goes-from-gp-to-melanoma-surgery-in-17-days",
    name: "Pat Conway, Dublin 18",
    about: "GP to melanoma surgery in 17 days.",
  },
  {
    to: "/grace-26-celbridge-acne-treatment",
    name: "Grace, 26, Celbridge",
    about: "Acne treatment without a long hospital wait.",
  },
  {
    to: "/neil-73-kilkenny-referral-for-a-facial-growth",
    name: "Neil, 73, Kilkenny",
    about: "A facial growth, then consultant-led surgery.",
  },
];
