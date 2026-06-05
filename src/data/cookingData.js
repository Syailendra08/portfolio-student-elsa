// ============================================================
//  COOKING PORTFOLIO DATA
//  Edit this file to update your portfolio content
// ============================================================

import avatarImage from '../images/avatar.jpeg';
export const profile = {
  name: "Elsa Prima",
  tagline: "Culinary Arts Student & Passionate Home Chef",
  subtitle: "Turning ingredients into stories, one plate at a time.",
  bio: `Hi! I'm Elsa Prima Ayunda, a first-year Culinary Arts student with a deep love for food that tells a story. I believe cooking is a language — every dish speaks of culture, memory, and creativity. From the delicate folds of pastry dough to the bold heat of a wok, I explore every corner of the kitchen with curiosity and heart.`,
  bioExtra: `Currently studying at SMK Baranangsiang Bogor, I specialise in Pastry & Baking but love experimenting across all culinary disciplines. When I'm not in the kitchen, you'll find me food-journaling, visiting local markets, or testing my grandmother's recipes with a modern twist.`,
  avatar: avatarImage, // e.g. "/images/avatar.jpg"
  location: "Bogor, West Java, Indonesia",
  email: "elsaprimaayundasayang@gmail.com",
  instagram: "@els.acherie",
  linkedin: "",
};

export const skills = [
  { name: "Pastry & Baking", level: 92, icon: "🥐" },
  { name: "Hot Kitchen", level: 85, icon: "🍳" },
  { name: "Cold Kitchen", level: 78, icon: "🥗" },
  { name: "Beverage Crafting", level: 80, icon: "🍹" },
  { name: "Plating & Presentation", level: 90, icon: "🎨" },
  { name: "Recipe Development", level: 88, icon: "📖" },
  { name: "Food Photography", level: 75, icon: "📸" },
  { name: "Nutrition Basics", level: 70, icon: "🥦" },
{ name: "Mandarin", level: 20, icon: "https://flagicons.lipis.dev/flags/4x3/cn.svg" },
{ name: "English", level: 80, icon: "https://flagicons.lipis.dev/flags/4x3/gb.svg" },
];

export const certificates = [
  { title: "ServSafe Food Handler Certification", issuer: "National Restaurant Association", year: "2024", icon: "🏅" },
  { title: "Le Cordon Bleu — Patisserie Fundamentals", issuer: "Le Cordon Bleu Online", year: "2023", icon: "🎖️" },
  { title: "Barista Level 1 — SCA Foundation", issuer: "Specialty Coffee Association", year: "2023", icon: "☕" },
  { title: "Basic Hygiene & Food Safety", issuer: "BPOM Indonesia", year: "2022", icon: "🛡️" },
  { title: "Asian Cuisine Masterclass", issuer: "Yummy Corp Academy", year: "2024", icon: "🍜" },
];

// CATEGORIES: "Pastry" | "Hot Kitchen" | "Cold Kitchen" | "Drinks"
// image: path to your photo e.g. "/images/dishes/croissant.jpg"
// Leave image as "" to show emoji placeholder
export const cookingProjects = [
  { id: 1, title: "Burnt Basque Cheesecake", category: "Pastry", image: "https://www.allrecipes.com/thmb/TLA7V2KrtbkpZh1cmhffohP8_SE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/270713_BurntBasqueCheesecake_ddmfs_3x4_2411-a6030d5e7c2f4b37bc8569b9cd2b634b-0d39c7588c854340bb20e557d500024a.jpg", emoji: "🍮", description: "A deeply caramelised Basque cheesecake with a jiggly, creamy centre. I experimented with pandan extract for a local Indonesian twist, giving it a subtle floral fragrance that pairs beautifully with the rich cream cheese base.", tags: ["Baking", "Dessert", "Fusion"], date: "March 2025" },
  { id: 2, title: "Braised Short Ribs with Gremolata", category: "Hot Kitchen", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRieYusLIhMHdOzM65i5-3qQ9E-ZUSXNPFFcQ&s", emoji: "🥩", description: "Slow-braised for 6 hours in red wine and aromatics until fall-off-the-bone tender. Finished with a bright lemon-parsley gremolata to cut through the richness. Served over silky cauliflower purée.", tags: ["Braising", "French", "Main Course"], date: "April 2025" },
  { id: 3, title: "Mango Burrata Salad", category: "Cold Kitchen", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS12QBaHw4kl0S8qnHB3ANWYc0lgqa3ZUGbKg&s", emoji: "🥗", description: "A fresh summer salad featuring creamy burrata, ripe Harum Manis mango, micro greens, and a chilli-lime vinaigrette. The contrast of cool creaminess and tropical heat makes every bite exciting.", tags: ["Salad", "Fresh", "No-Cook"], date: "May 2025" },
  { id: 4, title: "Rose Lychee Sparkling Mocktail", category: "Drinks", image: "", emoji: "🌸", description: "A refreshing non-alcoholic beverage made with house-made lychee syrup, rose water, fresh mint, and premium sparkling water. Garnished with edible rose petals for a stunning presentation.", tags: ["Mocktail", "Beverages", "Floral"], date: "February 2025" },
  { id: 5, title: "Croissant au Beurre", category: "Pastry", image: "", emoji: "🥐", description: "Classic French croissants made with 27 layers of laminated dough and premium Échiré butter. Three-day process including overnight cold retarding for maximum flavour development.", tags: ["Laminated Dough", "French", "Breakfast"], date: "January 2025" },
  { id: 6, title: "Pad Thai Goong Sod", category: "Hot Kitchen", image: "", emoji: "🍜", description: "Authentic Thai stir-fried rice noodles with fresh river prawns, tamarind paste, fish sauce, and palm sugar. The secret is a ripping-hot wok — everything comes together in under 3 minutes.", tags: ["Stir-fry", "Thai", "Seafood"], date: "March 2025" },
  { id: 7, title: "Tuna Tataki with Ponzu", category: "Cold Kitchen", image: "", emoji: "🐟", description: "Lightly seared sashimi-grade tuna, sliced thin, and dressed with a citrusy ponzu and sesame oil. Topped with crispy shallots and microherbs. A dish that celebrates the ingredient above all else.", tags: ["Japanese", "Sashimi", "Appetiser"], date: "April 2025" },
  { id: 8, title: "Matcha Houjicha Latte", category: "Drinks", image: "", emoji: "🍵", description: "A layered iced drink combining ceremonial-grade matcha and roasted houjicha, each frothed separately with oat milk. The flavour contrast — grassy vs. nutty — creates a complex, satisfying sip.", tags: ["Coffee & Tea", "Japanese", "Iced"], date: "May 2025" },
  { id: 9, title: "Opera Cake", category: "Pastry", image: "", emoji: "🎂", description: "A classic French pâtisserie showpiece: six alternating layers of coffee-soaked jachonde sponge, coffee buttercream, and dark chocolate ganache. Finished with a mirror-smooth chocolate glaze.", tags: ["French Pastry", "Cake", "Advanced"], date: "December 2024" },
  { id: 10, title: "Risotto al Tartufo", category: "Hot Kitchen", image: "", emoji: "🍚", description: "Carnaroli rice cooked in the classic mantecatura style with homemade mushroom stock. Finished with butter, aged Parmigiano-Reggiano, and freshly shaved black truffle. Silky, rich, and deeply umami.", tags: ["Italian", "Rice", "Fine Dining"], date: "February 2025" },
  { id: 11, title: "Niçoise Salad", category: "Cold Kitchen", image: "", emoji: "🫒", description: "A classic composed salad with soft-boiled jammy eggs, Niçoise olives, green beans, radish, and oil-packed tuna. Dressed with a Dijon-herb vinaigrette. Every component cooked and seasoned separately.", tags: ["French", "Composed Salad", "Lunch"], date: "January 2025" },
  { id: 12, title: "Butterfly Pea Lemonade", category: "Drinks", image: "", emoji: "💜", description: "A colour-changing signature drink made with butterfly pea flower tea, fresh lemon juice, and light honey syrup. Watch it transform from deep indigo to vibrant violet-pink the moment the lemon hits.", tags: ["Mocktail", "Colour-Changing", "Floral"], date: "March 2025" },
  { id: 13, title: "Tarte Tatin", category: "Pastry", image: "", emoji: "🥧", description: "Upside-down caramelised apple tart with a buttery rough-puff pastry base. The apples are slowly candied in butter and sugar before being blanketed with dough and baked until deep amber.", tags: ["French", "Tart", "Dessert"], date: "November 2024" },
  { id: 14, title: "Rendang Sapi", category: "Hot Kitchen", image: "", emoji: "🍛", description: "A rich, slow-cooked dry beef curry from West Sumatra — my love letter to Indonesian cuisine. Grass-fed beef simmered for 4+ hours in coconut milk, galangal, lemongrass, and a complex rempah spice paste.", tags: ["Indonesian", "Braising", "Traditional"], date: "December 2024" },
  { id: 15, title: "Smoked Salmon Rillettes", category: "Cold Kitchen", image: "", emoji: "🍣", description: "A luxurious cold spread of flaked smoked salmon, cream cheese, capers, dill, and lemon zest. Piped into small verrines and topped with salmon roe. Elegant, no-cook, and incredibly crowd-pleasing.", tags: ["French", "Canapé", "Seafood"], date: "October 2024" },
];
