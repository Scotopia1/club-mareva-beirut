import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getUpcomingEventById, getUpcomingEvents, getAllUpcomingEventIds } from '@/lib/content';
import UpcomingEventDetail from './UpcomingEventDetail';

export async function generateStaticParams() {
  const ids = await getAllUpcomingEventIds();
  return ids.map(id => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const event = await getUpcomingEventById(id);

  if (!event) {
    return { title: 'Event Not Found | Club Mareva Beirut' };
  }

  const displayDate = new Date(event.date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return {
    title: `${event.title} | Club Mareva Beirut`,
    description: `${event.description} — ${displayDate}`,
    openGraph: {
      title: event.title,
      description: event.description,
      ...(event.image ? { images: [{ url: event.image }] } : {}),
    },
  };
}

export default async function UpcomingEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await getUpcomingEventById(id);

  if (!event) {
    return notFound();
  }

  const allUpcoming = await getUpcomingEvents();
  const otherEvents = allUpcoming
    .filter(e => e.id !== id)
    .slice(0, 3)
    .map(e => ({
      id: e.id,
      title: e.title,
      category: e.category,
      image: e.image,
      month: new Date(e.date).toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
      day: new Date(e.date).getDate().toString(),
      displayDate: new Date(e.date).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      }),
    }));

  const eventData = {
    id: event.id,
    title: event.title,
    category: event.category,
    description: event.description,
    image: event.image,
    month: new Date(event.date).toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
    day: new Date(event.date).getDate().toString(),
    displayDate: new Date(event.date).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    }),
    time: new Date(event.date).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }),
  };

  return <UpcomingEventDetail event={eventData} otherEvents={otherEvents} />;
}
