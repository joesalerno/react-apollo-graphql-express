const MyApp = ({Component, pageProps}) => <Component {...pageProps} />

MyApp.getInitialProps = async ({Component, ctx}) => {
  let pageProps = {}

  if (Component.getInitialProps) pageProps = await Component.getInitialProps(ctx)
  
  return {pageProps: {...pageProps, session: ctx.req.session}}
}

export default MyApp