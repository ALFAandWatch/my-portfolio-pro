import PageContent from './PageContent';
import type { Lang } from '@/types/i18b';

export default async function Home({
   params,
}: {
   params: Promise<{ lang: Lang }>;
}) {
   const { lang } = await params;

   return <PageContent lang={lang} />;
}
