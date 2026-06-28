import {
  Anchor,
  Boxes,
  Building2,
  Factory,
  Globe2,
  PackageCheck,
  Plane,
  Search,
  ShieldCheck,
  Ship,
  Truck,
  Warehouse,
} from 'lucide-react';

export const company = {
  name: 'AurexTrade Global',
  shortName: 'AurexTrade',
  tagline: 'International trade, precisely managed.',
  email: 'concierge@aurextrade.example',
  phone: '+1 (212) 555-0148',
  address: 'One World Trade Center, New York, NY',
};

export const navItems = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Industries', href: '/industries' },
  { label: 'Products', href: '/products' },
  { label: 'Global Presence', href: '/global-presence' },
  { label: 'Contact', href: '/contact' },
];

export const services = [
  {
    title: 'Import',
    icon: Ship,
    description:
      'Regulated inbound trade programs with supplier coordination, inspection, insurance, and customs-ready documentation.',
  },
  {
    title: 'Export',
    icon: Plane,
    description:
      'Market-ready outbound logistics, compliance checks, packaging governance, and buyer documentation for international corridors.',
  },
  {
    title: 'Freight Forwarding',
    icon: Truck,
    description:
      'Ocean, air, and multimodal freight engineered around cost, urgency, resilience, and real-time exception management.',
  },
  {
    title: 'Customs',
    icon: ShieldCheck,
    description:
      'Classification, valuation, duty planning, permits, and broker coordination that reduce border risk and costly delays.',
  },
  {
    title: 'Warehousing',
    icon: Warehouse,
    description:
      'Secure consolidation, bonded storage, inventory visibility, pick-pack, and cross-dock operations near strategic gateways.',
  },
  {
    title: 'Supply Chain',
    icon: Boxes,
    description:
      'End-to-end network design, vendor governance, demand planning, and control tower reporting for executive visibility.',
  },
  {
    title: 'Global Sourcing',
    icon: Search,
    description:
      'Qualified supplier discovery, factory audits, sample management, negotiation support, and ethical procurement controls.',
  },
  {
    title: 'Door-to-door Delivery',
    icon: PackageCheck,
    description:
      'Single-accountability delivery from origin collection to destination handover with milestone communication throughout.',
  },
];

export const industries = [
  'Manufacturing',
  'Retail & Consumer Goods',
  'Automotive',
  'Food & Agriculture',
  'Pharmaceuticals',
  'Energy & Infrastructure',
  'Technology',
  'Construction',
];

export const products = [
  'Industrial Machinery',
  'Consumer Electronics',
  'Textiles & Apparel',
  'Agricultural Commodities',
  'Automotive Components',
  'Medical Supplies',
];

export const stats = [
  { value: '42+', label: 'trade corridors' },
  { value: '18k+', label: 'annual shipments' },
  { value: '96%', label: 'on-time clearance' },
  { value: '24/7', label: 'control tower' },
];

export const regions = [
  'North America',
  'Latin America',
  'Europe',
  'Middle East',
  'Africa',
  'Asia-Pacific',
];

export const footerLinks = [
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Global Presence', href: '/global-presence' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'Import', href: '/services' },
      { label: 'Export', href: '/services' },
      { label: 'Warehousing', href: '/services' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms', href: '/terms' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Request Quote', href: '/contact' },
      { label: 'Services', href: '/services' },
    ],
  },
];

export const megaHighlights = [Anchor, Globe2, Building2, Factory];
