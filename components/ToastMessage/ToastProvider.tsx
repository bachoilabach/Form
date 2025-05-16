import React, { useEffect } from 'react';
import { useShowToast } from '@/hooks/useShowToast';

import { toastService } from '@/services/toast.services';
import ToastMessage from './ToastMessage';

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const { showToast, visible, status, message } = useShowToast();

  useEffect(() => {
    toastService.setController({ showToast });
  }, [showToast]);

  return (
    <>
      {children}
      <ToastMessage visible={visible} status={status} message={message} />
    </>
  );
};
