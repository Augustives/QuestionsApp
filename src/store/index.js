import { 
    createContext,
    useReducer
 } from "react"
import { questionsReducer, initialState } from "./reducers"


function Store(props) {
  const [state, dispatch] = useReducer(questionsReducer, initialState)

  return (
    <Context.Provider value={{
        state,
        dispatch
    }}>
      {props.children}
    </Context.Provider>
  )
}

export const Context = createContext(initialState)

export default Store
