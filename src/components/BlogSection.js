import React, { useEffect, useState } from 'react';

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
  },
  {
    title: 'Lessons from My First Year in Tech',
    link: '#',
    pubDate: '2024-04-15',
    description: 'Reflections and tips for anyone transitioning into software development.',
  },
  {
    title: 'Why Minimalism Works for Developers',
    link: '#',
    pubDate: '2024-03-10',
    description: 'Exploring the benefits of minimal design in developer portfolios and projects.',
  },
];

const BlogSection = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(MEDIUM_FEED_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => {
        if (data.status === 'ok' && data.items && data.items.length > 0) {
          setPosts(data.items.slice(0, 5));
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
    <section id="blog" className="py-16 px-4 md:px-0 max-w-4xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Blog</h2>
      {loading && <div className="text-center text-gray-400">Loading latest posts…</div>}
      {error && <div className="text-center text-yellow-400">{error}</div>}
      <div className="space-y-8">
        {posts.map((post) => (
          <div
            key={post.link || post.guid}
            className="bg-white/10 dark:bg-black/30 rounded-xl shadow-lg p-6 transition hover:scale-[1.02] hover:bg-white/20 dark:hover:bg-black/40 backdrop-blur-md border border-white/20"
          >
            <a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <MediumIcon className="w-6 h-6 mr-2 opacity-80" />
              <span className="text-lg font-semibold truncate" title={post.title}>{post.title}</span>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogSection; 