import {useState} from 'react';

import {useQuery} from '@tanstack/react-query';
import {searchQuery} from '@/lib/data';
import {gridPlacement} from '@/lib/utils';

import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Image} from '@/components/ui/image';
import {Fallback} from '@/components/fallback';

import clsx from 'clsx';

export const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(12);

  const {data, error, isLoading, refetch} = useQuery({
    queryKey: ['searchResults', query, limit],
    queryFn: () => searchQuery(query, limit),
    enabled: false,
  });

  const handleQueryChange = (event: any) => {
    setQuery(event.target.value);
  };

  const handleLimitChange = (event: any) => {
    setLimit(event.target.value);
  };

  return (
    <div className='p-4'>
      <div className='flex flex-row gap-2'>
        <Input
          className='flex-[10]'
          type='text'
          value={query}
          onChange={handleQueryChange}
          placeholder='검색어를 입력해 주세요.'
        />
        <Input
          className='flex-1'
          type='number'
          value={limit}
          onChange={handleLimitChange}
          min={0}
          placeholder='이미지 개수를 입력해 주세요.'
        />
      </div>

      <Button
        className='mt-2 mb-2 w-full'
        onClick={() => refetch()}
        disabled={isLoading}
      >
        검색
      </Button>

      <div className='grid grid-cols-3 gap-[4px]'>
        {isLoading ? (
          <Fallback />
        ) : error ? (
          <p>에러 발생: {error.message}</p>
        ) : (
          data?.map((item: any, index: number) => (
            <Image
              key={item.id}
              src={item.imageUrl}
              alt={item.username}
              className={clsx('w-full h-full object-cover', gridPlacement(index, data.length))}
            />
          ))
        )}
      </div>
    </div>
  );
};
