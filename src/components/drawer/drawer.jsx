import { Transition } from "@headlessui/react";

export const Drawer = ({ isOpen, children, ...props }) => {
  console.log(".addrawer", isOpen);
  return (
    <Transition
      show={isOpen}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      {children}
    </Transition>
  );
};
