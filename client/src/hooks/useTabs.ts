import { useCallback, useEffect, useRef, useState } from "react";

interface TabsHookValue {
  tabsRef: React.MutableRefObject<(HTMLAnchorElement | null)[]>;
  panelsRef: React.MutableRefObject<(HTMLElement | null)[]>;
  selectedTabIndex: number;
  handleTabClick: (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    index: number
  ) => void;
}

export default function useTabs(defaultTabIndex: number): TabsHookValue {
  const tabsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const panelsRef = useRef<(HTMLElement | null)[]>([]);
  const [selectedTabIndex, setSelectedTabIndex] = useState(defaultTabIndex);

  useEffect(() => {
    const tabs = tabsRef.current;
    const panels = panelsRef.current;

    function handler(e: KeyboardEvent) {
      const index = tabs.indexOf(e.target as any);

      switch (e.code) {
        case "ArrowRight": {
          e.preventDefault();
          const newIndex = (index + 1) % tabs.length;
          tabs[newIndex]?.focus();
          setSelectedTabIndex(newIndex);
          break;
        }
        case "ArrowLeft": {
          e.preventDefault();
          const newIndex = (index + tabs.length - 1) % tabs.length;
          tabs[newIndex]?.focus();
          setSelectedTabIndex(newIndex);
          break;
        }
        case "ArrowDown":
          e.preventDefault();
          panels[index]?.focus();
          break;
        default:
          break;
      }
    }

    tabs.forEach((tab) => tab?.addEventListener("keydown", handler));

    return () => {
      tabs.forEach((tab) => tab?.removeEventListener("keydown", handler));
    };
  });

  const handleTabClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, index: number) => {
      e.preventDefault();
      setSelectedTabIndex(index);
    },
    []
  );

  return {
    tabsRef,
    panelsRef,
    selectedTabIndex,
    handleTabClick,
  };
}
