import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import DOMPurify from 'dompurify';

const MediumIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 40 40"
    fill="currentColor"
    className={className}
  >
    <circle cx="20" cy="20" r="20" />
    <ellipse fill="#fff" cx="13.5" cy="20" rx="4.5" ry="9" />
    <ellipse fill="#fff" cx="26.5" cy="20" rx="3.5" ry="7" />
    <ellipse fill="#fff" cx="33" cy="20" rx="1.5" ry="5" />
  </svg>
);

const MEDIUM_FEED_URL =
  'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@sdooodly';

const FALLBACK_POSTS = [
  {
    title: 'How I Built My Portfolio from Scratch',
    link: '#',
    pubDate: '2024-05-20',
    description: 'A step-by-step guide to designing and coding a modern, cinematic portfolio site.',
  }
];

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.12,
      duration: 0.7,
      ease: [0.33, 1, 0.68, 1],
    },
  }),
};

// Utility to remove <img> and <figure> tags from HTML string
function stripImages(html) {
  if (!html) return '';
  return html.replace(/<figure[\s\S]*?<\/figure>/gi, '').replace(/<img[^>]*>/gi, '');
}

const H_LINES = Array.from({ length: 8 }, (_, idx) => ({
  idx,
  top: `${10 + idx * 12}%`,
  opacity: 0.13 + 0.09 * Math.abs(Math.sin(idx)),
}));

const V_LINES = Array.from({ length: 6 }, (_, idx) => ({
  idx,
  left: `${10 + idx * 15}%`,
  opacity: 0.13 + 0.09 * Math.abs(Math.cos(idx)),
}));

let postsCache = null;

const BlogSection = () => {
  const [posts, setPosts] = useState(postsCache || []);
  const [loading, setLoading] = useState(!postsCache);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (postsCache) return;
    fetch(MEDIUM_FEED_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => {
        if (data.status === 'ok' && data.items && data.items.length > 0) {
          postsCache = data.items.slice(0, 5);
          setPosts(postsCache);
        } else {
          setError('No Medium posts found. Showing featured posts.');
          setPosts(FALLBACK_POSTS);
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch Medium posts. Showing featured posts.');
        setPosts(FALLBACK_POSTS);
        setLoading(false);
      });
  }, []);

  return (
    <section id="blog" className="py-20 md:py-32 px-4 md:px-0 max-w-4xl mx-auto relative overflow-visible">
      {/* Glowy horizontal squiggly lines behind content */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        {H_LINES.map(({ idx, top, opacity }) => (
          <svg
            key={`h-${idx}`}
            className="absolute left-0 w-full h-8"
            style={{
              top,
              filter: 'drop-shadow(0 0 12px #fff) drop-shadow(0 0 6px #fff)',
              opacity,
            }}
            viewBox="0 0 1200 32"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M0 16 Q150 0 300 16 Q450 32 600 16 Q750 0 900 16 Q1050 32 1200 16"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="1"
            />
          </svg>
        ))}
        {V_LINES.map(({ idx, left, opacity }) => (
          <svg
            key={`v-${idx}`}
            className="absolute top-0 h-full w-8"
            style={{
              left,
              filter: 'drop-shadow(0 0 12px #fff) drop-shadow(0 0 6px #fff)',
              opacity,
            }}
            viewBox="0 0 32 800"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M16 0 Q24 40 16 80 Q8 120 16 160 Q24 200 16 240 Q8 280 16 320 Q24 360 16 400 Q8 440 16 480 Q24 520 16 560 Q8 600 16 640 Q24 680 16 720 Q8 760 16 800"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="1"
            />
          </svg>
        ))}
      </div>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-light font-serif mb-14 md:mb-16 text-center" style={{textShadow: '0 2px 8px rgba(0,224,255,0.12)', letterSpacing: '0.04em'}}>Blog</h2>
      {loading && <div className="text-center text-gray-400">Loading latest posts…</div>}
      {error && <div className="text-center text-yellow-400">{error}</div>}
      <div className="space-y-10 md:space-y-12">
        {posts.map((post, i) => (
          <motion.div
            key={post.link || post.guid}
            className="relative group bg-white/10 dark:bg-black/30 rounded-2xl shadow-2xl p-6 md:p-10 border border-white/20 backdrop-blur-lg transition-all duration-300 overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants}
            custom={i}
            whileHover={{ scale: 1.025 }}
            style={{
              boxShadow: '0 4px 32px 0 rgba(0,224,255,0.08), 0 1.5px 8px 0 rgba(0,0,0,0.10)',
            }}
          >
            <div className="absolute inset-0 pointer-events-none rounded-2xl border-2 border-transparent group-hover:border-accent2 group-hover:shadow-[0_0_24px_4px_rgba(0,224,255,0.25)] transition-all duration-300" />
            <a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 z-10 relative"
            >
              <MediumIcon className="w-7 h-7 mr-2 opacity-80" />
              <span className="text-lg md:text-xl font-semibold truncate" title={post.title}>{post.title}</span>
            </a>
            {post.pubDate && (
              <div className="mt-2 text-xs text-accent2/80 font-mono">
                {new Date(post.pubDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
              </div>
            )}
            {post.description && (
              <div className="mt-4 text-sm text-white/90 dark:text-white/80 line-clamp-4" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(stripImages(post.description)) }} />
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default BlogSection; 