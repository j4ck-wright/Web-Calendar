import { Icon } from "@iconify/react";

export default function BottomNavbar() {
  return (
    <div className='btm-nav text-2xl'>
      <button type='button' className='active'>
        <Icon icon='ph:info' />
      </button>

      <button type='button' className='active'>
        <Icon icon='iconamoon:menu-burger-horizontal-bold' />
      </button>
    </div>
  );
}
