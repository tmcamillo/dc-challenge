import { useEffect, useState } from 'react';
import { fetchPhotos } from './services/photos';
import { UnplashedRoot } from './utils/data';
import InfiniteScroll from 'react-infinite-scroll-component';
import Masonry from 'react-masonry-css';
import Modal from './components/Modal/Moda';

const breakpointColumnsObj = {
  default: 3,
  1024: 2,
  768: 1,
};

function App(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState({} as UnplashedRoot);
  const [listPhotos, setListPhotos] = useState<UnplashedRoot[]>([]);
  const [hasMore, sethasMore] = useState(true);
  const [page, setpage] = useState(1);

  const fetchMoreData = async () => {
    const othersPhotos = await fetchPhotos(page);
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

  useEffect(() => {
    const fetchFirstPhotos = async () => {
      const photos = await fetchPhotos(page);
      if (photos.length > 0) {
        setListPhotos(photos);
      }
      setpage(2);
    };
    fetchFirstPhotos();
  }, []);

  return (
    <main className='max-w-screen-xl mx-auto my-0'>
      <h1 className='text-3xl font-bold my-4'>Hello World</h1>
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
      {isOpen && <Modal photo={selectedImage} closeModal={closeModal} />}
    </main>
  );
}

export default App;
