# with-redux-store

## Usage

```
import { withReduxStore, WithReduxProps } from '@breadhead/with-redux-store'



class FabulousApp extends App<WithReduxProps<State>> {
  public static async getInitialProps() {
    return {}
  }

  public render() {
    const { Component, pageProps, reduxStore } = this.props

    return (
      <Container>
        <StoreContext.Provider value={reduxStore}>
          <Component {...pageProps} />
        </StoreContext.Provider>
      </Container>
    )
  }
}

export default withReduxStore<State, Api, AppContext>(
  FabulousApp as any,
  initializeStore,
)

```