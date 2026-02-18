import { readdir, readFile } from 'fs/promises';
import { join } from 'path';

const DATA_BASE = join(process.cwd(), 'data');
const POSTS_DIR = join(DATA_BASE, 'posts');
const PAGES_DIR = join(DATA_BASE, 'pages');
const METADATA_DIR = join(DATA_BASE, 'metadata');

export interface Author {
  id: number;
  name: string;
  login: string;
}

export interface PostImage {
  original_url: string;
  local_path: string;
  alt_text?: string;
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  status: string;
  date_created: string;
  date_modified: string;
  author: Author;
  categories: string[];
  content: {
    raw: string;
    clean: string;
    text: string;
  };
  featured_image?: PostImage;
  images: PostImage[];
  embeds?: {
    youtube: string[];
    instagram: string[];
  };
}

export interface Page {
  id: number;
  title: string;
  slug: string;
  status: string;
  date_created: string;
  date_modified: string;
  author: Author;
  content: {
    raw: string;
    clean: string;
    text: string;
  };
  featured_image?: PostImage;
  images: PostImage[];
  embeds?: {
    youtube: string[];
    instagram: string[];
  };
}

export interface UpcomingEvent {
  id: string;
  title: string;
  date: string;
  category: string;
  description: string;
  image: string;
  featured: boolean;
}

export interface SignatureContentSection {
  heading?: string;
  text: string;
  image?: string;
  imageAlt?: string;
}

export interface SignatureItem {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  image: string;
  gallery: string[];
  contentSections?: SignatureContentSection[];
  specs: { label: string; value: string }[];
  collaborators: string;
  postSlug: string;
  order: number;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  parent: string | null;
}

export interface ImageManifest {
  [key: string]: string;
}

let postsCache: Post[] | null = null;
let pagesCache: Page[] | null = null;
let categoriesCache: Category[] | null = null;
let imageManifestCache: ImageManifest | null = null;
let upcomingEventsCache: UpcomingEvent[] | null = null;
let signaturesCache: SignatureItem[] | null = null;

async function loadJSON<T>(filePath: string): Promise<T | null> {
  try {
    const content = await readFile(filePath, 'utf-8');
    return JSON.parse(content) as T;
  } catch (error) {
    console.error(`Error loading ${filePath}:`, error);
    return null;
  }
}

export async function getAllPosts(): Promise<Post[]> {
  if (postsCache) {
    return postsCache;
  }

  try {
    const files = await readdir(POSTS_DIR);
    const jsonFiles = files.filter(f => f.endsWith('.json'));

    const posts: Post[] = [];

    for (const file of jsonFiles) {
      const filePath = join(POSTS_DIR, file);
      const post = await loadJSON<Post>(filePath);

      if (post && post.status === 'publish') {
        posts.push(post);
      }
    }

    posts.sort((a, b) =>
      new Date(b.date_created).getTime() - new Date(a.date_created).getTime()
    );

    postsCache = posts;
    return posts;
  } catch (error) {
    console.error('Error loading posts:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await getAllPosts();
  return posts.find(p => p.slug === slug) || null;
}

export async function getLatestPosts(count: number): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.slice(0, count);
}

export async function getPostsByCategory(category: string): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter(p =>
    p.categories.some(cat =>
      cat.toLowerCase() === category.toLowerCase()
    )
  );
}

export async function getAllPages(): Promise<Page[]> {
  if (pagesCache) {
    return pagesCache;
  }

  try {
    const files = await readdir(PAGES_DIR);
    const jsonFiles = files.filter(f => f.endsWith('.json'));

    const pages: Page[] = [];

    for (const file of jsonFiles) {
      const filePath = join(PAGES_DIR, file);
      const page = await loadJSON<Page>(filePath);

      if (page && page.status === 'publish') {
        pages.push(page);
      }
    }

    pagesCache = pages;
    return pages;
  } catch (error) {
    console.error('Error loading pages:', error);
    return [];
  }
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  const pages = await getAllPages();
  return pages.find(p => p.slug === slug) || null;
}

async function getImageManifest(): Promise<ImageManifest> {
  if (imageManifestCache) {
    return imageManifestCache;
  }

  const manifestPath = join(METADATA_DIR, 'image-manifest.json');
  const manifest = await loadJSON<ImageManifest>(manifestPath);

  imageManifestCache = manifest || {};
  return imageManifestCache;
}

export async function getImagePath(originalUrl: string): Promise<string> {
  const manifest = await getImageManifest();

  const localPath = manifest[originalUrl];

  if (localPath) {
    return `/${localPath}`;
  }

  return originalUrl;
}

export async function getCategories(): Promise<Category[]> {
  if (categoriesCache) {
    return categoriesCache;
  }

  const categoriesPath = join(METADATA_DIR, 'categories.json');
  const data = await loadJSON<{ categories: Category[] }>(categoriesPath);

  if (data && data.categories) {
    categoriesCache = data.categories;
    return data.categories;
  }

  return [];
}

export async function getAuthors(): Promise<Author[]> {
  const authorsPath = join(METADATA_DIR, 'authors.json');
  const data = await loadJSON<{ authors: Author[] }>(authorsPath);

  return data?.authors || [];
}

export async function getUpcomingEvents(): Promise<UpcomingEvent[]> {
  if (upcomingEventsCache) {
    return upcomingEventsCache;
  }

  const filePath = join(DATA_BASE, 'upcoming-events.json');
  const events = await loadJSON<UpcomingEvent[]>(filePath);

  if (!events) {
    return [];
  }

  const now = new Date();
  const upcoming = events
    .filter(e => new Date(e.date) > now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  upcomingEventsCache = upcoming;
  return upcoming;
}

export async function getUpcomingEventById(id: string): Promise<UpcomingEvent | null> {
  const events = await getUpcomingEvents();
  return events.find(e => e.id === id) || null;
}

export async function getAllUpcomingEventIds(): Promise<string[]> {
  const events = await getUpcomingEvents();
  return events.map(e => e.id);
}

export async function getSignatures(): Promise<SignatureItem[]> {
  if (signaturesCache) return signaturesCache;
  const filePath = join(DATA_BASE, 'signatures.json');
  const items = await loadJSON<SignatureItem[]>(filePath);
  signaturesCache = (items || []).sort((a, b) => a.order - b.order);
  return signaturesCache;
}

export function clearCache(): void {
  postsCache = null;
  pagesCache = null;
  categoriesCache = null;
  imageManifestCache = null;
  upcomingEventsCache = null;
  signaturesCache = null;
}
