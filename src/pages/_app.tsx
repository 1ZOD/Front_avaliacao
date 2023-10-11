import '@/styles/globals.css'
import '@/styles/nav_style/nav_bar.css';
import '@/styles/button/button.css';
import type { AppProps } from 'next/app'
import { Navbar } from '@/components/navbar/Navbar';


export default function App({ Component, pageProps }: AppProps) {
  return (
    <Navbar>
      <Component {...pageProps}/>
    </Navbar>
  );
}
