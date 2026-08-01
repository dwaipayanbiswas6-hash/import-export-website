import { randomUUID } from 'node:crypto';

export const enquiryStatuses = [
  'new',
  'reviewing',
  'responded',
  'quoted',
  'negotiating',
  'won',
  'closed',
] as const;

export type EnquiryStatus = (typeof enquiryStatuses)[number];

export type PortalEnquiry = {
  id: string;
  reference: string;
  buyer_email: string;
  company_name: string;
  contact_person: string;
  job_title: string;
  company_website: string | null;
  country: string;
  phone: string;
  product_category: string;
  product_requirement: string;
  product_specifications: string | null;
  quantity: string;
  destination: string;
  timeline: string;
  incoterm: string | null;
  additional_notes: string | null;
  attachment_path: string | null;
  attachment_name: string | null;
  status: EnquiryStatus;
  created_at: string;
  updated_at: string;
  last_activity_at: string;
};

export const portalAttachmentTypes = new Set([
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'image/png',
  'image/jpeg',
]);

export const portalAttachmentExtensions = new Set([
  '.pdf',
  '.docx',
  '.xlsx',
  '.png',
  '.jpg',
  '.jpeg',
]);

export const portalAttachmentLimit = 10 * 1024 * 1024;

export function normaliseEmail(value: string) {
  return value.trim().toLowerCase();
}

export function createEnquiryReference() {
  const year = new Date().getUTCFullYear();
  const code = randomUUID().replaceAll('-', '').slice(0, 10).toUpperCase();
  return `BE-${year}-${code}`;
}

export function safeFilename(name: string) {
  return name
    .replace(/[^a-zA-Z0-9._ -]/g, '_')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 120);
}

export function fileExtension(name: string) {
  const index = name.lastIndexOf('.');
  return index >= 0 ? name.slice(index).toLowerCase() : '';
}

export function isAllowedPortalFile(file: File) {
  return (
    file.size <= portalAttachmentLimit &&
    portalAttachmentTypes.has(file.type) &&
    portalAttachmentExtensions.has(fileExtension(file.name))
  );
}

export function portalAdminEmails() {
  return (process.env.PORTAL_ADMIN_EMAILS ?? '')
    .split(',')
    .map(normaliseEmail)
    .filter(Boolean);
}

export function isPortalAdmin(email: string | null | undefined) {
  if (!email) return false;
  return portalAdminEmails().includes(normaliseEmail(email));
}

export function statusLabel(status: EnquiryStatus) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}
