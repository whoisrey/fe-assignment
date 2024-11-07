const TOKEN = import.meta.env.VITE_API_KEY;

export interface SearchQueryItem {
  id: string;
  imageUrl: string;
  shortcode: string;
  username: string;
}

export interface SearchQueryResponse {
  items: SearchQueryItem[];
}

export const searchQuery = async (query: string, limit: number) => {
  const url = `https://supabase.bzine.co/functions/v1/demo-query/search?query=${query}&limit=${limit}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();

      switch (response.status) {
        case 400:
          throw new Error('검색어를 입력해주세요.');
        case 401:
          throw new Error('토큰이 필요합니다.');
        case 403:
          throw new Error('접근이 거부되었습니다.');
        case 404:
          throw new Error('페이지를 찾을 수 없습니다.');
        case 500:
          throw new Error('서버 에러입니다. - 잠시 후 시도해주세요.');
        default:
          throw new Error(`${errorData.message}`);
      }
    }

    const data = await response.json();

    return data.items;
  } catch (error) {
    console.error('API 호출 실패: ', error);

    throw error;
  }
};
