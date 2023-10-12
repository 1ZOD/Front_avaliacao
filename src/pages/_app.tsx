import '@/styles/globals.css'
import '@/styles/components/nav_style/nav_bar.css';
import '@/styles/components/button/button.css';
import '@/styles/components/title/title.css';
import '@/styles/components/calendario/calendario.css';
import '@/styles/pages/daily_habits.css'
import type { AppProps } from 'next/app'
import { Navbar } from '@/components/navbar/Navbar';


export default function App({ Component, pageProps }: AppProps) {
  return (
    <Navbar>
      <Component {...pageProps}/>
    </Navbar>
  );
}
