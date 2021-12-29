export function keyClick(node: HTMLElement, funcToCall: () => void): void {
	node.onkeydown = (e) => {
		if (e.code === "Space" || e.code === "Enter") {
			funcToCall();
		}
	};
}
