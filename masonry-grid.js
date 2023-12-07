(function() {
	
	const aZ = document.querySelectorAll("#directory");
	const accord = document.querySelectorAll('.e-n-accordion .e-grid > .e-con-inner');
	const grids = [...accord, ...aZ];
	// const grids = [...aZ];
	if ( ! grids ) {
		return;
	}

	if ( window.innerWidth < 680 ) {
		return;
	}
	
	const imgObserver = new MutationObserver((changes) => {
		changes.forEach(change => {
		})

		doGrid();
	})

	
	
	window.onload = doGrid();
	window.addEventListener("resize", doGrid);

	function doGrid() {
		Array.from(grids).forEach(grid => {
			let rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows')) || 18;
			let rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap')) || 20;
			grid.style.gridAutoRows = null;
			grid.style.gridTemplateRows = 'none';

			const images = grid.querySelectorAll('img');
			for(let img of images) {
				imgObserver.observe(img, {attributes: true});
			}

			Array.from(grid.children).forEach(child => child.style.gridRowEnd = getRowSpan(child,rowHeight,rowGap))

			grid.style.gridAutoRows = rowHeight+'px';

		})
	}

	function getRowSpan(item,height,gap) {
		let rowSpan = Math.ceil((item.getBoundingClientRect().height+gap)/(height+gap));
		return "span "+rowSpan;
	}
})();
