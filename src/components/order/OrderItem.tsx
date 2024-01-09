'use client';

import { cn } from '@/lib/utils';
import { Order } from '@prisma/client';
import { format } from 'date-fns';
import OrderTableContentWrapper from '@/components/order/OrderTableContentWrapper';

interface OrderItemProps {
  order: Order;
}

const OrderItem = ({ order }: OrderItemProps) => {
  const date = format(
    new Date(order.createdAt),
    'hh:mmaaa MMM do, yyyy'
  );

  return (
    <div className="flex flex-col gap-3 md:flex-row">
      <OrderTableContentWrapper>{order.id}</OrderTableContentWrapper>
      <OrderTableContentWrapper>
        {order.email}
      </OrderTableContentWrapper>
      <OrderTableContentWrapper>
        {format(new Date(order.createdAt), 'hh:mmaaa MMM do, yyyy')}
      </OrderTableContentWrapper>
      <OrderTableContentWrapper className="flex flex-row justify-center md:w-20">
        <div
          className={cn('w-20 rounded-sm p-1 text-white', {
            'bg-red-600': !order.paid,
            'bg-green-600': order.paid
          })}
        >
          {order.paid ? 'Paid' : 'Not Paid'}
        </div>
      </OrderTableContentWrapper>
    </div>
  );
};

export default OrderItem;
