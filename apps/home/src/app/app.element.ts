import { loadRemote } from '@module-federation/enhanced/runtime';

export class AppElement extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <div class="relative min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <!-- Profile Card -->
      <div class="z-10 bg-white shadow-2xl rounded-3xl p-10 max-w-lg w-full">
        <div class="flex flex-col items-center text-center space-y-6">
          <div class="flex items-center space-x-6">
           <img 
  src="/assets/shared/profile_pic.jpg" 
  alt="Ravindar Balla" 
  class="w-32 h-32 rounded-full border-4 border-gray-100 shadow-sm" 
/>
            <div class="text-left">
              <h1 class="text-3xl font-bold text-gray-900">Ravindar Balla</h1>
              <p class="text-blue-600 font-medium">Full Stack Developer</p>
              <p class="text-gray-500 flex items-center mt-1">📍 Washington DC</p>
            </div>
          </div>

          <div class="w-full pt-6 border-t border-gray-100 flex flex-col gap-4">
            <p class="text-sm font-semibold text-gray-400 uppercase tracking-widest text-center">Launch Micro Frontends</p>
            <div class="flex gap-4">
              <button id="btn-angular" class="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition transform hover:scale-105 shadow-lg shadow-red-200">
                Angular App
              </button>
              <button id="btn-react" class="flex-1 px-6 py-3 bg-cyan-600 text-white rounded-xl font-bold hover:bg-cyan-700 transition transform hover:scale-105 shadow-lg shadow-cyan-200">
                React App
              </button>
            </div>
          </div>
        </div>

        <!-- MFE Viewport -->
        <div id="mfe-viewport" class="mt-8 rounded-xl overflow-hidden"></div>
      </div>
    </div>
    `;

    // Use ! to tell TS: "I know these exist because I just defined them above in innerHTML"
    this.querySelector('#btn-angular')!.addEventListener('click', () => this.handleLoad('angularApp'));
    this.querySelector('#btn-react')!.addEventListener('click', () => this.handleLoad('reactApp'));
  }

  async handleLoad(appName: string) {
    const viewport = document.getElementById('mfe-viewport');
    
    // Safety check for viewport
    if (!viewport) return;

    viewport.innerHTML = '<div class="p-4 text-center text-gray-400 animate-pulse">Loading Remote...</div>';
    
    try {
      const module = await loadRemote(`${appName}/Module`) as any;
      viewport.innerHTML = '';
      
      if (appName === 'reactApp' && module.mount) {
        module.mount(viewport);
      } else {
        // Angular approach
        const el = document.createElement('angular-app-root');
        viewport.appendChild(el);
      }
    } catch (err: any) {
      viewport.innerHTML = `<div class="p-4 bg-red-50 text-red-500 rounded-lg">Failed to connect to ${appName}</div>`;
      console.error(err);
    }
  }
}

customElements.define('mfe-home-root', AppElement);
