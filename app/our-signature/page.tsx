import type { Metadata } from 'next';
import { getSignatures } from '@/lib/content';
import OurSignatureClient from './OurSignatureClient';

export const metadata: Metadata = {
  title: 'Our Signature | Club Mareva Beirut',
  description:
    'Discover the exclusive signature cigars of Club Mareva Beirut — the Origins and the Odyssey, crafted in collaboration with Casdagli Cigars.',
  openGraph: {
    title: 'Our Signature | Club Mareva Beirut',
    description:
      'Discover the exclusive signature cigars of Club Mareva Beirut.',
  },
};

export default async function OurSignaturePage() {
  const signatures = await getSignatures();
  return <OurSignatureClient items={signatures} />;
}
