import type {Metadata} from 'next';
import {PageHero} from '@/components/ui/page-hero';
import {Container} from '@/components/ui/container';
import {NewsList} from '@/components/news/news-list';
export const metadata:Metadata={title:'News & Public Record'};
export default function News(){return <><PageHero title="News & public record" label="Published source material" description="Public statements and reported activities, with direct links to the original sources."/><section className="py-16 sm:py-20"><Container><NewsList/></Container></section></>}
