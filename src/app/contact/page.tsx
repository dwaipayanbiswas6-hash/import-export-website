'use client';
import { Mail, MapPin } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { PageHero } from '@/components/ui';
import { company } from '@/lib/data';
const schema = z.object({
  name: z.string().min(2, 'Please enter your name.'),
  email: z.string().email('Please enter a valid email.'),
  company: z.string().optional(),
  message: z.string().min(10, 'Please provide a little more detail.'),
});
type FormData = z.infer<typeof schema>;
export default function Contact() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>();
  function onSubmit(data: FormData) {
    const result = schema.safeParse(data);
    if (!result.success) {
      result.error.issues.forEach((issue) =>
        setError(issue.path[0] as keyof FormData, { message: issue.message }),
      );
      return;
    }
    setSent(true);
  }
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Begin an export conversation."
        intro="Share your product requirement and our team will review the details for a focused response."
      />
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[.7fr_1.3fr] lg:px-8">
        <div>
          <h2 className="text-3xl font-semibold">Connect with us</h2>
          <p className="mt-5 leading-7 text-[color:var(--muted)]">
            Include your required product, specification, quantity, destination,
            and preferred timeline where possible.
          </p>
          <div className="mt-8 flex gap-3">
            <MapPin className="text-[color:var(--gold)]" />
            <span>{company.address}</span>
          </div>
          <div className="mt-4 flex gap-3">
            <Mail className="text-[color:var(--gold)]" />
            <a href={`mailto:${company.email}`}>{company.email}</a>
          </div>
        </div>
        {sent ? (
          <div className="premium-card">
            <p className="eyebrow">Enquiry received</p>
            <h2 className="text-3xl font-semibold">
              Thank you for reaching out.
            </h2>
            <p className="mt-4 text-[color:var(--muted)]">
              Your details are ready for review. We appreciate the opportunity
              to learn about your requirement.
            </p>
          </div>
        ) : (
          <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className="grid gap-5 rounded-[2rem] border border-[color:var(--line)] bg-white p-7 shadow-xl md:p-10"
          >
            <label className="grid gap-2 font-semibold">
              Name
              <input
                className="rounded-xl border border-[color:var(--line)] p-4 font-normal"
                {...register('name')}
              />
              {errors.name && (
                <span className="text-sm text-red-700">
                  {errors.name.message}
                </span>
              )}
            </label>
            <label className="grid gap-2 font-semibold">
              Email
              <input
                className="rounded-xl border border-[color:var(--line)] p-4 font-normal"
                type="email"
                {...register('email')}
              />
              {errors.email && (
                <span className="text-sm text-red-700">
                  {errors.email.message}
                </span>
              )}
            </label>
            <label className="grid gap-2 font-semibold">
              Company{' '}
              <span className="text-sm font-normal text-[color:var(--muted)]">
                (optional)
              </span>
              <input
                className="rounded-xl border border-[color:var(--line)] p-4 font-normal"
                {...register('company')}
              />
            </label>
            <label className="grid gap-2 font-semibold">
              Requirement
              <textarea
                className="min-h-40 rounded-xl border border-[color:var(--line)] p-4 font-normal"
                placeholder="Product, specification, quantity, destination, and timeline"
                {...register('message')}
              />
              {errors.message && (
                <span className="text-sm text-red-700">
                  {errors.message.message}
                </span>
              )}
            </label>
            <button className="button-primary justify-self-start" type="submit">
              Send enquiry
            </button>
          </form>
        )}
      </section>
    </>
  );
}
