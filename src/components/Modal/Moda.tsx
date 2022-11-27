import { UnplashedRoot } from '../../utils/data';
import CloseIcon from '../../assets/CloseIcon';

export interface IModal {
  closeModal: () => void;
  photo: UnplashedRoot;
}

function Modal(props: IModal): JSX.Element {
  const { closeModal, photo } = props;

  return (
    <>
      <div className='opacity-80 fixed inset-0 z-10 bg-black'></div>
      <div className='fixed inset-0 z-20 flex justify-center items-center'>
        <div className='flex flex-col  w-full h-[90vh] justify-center items-center'>
          <div className='relative  max-h-full'>
            <img
              className='max-h-full'
              src={photo.urls.regular}
              alt={photo.alt_description}
            />
            <button
              className='absolute top-0 right-0 p-3'
              onClick={() => closeModal()}
            >
              <CloseIcon />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
