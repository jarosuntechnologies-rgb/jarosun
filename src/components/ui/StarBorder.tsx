import React from 'react';

type StarBorderProps<T extends React.ElementType> = React.ComponentPropsWithoutRef<T> & {
  as?: T;
  className?: string;
  childrenClassName?: string;
  children?: React.ReactNode;
  color?: string;
  speed?: React.CSSProperties['animationDuration'];
  thickness?: number;
};

const StarBorder = <T extends React.ElementType = 'button'>({
  as,
  className = '',
  childrenClassName = '',
  color = 'white',
  speed = '6s',
  thickness = 1,
  children,
  ...rest
}: StarBorderProps<T>) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Component = (as || 'button') as any;

  return (
    <Component
      className={`relative inline-block overflow-hidden rounded-[20px] ${className}`}
      {...rest}
      style={{
        padding: `${thickness}px 0`,
        ...((rest as any).style || {})
      }}
    >
      <div
        className="absolute w-[100px] h-full opacity-100 bottom-0 right-0 animate-star-movement-bottom z-0"
        style={{
          background: `linear-gradient(to right, transparent, ${color}, transparent)`,
          height: '1px',
          animationDuration: speed
        }}
      ></div>
      <div
        className="absolute w-[100px] h-full opacity-100 top-0 left-0 animate-star-movement-top z-0"
        style={{
          background: `linear-gradient(to right, transparent, ${color}, transparent)`,
          height: '1px',
          animationDuration: speed
        }}
      ></div>
      <div className={`relative z-1 bg-black/60 backdrop-blur-xl border border-white/10 text-white text-center rounded-[18px] ${childrenClassName}`}>
        {children}
      </div>
    </Component>
  );
};

export default StarBorder;
