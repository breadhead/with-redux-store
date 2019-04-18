import {
  AppComponentType,
  AppProps,
  DefaultAppIProps,
  NextAppContext
} from 'next/app'
import * as React from 'react'

import { getOrCreateStore } from './getOrCreateStore'
import { Store } from 'redux'
import { WithReduxProps } from './WithReduxProps'
import { InitializeStore } from './InitializeStore'

type NextProps = AppProps & DefaultAppIProps

export const withReduxStore = <
  UserState extends {},
  Api,
  AppContext extends any
>(
  Application: AppComponentType<NextProps & WithReduxProps<UserState>>,
  initializeStore: InitializeStore<UserState, Api>
) => {
  return class AppWithRedux extends React.Component<NextProps> {
    public static async getInitialProps(appContext: NextAppContext) {
      const reduxStore = getOrCreateStore<UserState, Api>(initializeStore)
      const context: AppContext = appContext.ctx as any

      context.reduxStore = reduxStore

      let appProps = {}
      if (typeof Application.getInitialProps === 'function') {
        appProps = await Application.getInitialProps(appContext)
      }

      return {
        ...appProps,
        initialReduxState: reduxStore.getState()
      }
    }

    public reduxStore: Store<UserState>

    constructor(props: any) {
      super(props)
      this.reduxStore = getOrCreateStore(
        initializeStore,
        props.initialReduxState
      )
    }

    public render() {
      return <Application {...this.props} reduxStore={this.reduxStore} />
    }
  }
}
