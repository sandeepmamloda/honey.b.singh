// Central config used by BOTH the form page and the API route.
// Add/edit a door here and it updates everywhere.
//
// "email" can be a single address ("someone@example.com")
// OR a list of addresses (["someone@example.com", "another@example.com"])
// if you want the same submission to go to multiple people at once.

export const doorsData = {
  press: {
    eyebrow: "Press & industry",
    heading: "Producers, programmers, reps.",
    sub: "Screener & EPK requests, festival programming, representation inquiries, press & interviews.",
    email: ["industry@honeybsingh.com"],
    extraField: {
      name: "outlet",
      label: "Outlet / Organization",
      placeholder: "e.g. Sundance, Variety, Production Co.",
    },
  },
  brand: {
    eyebrow: "Brand partnerships",
    heading: "Collabs & campaigns.",
    sub: "Sponsored content across Story, Woman, Teach, or Film. Tell me the pillar.",
    email: ["partners@honeybsingh.com"],
    extraField: {
      name: "brand",
      label: "Brand / Company",
      placeholder: "e.g. Your Brand Name",
    },
  },
  yoga: {
    eyebrow: "Yoga students",
    heading: "Book a mat, ask anything.",
    sub: "Drop-in classes, 1:1 sessions, beginner series — start here.",
    email: ["	hsingh@northvale.ae"],
    extraField: {
      name: "interest",
      label: "What are you interested in?",
      placeholder: "Drop-in class / Private session / Beginner series",
    },
  },
};