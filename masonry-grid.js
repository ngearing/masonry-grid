(function () {
	const aZ = document.querySelectorAll("#directory");
	const accord = document.querySelectorAll(
		".e-n-accordion .e-grid > .e-con-inner"
	);
	const grids = [...accord, ...aZ];

	if (!grids) {
		return;
	}

	if (window.innerWidth < 680) {
		return;
	}

	const imgObserver = new MutationObserver((changes) => {
		changes.forEach((change) => {});

		doGrid();
	});
	const gridObserver = new IntersectionObserver(calGrid, {
		rootMargin: "0px",
		threshold: 0,
	});

	window.onload = () => {
		initObservers();
	};

	function initObservers() {
		for (let grid of grids) {
			console.log(grid);
			gridObserver.observe(grid);
		}
	}

	function calGrid(entries) {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				let grid = entry.target;
				let rowHeight =
					parseInt(
						window.getComputedStyle(grid).getPropertyValue("grid-row-gap")
					) || 20;

				setGridRows(grid);
				setGridItemSpan(grid, rowHeight);
			}
		});
	}

	function setGridRows(grid) {
		grid.style.gridAutoRows = null;
		grid.style.gridTemplateRows = "none";
	}

	function setGridItemSpan(grid, rowHeight) {
		for (let item of grid.children) {
			item.style.gridRowEnd = setItemSpan(item, rowHeight);
		}
	}

	function setItemSpan(item, height) {
		let rowSpan = Math.ceil(item.getBoundingClientRect().height / height);
		return "span " + rowSpan;
	}
})();
