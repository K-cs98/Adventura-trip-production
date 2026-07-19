import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request: { headers: request.headers } });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.set({ name, value: '', ...options });
        }
      }
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin') &&
    request.nextUrl.pathname !== '/admin/login';

  if (isAdminRoute && !user) {
    const loginUrl = new URL('/admin/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (isAdminRoute && user) {
    // Confirm this user is actually in admin_users, not just any signed-in visitor.
    const { data: adminRow } = await supabase
      .from('admin_users')
      .select('id')
      .eq('id', user.id)
      .maybeSingle();

    if (!adminRow) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('error', 'not_authorized');
      return NextResponse.redirect(loginUrl);
    }
  }

  return response;
}

export const config = {
  matcher: ['/admin/:path*']
};
