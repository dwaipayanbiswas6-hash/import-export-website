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
      'India-focused sourcing enquiries for grains, spices and agricultural produce, subject to specification and supplier verification.',
  },
  {
    title: 'Textiles & Apparel',
    icon: Shirt,
    description:
      'Fabrics, finished textiles and apparel considered against buyer specifications, quantities and destination requirements.',
  },
  {
    title: 'Handicrafts & Home Décor',
    icon: Sparkles,
    description:
      'Craft-led home and lifestyle categories reviewed for material, workmanship, finish and export-packing requirements.',
  },
  {
    title: 'Industrial Goods',
    icon: Factory,
    description:
      'Components, tools and manufactured goods assessed against drawings, grades, tolerances and required documentation.',
  },
  {
    title: 'Consumer Products',
    icon: Boxes,
    description:
      'Consumer-product enquiries reviewed for composition, packaging, labelling and destination-market requirements.',
  },
  {
    title: 'Custom Sourcing',
    icon: Search,
    description:
      'Buyer-led review of products and potential Indian supply options not already represented in the catalogue.',
  },
];

export const services = [
  {
    title: 'Product Sourcing Review',
    icon: Search,
    description:
      'Review of buyer requirements and potential Indian product or supplier options, subject to independent verification.',
  },
  {
    title: 'Specification Coordination',
    icon: ClipboardCheck,
    description:
      'Alignment of buyer specifications, samples and practical checkpoints before commercial terms are agreed.',
  },
  {
    title: 'Documentation Coordination',
    icon: FileCheck2,
    description:
      'Identification and coordination of transaction documents required by the agreed product, route and destination.',
  },
  {
    title: 'Packaging Review',
    icon: PackageCheck,
    description:
      'Discussion of product protection, presentation and transit requirements with the selected supply parties.',
  },
  {
    title: 'Logistics Handover',
    icon: Ship,
    description:
      'Coordination with appointed logistics providers after responsibilities, documents and commercial terms are agreed.',
  },
  {
    title: 'Buyer Communication',
    icon: Handshake,
    description:
      'Documented communication from the initial enquiry through the agreed sourcing or transaction stage.',
  },
];

export const industries = [
  {
    title: 'Agriculture & Food',
    icon: Leaf,
    description:
      'Enquiry review for suitable agricultural and food categories, including destination-specific product and labelling requirements.',
  },
  {
    title: 'Textiles & Lifestyle',
    icon: Shirt,
    description:
      'Specification-led enquiries for textile, apparel, home and lifestyle categories.',
  },
  {
    title: 'Manufacturing',
    icon: Factory,
    description:
      'Drawing- and specification-led coordination for industrial and manufactured product requirements.',
  },
  {
    title: 'Retail & Distribution',
    icon: Boxes,
    description:
      'Product and packaging enquiries from importers, distributors, retailers and private-label buyers.',
  },
];

export const workflow = [
  {
    step: '01',
    title: 'Understand',
    text: 'Clarify the product, quantity, specification, destination, buyer status and timeline.',
  },
  {
    step: '02',
    title: 'Review',
    text: 'Assess the enquiry and identify potential supply routes or information gaps.',
  },
  {
    step: '03',
    title: 'Verify',
    text: 'Confirm relevant supplier, specification, packaging, documentation and compliance details.',
  },
  {
    step: '04',
    title: 'Coordinate',
    text: 'Proceed only after written agreement on commercial terms, responsibilities and next steps.',
  },
];

export const values = [
  {
    title: 'Clarity at every step',
    icon: Route,
    text: 'Straightforward updates, documented requirements and clearly stated dependencies.',
  },
  {
    title: 'Verification-minded sourcing',
    icon: ShieldCheck,
    text: 'Products and supply options are reviewed against the buyer brief before claims are repeated or relied upon.',
  },
  {
    title: 'International buyer perspective',
    icon: Globe2,
    text: 'Enquiries are considered in light of the destination, intended use and agreed transaction responsibilities.',
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
