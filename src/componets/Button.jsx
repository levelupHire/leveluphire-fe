import React from 'react';

export default function Button({
  children,
  variant = 'primary',
  fullWidth = false,
  loading = false,
  className = '',
  ...props
}) {
  let base =
    'inline-flex items-center justify-center font-semibold rounded-lg transition focus:outline-none focus:ring-2 focus:ring-offset-2';
  let variants = {
    primary:
      'bg-primary text-white hover:bg-primary-dark focus:ring-primary',
    secondary:
      'bg-white text-primary border border-primary hover:bg-primary-light hover:text-white focus:ring-primary',
    outline:
      'bg-transparent text-primary border border-primary hover:bg-primary-light hover:text-white focus:ring-primary',
  };
  let width = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${base} ${variants[variant]} ${width} px-6 py-2 ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <span className="animate-spin mr-2 h-5 w-5 border-2 border-t-2 border-white border-t-primary rounded-full"></span>
      ) : null}
      {children}
    </button>
  );
} 