<script lang="ts">
  import '../index.css';

  import {writable} from 'svelte/store';

  import Interface from '../components/Interface.svelte';

  const state = writable<{[paramId: string]: number}>({});
  const error = writable<{error: any}>({error: null});

  // Interop bindings
  function requestParamValueUpdate(paramId: string, value: number) {
    if (typeof globalThis.__postNativeMessage__ === 'function') {
      globalThis.__postNativeMessage__('setParameterValue', {
        paramId,
        value
      });
    } else {
      // Fallback to make knobs work without native.
      state.update(s => {
        s[paramId] = value;
        return s;
      });
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    if (import.meta.hot != null) {
      import.meta.hot.on('reload-dsp', () => {
        console.log('Sending reload dsp message');

        if (typeof globalThis.__postNativeMessage__ === 'function') {
          globalThis.__postNativeMessage__('reload');
        }
      });
    }
  }

  $: {
    if (window) {
      globalThis.__receiveStateChange__ = function (state) {
        $state = JSON.parse(state);
      };

      globalThis.__receiveError__ = (err: any) => {
        $error = {error: err};
      };
    }
    // Request initial processor state
    if (typeof globalThis.__postNativeMessage__ === 'function') {
      globalThis.__postNativeMessage__('ready');
    }
  }
</script>

<Interface
  state={$state}
  error={$error.error}
  {requestParamValueUpdate}
  resetErrorState={() => ($error = {error: null})}
/>
