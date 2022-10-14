import { Transition } from '@headlessui/react';
import { useContext } from 'react';
// Context
import NotificationContext from '../../context/NotificationContext';

const Notification = () => {
  const { showNotification, notification } = useContext(NotificationContext);

  const notificationIcon = () => {
    switch (notification?.type) {
      case 'error': return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-error" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
      default: return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    }
  }

  const goToLink = () => {
    if (!notification.link) return;
    window.open(
      notification.link,
      '_blank' // open in a new window.
    );
  }

  return (
    <Transition
      show={showNotification || false}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="w-full flex justify-end fixed pr-5 z-50">
        <div className="max-w-sm">
          <div className="bg-white rounded-lg border-gray-300 border p-3 shadow-lg">
            <div className="flex flex-row">
              <div className="px-2">
                { notificationIcon() }
              </div>
              <div className="ml-2 mr-6 cursor-pointer" onClick={() => goToLink()}>
                <span className="font-semibold">{notification?.title}</span>
                <span className="block text-gray-500">{notification?.description}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  )
}

export default Notification;