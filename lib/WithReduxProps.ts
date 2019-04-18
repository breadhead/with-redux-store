import { Store } from './Store'

export interface WithReduxProps<UserState> {
  reduxStore: Store<UserState>
}
