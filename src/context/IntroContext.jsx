import { createContext, useContext } from 'react'

/** True once the loading screen has started revealing the page. */
export const IntroContext = createContext(false)
export const useIntroDone = () => useContext(IntroContext)
