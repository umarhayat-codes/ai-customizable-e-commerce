export interface Product {
  id: string;
  image: string;
  title: string;
  price: string;
  description: string;
  label?: string;
  labelType?: "sold" | "new";
}

export const shirtData: Product[] = [
  {
    id: "plain-shirt",
    image: "/images/black-hoodies.png",
    title: "Plain Shirt",
    price: "$ 450.00",
    description: "Customize and preview your design instantly.",
  },
  {
    id: "oversized-comfort-tee",
    image: "/images/shirt/shirt-2.png",
    title: "Oversized Comfort Tee",
    price: "$ 34.99",
    description: "Customize and preview your design instantly.",
    label: "Sold Out",
    labelType: "sold",
  },
  {
    id: "winter-full-sleeve",
    image: "/images/shirt/shirt-3.png",
    title: "Winter Full Sleeve Shirt",
    price: "$ 199.00",
    description: "Design, preview, and perfect before order.",
    label: "New Arrivals",
    labelType: "new",
  },
  {
    id: "mw08-sport",
    image: "/images/shirt/shirt-4.png",
    title: "MW08 Sport",
    price: "$ 349.00",
    description: "Active Noise-Cancelling True Wireless Earphones",
  },
  {
    id: "cozy-winter-shirt",
    image: "/images/shirt/shirt-5.png",
    title: "Cozy Winter Shirt",
    price: "$ 399.00",
    description: "Active Noise-Cancelling True Wireless Earphones",
  },
  {
    id: "casual-oversized-tee",
    image: "/images/shirt/shirt-6.png",
    title: "Casual Oversized Tee",
    price: "$ 399.00",
    description: "Active Noise-Cancelling True Wireless Earphones",
  },
  {
    id: "full-sleeve-shirt",
    image: "/images/shirt/shirt-7.png",
    title: "Full Sleeve Shirt",
    price: "$ 399.00",
    description: "Active Noise-Cancelling True Wireless Earphones",
  },
];

export const hoodiesData: Product[] = [
  {
    id: "chapter-hoodie",
    image: "/images/hoodies/hoodies-1.png",
    title: "Chapter Hoodie",
    price: "$ 450.00",
    description:
      "Cream-colored hoodie featuring elegant blue 'Just a Chapter' script.",
  },
  {
    id: "gothic-thorn-zip-up",
    image: "/images/hoodies/hoodies-2.png",
    title: "Gothic Thorn Zip-Up",
    price: "$ 450.00",
    description: "Edgy black hoodie with sharp tribal graphics.",
    label: "New Arrivals",
    labelType: "new",
  },
  {
    id: "dragon-spirit-hoodie",
    image: "/images/hoodies/hoodies-3.png",
    title: "Dragon Spirit Hoodie",
    price: "$ 34.99",
    description:
      "Elegant cream pullover featuring a detailed black dragon sleeve print.",
  },
  {
    id: "varsity-legend-hoodie",
    image: "/images/hoodies/hoodies-4.png",
    title: "Varsity Legend Hoodie",
    price: "$ 450.00",
    description:
      "Classic black and white varsity style with multi-patch sleeve embroidery.",
  },
  {
    id: "heritage-hoodie",
    image: "/images/hoodies/hoodies-5.png",
    title: "Heritage Hoodie",
    price: "$ 399.00",
    description: "Minimalist white hoodie with vintage varsity lettering.",
  },
  {
    id: "gamer-comic-zip-up",
    image: "/images/hoodies/hoodies-6.png",
    title: "Gamer Comic Zip-Up",
    price: "$ 450.00",
    description: "Split monochrome design with bold comic panels.",
  },
  {
    id: "moon-thief-hoodie",
    image: "/images/hoodies/hoodies-7.png",
    title: "Moon Thief Hoodie",
    price: "$ 450.00",
    description:
      "Bold bubble-letter back graphic on a heavy black oversized hoodie.",
  },
];

export const shoesData: Product[] = [
  {
    id: "celestial-night-customs",
    image: "/images/shoes/shoes-1.png",
    title: "Celestial Night Customs",
    price: "$ 450.00",
    description: "Customize and preview your design instantly.",
  },
  {
    id: "minimalist-low-tops",
    image: "/images/shoes/shoes-2.png",
    title: "Minimalist Low-Tops",
    price: "From $34.99",
    description: "Clean style for a versatile look.",
    label: "Sold out",
    labelType: "sold",
  },
  {
    id: "sleek-arctic-trainers",
    image: "/images/shoes/shoes-3.png",
    title: "Sleek Arctic Trainers",
    price: "$ 199.00",
    description: "Design and preview your perfect fit.",
    label: "New Arrivals",
    labelType: "new",
  },
  {
    id: "canvas-flats",
    image: "/images/shoes/shoes-4.png",
    title: "Canvas Flats",
    price: "From $349.00",
    description: "Personalize your favorite cat-themed design.",
  },
  {
    id: "varsity-stripe-lows",
    image: "/images/shoes/shoes-5.png",
    title: "Varsity Stripe Lows",
    price: "From $399.00",
    description: "Timeless aesthetic with custom color options.",
  },
  {
    id: "dripping-ink-customs",
    image: "/images/shoes/shoes-6.png",
    title: "Dripping Ink Customs",
    price: "From $399.00",
    description: "Bold melting black swoosh design.",
  },
  {
    id: "teddy-charm-sneakers",
    image: "/images/shoes/shoes-7.png",
    title: "Teddy Charm Sneakers",
    price: "From $399.00",
    description: "Add bear charms and preview your design instantly.",
  },
];

export const capsData: Product[] = [
  {
    id: "skull-sketch-cap",
    image: "/images/cap-1.png",
    title: "Skull Sketch Cap",
    price: "$ 450.00",
    description:
      "Customize and preview your skull print design instantly today.",
  },
  {
    id: "oversized-comfort-tee-cap",
    image: "/images/cap-2.png",
    title: "Oversized Comfort Tee",
    price: "From $34.99",
    description:
      "Create and preview your custom character print instantly now.",
    label: "Sold out",
    labelType: "sold",
  },
  {
    id: "sad-face-hat",
    image: "/images/cap-3.png",
    title: "Sad Face Hat",
    price: "$ 399.00",
    description: "Design and preview your custom face print instantly online.",
  },
  {
    id: "pierced-white-cap",
    image: "/images/cap-4.png",
    title: "Pierced White Cap",
    price: "From $450.00",
    description:
      "Personalize and preview your unique ring design instantly now.",
  },
  {
    id: "golden-dragon-cap",
    image: "/images/cap-hoodies.png",
    title: "Golden Dragon Cap",
    price: "From $450.00",
    description: "Design and preview your dragon print design perfectly today.",
    label: "New Arrivals",
    labelType: "new",
  },
  {
    id: "gothic-logo-trucker",
    image: "/images/cap-6.png",
    title: "Gothic Logo Trucker",
    price: "From $450.00",
    description: "Create and preview your unique gothic logo print instantly.",
  },
  {
    id: "athletic-mesh-cap",
    image: "/images/cap-7.png",
    title: "Athletic Mesh Cap",
    price: "From $450.00",
    description: "Design and preview your custom athletic print instantly now.",
  },
];

export const phoneData: Product[] = [
  {
    id: "customize-phone-case",
    image: "images/phone/customize-phone-case.png",
    title: "Phone Case",
    price: "$ 45.00",
    description: "Stylized cartoon character wearing a paper bag hoodie.",
  },
  {
    id: "baghead-case",
    image: "/images/phone/phone-case-1.png",
    title: "Baghead Case",
    price: "$ 45.00",
    description: "Stylized cartoon character wearing a paper bag hoodie.",
  },
  {
    id: "doodle-case",
    image: "/images/phone/phone-case-2.png",
    title: "Doodle Case",
    price: "$ 34.99",
    description: "Playful cream case featuring lifestyle and music sketches.",
    label: "Sold Out",
    labelType: "sold",
  },
  {
    id: "porsche-style-case",
    image: "/images/phone/phone-case-3.png",
    title: "Porsche Style Case",
    price: "$ 39.00",
    description: "Sleek black design for fans of fast cars.",
  },
  {
    id: "duckie-case",
    image: "/images/phone-cases.png",
    title: "Duckie Case",
    price: "$ 30.00",
    description: "Minimalist off-white case with a cute duck outline.",
  },
  {
    id: "ghost-case",
    image: "/images/phone/phone-case-5.png",
    title: "Ghost Case",
    price: "$ 30.00",
    description: "Simple black case with a white ghost archer.",
    label: "New Arrival",
    labelType: "new",
  },
  {
    id: "doodle-case-duplicate",
    image: "/images/phone/phone-case-2.png",
    title: "Doodle Case",
    price: "$ 34.99",
    description: "Playful cream case featuring lifestyle and music sketches.",
  },
  {
    id: "aesthetic-case",
    image: "/images/phone/phone-case-7.png",
    title: "Aesthetic Case",
    price: "$ 450.00",
    description: "Retro brown case with a trendy sticker collage.",
  },
];

export const trendingData: Product[] = [
  {
    id: "trending-plain-shirt-1",
    image: "/images/trending/trending-1.png",
    title: "Plain Shirt",
    price: "$ 450.00",
    description: "Customize and preview your design instantly.",
  },
  {
    id: "trending-plain-shirt-2",
    image: "/images/trending/trending-2.png",
    title: "Plain Shirt",
    price: "$ 450.00",
    description: "Customize and preview your design instantly.",
    label: "Sold out",
    labelType: "sold",
  },
  {
    id: "trending-plain-shirt-3",
    image: "/images/boot-hoodies.png",
    title: "Plain Shirt",
    price: "$ 450.00",
    description: "Customize and preview your design instantly.",
  },
  {
    id: "trending-plain-shirt-4",
    image: "/images/trending/treding-4.png",
    title: "Plain Shirt",
    price: "$ 450.00",
    description: "Customize and preview your design instantly.",
    label: "New In",
    labelType: "new",
  },
  {
    id: "trending-plain-shirt-5",
    image: "/images/cap-1.png",
    title: "Plain Shirt",
    price: "$ 450.00",
    description: "Customize and preview your design instantly.",
  },
  {
    id: "trending-plain-shirt-6",
    image: "/images/trending/trending-6.png",
    title: "Plain Shirt",
    price: "$ 450.00",
    description: "Customize and preview your design instantly.",
    label: "Sold out",
    labelType: "sold",
  },
  {
    id: "trending-plain-shirt-7",
    image: "/images/review-2.png",
    title: "Plain Shirt",
    price: "$ 450.00",
    description: "Customize and preview your design instantly.",
  },
];

export const allProducts = [
  ...shirtData,
  ...hoodiesData,
  ...shoesData,
  ...capsData,
  ...phoneData,
  ...trendingData,
];
