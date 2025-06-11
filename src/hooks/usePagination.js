import { useMemo, useState } from 'react';

const usePagination = (products, tag, visible = 4) => {
  const filteredProducts = useMemo(
    () => products.filter((product) => product.tag === tag),
    [products, tag]
  );

  const [offset, setOffset] = useState(0);

  const page = filteredProducts.slice(offset, offset + visible);

  const hasPrev = offset > 0;
  const hasNext = offset + visible < filteredProducts.length;

  const next = () => {
    hasNext && setOffset((prev) => prev + 1);
  };

  const back = () => {
     hasPrev && setOffset((prev) => prev - 1);
  };

  return {
    page,
    next,
    back,
    hasPrev,
    hasNext
  }
};

export default usePagination;
