import { useEffect, useCallback } from 'react';

export const useFetch = (url, filters, pager, items, setItems, setLoading): void => {
  useEffect(() => {
    setLoading(true);
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ filters, page: pager.page }),
    })
      .then((data) => data.json())
      .then((newItems) => {
        setItems([...items, ...newItems]);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        return e;
      });
  }, [pager.page]);
};

export const useInfiniteScroll = (scrollRef, dispatch): void => {
  const scrollObserver = useCallback(
    (node) => {
      new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.intersectionRatio > 0) {
            dispatch({ type: 'ADVANCE_PAGE' });
          }
        });
      }).observe(node);
    },
    [dispatch],
  );
  useEffect(() => {
    if (scrollRef.current) {
      scrollObserver(scrollRef.current);
    }
  }, [scrollObserver, scrollRef]);
};
