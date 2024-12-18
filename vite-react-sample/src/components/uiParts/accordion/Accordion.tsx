import { useState } from "react";
import {
  accordion,
  accordionChildren,
  accordionTitle,
  accordionToggleButton,
  accordionToggleButtonIcon,
} from "../../../styles/AccordionTv";
import { accordionButtonIcon, xmlNameSpace } from "../../../constants/SvgConstants";
import { header1 } from "../../../styles/CommonTv";

interface SearchConditionAccordionProps {
  isOpen?: boolean; // 外部で制御される開閉状態
  toggle?: () => void; // 外部から開閉を切り替える関数
  children: React.ReactNode;
  title: string;
}

const SearchConditionAccordion: React.FC<SearchConditionAccordionProps> = ({
  isOpen: externalIsOpen,
  toggle: externalToggle,
  title,
  children,
}) => {
  // 内部で開閉状態を管理するためのステート
  const [internalIsOpen, setInternalIsOpen] = useState(true);

  // isOpenとtoggleが外部から提供されない場合、内部状態を使用
  const isControlled = externalIsOpen !== undefined && externalToggle !== undefined;
  const isOpen = isControlled ? externalIsOpen : internalIsOpen;
  const toggle = isControlled ? externalToggle : () => setInternalIsOpen((prev) => !prev);

  return (
    <div id="accordion-collapse" data-accordion="collapse" className={accordion()}>
      <h1 id="accordion-collapse-heading-1" className={header1()}>
        <button
          type="button"
          className={accordionToggleButton({ isOpen })}
          data-accordion-target="#accordion-collapse-body-1"
          aria-expanded={isOpen}
          aria-controls="accordion-collapse-body-1"
          onClick={toggle}
        >
          <span className={accordionTitle()}>{title}</span>
          <svg
            data-accordion-icon
            className={accordionToggleButtonIcon({ isOpen })}
            aria-hidden="true"
            xmlns={xmlNameSpace}
            fill="none"
            viewBox="0 0 10 6"
          >
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={accordionButtonIcon} />
          </svg>
        </button>
      </h1>
      <div
        id="accordion-collapse-body-1"
        className={accordionChildren({ isOpen })}
        aria-labelledby="accordion-collapse-heading-1"
      >
        {children}
      </div>
    </div>
  );
};

export default SearchConditionAccordion;
