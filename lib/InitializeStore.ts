import { ThunkDispatch } from 'redux-thunk'
import { Store, AnyAction } from 'redux'
import { Option } from 'tsoption'

export type InitializeStore<UserState, Api> = (
  initialState?: UserState | undefined,
) => Store<UserState, AnyAction> & {
  dispatch: ThunkDispatch<{}, (token: Option<string>) => Api, AnyAction>
}
