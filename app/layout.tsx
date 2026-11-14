import type {Metadata,Viewport} from 'next';
import './globals.css';
import {SiteHeader} from '@/components/layout/site-header';
import {SiteFooter} from '@/components/layout/site-footer';
import {site} from '@/lib/site';
export const metadata:Metadata={
 title:{default:'Usman Musa Ndakpayi | Chanchaga 2027',template:'%s | Ndakpayi 2027'},
 description:site.description,
 robots:{index:false,follow:false},
 openGraph:{title:site.name,description:site.description,locale:'en_NG',type:'website'}
};
export const viewport:Viewport={width:'device-width',initialScale:1,themeColor:'#073f86'};
export default function RootLayout({children}:{children:React.ReactNode}){
 return <html lang="en"><body className="min-h-screen"><SiteHeader/><main id="main-content">{children}</main><SiteFooter/></body></html>;
}
