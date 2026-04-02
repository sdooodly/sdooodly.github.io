import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';

const MEDIUM_FEED_URL = 'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@sdooodly';
let postsCache = null;

function stripImages(html) {
  if (!html) return '';
  return html.replace(/<figure[\s\S]*?<\/figure>/gi, '').replace(/<img[^>]*>/gi, '');
}

const BlogSection = () => {
  const [posts, setPosts] = useState(postsCache || []);
  const [loading, setLoading] = useState(!postsCache);

  useEffect(() => {
    if (postsCache) return;
    fetch(MEDIUM_FEED_URL)
      .then(r => r.json())
      .then(data => {
        if (data.status === 'ok' && data.items?.length) {
          postsCache = data.items.slice(0, 5);
          setPosts(postsCache);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section id="blog" className="py-20 md:py-32 px-4 max-w-4xl mx-auto">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-light font-serif text-center mb-14" style={{ letterSpacing: '0.04em' }}>Blog</h2>
      {loading && <p className="text-center text-text/40">Loading posts…</p>}
      <div className="space-y-5">
        {posts.map(post => (
          <a key={post.link || post.guid} href={post.link} target="_blank" rel="noopener noreferrer" className="block p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-gold/30 transition-all duration-200 group">
            <h3 className="text-lg font-medium text-text/90 group-hover:text-gold transition-colors mb-2">{post.title}</h3>
            {post.pubDate && <p className="text-xs text-text/40 mb-3 font-mono">{new Date(post.pubDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</p>}
            {post.description && <div className="text-sm text-text/60 line-clamp-2" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(stripImages(post.description)) }} />}
          </a>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;
