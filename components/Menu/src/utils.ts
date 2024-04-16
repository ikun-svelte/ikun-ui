import type { KMenuInstance, KMenuInstanceOption } from "./types";


export const createKMenu = (options: KMenuInstanceOption):KMenuInstance =>  {
  return {
    /**
     * @internal
     */
    __propHandleEvtMap: [],
    __dynamicProps: {
      ...options
    }
  }
}
