<script>
	// @ts-nocheck

	export let label = '';
	export let type = 'text';
	export let placeholder = 'Enter ' + label;
	export let value = '';
	export let name = 'input';
	const handleInput = (e) => {
		value = e.target.value;
	};
</script>

<div class="input-container">
	<label for={name}>
		{label}
	</label>
	<input {type} id={name} {name} {placeholder} on:input={handleInput} />
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
	input {
		padding: 20px;
		font-size: 16px;
		border-radius: 12px;
		background-color: var(--dark-bg);
		border: none;
		color: var(--primary-text);
	}
</style>
