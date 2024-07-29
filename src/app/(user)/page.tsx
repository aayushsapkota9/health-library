import { Tabs, TabsList, TabsPanel, TabsTab, Title } from '@mantine/core';
import '@mantine/core/styles.css';
import classes from './Demo.module.css';
import Search from '@/src/components/pages/root/Search';
import Browse from '@/src/components/pages/root/Browse';

export default function Home() {
  return (
    <main className="flex flex-col  items-center mt-8">
      <Title order={1} className="text-black">
        Diseases & Conditions
      </Title>
      <section className="mt-10 w-2/3">
        <Tabs defaultValue="search" variant="unstyled" classNames={classes}>
          <TabsList className="mb-2" grow>
            <TabsTab value="search">SEARCH</TabsTab>
            <TabsTab value="browse">BROWSE A-Z</TabsTab>
          </TabsList>
          <TabsPanel value="search">
            <div className="mt-8">
              <Search></Search>
            </div>{' '}
          </TabsPanel>
          <TabsPanel value="browse">
            <div className="mt-8">
              <Browse></Browse>
            </div>{' '}
          </TabsPanel>
        </Tabs>
      </section>
    </main>
  );
}
