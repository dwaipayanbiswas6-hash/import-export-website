'use client';

import { Clock3, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { PageHero } from '@/components/ui';
import {
  contactSchema,
  incoterms,
  productCategories,
  type ContactFormData,
} from '@/lib/contact';

type SubmissionState = 'idle' | 'submitting' | 'success' | 'error';

const inputClass =
  'rounded-xl border border-[color:var(--line)] bg-white p-4 font-normal outline-none transition focus:border-[color:var(--gold)] focus:ring-2 focus:ring-[color:var(--gold-soft)]';

function contactValue(value: string | undefined) {
  return value?.trim() || null;
}

export default function Contact() {
  const [submissionState, setSubmissionState] =
    useState<SubmissionState>('idle');
  const statusRef = useRef<HTMLDivElement>(null);
  const contactEmail = contactValue(process.env.NEXT_PUBLIC_CONTACT_EMAIL);
  const contactPhone = contactValue(process.env.NEXT_PUBLIC_CONTACT_PHONE);
  const whatsapp = contactValue(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER);
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
      incoterm: 'Not decided',
      privacyConsent: false,
    },
  });

  useEffect(() => {
    if (submissionState === 'success' || submissionState === 'error') {
      statusRef.current?.focus();
    }
  }, [submissionState]);

  async function onSubmit(data: ContactFormData) {
    const validation = contactSchema.safeParse(data);
    if (!validation.success) {
      validation.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof ContactFormData;
        setError(field, { message: issue.message });
      });
      return;
    }
    setSubmissionState('submitting');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validation.data),
      });
      if (!response.ok) throw new Error('Submission failed');
      setSubmissionState('success');
    } catch {
      setSubmissionState('error');
    }
  }

  function submitAnother() {
    reset();
    setSubmissionState('idle');
  }

  const errorFor = (name: keyof ContactFormData) => errors[name]?.message;

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us what you need to source from India."
        intro="Share the product, specifications, quantity, and destination. Biswas Exports will review your requirement and respond with the next steps."
      />
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[.7fr_1.3fr] lg:px-8">
        <aside>
          <h2 className="text-3xl font-semibold">Connect with us</h2>
          <p className="mt-5 leading-7 text-[color:var(--muted)]">
            Send a detailed requirement or use one of the direct contact options
            below.
          </p>
          <div className="mt-8 grid gap-4">
            <div className="flex gap-3">
              <MapPin className="shrink-0 text-[color:var(--gold)]" />
              <div>
                <b>Location</b>
                <p className="text-[color:var(--muted)]">
                  Asansol, West Bengal, India
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Mail className="shrink-0 text-[color:var(--gold)]" />
              <div>
                <b>Email</b>
                <p>
                  {contactEmail ? (
                    <a
                      className="text-[color:var(--gold-dark)] underline-offset-4 hover:underline"
                      href={`mailto:${contactEmail}`}
                    >
                      {contactEmail}
                    </a>
                  ) : (
                    <span className="text-[color:var(--muted)]">
                      Contact details coming soon
                    </span>
                  )}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Phone className="shrink-0 text-[color:var(--gold)]" />
              <div>
                <b>Phone</b>
                <p>
                  {contactPhone ? (
                    <a
                      className="text-[color:var(--gold-dark)] underline-offset-4 hover:underline"
                      href={`tel:${contactPhone}`}
                    >
                      {contactPhone}
                    </a>
                  ) : (
                    <span className="text-[color:var(--muted)]">
                      Contact details coming soon
                    </span>
                  )}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <MessageCircle className="shrink-0 text-[color:var(--gold)]" />
              <div>
                <b>WhatsApp</b>
                <p>
                  {whatsappHref ? (
                    <a
                      className="text-[color:var(--gold-dark)] underline-offset-4 hover:underline"
                      href={whatsappHref}
                      rel="noreferrer"
                      target="_blank"
                    >
                      Message on WhatsApp
                    </a>
                  ) : (
                    <span className="text-[color:var(--muted)]">
                      Contact details coming soon
                    </span>
                  )}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Clock3 className="shrink-0 text-[color:var(--gold)]" />
              <div>
                <b>Working hours</b>
                <p className="text-[color:var(--muted)]">
                  Monday to Saturday, 10:00 AM to 7:00 PM IST
                </p>
                <p className="mt-1 text-sm text-[color:var(--muted)]">
                  Typical response within one business day
                </p>
              </div>
            </div>
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
            <p className="mt-4 leading-7 text-[color:var(--muted)]">
              Your requirement has been submitted successfully. We will review
              the details and respond with the next steps.
            </p>
            <button
              className="button-primary mt-7"
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
            className="grid gap-5 rounded-[2rem] border border-[color:var(--line)] bg-white p-7 shadow-xl md:grid-cols-2 md:p-10"
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
            <label className="grid gap-2 font-semibold" htmlFor="fullName">
              Full name
              <input
                id="fullName"
                autoComplete="name"
                className={inputClass}
                aria-invalid={!!errors.fullName}
                aria-describedby={
                  errors.fullName ? 'fullName-error' : undefined
                }
                {...register('fullName')}
              />
              {errorFor('fullName') && (
                <span id="fullName-error" className="text-sm text-red-700">
                  {errorFor('fullName')}
                </span>
              )}
            </label>
            <label className="grid gap-2 font-semibold" htmlFor="businessEmail">
              Business email
              <input
                id="businessEmail"
                type="email"
                autoComplete="email"
                className={inputClass}
                aria-invalid={!!errors.businessEmail}
                aria-describedby={
                  errors.businessEmail ? 'businessEmail-error' : undefined
                }
                {...register('businessEmail')}
              />
              {errorFor('businessEmail') && (
                <span id="businessEmail-error" className="text-sm text-red-700">
                  {errorFor('businessEmail')}
                </span>
              )}
            </label>
            <label className="grid gap-2 font-semibold" htmlFor="country">
              Country
              <input
                id="country"
                autoComplete="country-name"
                className={inputClass}
                aria-invalid={!!errors.country}
                aria-describedby={errors.country ? 'country-error' : undefined}
                {...register('country')}
              />
              {errorFor('country') && (
                <span id="country-error" className="text-sm text-red-700">
                  {errorFor('country')}
                </span>
              )}
            </label>
            <label className="grid gap-2 font-semibold" htmlFor="phone">
              Phone or WhatsApp number
              <input
                id="phone"
                type="tel"
                autoComplete="tel"
                className={inputClass}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
                {...register('phone')}
              />
              {errorFor('phone') && (
                <span id="phone-error" className="text-sm text-red-700">
                  {errorFor('phone')}
                </span>
              )}
            </label>
            <label className="grid gap-2 font-semibold" htmlFor="companyName">
              Company name{' '}
              <span className="text-sm font-normal text-[color:var(--muted)]">
                (optional)
              </span>
              <input
                id="companyName"
                autoComplete="organization"
                className={inputClass}
                {...register('companyName')}
              />
            </label>
            <label
              className="grid gap-2 font-semibold"
              htmlFor="productCategory"
            >
              Product category
              <select
                id="productCategory"
                defaultValue=""
                className={inputClass}
                aria-invalid={!!errors.productCategory}
                aria-describedby={
                  errors.productCategory ? 'productCategory-error' : undefined
                }
                {...register('productCategory')}
              >
                <option value="" disabled>
                  Select a category
                </option>
                {productCategories.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>
              {errorFor('productCategory') && (
                <span
                  id="productCategory-error"
                  className="text-sm text-red-700"
                >
                  {errorFor('productCategory')}
                </span>
              )}
            </label>
            <label
              className="grid gap-2 font-semibold md:col-span-2"
              htmlFor="productRequirement"
            >
              Product requirement
              <textarea
                id="productRequirement"
                className={`${inputClass} min-h-32`}
                aria-invalid={!!errors.productRequirement}
                aria-describedby={
                  errors.productRequirement
                    ? 'productRequirement-error'
                    : undefined
                }
                {...register('productRequirement')}
              />
              {errorFor('productRequirement') && (
                <span
                  id="productRequirement-error"
                  className="text-sm text-red-700"
                >
                  {errorFor('productRequirement')}
                </span>
              )}
            </label>
            <label
              className="grid gap-2 font-semibold md:col-span-2"
              htmlFor="productSpecifications"
            >
              Product specifications{' '}
              <span className="text-sm font-normal text-[color:var(--muted)]">
                (optional)
              </span>
              <textarea
                id="productSpecifications"
                className={`${inputClass} min-h-28`}
                {...register('productSpecifications')}
              />
            </label>
            <label className="grid gap-2 font-semibold" htmlFor="quantity">
              Required quantity
              <input
                id="quantity"
                className={inputClass}
                aria-invalid={!!errors.quantity}
                aria-describedby={
                  errors.quantity ? 'quantity-error' : undefined
                }
                {...register('quantity')}
              />
              {errorFor('quantity') && (
                <span id="quantity-error" className="text-sm text-red-700">
                  {errorFor('quantity')}
                </span>
              )}
            </label>
            <label className="grid gap-2 font-semibold" htmlFor="destination">
              Destination country or port
              <input
                id="destination"
                className={inputClass}
                aria-invalid={!!errors.destination}
                aria-describedby={
                  errors.destination ? 'destination-error' : undefined
                }
                {...register('destination')}
              />
              {errorFor('destination') && (
                <span id="destination-error" className="text-sm text-red-700">
                  {errorFor('destination')}
                </span>
              )}
            </label>
            <label className="grid gap-2 font-semibold" htmlFor="timeline">
              Target timeline
              <input
                id="timeline"
                className={inputClass}
                placeholder="For example, within 3 months"
                aria-invalid={!!errors.timeline}
                aria-describedby={
                  errors.timeline ? 'timeline-error' : undefined
                }
                {...register('timeline')}
              />
              {errorFor('timeline') && (
                <span id="timeline-error" className="text-sm text-red-700">
                  {errorFor('timeline')}
                </span>
              )}
            </label>
            <label className="grid gap-2 font-semibold" htmlFor="incoterm">
              Preferred Incoterm{' '}
              <span className="text-sm font-normal text-[color:var(--muted)]">
                (optional)
              </span>
              <select
                id="incoterm"
                className={inputClass}
                {...register('incoterm')}
              >
                {incoterms.map((term) => (
                  <option key={term}>{term}</option>
                ))}
              </select>
            </label>
            <label
              className="grid gap-2 font-semibold md:col-span-2"
              htmlFor="additionalNotes"
            >
              Additional notes{' '}
              <span className="text-sm font-normal text-[color:var(--muted)]">
                (optional)
              </span>
              <textarea
                id="additionalNotes"
                className={`${inputClass} min-h-28`}
                {...register('additionalNotes')}
              />
            </label>
            <div className="md:col-span-2">
              <label
                className="flex items-start gap-3 font-normal"
                htmlFor="privacyConsent"
              >
                <input
                  id="privacyConsent"
                  type="checkbox"
                  className="mt-1 h-5 w-5 accent-[color:var(--gold)]"
                  aria-invalid={!!errors.privacyConsent}
                  aria-describedby={
                    errors.privacyConsent ? 'privacyConsent-error' : undefined
                  }
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
              {errorFor('privacyConsent') && (
                <span
                  id="privacyConsent-error"
                  className="mt-2 block text-sm text-red-700"
                >
                  {errorFor('privacyConsent')}
                </span>
              )}
            </div>
            {submissionState === 'error' && (
              <div
                ref={statusRef}
                role="alert"
                aria-live="assertive"
                tabIndex={-1}
                className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-800 outline-none md:col-span-2"
              >
                We could not send your enquiry right now. Please try again or
                contact us directly by email or WhatsApp.
              </div>
            )}
            <button
              disabled={submissionState === 'submitting'}
              className="button-primary justify-self-start disabled:cursor-not-allowed disabled:opacity-60 md:col-span-2"
              type="submit"
            >
              {submissionState === 'submitting'
                ? 'Sending enquiry...'
                : 'Send enquiry'}
            </button>
          </form>
        )}
      </section>
    </>
  );
}
