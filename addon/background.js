/*
    Firefox plugin for one-click removal

    INSTALLATION:
    1. In Firefox, type: about:debugging#/runtime/this-firefox
    2. Click "Load Temporary Add-on..."
    3. Select the manifest.json file from this directory

    USAGE:
    - Alt+Shift+X - toggles removal mode
    - OR click the extension icon in the toolbar
    - Hover over the item (it will highlight in red)
    - Click to remove

    NOTE: The temporary add-on disappears after restarting Firefox.
    To install it permanently, it must be signed by addons.mozilla.org
*/

browser.action.onClicked.addListener((tab) => {
  toggleRemoveMode(tab.id);
});

browser.commands.onCommand.addListener((command) => {
  if (command === "toggle-remove-mode") {
    browser.tabs.query({active: true, currentWindow: true}).then(tabs => {
      toggleRemoveMode(tabs[0].id);
    });
  }
});

function toggleRemoveMode(tabId) {
  browser.scripting.executeScript({
    target: { tabId: tabId },
    func: () => {
      // Funkcja wyłączająca tryb - definiuj zawsze na początku
      window.disableRemoverMode = () => {
        window.removerActive = false;
        
        if (window.removerHandler) {
          document.removeEventListener('click', window.removerHandler, true);
        }
        if (window.removerHover) {
          document.removeEventListener('mouseover', window.removerHover, true);
        }
        if (window.removerStyle) {
          window.removerStyle.remove();
        }
        
        document.getElementById('remover-info')?.remove();
        
        document.querySelectorAll('.remover-highlight').forEach(el => {
          el.classList.remove('remover-highlight');
        });
      };
      
      if (typeof window.removerActive === 'undefined') {
        window.removerActive = false;
        window.removerHandler = null;
        window.removerHover = null;
        window.removerStyle = null;
      }
      
      if (!window.removerActive) {

        window.removerActive = true;
        
        window.removerStyle = document.createElement('style');
        window.removerStyle.textContent = '.remover-highlight { outline: 3px solid red !important; cursor: crosshair !important; }';
        document.head.appendChild(window.removerStyle);
        
        let hoveredElement = null;
        
        window.removerHover = (e) => {
          if (e.target.closest('#remover-info')) {
            if (hoveredElement) hoveredElement.classList.remove('remover-highlight');
            hoveredElement = null;
            return;
          }
          if (hoveredElement) hoveredElement.classList.remove('remover-highlight');
          hoveredElement = e.target;
          hoveredElement.classList.add('remover-highlight');
        };
        document.addEventListener('mouseover', window.removerHover, true);
        
        window.removerHandler = (e) => {
          if (e.target.closest('#remover-info'))
            return;
          e.preventDefault();
          e.stopPropagation();
          e.target.remove();
        };
        document.addEventListener('click', window.removerHandler, true);
        
        let info = document.createElement('div');
        info.id = 'remover-info';
        info.style.cssText = 'position:fixed;top:10px;right:10px;background:#d32f2f;color:white;padding:15px 20px;z-index:2147483647;font-family:sans-serif;border-radius:5px;box-shadow:0 2px 10px rgba(0,0,0,0.3);font-size:14px;';
        info.innerHTML = '<strong>REMOVE MODE</strong><br>Click item to remove<br><small>Alt+Shift+X to disable</small><span id="remover-close" style="position:absolute;top:5px;right:10px;cursor:pointer;font-size:20px;font-weight:bold;">×</span>';
        document.body.appendChild(info);
        
        document.getElementById('remover-close').addEventListener('click', (e) => {
          e.stopPropagation();
          e.preventDefault();
          window.disableRemoverMode();
        });

      } else {
        window.disableRemoverMode();
      }
    }
  });
}