import { Icon } from "@iconify/react";
import ConfigModal from "./ConfigModal";
import { useState } from "react";

export default function BottomNavbar(props: { updateSettings: any }) {
  const [showInfoModal, updateInfoModal] = useState(false);
  function infoBtnClicked() {
    const state = showInfoModal;
    updateInfoModal(!state);
  }

  return (
    <>
      {showInfoModal === true && (
        <ConfigModal
          closeBtn={infoBtnClicked}
          updateSettings={props.updateSettings}
        />
      )}
      <div className='btm-nav text-2xl'>
        <button type='button' className='active dark:bg-gray-800 text-white'>
          <Icon icon='ph:info' />
        </button>

        <button
          type='button'
          className='active dark:bg-gray-800 text-white'
          onClick={infoBtnClicked}
        >
          <Icon icon='iconamoon:menu-burger-horizontal-bold' />
        </button>
      </div>
    </>
  );
}
