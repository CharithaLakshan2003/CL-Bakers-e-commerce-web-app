import { Product, Order, Review } from '@/types';

// ─── Products ─────────────────────────────────────────────────────────────────
export const mockProducts: Product[] = [
  {
    id: '1', name: 'Sourdough Country Loaf', slug: 'sourdough-country-loaf',
    description: 'Our signature sourdough, made with a 48-hour cold ferment and stone-milled organic flour. A crackling crust with a chewy, open crumb that pairs perfectly with artisan butter or olive oil.',
    price: 8.50, comparePrice: undefined, stock: 12, category: 'bread',
    images: [
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80',
      'https://images.unsplash.com/photo-1585478259715-4db10b704b4e?w=800&q=80',
    ],
    allergens: ['gluten'],
    nutritionalInfo: { calories: 270, protein: '9g', carbs: '54g', fat: '1.5g', fiber: '2g', sugar: '0.5g', sodium: '480mg' },
    isActive: true, isTodaySpecial: true, rating: 4.9, reviewCount: 142,
    badges: ['special'], dietary: ['vegetarian', 'vegan'],
    createdAt: '2024-01-15T08:00:00Z',
  },
  {
    id: '2', name: 'Butter Croissant', slug: 'butter-croissant',
    description: 'Classic French croissants made with 100% French butter, laminated for 72 layers of flaky, golden perfection. Baked fresh every morning at 6am.',
    price: 4.50, comparePrice: 5.00, stock: 24, category: 'pastry',
    images: [
      'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80',
      'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800&q=80',
    ],
    allergens: ['gluten', 'dairy', 'eggs'],
    nutritionalInfo: { calories: 340, protein: '6g', carbs: '38g', fat: '18g', fiber: '1g', sugar: '4g', sodium: '320mg' },
    isActive: true, isTodaySpecial: true, rating: 4.8, reviewCount: 210,
    badges: ['sale'], dietary: ['vegetarian'],
    createdAt: '2024-01-20T06:00:00Z',
  },
  {
    id: '3', name: 'Celebration Chocolate Cake', slug: 'celebration-chocolate-cake',
    description: 'Three layers of rich Belgian chocolate sponge, filled with silky ganache and dark chocolate buttercream, topped with hand-crafted chocolate shards.',
    price: 52.00, comparePrice: undefined, stock: 4, category: 'cake',
    images: [
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80',
      'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80',
    ],
    allergens: ['gluten', 'dairy', 'eggs'],
    nutritionalInfo: { calories: 480, protein: '7g', carbs: '62g', fat: '22g', fiber: '3g', sugar: '44g', sodium: '280mg' },
    isActive: true, isTodaySpecial: false, rating: 5.0, reviewCount: 89,
    badges: ['low-stock'], dietary: ['vegetarian'],
    createdAt: '2024-02-01T10:00:00Z',
  },
  {
    id: '4', name: 'Cinnamon Roll', slug: 'cinnamon-roll',
    description: 'Pillowy-soft brioche rolls swirled with Ceylon cinnamon and brown sugar, crowned with a thick cream cheese frosting that melts right into the warm dough.',
    price: 5.50, comparePrice: undefined, stock: 18, category: 'pastry',
    images: [
      'https://images.unsplash.com/photo-1612836987731-5537e1aabcca?w=800&q=80',
      'https://images.unsplash.com/photo-1603532648955-039310d9ed75?w=800&q=80',
    ],
    allergens: ['gluten', 'dairy', 'eggs'],
    nutritionalInfo: { calories: 390, protein: '7g', carbs: '58g', fat: '15g', fiber: '1.5g', sugar: '28g', sodium: '310mg' },
    isActive: true, isTodaySpecial: false, rating: 4.7, reviewCount: 176,
    badges: ['new'], dietary: ['vegetarian'],
    createdAt: '2024-03-01T07:00:00Z',
  },
  {
    id: '5', name: 'Seeded Baguette', slug: 'seeded-baguette',
    description: 'A French-style baguette with a deeply caramelised crust and airy crumb, rolled in a mix of sesame, poppy, and sunflower seeds before baking.',
    price: 4.00, comparePrice: undefined, stock: 20, category: 'bread',
    images: [
      'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=800&q=80',
    ],
    allergens: ['gluten', 'sesame'],
    nutritionalInfo: { calories: 200, protein: '7g', carbs: '40g', fat: '2g', fiber: '2g', sugar: '0g', sodium: '400mg' },
    isActive: true, isTodaySpecial: false, rating: 4.6, reviewCount: 95,
    badges: [], dietary: ['vegetarian', 'vegan'],
    createdAt: '2024-01-10T08:00:00Z',
  },
  {
    id: '6', name: 'Gluten-Free Lemon Muffin', slug: 'gluten-free-lemon-muffin',
    description: 'Moist, fluffy muffins made with almond and rice flour, bursting with fresh lemon zest and topped with a tangy lemon glaze. Certified gluten-free facility.',
    price: 4.75, comparePrice: undefined, stock: 15, category: 'gluten-free',
    images: [
      'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=800&q=80',
    ],
    allergens: ['eggs', 'nuts'],
    nutritionalInfo: { calories: 220, protein: '5g', carbs: '28g', fat: '10g', fiber: '2g', sugar: '16g', sodium: '180mg' },
    isActive: true, isTodaySpecial: false, rating: 4.5, reviewCount: 63,
    badges: ['new'], dietary: ['vegetarian', 'gluten-free'],
    createdAt: '2024-03-10T09:00:00Z',
  },
  {
    id: '7', name: 'Spinach & Feta Quiche', slug: 'spinach-feta-quiche',
    description: 'A classic French quiche with a buttery shortcrust pastry, filled with wilted baby spinach, crumbled Greek feta, caramelized onions and free-range eggs.',
    price: 14.00, comparePrice: undefined, stock: 8, category: 'savory',
    images: [
      'https://images.unsplash.com/photo-1568901342437-2498d8ce82a2?w=800&q=80',
    ],
    allergens: ['gluten', 'dairy', 'eggs'],
    nutritionalInfo: { calories: 320, protein: '12g', carbs: '22g', fat: '20g', fiber: '1g', sugar: '3g', sodium: '520mg' },
    isActive: true, isTodaySpecial: false, rating: 4.4, reviewCount: 54,
    badges: [], dietary: ['vegetarian'],
    createdAt: '2024-02-15T08:00:00Z',
  },
  {
    id: '8', name: 'Macaron Gift Box (12)', slug: 'macaron-gift-box-12',
    description: 'Twelve delicate French macarons in our bestselling flavours: salted caramel, raspberry, pistachio, vanilla, chocolate, and lemon. Perfect for gifting.',
    price: 28.00, comparePrice: 32.00, stock: 10, category: 'pastry',
    images: [
      'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=800&q=80',
    ],
    allergens: ['eggs', 'nuts', 'dairy'],
    nutritionalInfo: { calories: 90, protein: '1.5g', carbs: '14g', fat: '3.5g', fiber: '0g', sugar: '12g', sodium: '20mg' },
    isActive: true, isTodaySpecial: true, rating: 4.9, reviewCount: 134,
    badges: ['sale'], dietary: ['vegetarian', 'gluten-free'],
    createdAt: '2024-02-20T10:00:00Z',
  },
  {
    id: '9', name: 'Honey Wheat Loaf', slug: 'honey-wheat-loaf',
    description: 'A soft sandwich loaf made with 50% whole wheat flour and a generous drizzle of local wildflower honey. Perfect for everyday toast and sandwiches.',
    price: 7.00, comparePrice: undefined, stock: 16, category: 'bread',
    images: [
      'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=800&q=80',
    ],
    allergens: ['gluten', 'dairy'],
    nutritionalInfo: { calories: 240, protein: '8g', carbs: '46g', fat: '3g', fiber: '4g', sugar: '6g', sodium: '380mg' },
    isActive: true, isTodaySpecial: false, rating: 4.6, reviewCount: 78,
    badges: [], dietary: ['vegetarian'],
    createdAt: '2024-01-25T08:00:00Z',
  },
  {
    id: '10', name: 'Strawberry Cheesecake', slug: 'strawberry-cheesecake',
    description: 'New York-style baked cheesecake on a buttery graham cracker crust, topped with a glossy fresh strawberry compote. Serves 8-10.',
    price: 44.00, comparePrice: undefined, stock: 3, category: 'cake',
    images: [
      'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&q=80',
    ],
    allergens: ['gluten', 'dairy', 'eggs'],
    nutritionalInfo: { calories: 420, protein: '8g', carbs: '44g', fat: '24g', fiber: '1g', sugar: '32g', sodium: '290mg' },
    isActive: true, isTodaySpecial: false, rating: 4.8, reviewCount: 67,
    badges: ['low-stock'], dietary: ['vegetarian'],
    createdAt: '2024-02-28T10:00:00Z',
  },
  {
    id: '11', name: 'Gluten-Free Brownie', slug: 'gluten-free-brownie',
    description: 'Ultra-fudgy brownies made with premium Valrhona dark chocolate and almond flour. Dense, rich, and completely gluten-free without compromising on taste.',
    price: 3.75, comparePrice: undefined, stock: 22, category: 'gluten-free',
    images: [
      'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80',
    ],
    allergens: ['eggs', 'nuts', 'dairy'],
    nutritionalInfo: { calories: 280, protein: '5g', carbs: '32g', fat: '16g', fiber: '3g', sugar: '22g', sodium: '90mg' },
    isActive: true, isTodaySpecial: false, rating: 4.7, reviewCount: 101,
    badges: [], dietary: ['vegetarian', 'gluten-free'],
    createdAt: '2024-03-05T09:00:00Z',
  },
  {
    id: '12', name: 'Ham & Cheese Croissant', slug: 'ham-cheese-croissant',
    description: 'Our flaky butter croissant filled with sliced Black Forest ham and Gruyère cheese, baked until golden and melty. A favourite for breakfast or lunch.',
    price: 6.50, comparePrice: undefined, stock: 14, category: 'savory',
    images: [
      'https://images.unsplash.com/photo-1530610476181-d83430b64dcd?w=800&q=80',
    ],
    allergens: ['gluten', 'dairy', 'eggs'],
    nutritionalInfo: { calories: 410, protein: '16g', carbs: '38g', fat: '22g', fiber: '1g', sugar: '2g', sodium: '680mg' },
    isActive: true, isTodaySpecial: false, rating: 4.5, reviewCount: 88,
    badges: [], dietary: [],
    createdAt: '2024-01-30T07:00:00Z',
  },
];

// ─── Testimonials ─────────────────────────────────────────────────────────────
export const mockTestimonials = [
  {
    id: '1', name: 'Sarah Mitchell', avatar: 'https://i.pravatar.cc/150?img=47',
    rating: 5, role: 'Regular Customer',
    comment: 'CL Bakers has completely ruined supermarket bread for me. The sourdough is absolutely incredible — I order every week without fail. The cinnamon rolls on Saturday mornings are worth waking up early for!',
    product: 'Sourdough Country Loaf',
  },
  {
    id: '2', name: 'James Perera', avatar: 'https://i.pravatar.cc/150?img=12',
    rating: 5, role: 'Verified Buyer',
    comment: 'Ordered the celebration cake for my wife\'s birthday. It was not just beautiful — it was the most delicious chocolate cake I have ever tasted. Guests were asking for the bakery\'s card all night.',
    product: 'Celebration Chocolate Cake',
  },
  {
    id: '3', name: 'Amelia Chen', avatar: 'https://i.pravatar.cc/150?img=32',
    rating: 5, role: 'Food Blogger',
    comment: 'As someone with a gluten intolerance, I have been let down by too many "gluten-free" bakeries. CL Bakers is the real deal. The lemon muffins and brownies taste better than most regular bakery items!',
    product: 'Gluten-Free Lemon Muffin',
  },
];

// ─── Instagram Mock Posts ─────────────────────────────────────────────────────
export const mockInstagramPosts = [
  { id: '1', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80', likes: 342, caption: 'Fresh from the oven 🍞✨' },
  { id: '2', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80', likes: 518, caption: 'Birthday dreams come true 🎂' },
  { id: '3', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80', likes: 276, caption: 'Croissant perfection every morning 🥐' },
  { id: '4', image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=400&q=80', likes: 431, caption: 'The perfect gift for someone special 🎁' },
];

// ─── Today's Specials ─────────────────────────────────────────────────────────
export const mockSpecials = mockProducts.filter(p => p.isTodaySpecial);

// ─── Categories ───────────────────────────────────────────────────────────────
export const categories = [
  { id: 'bread', label: 'Artisan Bread', image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400&q=80', count: 3 },
  { id: 'pastry', label: 'Pastries', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80', count: 3 },
  { id: 'cake', label: 'Cakes', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80', count: 2 },
  { id: 'savory', label: 'Savory', image: 'https://images.unsplash.com/photo-1568901342437-2498d8ce82a2?w=400&q=80', count: 2 },
  { id: 'gluten-free', label: 'Gluten-Free', image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400&q=80', count: 2 },
];

// ─── Mock Orders ──────────────────────────────────────────────────────────────
export const mockOrders: Order[] = [
  {
    id: 'BKR-LX92A-B3K4', userId: 'user1', status: 'DELIVERED',
    total: 67.50, subtotal: 60.00, tax: 6.00, shippingFee: 5.00, discount: 3.50,
    couponCode: 'WELCOME10', deliveryMethod: 'DELIVERY',
    items: [
      { id: 'oi1', productId: '1', productName: 'Sourdough Country Loaf', productImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=100&q=80', quantity: 2, priceAtTime: 8.50 },
      { id: 'oi2', productId: '2', productName: 'Butter Croissant', productImage: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=100&q=80', quantity: 4, priceAtTime: 4.50 },
    ],
    specialInstructions: 'Leave at the front door.',
    createdAt: '2024-03-15T09:30:00Z', updatedAt: '2024-03-15T14:20:00Z',
  },
  {
    id: 'BKR-M5PQ2-C7F9', userId: 'user1', status: 'CONFIRMED',
    total: 52.00, subtotal: 52.00, tax: 0, shippingFee: 0, discount: 0,
    deliveryMethod: 'PICKUP', pickupBranch: 'Main Street Bakery', pickupTimeSlot: '10:00 AM',
    items: [
      { id: 'oi3', productId: '3', productName: 'Celebration Chocolate Cake', productImage: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=100&q=80', quantity: 1, priceAtTime: 52.00 },
    ],
    createdAt: '2024-03-20T11:00:00Z', updatedAt: '2024-03-20T11:05:00Z',
  },
];

// ─── Mock Reviews ─────────────────────────────────────────────────────────────
export const mockReviews: Review[] = [
  {
    id: 'r1', userId: 'u1', userName: 'Sarah M.', userImage: 'https://i.pravatar.cc/150?img=47',
    productId: '1', rating: 5, comment: 'Absolute perfection. The crust shatters beautifully and the crumb is open and chewy. I will never buy supermarket bread again.',
    verifiedPurchase: true, createdAt: '2024-03-10T10:00:00Z',
  },
  {
    id: 'r2', userId: 'u2', userName: 'Tom H.', userImage: 'https://i.pravatar.cc/150?img=11',
    productId: '1', rating: 5, comment: 'Best sourdough in the city, hands down. The tanginess is perfectly balanced. Worth every penny.',
    verifiedPurchase: true, createdAt: '2024-03-05T14:30:00Z',
  },
  {
    id: 'r3', userId: 'u3', userName: 'Lisa K.', userImage: 'https://i.pravatar.cc/150?img=33',
    productId: '1', rating: 4, comment: 'Really great loaf, though I wish it lasted a bit longer. Still, the flavour on day one is unbeatable.',
    verifiedPurchase: true, createdAt: '2024-02-28T09:15:00Z',
  },
];

// ─── Analytics Mock Data ──────────────────────────────────────────────────────
export const mockAnalytics = {
  todayRevenue: 1248.50,
  todayOrders: 34,
  newCustomers: 8,
  lowStockItems: 3,
  weeklyRevenue: [
    { day: 'Mon', revenue: 820 }, { day: 'Tue', revenue: 960 },
    { day: 'Wed', revenue: 1100 }, { day: 'Thu', revenue: 890 },
    { day: 'Fri', revenue: 1480 }, { day: 'Sat', revenue: 2200 },
    { day: 'Sun', revenue: 1650 },
  ],
  topProducts: [
    { name: 'Sourdough Loaf', sales: 142, revenue: 1207 },
    { name: 'Butter Croissant', sales: 210, revenue: 945 },
    { name: 'Macaron Box', sales: 134, revenue: 3752 },
    { name: 'Choc Cake', sales: 89, revenue: 4628 },
    { name: 'Cinnamon Roll', sales: 176, revenue: 968 },
  ],
};

// ─── Pickup Branches ──────────────────────────────────────────────────────────
export const pickupBranches = [
  { id: 'main', name: 'Main Street Bakery', address: '42 Main Street, Downtown' },
  { id: 'north', name: 'Northside Branch', address: '18 Oak Avenue, Northside' },
];

export const pickupTimeSlots = [
  '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM',
  '4:00 PM', '5:00 PM',
];
