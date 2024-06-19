<script lang="ts">
	import { Icon, XCircle, XMark } from 'svelte-hero-icons';

	export let message: string;
	export let reset: () => void;
</script>

<div class="rounded-md bg-red-50 p-4">
	<div class="flex">
		<div class="flex-shrink-0">
			<Icon src={XCircle} class="h-5 w-5 text-red-400" aria-hidden="true" />
		</div>
		<div class="ml-3">
			<p class="text-sm font-medium text-red-800">{message}</p>
		</div>
		<div class="ml-auto pl-3">
			<div class="-mx-1.5 -my-1.5">
				<button
					type="button"
					on:click={reset}
					class="inline-flex rounded-md bg-red-50 p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
				>
					<span class="sr-only">Dismiss</span>
					<Icon src={XMark} class="h-5 w-5" aria-hidden="true" />
				</button>
			</div>
		</div>
	</div>
</div>
