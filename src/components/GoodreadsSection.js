import React, { useEffect, useState } from 'react';

const GOODREADS_FEED_URL =
  'https://api.rss2json.com/v1/api.json?rss_url=https://www.goodreads.com/review/list_rss/111266354?shelf=read';

const MAX_BOOKS = 20;

function getWheelConfig() {
  if (typeof window !== 'undefined' && window.innerWidth < 640) {
    // Mobile: smaller wheel and covers
    return { radius: 80, coverW: 56, coverH: 80 };
  }
  // Desktop/tablet
  return { radius: 140, coverW: 96, coverH: 144 };
}

const CENTER_SCALE = 1.25;

const GoodreadsSection = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [angle, setAngle] = useState(0);
  const [wheelConfig, setWheelConfig] = useState(getWheelConfig());

  useEffect(() => {
    fetch(GOODREADS_FEED_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => {
        if (data.status === 'ok' && data.items && data.items.length > 0) {
          setBooks(data.items.slice(0, MAX_BOOKS));
        } else {
          setError('No Goodreads books found.');
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch Goodreads books.');
        setLoading(false);
      });
  }, []);

  // Responsive wheel config
  useEffect(() => {
    function handleResize() {
      setWheelConfig(getWheelConfig());
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const rotateLeft = () => setAngle((prev) => prev + 360 / books.length);
  const rotateRight = () => setAngle((prev) => prev - 360 / books.length);

  const { radius, coverW, coverH } = wheelConfig;
  const wheelSize = radius * 2 + coverH + 16; // add some padding

  return (
    <section id="goodreads" className="py-20 md:py-32 px-4 md:px-0 max-w-4xl mx-auto relative overflow-visible">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-14 md:mb-16 text-center" style={{textShadow: '0 2px 8px rgba(0,224,255,0.12)'}}>
        Goodreads
      </h2>
      {loading && <div className="text-center text-gray-400">Loading books…</div>}
      {error && <div className="text-center text-yellow-400">{error}</div>}
      <div className="relative flex flex-col items-center justify-center" style={{ minHeight: wheelSize }}>
        {/* Carousel Arrows */}
        {books.length > 1 && (
          <>
            <button
              aria-label="Previous book"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-accent2/80 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition"
              onClick={rotateLeft}
              style={{outline: 'none', border: 'none'}}
            >
              <span className="text-2xl">&#8592;</span>
            </button>
            <button
              aria-label="Next book"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-accent2/80 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition"
              onClick={rotateRight}
              style={{outline: 'none', border: 'none'}}
            >
              <span className="text-2xl">&#8594;</span>
            </button>
          </>
        )}
        {/* Book Wheel */}
        <div className="relative mx-auto" style={{ width: wheelSize, height: wheelSize, perspective: '900px' }}>
          {books.map((book, i) => {
            const theta = (360 / books.length) * i + angle;
            const rad = (theta * Math.PI) / 180;
            // Calculate position on circle
            const x = radius * Math.sin(rad);
            const y = -radius * Math.cos(rad);
            // Center book is the one closest to 0deg
            const normalized = ((theta % 360) + 360) % 360;
            const isCenter = normalized < 360 / books.length || normalized > 360 - 360 / books.length;
            return (
              <div
                key={book.guid || book.link}
                className={`absolute left-1/2 top-1/2 group transition-transform duration-300`}
                style={{
                  transform: `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${isCenter ? CENTER_SCALE : 1})`,
                  zIndex: isCenter ? 2 : 1,
                  filter: isCenter ? 'drop-shadow(0 4px 24px #00e0ff44)' : 'none',
                  cursor: 'pointer',
                  transition: 'transform 0.4s cubic-bezier(.33,1,.68,1), filter 0.3s',
                }}
              >
                <a href={book.link} target="_blank" rel="noopener noreferrer">
                  <img
                    src={book.thumbnail}
                    alt={book.title}
                    style={{ width: coverW, height: coverH }}
                    className={`object-cover rounded-lg border border-white/20 bg-white/20 shadow-md ${isCenter ? 'ring-2 ring-accent2' : ''}`}
                  />
                </a>
                {/* Tooltip for center book */}
                {isCenter && (
                  <div className="absolute left-1/2 top-full mt-3 -translate-x-1/2 z-20 flex flex-col items-center px-4 py-3 rounded-xl bg-black/90 text-white text-xs shadow-xl min-w-[180px] max-w-xs pointer-events-none animate-fade-in">
                    <span className="font-semibold text-base mb-1 text-center">{book.title}</span>
                    {book.author && <span className="mb-1 text-accent2/80">by {book.author}</span>}
                    {book.categories && book.categories.length > 0 && (
                      <span className="mb-1 text-accent2/60">{book.categories[0]}</span>
                    )}
                    {book.pubDate && (
                      <span className="mb-1 text-white/60">{new Date(book.pubDate).getFullYear()}</span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GoodreadsSection; 