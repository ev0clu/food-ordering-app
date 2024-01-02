'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { ExtendedMenu } from '@/types/menu';
import Loading from '@/components/Loading';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Filter, Minus, Plus } from 'lucide-react';
import MenuCard from '@/components/menu/MenuCard';
import noImageUrl from '../../../public/no-image.png';
import Image from 'next/image';
import { useCartStore } from '@/lib/store';
import ErrorMessage from '@/components/ErrorMessage';
import { formatPrice } from '@/lib/utils';

type ListMenuProps = {
  menuList: ExtendedMenu[];
};

const MenuPage = () => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [menuList, setMenuList] = useState<ExtendedMenu[]>([]);
  const [size, setSize] = useState<string | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const [isSizeError, setIsSizeError] = useState(false);
  const [dialogOpen, setDialogOpen] = useState<boolean[]>(
    new Array(menuList.length).fill(false)
  );
  const { addToCart } = useCartStore();

  const fetchMenu = async () => {
    try {
      const response = await fetch(`/api/menu`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        cache: 'no-cache'
      });

      if (response.ok) {
        const data: ListMenuProps = await response.json();
        setMenuList(data.menuList || []);
        setIsLoading(false);
      } else {
        setIsError(true);
        setIsLoading(false);
        toast.error('An unexpected error occurred');
      }
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
      toast.error('An unexpected error is occured');
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const toggleDialog = (index: number) => {
    setDialogOpen((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  if (isLoading) {
    return (
      <div className="m-auto mt-20">
        <Loading />
      </div>
    );
  }

  return (
    <div>
      {!isError ? (
        menuList.length == 0 ? (
          <p className="m-auto my-5 text-lg">
            There is still no any menu. Please come back later.
          </p>
        ) : (
          <div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-[150px] justify-start"
                >
                  <Filter className="mr-3 h-4 w-4" />
                  Category filter
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80"></PopoverContent>
            </Popover>

            <div className="grid grid-cols-1 gap-10 p-10 md:grid-cols-2 xl:grid-cols-3">
              {menuList.map((menu, index) => (
                <div key={menu.id}>
                  <Dialog
                    open={dialogOpen[index]}
                    onOpenChange={(isOpen) => {
                      if (!isOpen) {
                        toggleDialog(index);
                      }
                    }}
                  >
                    <DialogTrigger>
                      <MenuCard
                        menu={menu}
                        toggleDialog={toggleDialog}
                        index={index}
                      />
                    </DialogTrigger>
                    <DialogContent className="flex flex-col px-12 sm:max-w-md">
                      <Carousel className="mx-auto flex h-[200px] w-[200px] flex-grow items-center justify-center">
                        <CarouselContent>
                          {menu.images.length === 0 ? (
                            <CarouselItem>
                              <div className="p-1">
                                <Image
                                  src={noImageUrl}
                                  alt="No image"
                                  width="200"
                                  height="200"
                                  placeholder="blur"
                                  blurDataURL={`${noImageUrl}`}
                                  loading="lazy"
                                  className="rounded-md"
                                />
                              </div>
                            </CarouselItem>
                          ) : (
                            menu.images.map((image, index) => (
                              <CarouselItem
                                key={index}
                                className="flex items-center justify-center"
                              >
                                <div className="p-1">
                                  <Image
                                    src={`${image.url}` || noImageUrl}
                                    alt={image.id}
                                    width="200"
                                    height="200"
                                    placeholder="blur"
                                    blurDataURL={`${image.url}`}
                                    loading="lazy"
                                    className="rounded-md"
                                  />
                                </div>
                              </CarouselItem>
                            ))
                          )}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                      </Carousel>
                      <DialogHeader>
                        <DialogTitle className="text-2xl">
                          {menu.name}
                        </DialogTitle>
                        <ScrollArea className="h-44">
                          <DialogDescription>
                            {menu.description}
                          </DialogDescription>
                        </ScrollArea>
                      </DialogHeader>
                      <Select
                        onValueChange={(value) => {
                          setIsSizeError(false);
                          setSize(value);
                        }}
                        defaultValue={undefined}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a size to display" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="SMALL">
                              Small
                            </SelectItem>
                            <SelectItem value="NORMAL">
                              Normal
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {isSizeError && (
                        <ErrorMessage>
                          Please select a size!
                        </ErrorMessage>
                      )}
                      <div className="mt-5 flex w-fit flex-row items-center gap-10">
                        <div className="flex flex-row items-center gap-3">
                          <Button
                            disabled={quantity === 1 ? true : false}
                            type="button"
                            size="icon"
                            onClick={() => {
                              if (quantity > 1) {
                                setQuantity((qty) => qty - 1);
                              }
                            }}
                          >
                            <Minus />
                          </Button>
                          <span>{quantity}</span>
                          <Button
                            type="button"
                            size="icon"
                            onClick={() =>
                              setQuantity((qty) => qty + 1)
                            }
                          >
                            <Plus />
                          </Button>
                        </div>

                        <Button
                          type="button"
                          size="sm"
                          className="flex w-40 flex-row justify-between gap-3"
                          onClick={() => {
                            if (size !== undefined) {
                              addToCart(menu, size, quantity);
                              setSize(undefined);
                              setIsSizeError(false);
                              setQuantity(1);
                              toggleDialog(index);
                            } else {
                              setIsSizeError(true);
                            }
                          }}
                        >
                          <div>Add</div>
                          <span>
                            {formatPrice(menu.price, {
                              currency: 'EUR',
                              notation: 'compact'
                            })}
                          </span>
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              ))}
            </div>
          </div>
        )
      ) : (
        <p className="m-auto text-lg">Something went wrong</p>
      )}
    </div>
  );
};

export default MenuPage;
