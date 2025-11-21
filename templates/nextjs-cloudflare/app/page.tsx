import { ThemeSwitcher } from '@/components/theme-switcher';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-foreground">Welcome to Your Project</h1>
          <ThemeSwitcher />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Next.js 14</CardTitle>
              <CardDescription>App Router with React Server Components</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Server-first architecture with streaming and Suspense support.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cloudflare Workers</CardTitle>
              <CardDescription>Edge computing at scale</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Deploy globally with D1, KV, R2, and Queues.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>17 Themes</CardTitle>
              <CardDescription>Light and dark modes</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Switch between Aurora, Zen, Terracotta, Neon, and Opulence themes.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-4">
          <Button size="lg">Get Started</Button>
          <Button variant="secondary" size="lg">
            View Documentation
          </Button>
        </div>
      </div>
    </main>
  );
}
