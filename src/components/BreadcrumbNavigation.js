import React from 'react';

const BreadcrumbNavigation = ({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="py-3 px-4 md:px-6">
      <ol className="flex items-center space-x-2 text-sm md:text-base max-w-6xl mx-auto">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center">
            {idx > 0 && (
              <span className="mx-2 text-accent2/60">/</span>
            )}
            {item.href ? (
              <a
                href={item.href}
                className="text-accent2 hover:text-accent transition-colors duration-200 underline-offset-2 hover:underline"
              >
                {item.label}
              </a>
            ) : (
              <span className="text-text/70">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadcrumbNavigation;
