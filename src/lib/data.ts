import {
  Boxes,
  ClipboardCheck,
  Factory,
  FileCheck2,
  Globe2,
  Handshake,
  Leaf,
  PackageCheck,
  Route,
  Search,
  ShieldCheck,
  Ship,
  Shirt,
  Sparkles,
  Wheat,
} from 'lucide-react';

export const company = {
  name: 'Biswas Exports',
  tagline: 'Indian products. Global possibilities.',
  email: 'contact@biswasexports.com',
  address: 'Asansol, West Bengal, India',
};

export const navItems = [
  { label: 'About', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'Services', href: '/services' },
  { label: 'Industries', href: '/industries' },
  { label: 'Global Presence', href: '/global-presence' },
  { label: 'Contact', href: '/contact' },
];

export const products = [
  {
    title: 'Agricultural Products',
    icon: Wheat,
    description:
      'Carefully selected grains, pulses, spices, and agricultural produce prepared for international trade.',
  },
  {
    title: 'Textiles & Apparel',
    icon: Shirt,
    description:
      'Quality Indian fabrics, finished textiles, and apparel sourced to match buyer specifications.',
  },
  {
    title: 'Handicrafts & Home Décor',
    icon: Sparkles,
    description:
      'Distinctive craft-led collections that celebrate Indian materials, artistry, and contemporary utility.',
  },
  {
    title: 'Industrial Goods',
    icon: Factory,
    description:
      'Dependable components, tools, and manufactured goods supported by clear specifications.',
  },
  {
    title: 'Consumer Products',
    icon: Boxes,
    description:
      'Thoughtfully sourced everyday products with market-ready packaging and documentation.',
  },
  {
    title: 'Custom Sourcing',
    icon: Search,
    description:
      'Buyer-led sourcing for suitable Indian products, manufacturers, and commercial requirements.',
  },
];

export const services = [
  {
    title: 'Product Sourcing',
    icon: Search,
    description:
      'Requirement-led supplier and product discovery across trusted Indian manufacturing ecosystems.',
  },
  {
    title: 'Quality Coordination',
    icon: ClipboardCheck,
    description:
      'Specification alignment, sample coordination, and practical quality checkpoints before dispatch.',
  },
  {
    title: 'Export Documentation',
    icon: FileCheck2,
    description:
      'Structured commercial and shipping documentation coordinated for each agreed transaction.',
  },
  {
    title: 'Packaging Support',
    icon: PackageCheck,
    description:
      'Export-ready packaging guidance shaped around product protection, presentation, and transit needs.',
  },
  {
    title: 'Logistics Coordination',
    icon: Ship,
    description:
      'Clear handoffs with logistics providers for suitable ocean, air, and multimodal movement.',
  },
  {
    title: 'Buyer Communication',
    icon: Handshake,
    description:
      'Responsive, transparent communication from initial enquiry through order coordination.',
  },
];

export const industries = [
  {
    title: 'Agriculture & Food',
    icon: Leaf,
    description:
      'Sourcing and export coordination for suitable agricultural and food categories.',
  },
  {
    title: 'Textiles & Lifestyle',
    icon: Shirt,
    description:
      'Flexible product development and sourcing for textile, apparel, and lifestyle buyers.',
  },
  {
    title: 'Manufacturing',
    icon: Factory,
    description:
      'Specification-led coordination for industrial and manufactured product requirements.',
  },
  {
    title: 'Retail & Distribution',
    icon: Boxes,
    description:
      'Curated supply options for importers, distributors, retailers, and private-label programmes.',
  },
];

export const workflow = [
  {
    step: '01',
    title: 'Understand',
    text: 'We clarify your product, quantity, specification, destination, and timeline.',
  },
  {
    step: '02',
    title: 'Source',
    text: 'We identify suitable supply options and coordinate samples or commercial details.',
  },
  {
    step: '03',
    title: 'Prepare',
    text: 'We align quality, packaging, and required export documentation.',
  },
  {
    step: '04',
    title: 'Dispatch',
    text: 'We coordinate a clear logistics handover and keep communication moving.',
  },
];

export const values = [
  {
    title: 'Clarity at every step',
    icon: Route,
    text: 'Straightforward updates, documented requirements, and responsive coordination.',
  },
  {
    title: 'Quality-minded sourcing',
    icon: ShieldCheck,
    text: 'Products and supply options considered against the buyer’s stated needs.',
  },
  {
    title: 'Global trade perspective',
    icon: Globe2,
    text: 'Export preparation shaped for the practical expectations of international buyers.',
  },
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
    title: 'Explore',
    links: [
      { label: 'Products', href: '/products' },
      { label: 'Services', href: '/services' },
      { label: 'Industries', href: '/industries' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms & Conditions', href: '/terms' },
    ],
  },
];
