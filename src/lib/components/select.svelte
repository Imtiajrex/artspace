<script>
	// @ts-nocheck

	export let label = '';
	export let placeholder = 'Enter ' + label;
	export let value = '';
	export let name = 'input';
	export let options = [
		{
			label: 'Option 1',
			value: 'option1'
		}
	];
</script>

<div class="input-container">
	<label for={name}>
		{label}
	</label>
	<select class="input" id={name} {name} {placeholder} bind:value>
		<option value={''} disabled>Select A {label}</option>
		{#each options as option}
			<option value={option.value}>{option.label}</option>
		{/each}
	</select>
</div>

<style>
	.input-container {
		display: flex;
		flex-direction: column;
		margin-top: 25px;
		margin-bottom: 25px;
	}
	label {
		margin-bottom: 0.5rem;
		font-size: 18px;
		font-weight: bold;
		color: var(--primary-text);
	}
	.input {
		padding: 20px;
		font-size: 16px;
		border-radius: 12px;
		background-color: var(--bg);
		border: none;
		color: var(--primary-text);
	}
</style>
