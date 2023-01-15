import React from 'react';
import { createRoot } from 'react-dom/client';
import { InertiaApp } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';
import * as Sentry from '@sentry/browser';

InertiaProgress.init({
  color: '#ED8936',
  showSpinner: true
});

Sentry.init({
  dsn: process.env.MIX_SENTRY_LARAVEL_DSN
});

// After

const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
 <InertiaApp
    initialPage={JSON.parse(app.dataset.page)}
    resolveComponent={name =>
      import(`./Pages/${name}`).then(module => module.default)
    }
  />
);


