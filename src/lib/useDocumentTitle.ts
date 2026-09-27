import { useEffect } from "react";

/** Sets the browser-tab title while a page is showing, so every page has its own. */
export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
