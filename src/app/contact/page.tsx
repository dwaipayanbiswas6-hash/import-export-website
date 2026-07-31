'use client';

import {
  BriefcaseBusiness,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { PageHero } from '@/components/ui';
import {
  getProductBySlug,
  type ProductCategory as CatalogueCategory,
} from '@/lib/products';
import {
  contactSchema,
  incoterms,
  productCategories,
  type ContactFormData,
} from '@/lib/contact';
import { publicContact, whatsappUrl } from '@/lib/site';

type SubmissionState = 'idle' | 'submitting' | 'success' | 'error';
type ContactApiResponse = {
  success?: boolean;
  enquiryId?: string;
  error?: string;
};

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_FILE_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'image/png',
  'image/jpeg',
];
const inputClass =
  'w-full rounded-2xl border border-[color:var(--line)] bg-[color:var(--card)] px-4 py-3.5 font-normal shadow-sm outline-none transition duration-200 hover:border-[color:var(--gold-soft)] focus:border-[color:var(--gold)] focus:ring-2 focus:ring-[color:var(--gold-soft)]';
const labelClass = 'grid gap-2 text-sm font-semibold';

export default function Contact() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <ContactContent />
    </Suspense>
  );
}

function ContactContent() {
  const searchParams = useSearchParams();
  const selectedProduct = getProductBySlug(searchParams.get('product') ?? '');
  const [submissionState, setSubmissionState] =
    useState<SubmissionState>('idle');
  const [enquiryId, setEnquiryId] = useState<string | null>(null);
  const [rfqFile, setRfqFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState('');
  const statusRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const whatsappHref = whatsappUrl(publicContact.whatsapp);
  const directContactAvailable = Boolean(
    publicContact.email || publicContact.phone || whatsappHref,
  );

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<ContactFormData>({
    defaultValues: {
      website: '',
      incoterm: 'Not Decided',
      privacyConsent: false,
      productCategory: selectedProduct
        ? contactCategory(selectedProduct.category)
        : undefined,
      productRequirement: selectedProduct
        ? `I would like to submit a sourcing enquiry for ${selectedProduct.name}. Please confirm whether a suitable Indian supply option can be identified and share the specifications, packaging, indicative MOQ, documentation, lead time and commercial information that can be verified.`
        : '',
    },
  });

  useEffect(() => {
    if (submissionState === 'success' || submissionState === 'error')
      statusRef.current?.focus();
  }, [submissionState]);

  function selectFile(file: File | null) {
    setFileError('');
    if (!file) {
      setRfqFile(null);
      return;
    }
    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      setRfqFile(null);
      setFileError('Upload a PDF, DOCX, XLSX, PNG, or JPG file.');
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setRfqFile(null);
      setFileError('The file must be no larger than 10 MB.');
      return;
    }
    setRfqFile(file);
  }

  async function onSubmit(data: ContactFormData) {
    const validation = contactSchema.safeParse(data);
    if (!validation.success) {
      validation.error.issues.forEach((issue) =>
        setError(issue.path[0] as keyof ContactFormData, {
          message: issue.message,
        }),
      );
      return;
    }
    if (fileError) return;

    setSubmissionState('submitting');
    setEnquiryId(null);
    const payload = new FormData();
    Object.entries(validation.data).forEach(([key, value]) =>
      payload.append(key, String(value ?? '')),
    );
    if (rfqFile) payload.append('rfqFile', rfqFile);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: payload,
      });
      const result = (await response
        .json()
        .catch(() => null)) as ContactApiResponse | null;
      if (!response.ok || !result?.success) throw new Error('Submission failed');
      setEnquiryId(result.enquiryId ?? null);
      setSubmissionState('success');
    } catch {
      setSubmissionState('error');
    }
  }

  function submitAnother() {
    reset();
    setEnquiryId(null);
    setRfqFile(null);
    setFileError('');
    if (fileRef.current) fileRef.current.value = '';
    setSubmissionState('idle');
  }

  const errorFor = (name: keyof ContactFormData) => errors[name]?.message;
  const fieldError = (name: keyof ContactFormData) =>
    errorFor(name) ? (
      <span id={`${name}-error`} className="text-sm text-red-700">
        {errorFor(name)}
      </span>
    ) : null;
  const ariaError = (name: keyof ContactFormData) => ({
    'aria-invalid': !!errors[name],
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
  });

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Submit a professional B2B sourcing enquiry."
        intro="Share the buyer, product, specification, quantity, destination and timeline. Biswas Exports will review the information submitted; any response depends on the completeness of the brief and the verification required."
      />
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-6 sm:py-20 lg:grid-cols-[.7fr_1.3fr] lg:gap-12 lg:px-8 lg:py-24">
        <aside className="self-start lg:sticky lg:top-28">
          <p className="eyebrow">Business enquiries</p>
          <h2 className="text-3xl font-semibold">
            Connect with Biswas Exports
          </h2>
          <p className="mt-5 leading-7 text-[color:var(--muted)]">
            India-focused sourcing enquiry coordination for professional
            international buyers. A catalogue listing does not confirm stock,
            price, supplier appointment or acceptance of an order.
          </p>
          <div className="mt-9 grid gap-5 rounded-[1.5rem] border border-[color:var(--line)] bg-[color:var(--cream)] p-6 shadow-sm sm:rounded-[2rem]">
            <ContactItem icon={MapPin} title="Location">
              <span>Asansol, West Bengal, India</span>
            </ContactItem>
            {publicContact.email && (
              <ContactItem icon={Mail} title="Email">
                <a
                  className="contact-link"
                  href={`mailto:${publicContact.email}`}
                >
                  {publicContact.email}
                </a>
              </ContactItem>
            )}
            {publicContact.phone && (
              <ContactItem icon={Phone} title="Phone">
                <a
                  className="contact-link"
                  href={`tel:${publicContact.phone.replace(/\s/g, '')}`}
                >
                  {publicContact.phone}
                </a>
              </ContactItem>
            )}
            {whatsappHref && (
              <ContactItem icon={MessageCircle} title="WhatsApp">
                <a
                  className="contact-link"
                  href={whatsappHref}
                  rel="noreferrer"
                  target="_blank"
                >
                  Message on WhatsApp
                </a>
              </ContactItem>
            )}
            {!directContactAvailable && (
              <ContactItem icon={Mail} title="Preferred contact">
                <span>Use the secure business enquiry form on this page.</span>
              </ContactItem>
            )}
            <ContactItem icon={Clock3} title="Response timing">
              <span>{publicContact.responseTime}</span>
            </ContactItem>
            <ContactItem icon={BriefcaseBusiness} title="Enquiry policy">
              <span>Professional business enquiries only.</span>
            </ContactItem>
          </div>
        </aside>

        {submissionState === 'success' ? (
          <div
            ref={statusRef}
            aria-live="polite"
            className="premium-card self-start outline-none"
            tabIndex={-1}
          >
            <p className="eyebrow">Enquiry received</p>
            <h2 className="text-3xl font-semibold">
              Thank you for contacting Biswas Exports.
            </h2>
            <p className="mt-5 leading-7 text-[color:var(--muted)]">
              The information you submitted has been accepted for review. You
              should also receive an acknowledgement at the business email
              provided.
            </p>
            {enquiryId && (
              <div className="mt-7 rounded-2xl border border-[color:var(--line)] bg-[color:var(--cream)] p-5">
                <b>Enquiry reference</b>
                <p className="mt-1 break-all font-mono text-sm text-[color:var(--muted)]">
                  {enquiryId}
                </p>
              </div>
            )}
            <div className="mt-7 border-l-2 border-[color:var(--gold)] pl-4">
              <b>Response timing</b>
              <p className="text-[color:var(--muted)]">
                {publicContact.responseTime}
              </p>
            </div>
            <button
              className="button-primary mt-8 w-full sm:w-auto"
              type="button"
              onClick={submitAnother}
            >
              Submit another enquiry
            </button>
          </div>
        ) : (
          <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className="grid gap-8 rounded-[1.5rem] border border-[color:var(--line)] bg-[color:var(--card)] p-5 shadow-xl sm:rounded-[2rem] sm:p-7 md:p-10"
          >
            <div className="absolute -left-[10000px]" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                tabIndex={-1}
                autoComplete="new-password"
                {...register('website')}
              />
            </div>

            <FormSection
              number="01"
              title="Company information"
              intro="Tell us who is submitting the business enquiry."
            >
              <label
                className={`${labelClass} md:col-span-2`}
                htmlFor="companyName"
              >
                Company / Business Name *
                <input
                  id="companyName"
                  autoComplete="organization"
                  maxLength={160}
                  className={inputClass}
                  {...ariaError('companyName')}
                  {...register('companyName')}
                />
                {fieldError('companyName')}
              </label>
              <label className={labelClass} htmlFor="contactPerson">
                Contact Person *
                <input
                  id="contactPerson"
                  autoComplete="name"
                  maxLength={120}
                  className={inputClass}
                  {...ariaError('contactPerson')}
                  {...register('contactPerson')}
                />
                {fieldError('contactPerson')}
              </label>
              <label className={labelClass} htmlFor="jobTitle">
                Job Title *
                <input
                  id="jobTitle"
                  autoComplete="organization-title"
                  maxLength={120}
                  className={inputClass}
                  {...ariaError('jobTitle')}
                  {...register('jobTitle')}
                />
                {fieldError('jobTitle')}
              </label>
              <label className={labelClass} htmlFor="companyWebsite">
                Company Website{' '}
                <span className="font-normal text-[color:var(--muted)]">
                  (optional)
                </span>
                <input
                  id="companyWebsite"
                  type="url"
                  placeholder="https://example.com"
                  autoComplete="url"
                  maxLength={300}
                  className={inputClass}
                  {...ariaError('companyWebsite')}
                  {...register('companyWebsite')}
                />
                {fieldError('companyWebsite')}
              </label>
              <label className={labelClass} htmlFor="businessEmail">
                Business Email *
                <input
                  id="businessEmail"
                  type="email"
                  autoComplete="email"
                  maxLength={254}
                  className={inputClass}
                  {...ariaError('businessEmail')}
                  {...register('businessEmail')}
                />
                {fieldError('businessEmail')}
              </label>
              <label className={labelClass} htmlFor="country">
                Country *
                <input
                  id="country"
                  autoComplete="country-name"
                  maxLength={100}
                  className={inputClass}
                  {...ariaError('country')}
                  {...register('country')}
                />
                {fieldError('country')}
              </label>
              <label className={labelClass} htmlFor="phone">
                Phone or WhatsApp Number *
                <input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  maxLength={40}
                  className={inputClass}
                  {...ariaError('phone')}
                  {...register('phone')}
                />
                {fieldError('phone')}
              </label>
            </FormSection>

            <FormSection
              number="02"
              title="Enquiry details"
              intro="Provide enough detail for a focused initial review."
            >
              <label className={labelClass} htmlFor="productCategory">
                Product Category *
                <select
                  id="productCategory"
                  className={inputClass}
                  {...ariaError('productCategory')}
                  {...register('productCategory')}
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {productCategories.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
                {fieldError('productCategory')}
              </label>
              <label className={labelClass} htmlFor="quantity">
                Required Quantity *
                <input
                  id="quantity"
                  maxLength={160}
                  className={inputClass}
                  {...ariaError('quantity')}
                  {...register('quantity')}
                />
                {fieldError('quantity')}
              </label>
              <label
                className={`${labelClass} md:col-span-2`}
                htmlFor="productRequirement"
              >
                Product Requirement *
                <textarea
                  id="productRequirement"
                  maxLength={5000}
                  className={`${inputClass} min-h-32 resize-y`}
                  {...ariaError('productRequirement')}
                  {...register('productRequirement')}
                />
                {fieldError('productRequirement')}
              </label>
              <label
                className={`${labelClass} md:col-span-2`}
                htmlFor="productSpecifications"
              >
                Product Specifications{' '}
                <span className="font-normal text-[color:var(--muted)]">
                  (optional)
                </span>
                <textarea
                  id="productSpecifications"
                  maxLength={5000}
                  className={`${inputClass} min-h-28 resize-y`}
                  {...ariaError('productSpecifications')}
                  {...register('productSpecifications')}
                />
                {fieldError('productSpecifications')}
              </label>
              <label className={labelClass} htmlFor="destination">
                Destination Country / Port *
                <input
                  id="destination"
                  maxLength={160}
                  className={inputClass}
                  {...ariaError('destination')}
                  {...register('destination')}
                />
                {fieldError('destination')}
              </label>
              <label className={labelClass} htmlFor="timeline">
                Target Timeline *
                <input
                  id="timeline"
                  placeholder="For example, within 3 months"
                  maxLength={160}
                  className={inputClass}
                  {...ariaError('timeline')}
                  {...register('timeline')}
                />
                {fieldError('timeline')}
              </label>
              <label className={labelClass} htmlFor="incoterm">
                Preferred Incoterm{' '}
                <span className="font-normal text-[color:var(--muted)]">
                  (optional)
                </span>
                <select
                  id="incoterm"
                  className={inputClass}
                  {...register('incoterm')}
                >
                  {incoterms.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>
              <label className={labelClass} htmlFor="rfqFile">
                Upload RFQ / Specification{' '}
                <span className="font-normal text-[color:var(--muted)]">
                  (optional)
                </span>
                <span className="rounded-2xl border border-dashed border-[color:var(--gold-soft)] bg-[color:var(--cream)] p-4 transition hover:border-[color:var(--gold)]">
                  <input
                    ref={fileRef}
                    id="rfqFile"
                    type="file"
                    accept=".pdf,.docx,.xlsx,.png,.jpg,.jpeg"
                    className="block w-full cursor-pointer text-sm file:mr-4 file:rounded-full file:border-0 file:bg-[color:var(--gold)] file:px-4 file:py-2 file:font-semibold file:text-white"
                    aria-describedby={
                      fileError
                        ? 'rfqFile-help rfqFile-error'
                        : 'rfqFile-help'
                    }
                    onChange={(event) =>
                      selectFile(event.target.files?.[0] ?? null)
                    }
                  />
                  <span
                    id="rfqFile-help"
                    className="mt-2 block text-xs font-normal text-[color:var(--muted)]"
                  >
                    PDF, DOCX, XLSX, PNG or JPG · Maximum 10 MB
                  </span>
                </span>
                {fileError && (
                  <span id="rfqFile-error" className="text-sm text-red-700">
                    {fileError}
                  </span>
                )}
              </label>
              <label
                className={`${labelClass} md:col-span-2`}
                htmlFor="additionalNotes"
              >
                Additional Notes{' '}
                <span className="font-normal text-[color:var(--muted)]">
                  (optional)
                </span>
                <textarea
                  id="additionalNotes"
                  maxLength={5000}
                  className={`${inputClass} min-h-28 resize-y`}
                  {...ariaError('additionalNotes')}
                  {...register('additionalNotes')}
                />
                {fieldError('additionalNotes')}
              </label>
            </FormSection>

            <div>
              <label
                className="flex items-start gap-3 text-sm"
                htmlFor="privacyConsent"
              >
                <input
                  id="privacyConsent"
                  type="checkbox"
                  className="mt-0.5 h-5 w-5 shrink-0 accent-[color:var(--gold)]"
                  {...ariaError('privacyConsent')}
                  {...register('privacyConsent')}
                />
                <span>
                  I agree that Biswas Exports may use the information provided
                  to review and respond to this enquiry. Do not upload passwords,
                  identity documents, payment-card details or medical records.{' '}
                  <Link
                    className="text-[color:var(--gold-dark)] underline"
                    href="/privacy-policy"
                  >
                    View Privacy Policy.
                  </Link>
                </span>
              </label>
              {fieldError('privacyConsent')}
            </div>

            {submissionState === 'error' && (
              <div
                ref={statusRef}
                role="alert"
                aria-live="assertive"
                tabIndex={-1}
                className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-800 outline-none"
              >
                We could not deliver the enquiry right now. Please try again
                later
                {directContactAvailable
                  ? ' or use one of the direct contact channels shown on this page.'
                  : '.'}
              </div>
            )}

            <button
              disabled={submissionState === 'submitting'}
              className="button-primary w-full px-8 transition duration-300 hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:justify-self-start"
              type="submit"
            >
              {submissionState === 'submitting'
                ? 'Sending enquiry...'
                : 'Submit business enquiry'}
            </button>
          </form>
        )}
      </section>
    </>
  );
}

function contactCategory(
  category: CatalogueCategory,
): ContactFormData['productCategory'] {
  return category;
}

function ContactItem({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof MapPin;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3">
      <Icon
        className="mt-0.5 shrink-0 text-[color:var(--gold)]"
        size={20}
        aria-hidden="true"
      />
      <div className="min-w-0">
        <b className="text-sm">{title}</b>
        <p className="mt-0.5 break-words text-sm text-[color:var(--muted)]">
          {children}
        </p>
      </div>
    </div>
  );
}

function FormSection({
  number,
  title,
  intro,
  children,
}: {
  number: string;
  title: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="grid gap-5 border-0 p-0 md:grid-cols-2">
      <legend className="mb-1 w-full border-b border-[color:var(--line)] pb-5">
        <span className="mr-3 font-display text-2xl text-[color:var(--gold)]">
          {number}
        </span>
        <span className="font-display text-2xl font-semibold">{title}</span>
        <span className="mt-2 block text-sm font-normal text-[color:var(--muted)]">
          {intro}
        </span>
      </legend>
      {children}
    </fieldset>
  );
}
