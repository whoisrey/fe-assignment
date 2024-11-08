import {useState, Suspense} from 'react';
import {ErrorBoundary} from 'react-error-boundary';

import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Gallery} from '@/components/gallery';
import {Fallback} from '@/components/fallback';
import {ErrorFallback} from '@/components/error';

export const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(12);
  const [isClicked, setIsClicked] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;

    if (name === 'query') {
      setQuery(value);
    }

    if (name === 'limit') {
      setLimit(value);
    }

    setIsClicked(false);
  };

  const handleSearch = () => {
    setIsClicked(true);
  };

  return (
    <div className="p-4">
      <div className="flex flex-row gap-2">
        <Input
          className="flex-[10]"
          type="text"
          name="query"
          value={query}
          onChange={handleInputChange}
          placeholder="검색어를 입력해 주세요."
        />
        <Input
          className="flex-1"
          type="number"
          name="limit"
          value={limit}
          onChange={handleInputChange}
          min={0}
          placeholder="이미지 개수를 입력해 주세요."
        />
      </div>

      <Button className="mt-2 mb-2 w-full" onClick={handleSearch}>
        검색
      </Button>

      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<Fallback />}>
          <Gallery query={query} limit={limit} isClicked={isClicked} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};
