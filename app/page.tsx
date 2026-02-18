import { getLatestPosts, getUpcomingEvents } from "@/lib/content";
import Hero from "@/components/sections/Hero";
import Introduction from "@/components/sections/Introduction";
import BrandShowcase from "@/components/sections/BrandShowcase";
import EventsCarousel from "@/components/sections/EventsCarousel";
import Story from "@/components/sections/Story";
import Amenities from "@/components/sections/Amenities";
import CTASection from "@/components/sections/CTASection";

export default async function Home() {
  const [posts, upcomingEvents] = await Promise.all([
    getLatestPosts(6),
    getUpcomingEvents(),
  ]);

  // Map upcoming events (shown first)
  const upcomingItems = upcomingEvents.map(event => ({
    id: event.id,
    title: event.title,
    date: new Date(event.date).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    }),
    category: event.category,
    image: event.image,
    slug: '',
    type: 'upcoming' as const,
  }));

  // Map past posts
  const postItems = posts.map(post => ({
    id: post.id,
    title: post.title,
    date: new Date(post.date_created).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    category: post.categories[0] || 'Events',
    image: post.featured_image?.local_path
      ? `/${post.featured_image.local_path}`
      : '',
    slug: post.slug,
    type: (post.categories[0] === 'News' ? 'news' : 'event') as 'news' | 'event',
  }));

  // Upcoming first, then recent posts — cap at 8 total
  const events = [...upcomingItems, ...postItems].slice(0, 8);

  return (
    <main>
      <Hero />
      <EventsCarousel events={events} />
      <BrandShowcase />
      <Introduction />
      <Story />
      <Amenities />
      <CTASection />
    </main>
  );
}
