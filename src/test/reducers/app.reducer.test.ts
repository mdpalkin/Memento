import {AppInitialStateType, appReducer, initializeAppTC, setAppError, setAppStatus} from "../../app/app.reducer.ts";

let startState: AppInitialStateType;

beforeEach(() => {
    startState = {
        error: null,
        status: 'idle',
        isInitialized: false
    }
})
describe('Common application work', () => {

    test('Error should be change', () => {
        const endState = appReducer(startState, setAppError({error: 'Some error'}))

        expect(endState.error).toBe('Some error')
        expect(endState.status).toBe('idle')
    })

    test('Status should be change', () => {
        const endState = appReducer(startState, setAppStatus({status: 'succeeded'}))

        expect(endState.error).toBe(null)
        expect(endState.status).toBe('succeeded')
    })

    test('app should be initialized', () => {
        const endState = appReducer(startState, initializeAppTC.fulfilled(undefined, ''))

        expect(endState.isInitialized).toBeTruthy()
    })
})