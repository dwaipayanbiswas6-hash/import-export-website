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

type SubmissionState = 'idle' | 'submitting' | 'success' | 'error';
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

function configured(value: string | undefined) {
  return value?.trim() || null;
}

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
  const [rfqFile, setRfqFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState('');
  const statusRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const contactEmail = configured(process.env.NEXT_PUBLIC_CONTACT_EMAIL);
  const contactPhone = configured(process.env.NEXT_PUBLIC_CONTACT_PHONE);
  const whatsapp = configured(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER);
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
      productCategory: selectedProduct
        ? contactCategory(selectedProduct.category)
        : undefined,
      productRequirement: selectedProduct
        ? `I would like to request a quotation for ${selectedProduct.name}. Please share available specifications, packaging options, MOQ, lead time, documentation, and commercial terms.`
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
      if (!response.ok) throw new Error('Submission failed');
      setSubmissionState('success');
    } catch {
      setSubmissionState('error');
    }
  }

  function submitAnother() {
    reset();
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
        eyebrow="CONTACT"
        title="Tell us what you need to source from India."
        intro="Share your sourcing requirement, product specifications, quantity, destination and timeline. Biswas Exports will review your enquiry and respond with the next steps."
      />
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[.7fr_1.3fr] lg:px-8 lg:py-24">
        <aside className="self-start lg:sticky lg:top-28">
          <p className="eyebrow">Business enquiries</p>
          <h2 className="text-3xl font-semibold">
            Connect with Biswas Exports
          </h2>
          <p className="mt-5 leading-7 text-[color:var(--muted)]">
            Professional sourcing assistance from India for serious
            international buying requirements.
          </p>
          <div className="mt-9 grid gap-5 rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--cream)] p-6 shadow-sm">
            <ContactItem icon={MapPin} title="Location">
              <span>Asansol, West Bengal, India</span>
            </ContactItem>
            <ContactItem icon={Mail} title="Email">
              {contactEmail ? (
                <a className="contact-link" href={`mailto:${contactEmail}`}>
                  {contactEmail}
                </a>
              ) : (
                <span>Contact details coming soon</span>
              )}
            </ContactItem>
            <ContactItem icon={Phone} title="Phone">
              {contactPhone ? (
                <a className="contact-link" href={`tel:${contactPhone}`}>
                  {contactPhone}
                </a>
              ) : (
                <span>Contact details coming soon</span>
              )}
            </ContactItem>
            <ContactItem icon={MessageCircle} title="WhatsApp">
              {whatsappHref ? (
                <a
                  className="contact-link"
                  href={whatsappHref}
                  rel="noreferrer"
                  target="_blank"
                >
                  Message on WhatsApp
                </a>
              ) : (
                <span>Contact details coming soon</span>
              )}
            </ContactItem>
            <ContactItem icon={Clock3} title="Typical response">
              <span>Within one business day.</span>
            </ContactItem>
            <ContactItem icon={BriefcaseBusiness} title="Enquiry policy">
              <span>Business enquiries only.</span>
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
            <p className="eyebrow">Enquiry Submitted Successfully</p>
            <h2 className="text-3xl font-semibold">
              Thank you for contacting Biswas Exports.
            </h2>
            <p className="mt-5 leading-7 text-[color:var(--muted)]">
              Our export team will review your enquiry and respond after
              verifying the business details provided.
            </p>
            <div className="mt-7 border-l-2 border-[color:var(--gold)] pl-4">
              <b>Typical response time:</b>
              <p className="text-[color:var(--muted)]">One business day.</p>
            </div>
            <button
              className="button-primary mt-8"
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
            className="grid gap-8 rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--card)] p-7 shadow-xl md:p-10"
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
              intro="Tell us who we will be working with."
            >
              <label
                className={`${labelClass} md:col-span-2`}
                htmlFor="companyName"
              >
                Company / Business Name *
                <input
                  id="companyName"
                  autoComplete="organization"
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
                  defaultValue=""
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
                  className={`${inputClass} min-h-28 resize-y`}
                  {...register('productSpecifications')}
                />
              </label>
              <label className={labelClass} htmlFor="destination">
                Destination Country / Port *
                <input
                  id="destination"
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
                    aria-describedby="rfqFile-help rfqFile-error"
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
                  className={`${inputClass} min-h-28 resize-y`}
                  {...register('additionalNotes')}
                />
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
                  to respond to this enquiry.{' '}
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
                We could not send your enquiry right now. Please try again or
                contact us directly by email or WhatsApp.
              </div>
            )}
            <button
              disabled={submissionState === 'submitting'}
              className="button-primary justify-self-start px-8 transition duration-300 hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-60"
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
  if (category === 'Food & Agriculture') return 'Agricultural Products';
  if (category === 'Textiles & Fashion') return 'Textiles & Apparel';
  if (
    category === 'Engineering & Industrial' ||
    category === 'Electrical & Energy'
  )
    return 'Industrial Goods';
  if (category === 'Home & Lifestyle') return 'Handicrafts & Home Décor';
  if (category === 'Processed Vegetarian Food' || category === 'Packaging')
    return 'Consumer Products';
  return 'Custom Sourcing';
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
        <p className="mt-0.5 text-sm text-[color:var(--muted)]">{children}</p>
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
