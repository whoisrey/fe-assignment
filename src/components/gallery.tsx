import {useQuery} from '@tanstack/react-query';
import clsx from 'clsx';

import {Image} from '@/components/ui/image';
import {usePreloadImages} from '@/hooks/usePreloadImages';
import {searchQuery} from '@/lib/data';
import {gridPlacement} from '@/lib/utils';

const Gallery = ({query, limit, isClicked}) => {
  const {data: imageItems} = useQuery({
    queryKey: ['searchResults'],
    queryFn: () => searchQuery(query, limit),
    enabled: isClicked,
  });

  usePreloadImages(imageItems);

  return (
    <div className="grid grid-cols-3 gap-[4px]">
      {imageItems?.map((item: any, index: number) => (
        <Image
          key={item.id}
          src={item.imageUrl}
          alt={item.username}
          className={clsx(
            'h-full w-full object-cover',
            gridPlacement(index, imageItems.length)
          )}
        />
      ))}
    </div>
  );
};

export {Gallery};
