import { cn } from '@/lib/utils';
import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

const OrderTableContentWrapper = ({ children, className }: Props) => {
  return (
    <div
      className={cn(
        'w-[200px] overflow-hidden text-ellipsis text-center md:w-[300px] md:text-start',
        className
      )}
    >
      {children}
    </div>
  );
};

export default OrderTableContentWrapper;
