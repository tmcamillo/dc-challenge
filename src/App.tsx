/* eslint-disable camelcase */
import { useEffect, useState } from 'react';
import { fetchPhotos, searchPhotos } from './services/photos';
import { UnplashedRoot } from './utils/data';
import InfiniteScroll from 'react-infinite-scroll-component';
import Masonry from 'react-masonry-css';

import Modal from './components/Modal/Moda';
import Input from './components/Input/Input';
import useDebounce from './customHooks/useDebounce';
import OrderBy from './components/OrderBy/OrderBy';

const breakpointColumnsObj = {
  default: 3,
  1024: 2,
  768: 1,
};

function App(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [page, setpage] = useState(1);
  const [listPhotos, setListPhotos] = useState<UnplashedRoot[]>([]);
  const [selectedImage, setSelectedImage] = useState({} as UnplashedRoot);
  const [inputSearch, setInputSearch] = useState('');
  const [order, setOrder] = useState('');
  const [hasMore, sethasMore] = useState(true);
  const debouncedValue = useDebounce<string>(inputSearch, 500);

  const fetchMoreData = async () => {
    let othersPhotos;
    let params;
    if (debouncedValue) {
      params = order
        ? { page: 1, query: debouncedValue, orderBy: order }
        : { page, query: debouncedValue };
      const items = await searchPhotos(params);
      othersPhotos = items.results;
    } else {
      params = order ? { page: 1, orderBy: order } : { page };
      othersPhotos = await fetchPhotos(params);
    }
    setListPhotos([...listPhotos, ...othersPhotos]);
    if (othersPhotos.length === 0) {
      sethasMore(false);
    }
    setpage(page + 1);
  };

  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  const openFullImage = (photo: UnplashedRoot) => {
    setSelectedImage(photo);
    document.body.style.overflow = 'hidden';
    setIsOpen(true);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(e.target.value);
  };

  const fetchFirstPhotos = async () => {
    const params = order ? { page: 1, orderBy: order } : { page: 1 };
    const photos = await fetchPhotos(params);
    if (photos.length > 0) {
      setListPhotos(photos);
      setpage(2);
    }
  };

  const searchFirstPhotos = async () => {
    const params = order
      ? { page: 1, query: debouncedValue, orderBy: order }
      : { page: 1, query: debouncedValue };
    const photos = await searchPhotos(params);
    if (photos?.results?.length > 0) {
      setListPhotos(photos.results);
      setpage(2);
    }
  };

  useEffect(() => {
    if (debouncedValue) {
      searchFirstPhotos();
    } else {
      fetchFirstPhotos();
    }
  }, [debouncedValue, order]);

  return (
    <>
      <main className='max-w-screen-xl mx-auto my-0'>
        <section className='mb-10 flex flex-col mx-2'>
          <h1 className='text-3xl font-bold my-10'>Photos</h1>
          <Input
            id='search'
            value={inputSearch}
            label='Search for free high resolution photos'
            placeholder='search for a specific word'
            onChange={(e) => handleSearch(e)}
          />
          <OrderBy setOrder={setOrder} order={order} />
        </section>
        <ul>
          <InfiniteScroll
            dataLength={listPhotos.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
          >
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className='flex w-auto gap-4'
              columnClassName=''
            >
              {listPhotos.map((photo) => {
                return (
                  <li
                    className='mb-4 max-lg:flex max-lg:justify-center'
                    key={photo.id}
                  >
                    <img
                      loading='lazy'
                      className='hover:scale-90 ease-in duration-200 cursor-pointer'
                      src={photo.urls.small}
                      alt={photo.alt_description}
                      onClick={() => openFullImage(photo)}
                    />
                  </li>
                );
              })}
            </Masonry>
          </InfiniteScroll>
        </ul>
      </main>
      {isOpen && <Modal photo={selectedImage} closeModal={closeModal} />}
    </>
  );
}

export default App;
