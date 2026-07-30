'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Building2, Mail, MapPin, Phone } from 'lucide-react';
import { PageHero, Reveal } from '@/components/ui';
import { siteConfig } from '@/lib/data';

const enquirySchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.'),
  company: z.string().trim().min(2, 'Please enter your company name.'),
  email: z.string().trim().email('Please enter a valid business email.'),
  phone: z.string().trim().optional(),
  product: z.string().trim().min(2, 'Please tell us which product you need.'),
  quantity: z.string().trim().optional(),
  destination: z
    .string()
    .trim()
    .min(2, 'Please enter the destination country.'),
  message: z
    .string()
    .trim()
    .min(20, 'Please share at least 20 characters about your requirement.'),
});

type EnquiryData = z.infer<typeof enquirySchema>;

export default function ContactPage() {
  const [status, setStatus] = useState('');
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<EnquiryData>();

  function submitEnquiry(data: EnquiryData) {
    setStatus('');
    const parsed = enquirySchema.safeParse(data);
    if (!parsed.success) {
      parsed.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof EnquiryData;
        setError(field, { message: issue.message });
      });
      return;
    }

    const subject = encodeURIComponent(
      `Export enquiry from ${parsed.data.company}`,
    );
    const body = encodeURIComponent(
      [
        `Name: ${parsed.data.name}`,
        `Company: ${parsed.data.company}`,
        `Email: ${parsed.data.email}`,
        `Phone: ${parsed.data.phone || 'Not provided'}`,
        `Product: ${parsed.data.product}`,
        `Quantity: ${parsed.data.quantity || 'Not provided'}`,
        `Destination: ${parsed.data.destination}`,
        '',
        parsed.data.message,
      ].join('\n'),
    );
    setStatus(
      'Your email application is opening with the enquiry details. Please send the prepared message to complete your enquiry.',
    );
    window.location.href = `${siteConfig.emailHref}?subject=${subject}&body=${body}`;
  }

  const fields = [
    {
      name: 'name',
      label: 'Your name',
      placeholder: 'Full name',
      required: true,
    },
    {
      name: 'company',
      label: 'Company name',
      placeholder: 'Business or organization',
      required: true,
    },
    {
      name: 'email',
      label: 'Business email',
      placeholder: 'name@company.com',
      required: true,
      type: 'email',
    },
    {
      name: 'phone',
      label: 'Phone / WhatsApp',
      placeholder: 'Include country code',
    },
    {
      name: 'product',
      label: 'Product required',
      placeholder: 'Product name or category',
      required: true,
    },
    { name: 'quantity', label: 'Estimated quantity', placeholder: 'Optional' },
    {
      name: 'destination',
      label: 'Destination country',
      placeholder: 'Country',
      required: true,
    },
  ] as const;

  return (
    <>
      <PageHero
        description="Tell us what you are looking for. Clear product details help us assess suitable sourcing options and respond more effectively."
        eyebrow="Contact"
        title="Let’s discuss your sourcing requirement."
      />
      <section className="bg-cream px-6 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.75fr_1.25fr]">
          <Reveal>
            <p className="eyebrow">Direct Contact</p>
            <h2 className="mt-4 font-display text-4xl font-semibold text-navy">
              We welcome genuine B2B enquiries.
            </h2>
            <p className="mt-5 leading-7 text-slate-600">
              Reach Biswas Exports directly or use the enquiry form. We aim to
              respond with clear next steps and realistic information.
            </p>
            <div className="mt-9 grid gap-4">
              <a
                className="soft-card flex items-start gap-4 p-5 hover:border-gold"
                href={siteConfig.phoneHref}
              >
                <Phone className="mt-1 text-gold" size={22} />
                <span>
                  <b className="block text-sm text-navy">Phone / WhatsApp</b>
                  <span className="mt-1 block text-sm text-slate-600">
                    {siteConfig.phone}
                  </span>
                </span>
              </a>
              <a
                className="soft-card flex items-start gap-4 p-5 hover:border-gold"
                href={siteConfig.emailHref}
              >
                <Mail className="mt-1 text-gold" size={22} />
                <span className="min-w-0">
                  <b className="block text-sm text-navy">Email</b>
                  <span className="mt-1 block break-all text-sm text-slate-600">
                    {siteConfig.email}
                  </span>
                </span>
              </a>
              <div className="soft-card flex items-start gap-4 p-5">
                <MapPin className="mt-1 text-gold" size={22} />
                <span>
                  <b className="block text-sm text-navy">Head Office</b>
                  <span className="mt-1 block text-sm text-slate-600">
                    {siteConfig.location}
                  </span>
                </span>
              </div>
              <div className="soft-card flex items-start gap-4 p-5">
                <Building2 className="mt-1 text-gold" size={22} />
                <span>
                  <b className="block text-sm text-navy">Business Type</b>
                  <span className="mt-1 block text-sm text-slate-600">
                    {siteConfig.businessType}
                  </span>
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal className="soft-card p-7 md:p-10">
            <form noValidate onSubmit={handleSubmit(submitEnquiry)}>
              <div className="grid gap-6 md:grid-cols-2">
                {fields.map((field) => {
                  const error = errors[field.name];
                  return (
                    <div
                      className={
                        field.name === 'destination' ? 'md:col-span-2' : ''
                      }
                      key={field.name}
                    >
                      <label
                        className="text-sm font-bold text-navy"
                        htmlFor={field.name}
                      >
                        {field.label}
                        {'required' in field && field.required ? (
                          <span className="text-gold"> *</span>
                        ) : null}
                      </label>
                      <input
                        aria-describedby={
                          error ? `${field.name}-error` : undefined
                        }
                        aria-invalid={Boolean(error)}
                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-navy placeholder:text-slate-400 focus:border-gold focus:outline-none"
                        id={field.name}
                        placeholder={field.placeholder}
                        type={'type' in field ? field.type : 'text'}
                        {...register(field.name)}
                      />
                      {error ? (
                        <p
                          className="mt-2 text-sm text-red-700"
                          id={`${field.name}-error`}
                        >
                          {error.message}
                        </p>
                      ) : null}
                    </div>
                  );
                })}
                <div className="md:col-span-2">
                  <label
                    className="text-sm font-bold text-navy"
                    htmlFor="message"
                  >
                    Requirement details <span className="text-gold">*</span>
                  </label>
                  <textarea
                    aria-describedby={
                      errors.message ? 'message-error' : undefined
                    }
                    aria-invalid={Boolean(errors.message)}
                    className="mt-2 min-h-40 w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-navy placeholder:text-slate-400 focus:border-gold focus:outline-none"
                    id="message"
                    placeholder="Please include specifications, packaging, timeline and any other important details."
                    {...register('message')}
                  />
                  {errors.message ? (
                    <p className="mt-2 text-sm text-red-700" id="message-error">
                      {errors.message.message}
                    </p>
                  ) : null}
                </div>
              </div>
              <button
                className="button-primary mt-7 w-full justify-center md:w-auto"
                type="submit"
              >
                Prepare email enquiry
              </button>
              <p
                aria-live="polite"
                className="mt-4 text-sm leading-6 text-slate-600"
              >
                {status}
              </p>
              <p className="mt-2 text-xs leading-5 text-slate-500">
                This Phase 1 form opens your email application. No information
                is stored on this website.
              </p>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
