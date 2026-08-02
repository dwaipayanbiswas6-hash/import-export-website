import { publicBusiness } from '@/lib/site';

export function BusinessDisclosure() {
  if (!publicBusiness.legalName && !publicBusiness.registrationLine) return null;

  return (
    <div className="border-t border-[color:var(--line)] bg-[color:var(--cream)] px-5 py-4 text-center text-xs leading-5 text-[color:var(--muted)] sm:px-6">
      {publicBusiness.legalName && <span>{publicBusiness.legalName}</span>}
      {publicBusiness.legalName && publicBusiness.registrationLine && (
        <span aria-hidden="true"> · </span>
      )}
      {publicBusiness.registrationLine && (
        <span>{publicBusiness.registrationLine}</span>
      )}
    </div>
  );
}
