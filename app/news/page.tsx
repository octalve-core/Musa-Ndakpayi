import type {Metadata} from 'next';
import {PageHero} from '@/components/ui/page-hero';
import {Container} from '@/components/ui/container';
import {NewsList} from '@/components/news/news-list';
export const metadata:Metadata={title:'News & Updates'};
export default function News(){return <><PageHero title="News & updates" label="Campaign in the community" description="Follow news, public statements and community activities involving Musa Usman Ndakpayi and Chanchaga Federal Constituency."/><section className="py-16 sm:py-20"><Container><NewsList/></Container></section></>}
