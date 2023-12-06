import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const ErrorMessage = ({ children }: Props) => {
  if (!children) return null;
  return (
    <p className="mt-1 rounded bg-red-600 p-1 text-slate-100">
      {children}
    </p>
  );
};

export default ErrorMessage;
