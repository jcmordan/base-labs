import { CreateUserFields } from "@/types"
import { createContext, Dispatch, useContext, useReducer } from "react"

interface State {
    contactInformation: CreateUserFields | null
    orderedCorns: number
    dispatch: Dispatch<Action>
}

const initialState: State = {
    contactInformation: null,
    orderedCorns: 0,
    dispatch: () => { }
}


const cornOrderReducer = (state: State, action: Action) => {
    switch (action.type) {
        case 'SET_CONTACT_INFORMATION':
            return { ...state, contactInformation: action.payload }
        case 'SET_ORDERED_CORNS':
            return { ...state, orderedCorns: state.orderedCorns + action.payload }
    }
}

export type Action = {
    type: 'SET_CONTACT_INFORMATION'
    payload: CreateUserFields
} | {
    type: 'SET_ORDERED_CORNS'
    payload: number
}

const CornOrderContext = createContext<State | null>(null)

export const CornOrderProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(cornOrderReducer, initialState)

    return <CornOrderContext.Provider value={{ ...state, dispatch }}>{children}</CornOrderContext.Provider>
}

export const useCornOrderContext = () => {
    const context = useContext(CornOrderContext)

    if (!context) {
        throw new Error('useCornOrderContext must be used within a CornOrderProvider')
    }
    
    return context
}