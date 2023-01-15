import type { Breadcrumb } from '@sentry/types';
declare type RequiredProperties = 'category' | 'message';
/**
 * Create a breadcrumb for a replay.
 */
export declare function createBreadcrumb(breadcrumb: Pick<Breadcrumb, RequiredProperties> & Partial<Omit<Breadcrumb, RequiredProperties>>): Breadcrumb;
export {};
//# sourceMappingURL=createBreadcrumb.d.ts.map