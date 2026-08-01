'use client';

import {
  BriefcaseBusiness,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
} from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { PageHero } from '@/components/ui';
import {
  contactSchema,
  incoterms,
  productCategories,
  type ContactFormData,
} from '@/lib/contact';
import { getProductBySlug } from '@/lib/products';

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

type Receipt = {
  reference: string;
};

function configured(value: string | undefined) {
  return value?.trim() || null;
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <ContactContent />
    </Suspense>
  );
}

function ContactContent() {
  const searchParams = useSearchParams();
  const selectedProduct = getProductBySlug(searchParams.get('product') ?? '');
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState('');
  const [rfqFile, setRfqFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState('');
  const statusRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const contactEmail = configured(process.env.NEXT_PUBLIC_CONTACT_EMAIL);
  const contactPhone = configured(process.env.NEXT_PUBLIC_CONTACT_PHONE);
  const whatsapp = configured(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER);
  const responseTime =
    configured(process.env.NEXT_PUBLIC_CONTACT_RESPONSE_TIME) ??
    'Response timing depends on the completeness and verification needs of the enquiry.';
  const whatsappHref = whatsapp
    ? `https://wa.me/${whatsapp.replace(/\D/g, '')}`
    : null;

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
      productCategory: selectedProduct?.category,
      productRequirement: selectedProduct
        ? `I would like to request a quotation for ${selectedProduct.name}. Please share available specifications, packaging options, MOQ, lead time, documentation and commercial terms.`
        : '',
    },
  });

  useEffect(() => {
    if (receipt || submissionError) statusRef.current?.focus();
  }, [receipt, submissionError]);

  function selectFile(file: File | null) {
    setFileError('');
    if (!file) {
      setRfqFile(null);
      return;
    }
    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      setRfqFile(null);
      setFileError('Upload a PDF, DOCX, XLSX, PNG or JPG file.');
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
    setSubmissionError('');
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

    setSubmitting(true);
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
      const result = (await response.json()) as {
        error?: string;
        reference?: string;
      };
      if (!response.ok || !result.reference) {
        throw new Error(result.error || 'We could not save the enquiry.');
      }
      setReceipt({ reference: result.reference });
    } catch (error) {
      setSubmissionError(
        error instanceof Error
          ? error.message
          : 'We could not save the enquiry right now.',
      );
    } finally {
      setSubmitting(false);
    }
  }

  function submitAnother() {
    reset();
    setRfqFile(null);
    setFileError('');
    setSubmissionError('');
    setReceipt(null);
    if (fileRef.current) fileRef.current.value = '';
  }

  const errorFor = (name: keyof ContactFormData) => errors[name]?.message;
  const fieldError = (name: keyof ContactFormData) =>
    errorFor(name) ? (
      <span id={`${name}-error`} className="text-sm text-red-700">
        {errorFor(name)}
      </span>
    ) : null;
  const ariaError = (name: keyof ContactFormData) => ({
    'aria-invalid': Boolean(errors[name]),
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
  });

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us what you need to source from India."
        intro="Submit a structured business enquiry. Our team will review the details and respond directly to the business email you provide."
      />
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-6 sm:py-20 lg:grid-cols-[.7fr_1.3fr] lg:px-8 lg:py-24">
        <aside className="self-start lg:sticky lg:top-28">
          <p className="eyebrow">Business enquiries</p>
          <h2 className="text-3xl font-semibold">Connect with Biswas Exports</h2>
          <p className="mt-5 leading-7 text-[color:var(--muted)]">
            Professional India-focused sourcing enquiries are saved in a private
            admin inbox and reviewed before any commercial response is issued.
          </p>
          <div className="mt-9 grid gap-5 rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--cream)] p-6 shadow-sm">
            <ContactItem icon={MapPin} title="Location">
              <span>Asansol, West Bengal, India</span>
            </ContactItem>
            {contactEmail && (
              <ContactItem icon={Mail} title="Email">
                <a className="contact-link" href={`mailto:${contactEmail}`}>
                  {contactEmail}
                </a>
              </ContactItem>
            )}
            {contactPhone && (
              <ContactItem icon={Phone} title="Phone">
                <a className="contact-link" href={`tel:${contactPhone}`}>
                  {contactPhone}
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
            <ContactItem icon={Clock3} title="Response timing">
              <span>{responseTime}</span>
            </ContactItem>
            <ContactItem icon={BriefcaseBusiness} title="Enquiry policy">
              <span>Professional business enquiries only.</span>
            </ContactItem>
            <ContactItem icon={ShieldCheck} title="Secure handling">
              <span>
                Enquiries and RFQ files are restricted to the Biswas Exports
                administration workflow.
              </span>
            </ContactItem>
          </div>
        </aside>

        {receipt ? (
          <div
            ref={statusRef}
            aria-live="polite"
            className="premium-card self-start outline-none"
            tabIndex={-1}
          >
            <p className="eyebrow">Enquiry saved successfully</p>
            <h2 className="text-3xl font-semibold sm:text-4xl">
              Your business enquiry has been received.
            </h2>
            <p className="mt-5 leading-7 text-[color:var(--muted)]">
              Our team will review the submitted information and reply directly
              to the business email provided in the form. Keep the reference
              below for future communication.
            </p>
            <div className="mt-7 rounded-2xl border border-[color:var(--gold-soft)] bg-[color:var(--cream)] p-5">
              <b>Enquiry reference</b>
              <p className="mt-2 break-all font-display text-2xl text-[color:var(--gold-dark)]">
                {receipt.reference}
              </p>
            </div>
            <div className="mt-8">
              <button
                className="button-secondary"
                onClick={submitAnother}
                type="button"
              >
                Submit another enquiry
              </button>
            </div>
          </div>
        ) : (
          <form
            className="grid gap-8 rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--card)] p-6 shadow-xl sm:p-8 md:p-10"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="absolute -left-[10000px]" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                tabIndex={-1}
                autoComplete="off"
                {...register('website')}
              />
            </div>

            <FormSection
              number="01"
              title="Company information"
              intro="Tell us who will own and manage this business enquiry."
            >
              <Field
                className="md:col-span-2"
                error={fieldError('companyName')}
                label="Company / Business Name *"
              >
                <input
                  id="companyName"
                  autoComplete="organization"
                  className={inputClass}
                  {...ariaError('companyName')}
                  {...register('companyName')}
                />
              </Field>
              <Field error={fieldError('contactPerson')} label="Contact Person *">
                <input
                  id="contactPerson"
                  autoComplete="name"
                  className={inputClass}
                  {...ariaError('contactPerson')}
                  {...register('contactPerson')}
                />
              </Field>
              <Field error={fieldError('jobTitle')} label="Job Title *">
                <input
                  id="jobTitle"
                  autoComplete="organization-title"
                  className={inputClass}
                  {...ariaError('jobTitle')}
                  {...register('jobTitle')}
                />
              </Field>
              <Field
                error={fieldError('companyWebsite')}
                label="Company Website (optional)"
              >
                <input
                  id="companyWebsite"
                  type="url"
                  placeholder="https://example.com"
                  autoComplete="url"
                  className={inputClass}
                  {...ariaError('companyWebsite')}
                  {...register('companyWebsite')}
                />
              </Field>
              <Field error={fieldError('businessEmail')} label="Business Email *">
                <input
                  id="businessEmail"
                  type="email"
                  autoComplete="email"
                  className={inputClass}
                  {...ariaError('businessEmail')}
                  {...register('businessEmail')}
                />
              </Field>
              <Field error={fieldError('country')} label="Country *">
                <input
                  id="country"
                  autoComplete="country-name"
                  className={inputClass}
                  {...ariaError('country')}
                  {...register('country')}
                />
              </Field>
              <Field error={fieldError('phone')} label="Phone or WhatsApp Number *">
                <input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  className={inputClass}
                  {...ariaError('phone')}
                  {...register('phone')}
                />
              </Field>
            </FormSection>

            <FormSection
              number="02"
              title="Enquiry details"
              intro="Provide enough detail for a focused initial review."
            >
              <Field error={fieldError('productCategory')} label="Product Category *">
                <select
                  id="productCategory"
                  className={inputClass}
                  {...ariaError('productCategory')}
                  {...register('productCategory')}
                >
                  <option value="">Select a category</option>
                  {productCategories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </Field>
              <Field error={fieldError('quantity')} label="Required Quantity *">
                <input
                  id="quantity"
                  className={inputClass}
                  {...ariaError('quantity')}
                  {...register('quantity')}
                />
              </Field>
              <Field
                className="md:col-span-2"
                error={fieldError('productRequirement')}
                label="Product Requirement *"
              >
                <textarea
                  id="productRequirement"
                  className={`${inputClass} min-h-32 resize-y`}
                  {...ariaError('productRequirement')}
                  {...register('productRequirement')}
                />
              </Field>
              <Field
                className="md:col-span-2"
                label="Product Specifications (optional)"
              >
                <textarea
                  id="productSpecifications"
                  className={`${inputClass} min-h-28 resize-y`}
                  {...register('productSpecifications')}
                />
              </Field>
              <Field error={fieldError('destination')} label="Destination Country / Port *">
                <input
                  id="destination"
                  className={inputClass}
                  {...ariaError('destination')}
                  {...register('destination')}
                />
              </Field>
              <Field error={fieldError('timeline')} label="Target Timeline *">
                <input
                  id="timeline"
                  placeholder="For example, within 3 months"
                  className={inputClass}
                  {...ariaError('timeline')}
                  {...register('timeline')}
                />
              </Field>
              <Field label="Preferred Incoterm (optional)">
                <select
                  id="incoterm"
                  className={inputClass}
                  {...register('incoterm')}
                >
                  {incoterms.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </Field>
              <Field error={fileError || null} label="Upload RFQ / Specification (optional)">
                <span className="rounded-2xl border border-dashed border-[color:var(--gold-soft)] bg-[color:var(--cream)] p-4">
                  <input
                    ref={fileRef}
                    id="rfqFile"
                    type="file"
                    accept=".pdf,.docx,.xlsx,.png,.jpg,.jpeg"
                    className="block w-full cursor-pointer text-sm file:mr-4 file:rounded-full file:border-0 file:bg-[color:var(--gold)] file:px-4 file:py-2 file:font-semibold file:text-white"
                    onChange={(event) =>
                      selectFile(event.target.files?.[0] ?? null)
                    }
                  />
                  <span className="mt-2 block text-xs font-normal text-[color:var(--muted)]">
                    PDF, DOCX, XLSX, PNG or JPG · Maximum 10 MB
                  </span>
                </span>
              </Field>
              <Field className="md:col-span-2" label="Additional Notes (optional)">
                <textarea
                  id="additionalNotes"
                  className={`${inputClass} min-h-28 resize-y`}
                  {...register('additionalNotes')}
                />
              </Field>
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
                  I agree that Biswas Exports may store and use the information
                  provided to review this enquiry and respond to me by email,
                  phone or WhatsApp.{' '}
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

            {submissionError && (
              <div
                ref={statusRef}
                role="alert"
                aria-live="assertive"
                tabIndex={-1}
                className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-800 outline-none"
              >
                {submissionError}
              </div>
            )}

            <button
              disabled={submitting}
              className="button-primary justify-self-start px-8 disabled:cursor-not-allowed disabled:opacity-60"
              type="submit"
            >
              {submitting ? 'Saving enquiry...' : 'Submit business enquiry'}
            </button>
          </form>
        )}
      </section>
    </>
  );
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
      <div>
        <b className="text-sm">{title}</b>
        <div className="mt-0.5 text-sm text-[color:var(--muted)]">
          {children}
        </div>
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

function Field({
  label,
  error,
  className = '',
  children,
}: {
  label: string;
  error?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`${labelClass} ${className}`}>
      {label}
      {children}
      {error}
    </label>
  );
}
