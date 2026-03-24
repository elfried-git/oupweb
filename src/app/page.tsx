'use client';

import { useState, useCallback, useEffect, memo } from 'react';
import { useAuthStore } from '@/stores/auth-store';
import { useTranslation } from '@/hooks/use-translation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { DashboardView } from '@/components/dashboard/dashboard-view';

const LoginPage = memo(function LoginPage() {
  const { isAuthenticated, login, setLoading, isLoading } = useAuthStore();
  const { t } = useTranslation();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState('');
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        await fetch('/api/seed', { method: 'POST' });
      } catch {
        // ignore
      }
      setIsPageLoading(false);
    };
    init();
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || t.login.invalidCredentials);
        return;
      }

      login(data.user);
    } catch {
      setError(t.login.errorOccurred);
    } finally {
      setLoading(false);
    }
  }, [email, password, login, setLoading, t.login]);

  const fillDemoCredentials = useCallback((role: string, demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
  }, []);

  if (isPageLoading) {
    return (
      <div 
        data-testid="login-loading-state" 
        className="min-h-screen flex items-center justify-center p-4"
        style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)' }}
      >
        <div className="w-full max-w-md space-y-4">
          <div className="flex justify-center">
            <div className="h-16 w-48 rounded-xl bg-slate-700/50 animate-pulse" />
          </div>
          <div className="h-8 w-32 mx-auto bg-slate-700/50 animate-pulse rounded-md" />
          <div className="h-4 w-48 mx-auto bg-slate-700/50 animate-pulse rounded-md" />
          <div className="space-y-3 pt-4">
            <div className="h-12 w-full bg-slate-700/50 animate-pulse rounded-xl" />
            <div className="h-12 w-full bg-slate-700/50 animate-pulse rounded-xl" />
            <div className="h-12 w-full bg-slate-700/50 animate-pulse rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div data-testid="login-page" className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]" />
      


      <div className="w-full max-w-md relative z-10 animate-page-enter">
        <Card data-testid="login-card" className="fun-card">
          <CardHeader className="space-y-2 text-center pb-4 pt-8">
            <CardTitle data-testid="login-title" className="text-3xl font-bold">
              <span className="gradient-text">Oupweb</span>
            </CardTitle>
            <CardDescription data-testid="login-subtitle" className="text-base pt-2">
              {t.login.subtitle}
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit} data-testid="login-form">
            <CardContent className="space-y-5 px-6 py-4">
              {error && (
                <Alert 
                  variant="destructive" 
                  className="animate-in fade-in slide-in-from-top-2" 
                  data-testid="login-error"
                  role="alert"
                  aria-live="polite"
                >
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <div data-testid="login-email-group" className="space-y-2">
                <Label htmlFor="email" data-testid="email-label">{t.login.email}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t.login.emailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  data-testid="email-input"
                  data-input-type="email"
                  autoComplete="email"
                  className="h-12 rounded-xl"
                  aria-required="true"
                />
              </div>
              
              <div data-testid="login-password-group" className="space-y-2">
                <Label htmlFor="password" data-testid="password-label">{t.login.password}</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder={t.login.passwordPlaceholder}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    data-testid="password-input"
                    data-input-type="password"
                    autoComplete="current-password"
                    className="h-12 pr-12 rounded-xl"
                    aria-required="true"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-4 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    data-testid="toggle-password-visibility"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <Eye className="h-5 w-5 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>
              

            </CardContent>
            
            <CardFooter className="flex flex-col gap-4 px-6 pt-2 pb-8">
              <Button
                type="submit"
                className="w-full h-12 fun-button rounded-xl text-base font-medium"
                disabled={isLoading}
                data-testid="login-submit-button"
                data-loading={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {t.login.signingIn}
                  </span>
                ) : (
                  t.login.signIn
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
        
        <Card data-testid="demo-credentials-card" className="mt-4 fun-card">
          <CardContent className="pt-4">
            <p data-testid="demo-credentials-title" className="text-sm text-muted-foreground text-center mb-3 font-medium">
              {t.login.demoCredentials}
            </p>
            <div data-testid="demo-credentials-buttons" className="grid grid-cols-3 gap-2">
              {[
                { role: 'Admin', email: 'admin@demo.com', password: 'admin123', testid: 'demo-admin-button' },
                { role: 'User', email: 'user@demo.com', password: 'user123', testid: 'demo-user-button' },
                { role: 'Guest', email: 'guest@demo.com', password: 'guest123', testid: 'demo-guest-button' },
              ].map((demo) => (
                <Button
                  key={demo.role}
                  variant="outline"
                  size="sm"
                  className="flex flex-col h-auto py-3 rounded-xl hover:border-primary/30 transition-colors"
                  onClick={() => fillDemoCredentials(demo.role, demo.email, demo.password)}
                  data-testid={demo.testid}
                  data-role={demo.role.toLowerCase()}
                  data-email={demo.email}
                >
                  <span className="font-bold text-sm">{demo.role}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
});

export default function Home() {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <DashboardView />;
  }
  
  return <LoginPage />;
}
