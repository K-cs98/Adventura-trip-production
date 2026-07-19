'use client';
import { useState } from 'react';
import CrudManager from '@/components/admin/CrudManager';
import BookingsViewer from '@/components/admin/BookingsViewer';
import QuoteRequestsViewer from '@/components/admin/QuoteRequestsViewer';
import EnquiriesViewer from '@/components/admin/EnquiriesViewer';

const TABS = ['Bookings', 'Tours', 'Hotels', 'Flights', 'Blog', 'Media', 'Reviews', 'Quotes', 'Inbox'] as const;

export default function AdminDashboardPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]>('Bookings');

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Dashboard</h1>

      <div className="flex flex-wrap gap-2 mb-8">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`text-sm font-semibold px-4 py-2 rounded-lg transition-colors ${
              tab === t ? 'bg-slate-900 text-white' : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'Bookings' && <BookingsViewer />}
      {tab === 'Quotes' && <QuoteRequestsViewer />}
      {tab === 'Inbox' && <EnquiriesViewer />}

      {tab === 'Tours' && (
        <CrudManager
          table="tours"
          title="Tours"
          defaultValues={{ title: '', location: '', duration: '', price_usd: '', img: '', tag: 'Featured', slots: 5, highlights: '', perk_preview: '', is_published: true }}
          fields={[
            { key: 'title', label: 'Title' },
            { key: 'location', label: 'Location' },
            { key: 'duration', label: 'Duration (e.g. 6 Days)' },
            { key: 'price_usd', label: 'Price (USD)', type: 'number' },
            { key: 'img', label: 'Image URL' },
            { key: 'tag', label: 'Tag (e.g. Trending)' },
            { key: 'slots', label: 'Slots remaining', type: 'number' },
            { key: 'highlights', label: 'Highlights (comma-separated)', type: 'tags' },
            { key: 'perk_preview', label: 'Perk description', type: 'textarea' }
          ]}
        />
      )}

      {tab === 'Hotels' && (
        <CrudManager
          table="hotels"
          title="Hotels"
          defaultValues={{ property: '', location: '', base_cost_usd: '', markup_percent: 10, img: '', is_published: true }}
          fields={[
            { key: 'property', label: 'Property name' },
            { key: 'location', label: 'Location' },
            { key: 'base_cost_usd', label: 'Base cost/night (USD)', type: 'number' },
            { key: 'markup_percent', label: 'Markup %', type: 'number' },
            { key: 'img', label: 'Image URL' }
          ]}
        />
      )}

      {tab === 'Flights' && (
        <CrudManager
          table="flights"
          title="Flights"
          defaultValues={{ carrier: '', route: '', base_cost_usd: '', markup_percent: 10, is_published: true }}
          fields={[
            { key: 'carrier', label: 'Carrier' },
            { key: 'route', label: 'Route (e.g. LOS → LHR)' },
            { key: 'base_cost_usd', label: 'Base cost (USD)', type: 'number' },
            { key: 'markup_percent', label: 'Markup %', type: 'number' }
          ]}
        />
      )}

      {tab === 'Blog' && (
        <CrudManager
          table="blog_posts"
          title="Blog Posts"
          defaultValues={{ title: '', slug: '', excerpt: '', content: '', category: 'Travel Tips', author: 'Adventura Editorial', read_time: '4 min read', img: '', is_published: true }}
          fields={[
            { key: 'title', label: 'Title' },
            { key: 'slug', label: 'Slug (e.g. best-time-to-visit-bali)' },
            { key: 'excerpt', label: 'Excerpt', type: 'textarea' },
            { key: 'content', label: 'Full content', type: 'textarea' },
            { key: 'category', label: 'Category' },
            { key: 'author', label: 'Author' },
            { key: 'read_time', label: 'Read time' },
            { key: 'img', label: 'Image URL' }
          ]}
        />
      )}

      {tab === 'Media' && (
        <CrudManager
          table="media_gallery"
          title="Media"
          defaultValues={{ type: 'image', title: '', location: '', src: '', thumbnail: '' }}
          fields={[
            { key: 'title', label: 'Title' },
            { key: 'location', label: 'Location' },
            { key: 'type', label: "Type ('image' or 'video')" },
            { key: 'src', label: 'Full media URL' },
            { key: 'thumbnail', label: 'Thumbnail URL' }
          ]}
        />
      )}

      {tab === 'Reviews' && (
        <CrudManager
          table="customer_reviews"
          title="Reviews"
          defaultValues={{ name: '', role: '', comment: '', rating: 5, is_published: true }}
          fields={[
            { key: 'name', label: 'Customer name' },
            { key: 'role', label: 'Role / context' },
            { key: 'comment', label: 'Comment', type: 'textarea' },
            { key: 'rating', label: 'Rating (1-5)', type: 'number' }
          ]}
        />
      )}
    </div>
  );
}
