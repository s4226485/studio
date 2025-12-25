import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollText, Lightbulb, Gem, Loader2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface ReportDisplayProps {
  report: string | null;
  advice: string | null;
  charms: string[] | null;
  isLoading: boolean;
}

const MarkdownRenderer = ({ content }: { content: string }) => {
    // Simple parser for the specific markdown format from the prompt.
    const lines = content.split('\n').filter(line => line.trim() !== '');
    return (
      <div className="space-y-4">
        {lines.map((line, index) => {
          if (line.startsWith('# ')) {
            return <h1 key={index} className="font-headline text-3xl text-primary border-b-2 border-primary/50 pb-2 mb-4">{line.substring(2)}</h1>;
          }
          if (line.startsWith('### ')) {
            const parts = line.substring(4).split('(');
            const title = parts[0].trim();
            const subtitle = parts[1] ? `(${parts[1]}` : '';
            return (
              <h3 key={index} className="font-headline text-xl font-bold flex items-center gap-2 mt-6">
                {title}
                {subtitle && <span className="text-sm font-body text-muted-foreground font-normal">{subtitle}</span>}
              </h3>
            );
          }
           if (line.match(/^\d+\.\s/)) {
            return <p key={index} className="pl-4">{line}</p>;
          }
          if(line.startsWith('**') && line.endsWith('**')) {
              return <p key={index} className="font-bold">{line.substring(2, line.length - 2)}</p>
          }
          return <p key={index} className="leading-relaxed">{line}</p>;
        })}
      </div>
    );
};

const ReportDisplay = ({ report, advice, charms, isLoading }: ReportDisplayProps) => {
  if (isLoading) {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-2 text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="font-headline text-2xl">Summoning Ancient Wisdom...</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <Skeleton className="h-8 w-3/4 mx-auto" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <div className="pt-4 space-y-4">
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!report) {
    return null;
  }
  
  if (report.includes('氣場干擾嚴重')) {
     return (
        <Card className="shadow-lg border-destructive bg-destructive/10">
            <CardHeader>
                <CardTitle className="text-destructive font-headline text-2xl text-center">Analysis Failed</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-lg text-destructive/90">
                <p>{report}</p>
                <p className="mt-2 text-sm">Please try a clearer, front-facing photo.</p>
            </CardContent>
        </Card>
     )
  }

  return (
    <Card className="shadow-lg animate-in fade-in duration-500">
      <CardContent className="p-6">
        <Tabs defaultValue="report" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-primary/10">
            <TabsTrigger value="report" className="font-headline">
              <ScrollText className="mr-2" />
              Report
            </TabsTrigger>
            <TabsTrigger value="advice" className="font-headline" disabled={!advice}>
              <Lightbulb className="mr-2" />
              Advice
            </TabsTrigger>
            <TabsTrigger value="charms" className="font-headline" disabled={!charms}>
              <Gem className="mr-2" />
              Lucky Charms
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="report" className="mt-6">
            <MarkdownRenderer content={report} />
          </TabsContent>
          
          <TabsContent value="advice" className="mt-6">
            {advice ? (
              <div className="space-y-4 text-lg">
                <h3 className="font-headline text-2xl text-primary">Personalized Advice</h3>
                <p className="whitespace-pre-wrap leading-relaxed">{advice}</p>
              </div>
            ) : null}
          </TabsContent>
          
          <TabsContent value="charms" className="mt-6">
            {charms ? (
              <div>
                <h3 className="font-headline text-2xl text-primary mb-4">Your Lucky Charms</h3>
                <ul className="space-y-3">
                  {charms.map((charm, index) => (
                    <li key={index} className="flex items-center gap-3 p-3 bg-primary/10 rounded-md">
                      <Gem className="h-5 w-5 text-primary" />
                      <span className="text-lg">{charm}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </TabsContent>

        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ReportDisplay;
