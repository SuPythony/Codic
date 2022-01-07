<script lang="ts">
	import { EditorState, basicSetup } from "@codemirror/basic-setup";
	import { EditorView, keymap } from "@codemirror/view";
	import { onMount } from "svelte";
	import { javascript } from "@codemirror/lang-javascript";
	import { indentWithTab } from "@codemirror/commands";
	import { oneDarkTheme } from "@codemirror/theme-one-dark";
	import { syntaxTree } from "@codemirror/language";
	import type { CompletionContext } from "@codemirror/autocomplete";
	import { autocompletion } from "@codemirror/autocomplete";
	import { toasts, ToastContainer, FlatToast } from "svelte-toasts";

	const completePropertyAfter = ["PropertyName", ".", "?."];
	const dontCompleteIn = [
		"TemplateString",
		"LineComment",
		"BlockComment",
		"VariableDefinition",
		"PropertyDefinition",
	];

	function completeFromGlobalScope(context: CompletionContext) {
		let nodeBefore = syntaxTree(context.state).resolveInner(context.pos, -1);

		if (
			completePropertyAfter.includes(nodeBefore.name) &&
			nodeBefore.parent?.name == "MemberExpression"
		) {
			let object = nodeBefore.parent.getChild("Expression");
			if (object?.name == "VariableName") {
				let from = /\./.test(nodeBefore.name) ? nodeBefore.to : nodeBefore.from;
				let variableName = context.state.sliceDoc(object.from, object.to);
				if (typeof window[variableName] == "object")
					return completeProperties(from, window[variableName]);
			}
		} else if (nodeBefore.name == "VariableName") {
			return completeProperties(nodeBefore.from, window);
		} else if (context.explicit && !dontCompleteIn.includes(nodeBefore.name)) {
			return completeProperties(context.pos, window);
		}
		return null;
	}

	function completeProperties(from: number, object: Object) {
		let options = [];
		for (let name in object) {
			options.push({
				label: name,
				type: typeof object[name] == "function" ? "function" : "variable",
			});
		}
		return {
			from,
			options,
			span: /^[\w$]*$/,
		};
	}

	let editor: EditorView;
	let dark = false;
	let initialized = false;
	let editorDiv;
	let lang = javascript();
	let consoleDiv: HTMLDivElement;

	$: if (initialized) {
		let text = "";
		if (editor) {
			text = editor.state.doc.toString();
			editor.destroy();
		}
		if (!dark) {
			editor = new EditorView({
				state: EditorState.create({
					doc: text,
					extensions: [
						basicSetup,
						keymap.of([indentWithTab]),
						lang,
						EditorView.lineWrapping,
						autocompletion({ override: [completeFromGlobalScope] }),
					],
				}),
				parent: editorDiv,
			});
		} else {
			editor = new EditorView({
				state: EditorState.create({
					doc: text,
					extensions: [
						basicSetup,
						keymap.of([indentWithTab]),
						lang,
						oneDarkTheme,
						EditorView.lineWrapping,
						autocompletion({ override: [completeFromGlobalScope] }),
					],
				}),
				parent: editorDiv,
			});
		}
	}

	let messages = [];

	onMount(() => {
		(function () {
			console.log = function (message) {
				messages.push({ message, type: "normal" });
				messages = messages;
			};
		})();
		(function () {
			console.error = function (message) {
				messages.push({ message, type: "error" });
				messages = messages;
			};
		})();
		messages = [];
		if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
			dark = true;
		}
		initialized = true;
	});

	function runCode() {
		messages = [];
		let time = performance.now();
		try {
			Function(editor.state.doc.toString())(window);
		} catch (err) {
			console.error(err);
		} finally {
			console.log(`Finished running in ${(performance.now() - time).toFixed(2)}ms`);
			toasts.add({
				title: "Code Executed!",
				description: "",
				duration: 1000,
				placement: "top-right",
				type: "info",
				theme: dark ? "dark" : "light",
			});
		}
	}
</script>

<div class="h-[100vh]">
	<div class="flex flex-col h-[60%] max-h-[60%] overflow-y-scroll">
		<div
			class="flex justify-evenly transition-all duration-200 {dark
				? 'bg-black text-white'
				: 'bg-white text-black'}"
		>
			<button
				on:click={() => {
					dark = !dark;
				}}
				class="{dark
					? 'hover:bg-white hover:text-black'
					: 'hover:bg-black hover:text-white'} w-[50%] transition-all duration-200"
				>Toggle Dark Mode</button
			>
			<button
				on:click={runCode}
				class="{dark
					? 'hover:bg-white hover:text-black'
					: 'hover:bg-black hover:text-white'} w-[50%] transition-all duration-200"
				>Run (.js)</button
			>
		</div>
		<div
			bind:this={editorDiv}
			class="h-full {dark ? 'bg-black' : 'bg-white'} transition-all duration-200"
			on:keydown={(e) => {
				if (e.ctrlKey && e.key === "Enter") {
					runCode();
				}
			}}
		/>
	</div>
	<div
		class="relative overflow-y-scroll w-full bottom-0 h-[40%] {dark
			? 'bg-white text-black'
			: 'bg-black text-white'} transition-all duration-200"
		bind:this={consoleDiv}
	>
		<div
			class="flex items-center justify-center w-full p-1 {dark
				? 'border-b-black'
				: 'border-b-white'} transition-all duration-200 border-b-2 mb-1"
		>
			<p>Console</p>
		</div>
		<div class="p-1">
			{#each messages as message}
				<p class:text-red-500={message.type === "error"}>{message.message}</p>
			{/each}
		</div>
	</div>
</div>

<ToastContainer let:data>
	<FlatToast {data} />
</ToastContainer>
