import { type ReactNode } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface AppTab {
  id: string;
  label: string;
  content: ReactNode;
}

interface AppPageShellProps {
  title: string;
  description: string;
  modeLabel: string;
  action?: ReactNode;
  tabs: AppTab[];
}

export default function AppPageShell({ title, description, modeLabel, action, tabs }: AppPageShellProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-border bg-white/90 p-8 shadow-lg">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm text-muted uppercase tracking-[0.2em] mb-2">โหมด {modeLabel}</p>
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            <p className="mt-2 text-sm text-muted max-w-2xl">{description}</p>
          </div>
          {action ? <div>{action}</div> : null}
        </div>

        <div className="mt-8">
          <Tabs defaultValue={tabs[0]?.id ?? "dashboard"}>
            <TabsList className="rounded-2xl bg-muted p-1">
              {tabs.map((tab) => (
                <TabsTrigger key={tab.id} value={tab.id} className="px-4 py-2">
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {tabs.map((tab) => (
              <TabsContent key={tab.id} value={tab.id} className="rounded-3xl bg-background p-6 mt-4 border border-border">
                {tab.content}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
}
