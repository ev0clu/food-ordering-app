import Image from 'next/image';
import homePic from '../../public/home.jpg';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

export default function Home() {
  return (
    <div>
      <div className="mt-4 flex flex-col gap-5 rounded border bg-stone-200 p-5 dark:bg-stone-900 md:flex-row">
        <div className="flex flex-col justify-center">
          <div className="text-2xl font-bold md:mb-6 md:text-4xl">
            Welcome to Fooder - Your Gateway to Culinary Delights!
          </div>
          <p className="py-10 font-light opacity-90">
            At Fooder, we believe that great food should be just a
            click away. Welcome to our online food ordering platform,
            where we bring the finest local flavors right to your
            doorstep. Whether you're craving comfort classics,
            exploring exotic cuisines, or seeking healthier
            alternatives, we've got a diverse menu curated with your
            taste buds in mind.
          </p>
          <div className="mx-auto mb-3">
            <Link
              href="/menu"
              className={cn(
                buttonVariants({ variant: 'default' }),
                'w-28'
              )}
            >
              Order now
            </Link>
          </div>
        </div>
        <Image
          src={homePic}
          alt="home picture"
          width={300}
          height={300}
          className="rounded-full"
        />
      </div>
      <div className="mb-6 mt-6">
        <h2 className="mb-3 text-center text-2xl md:text-4xl">
          Why Choose Fooder?
        </h2>
        <div className="flex flex-col gap-3">
          <div>
            <b>Unrivaled Variety:</b> From beloved neighborhood gems
            to hidden culinary treasures, our platform showcases a
            wide array of restaurants to suit every palate.
          </div>
          <div>
            <b>Effortless Ordering:</b> Our user-friendly interface
            makes ordering your favorite dishes a breeze. Browse
            menus, customize your selections, and place an order with
            just a few clicks - it's that simple!
          </div>
          <div>
            <b>Local Love, Global Flavors:</b> We celebrate local
            culinary talent while also offering a global feast for
            your senses. Explore a world of tastes without leaving the
            comfort of your home.
          </div>
          <div>
            <b>Speedy Delivery:</b> We understand the anticipation
            that comes with a delicious meal. Our dedicated delivery
            partners work tirelessly to ensure your order arrives
            fresh and timely.
          </div>
          <div>
            <b>Exclusive Deals:</b> Enjoy exclusive discounts,
            promotions, and loyalty rewards when you order through
            Fooder. Your satisfaction is our priority, and we love
            treating our customers to a little extra delight.
          </div>
        </div>
      </div>
    </div>
  );
}
