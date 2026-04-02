import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';

const MEDIUM_FEED_URL =
  'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@sdooodly';
const GOODREADS_FEED_URL =
  'https://api.rss2json.com/v1/api.json?rss_url=https://www.goodreads.com/review/list_rss/111266354?shelf=read';

let postsCache = null;
let booksCache = null;

function stripImages(html) {
  if (!html) return '';
  return html.replace(/<figure[\s\S]*?<\/figure>/gi, '').replace(/<img[^>]*>/gi, '');
}

const ReadsWritesSection = () => {
  const [tab, setTab] = useState('blog');
  const [posts, setPosts] = useState(postsCache || []);
  const [books, setBooks] = useState(booksCache || []);
  const [loadingPosts, setLoadingPosts] = useState(!postsCache);
  const [loadingBooks, setLoadingBooks] = useState(!booksCache);

  useEffect(() => {
    if (!postsCache) {
      fetch(MEDIUM_FEED_URL)
        .then(r => r.json())
        .then(data => {
          if (data.status === 'ok' && data.items?.length) {
            postsCache = data.items.slice(0, 5);
            setPosts(postsCache);
          }
          setLoadingPosts(false);
        })
        .catch(() => setLoadingPosts(false));
    }
    if (!booksCache) {
      fetch(GOODREADS_FEED_URL)
        .then(r => r.json())
        .then(data => {
          if (data.status === 'ok' && data.items?.length) {
            booksCache = data.items.slice(0, 12);
            setBooks(booksCache);
          }
          setLoadingBooks(false);
        })
        .catch(() => setLoadingBooks(false));
    }
  }, []);

  return (
    <section className="py-20 md:py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-light font-serif text-center mb-10 text-text/90"
          style={{ letterSpacing: '0.04em' }}
        >
          Reads &amp; Writes
        </h2>

        {/* Sub-tabs */}
        <div className="flex justify-center gap-6 mb-12">
          <button
            onClick={() => setTab('blog')}
            className={`text-xs uppercase tracking-[0.12em] font-medium pb-1 transition-colors ${
              tab === 'blog' ? 'text-gold border-b-2 border-gold' : 'text-text/40 hover:text-text/70'
            }`}
          >
            Blog
          </button>
          <button
            onClick={() => setTab('books')}
            className={`text-xs uppercase tracking-[0.12em] font-medium pb-1 transition-colors ${
              tab === 'books' ? 'text-gold border-b-2 border-gold' : 'text-text/40 hover:text-text/70'
            }`}
          >
            Current bookshelf
          </button>
        </div>

        {/* Blog posts */}
        {tab === 'blog' && (
          <div className="space-y-6">
            {loadingPosts && <p className="text-center text-text/40">Loading posts…</p>}
            {posts.map((post) => (
              <a
                key={post.link || post.guid}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-gold/30 hover:bg-white/8 transition-all duration-200 group"
              >
                <h3 className="text-lg font-medium text-text/90 group-hover:text-gold transition-colors mb-2">
                  {post.title}
                </h3>
                {post.pubDate && (
                  <p className="text-xs text-text/40 mb-3 font-mono">
                    {new Date(post.pubDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                  </p>
                )}
                {post.description && (
                  <div
                    className="text-sm text-text/60 line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(stripImages(post.description)) }}
                  />
                )}
              </a>
            ))}
            {!loadingPosts && posts.length === 0 && (
              <p className="text-center text-text/40">No posts found.</p>
            )}
          </div>
        )}

        {/* Bookshelf */}
        {tab === 'books' && (
          <div>
            {loadingBooks && <p className="text-center text-text/40">Loading books…</p>}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
              {books.map((book) => (
                <a
                  key={book.guid || book.link}
                  href={book.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center"
                >
                  <img
                    src={book.thumbnail}
                    alt={book.title}
                    className="w-full aspect-[2/3] object-cover rounded-lg border border-white/10 group-hover:border-gold/40 transition-all duration-200 group-hover:scale-105"
                  />
                  <p className="text-xs text-text/50 mt-2 text-center line-clamp-2 group-hover:text-gold transition-colors">
                    {book.title}
                  </p>
                </a>
              ))}
            </div>
            {!loadingBooks && books.length === 0 && (
              <p className="text-center text-text/40">No books found.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ReadsWritesSection;
