<script lang="ts">
  import manifest from '../../public/manifest.json';
  import ErrorAlert from './ErrorAlert.svelte';
  import Knob from './Knob.svelte';
  import Logo from './Logo.svelte';

  const colors = {
    meterColor: '#EC4899',
    knobColor: '#64748B',
    thumbColor: '#F8FAFC'
  };

  export let state: {[paramId: string]: number};
  export let error: any;
  export let requestParamValueUpdate: (paramId: string, value: number) => void;
  export let resetErrorState: () => void;

  $: params = manifest.parameters.map(({paramId, name}: {paramId: string; name: string}) => {
    let currentValue = state[paramId] || 0;

    return {
      paramId,
      name,
      value: currentValue,
      readout: `${Math.round(currentValue * 100)}%`,
      setValue: (v: number) => requestParamValueUpdate(paramId, v)
    };
  });

  // @ts-ignore
  $: commitHash = __COMMIT_HASH__;
  // @ts-ignore
  $: buildDate = __BUILD_DATE__;
</script>

<div class="bg-mesh h-screen min-h-[238px] w-full min-w-[492px] bg-slate-800 p-8">
  <div class="text-md flex h-1/5 select-none items-center justify-between text-slate-400">
    <Logo extraClasses="h-8 w-auto text-slate-100" />
    <div>
      <span class="font-bold">SRVB (Svelte)</span> &middot; {buildDate} &middot; {commitHash}
    </div>
  </div>
  <div class="flex h-4/5 flex-col">
    {#if error}
      <ErrorAlert message={error.message} reset={resetErrorState} />
    {/if}
    <div class="flex flex-1">
      {#each params as { name, value, readout, setValue }}
        <div class="flex flex-1 flex-col items-center justify-center">
          <Knob {value} on:change={e => setValue(e.detail)} {colors} />
          <div class="mt-2 flex-initial">
            <div class="text-center text-sm font-light text-slate-50">{name}</div>
            <div class="text-center text-sm font-light text-pink-500">{readout}</div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
