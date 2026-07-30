import {
  BadgeIndianRupee,
  Boxes,
  Clock3,
  FileCheck2,
  Handshake,
  HeartHandshake,
  Leaf,
  MessageSquareText,
  PackageCheck,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Sprout,
  TrendingUp,
  UsersRound,
} from 'lucide-react';

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const siteUrl =
  configuredSiteUrl?.startsWith('http://') ||
  configuredSiteUrl?.startsWith('https://')
    ? configuredSiteUrl.replace(/\/$/, '')
    : 'http://localhost:3000';

export const siteConfig = {
  name: 'Biswas Exports',
  tagline: 'Bridging Indian Excellence to Global Markets',
  description:
    'Biswas Exports is a merchant export company in Asansol, India, connecting global buyers with quality Indian products through responsible sourcing and dependable export coordination.',
  established: '2023',
  businessType: 'Merchant Export Company',
  phone: '+91 7908622788',
  phoneHref: 'tel:+917908622788',
  email: 'dwaipayanbiswas6@gmail.com',
  emailHref: 'mailto:dwaipayanbiswas6@gmail.com',
  location: 'Asansol, West Bengal, India',
  url: siteUrl,
};

export const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Products', href: '/products' },
  { label: 'Industries', href: '/industries' },
  { label: 'Global Markets', href: '/global-presence' },
  { label: 'Contact', href: '/contact' },
];

export const mission =
  'To connect global buyers with quality Indian products through transparent sourcing, ethical business practices, and dependable export coordination while building lasting relationships based on trust, professionalism and mutual growth.';

export const vision =
  'To build Biswas Exports into a globally respected trading company that represents the quality, diversity and strength of Indian products in international markets while creating sustainable value for customers, suppliers and business partners.';

export const coreValues = [
  { title: 'Integrity', icon: ShieldCheck },
  { title: 'Transparency', icon: MessageSquareText },
  { title: 'Quality', icon: Sparkles },
  { title: 'Professionalism', icon: UsersRound },
  { title: 'Customer First', icon: HeartHandshake },
  { title: 'Long-Term Partnerships', icon: Handshake },
  { title: 'Continuous Improvement', icon: TrendingUp },
];

export const advantages = [
  {
    title: 'Trusted Indian Supplier Network',
    description:
      'Carefully identified manufacturers, processors, farmers and suppliers across India.',
    icon: SearchCheck,
  },
  {
    title: 'Quality Focus',
    description:
      'Product requirements are clarified and coordinated carefully before shipment planning.',
    icon: PackageCheck,
  },
  {
    title: 'Transparent Communication',
    description:
      'Clear, timely updates help buyers make informed decisions throughout the process.',
    icon: MessageSquareText,
  },
  {
    title: 'Competitive Pricing',
    description:
      'Responsible sourcing and supplier coordination support commercially sound quotations.',
    icon: BadgeIndianRupee,
  },
  {
    title: 'Professional Export Coordination',
    description:
      'A structured approach from enquiry and sourcing through dispatch coordination.',
    icon: Boxes,
  },
  {
    title: 'Reliable Documentation Support',
    description:
      'Careful coordination of commercial and shipment documentation with relevant partners.',
    icon: FileCheck2,
  },
  {
    title: 'Timely Service',
    description:
      'Responsive follow-up and realistic timelines are central to every engagement.',
    icon: Clock3,
  },
  {
    title: 'Long-Term Business Relationships',
    description:
      'We aim to create mutual value through dependable, relationship-led service.',
    icon: Handshake,
  },
];

export const exportProcess = [
  {
    step: '01',
    title: 'Buyer Enquiry',
    text: 'We understand the product, specification, quantity, destination and commercial requirement.',
  },
  {
    step: '02',
    title: 'Responsible Sourcing',
    text: 'Suitable Indian suppliers are identified and product options are evaluated against the brief.',
  },
  {
    step: '03',
    title: 'Offer & Confirmation',
    text: 'A transparent commercial proposal is shared for review, clarification and confirmation.',
  },
  {
    step: '04',
    title: 'Quality Coordination',
    text: 'Agreed product and packing requirements are coordinated with the selected supplier.',
  },
  {
    step: '05',
    title: 'Documentation',
    text: 'Commercial and shipment documents are coordinated with the appropriate service partners.',
  },
  {
    step: '06',
    title: 'Dispatch Support',
    text: 'Shipment handover and buyer communication are coordinated through the agreed delivery stage.',
  },
];

export const industries = [
  {
    title: 'Agriculture & Food',
    text: 'Sourcing opportunities across India’s diverse agricultural and processed food ecosystem.',
    icon: Sprout,
  },
  {
    title: 'Textiles & Lifestyle',
    text: 'Buyer-led sourcing for textile, apparel, handicraft and lifestyle product requirements.',
    icon: Sparkles,
  },
  {
    title: 'Industrial Supplies',
    text: 'Commercial coordination for selected industrial products, components and consumables.',
    icon: Boxes,
  },
  {
    title: 'Natural & Sustainable Products',
    text: 'Exploring responsible product categories with natural materials and sustainable value.',
    icon: Leaf,
  },
];

export const products = [
  {
    title: 'Agricultural Products',
    category: 'Food & Agriculture',
    description:
      'Buyer-specific sourcing for selected Indian agricultural product requirements.',
  },
  {
    title: 'Processed Food Products',
    category: 'Food & Agriculture',
    description:
      'Export-oriented sourcing opportunities from verified processors and suppliers.',
  },
  {
    title: 'Textiles & Apparel',
    category: 'Lifestyle',
    description:
      'Selected Indian textile and apparel categories tailored to market requirements.',
  },
  {
    title: 'Handicrafts & Lifestyle',
    category: 'Lifestyle',
    description:
      'Distinctive Indian craft and lifestyle products for international B2B buyers.',
  },
  {
    title: 'Industrial Products',
    category: 'Industrial',
    description:
      'Requirement-led sourcing for selected components, consumables and supplies.',
  },
  {
    title: 'Custom Sourcing',
    category: 'Buyer Requirement',
    description:
      'Tell us what you need and we will assess suitable sourcing options in India.',
  },
];

export const targetMarkets = [
  'South Asia',
  'Southeast Asia',
  'Middle East',
  'Africa',
  'Europe',
  'North America',
];

export const aboutCopy = [
  'Biswas Exports is a merchant export company based in Asansol, West Bengal, India, established in 2023. Our goal is to connect international buyers with high-quality Indian products through responsible sourcing, professional coordination, and dependable service.',
  'We work with verified manufacturers, processors, farmers, and suppliers across India to identify products that meet buyer requirements. Our focus is on building strong supplier relationships, maintaining transparency throughout the export process, and ensuring every transaction is handled with professionalism.',
  'As we continue to grow, Biswas Exports is committed to becoming a trusted bridge between Indian producers and global markets by delivering value, reliability, and long-term business partnerships.',
];
