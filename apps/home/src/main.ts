import { init } from '@module-federation/enhanced/runtime';

// Initialize the federation runtime with your remote applications
init({
  name: 'home',
  remotes: [
    {
      name: 'angularApp',
      entry: 'http://localhost:4201/remoteEntry.mjs',
    },
    {
      name: 'reactApp',
      entry: 'http://localhost:4202/remoteEntry.js',
    },
  ],
});

// Now import the UI element
import './app/app.element';
