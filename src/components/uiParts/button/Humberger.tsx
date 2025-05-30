import { useState } from "react";
import { humberger, humbergerLineTop, humbergerLineMiddle, humbergerLineBottom } from "@styles/HeaderTv";

interface HumbergerProps {
  isOpen?: boolean; // 外部で制御される開閉状態
  toggle?: () => void; // 外部から開閉を切り替える関数
  isInner: boolean;
}

const Humberger: React.FC<HumbergerProps> = ({ isOpen: externalIsOpen, toggle: externalToggle, isInner }) => {
  // 内部で開閉状態を管理するためのステート
  const [internalIsOpen, setInternalIsOpen] = useState(false);

  // isOpenとtoggleが外部から提供されない場合、内部状態を使用
  const isControlled = externalIsOpen !== undefined && externalToggle !== undefined;
  const isOpen = isControlled ? externalIsOpen : internalIsOpen;
  const toggle = isControlled ? externalToggle : () => setInternalIsOpen((prev) => !prev);
  return (
    <>
      <button
        onClick={toggle}
        type="button"
        aria-description="menu"
        className={humberger()}
        tabIndex={!isInner ? 0 : isOpen ? 0 : -1}
      >
        <div className={humbergerLineTop({ isOpen: isOpen })} />
        <div className={humbergerLineMiddle({ isOpen: isOpen })} />
        <div className={humbergerLineBottom({ isOpen: isOpen })} />
      </button>
    </>
  );
};

export default Humberger;
