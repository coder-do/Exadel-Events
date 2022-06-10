import { createContext } from "react"

interface IAppContext {
	isLoggedIn: boolean,
	setIsLoggedIn: (isLoggedIn: boolean) => void
}

export const AppContext = createContext<IAppContext>({
	isLoggedIn: false,
	setIsLoggedIn: (isLoggedIn: boolean) => { }
})