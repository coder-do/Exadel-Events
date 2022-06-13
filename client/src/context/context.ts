import { Context, createContext } from "react"

interface IAppContext {
	isLoggedIn: boolean,
	setIsLoggedIn: (isLoggedIn: boolean) => void
}

export const AppContext: Context<IAppContext> = createContext<IAppContext>({
	isLoggedIn: false,
	setIsLoggedIn: (isLoggedIn: boolean) => { }
})