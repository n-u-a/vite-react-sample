import { Dispatch, SetStateAction } from "react";

interface SearchConditionAccordionInterface {
  toggle: () => void;
  open: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  children: React.ReactNode;
}

const SearchConditionAccordion: React.FC<SearchConditionAccordionInterface> = ({ toggle, isOpen, children }) => {
  return (
    <>
      <div id="accordion-collapse" data-accordion="collapse" className="bg-gray-100 mb-4 rounded-t-md ">
        <h2 id="accordion-collapse-heading-1">
          <button
            type="button"
            className="flex items-center justify-between w-full p-2 font-medium rtl:text-right text-gray-900 border border-gray-200 rounded-t-md hover:bg-gray-100  gap-3"
            data-accordion-target="#accordion-collapse-body-1"
            aria-expanded={isOpen}
            aria-controls="accordion-collapse-body-1"
            onClick={toggle}
          >
            <span className="text-lg">検索条件</span>
            <svg
              data-accordion-icon
              className="w-3 h-3 rotate-180 shrink-0"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
            </svg>
          </button>
        </h2>
        <div
          id="accordion-collapse-body-1"
          className={`${isOpen ? "" : "hidden"}`}
          aria-labelledby="accordion-collapse-heading-1"
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default SearchConditionAccordion;
