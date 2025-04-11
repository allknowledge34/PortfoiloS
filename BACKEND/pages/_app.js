
import Aos from "@/components/Aos";
import Loading from "@/components/Loading";
import ParentComponent from "@/components/ParentComponent";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// import { SessionProvider } from "next-auth/react";


export default function App({ Component, pageProps}) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplate = () => setLoading(false);

    if (router.isReady) {
      setLoading(false);
    }

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routerChangeComplete', handleComplate);
    router.events.on('routeChangeError', handleComplate);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routerChangeComplete', handleComplate);
      router.events.off('routeChangeError', handleComplate);
    }
  }, [router.isReady]);

  const [asideOpen, setAsideOpen] = useState(false);

  const AsideClickOpen = () => {
    setAsideOpen(!asideOpen)
  }


  return <>
    {/* {loading ? (
      <div className="flex flex-col flex-center wh_100">
        <Loading />
        <h1 className="mt-1">Loading...</h1>
      </div>
    ) : (
      <> */}
      {/* <SessionProvider session={session}> */}
        <ParentComponent appOpen={asideOpen} appAsideOpen={AsideClickOpen} />
      {/* </SessionProvider> */}
        <main>
          {/* <Aos> */}
          <div className={asideOpen ? 'container' : 'container active'}>
            {/* <SessionProvider session={session}> */}
              <Component {...pageProps} />
            {/* </SessionProvider> */}
          </div>
          {/* </Aos> */}
        </main>
      </>
  //   )}

  // </>
}
