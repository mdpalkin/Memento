import {AppInitialStateType, appReducer, setError, setAppStatus} from "../../app/app.reducer.ts";

let startState: AppInitialStateType;

beforeEach(() => {
    startState = {
        error: null,
        status: 'idle'
    }
})
describe('Common application work', () => {

    test('Error should be change', () => {
        const endState = appReducer(startState, setError('Some error'))

        expect(endState.error).toBe('Some error')
        expect(endState.status).toBe('idle')
    })

    test('Status should be change', () => {
        const endState = appReducer(startState, setAppStatus('succeeded'))

        expect(endState.error).toBe(null)
        expect(endState.status).toBe('succeeded')
    })
})