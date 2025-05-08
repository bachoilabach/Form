import { useState } from 'react';

export function useModalSuccess() {
  const [isModalSuccessOpen, setModalSuccessOpen] = useState<boolean>(false);
  const handleShowModalSuccess = () => {
    console.log(1);
    setModalSuccessOpen(true);
  };
  const handleCloseModal = () => {
    setModalSuccessOpen(false);
  };
  return {
    isModalSuccessOpen,
    handleCloseModal,
    handleShowModalSuccess,
  };
}
