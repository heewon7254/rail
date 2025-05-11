class ScrollService {

	#element = {
		container: null,
		content: null,
		vertical: {// 수직
			wrapper: null,
			handle: null,
		},
		horizontal: {// 수평
			wrapper: null,
			handle: null,
		},
	}

	#content = {
		clientWidth: 0,
		scrollWidth: 0,
		clientHeight: 0,
		scrollHeight: 0,
	}

	#vertical = {
		class: 'ds-tree-scroll vertical',
		enabled: false,
		scale: 1,
		size: 0,
		scroll: 0,
		max: 0,
		handle: {
			size: 0,
			scroll: 0,
		},
	}

	#horizontal = {
		class: 'ds-tree-scroll horizontal',
		enabled: false,
		scale: 1,
		size: 0,
		scroll: 0,
		max: 0,
		handle: {
			size: 0,
			scroll: 0,
		},
	}

	#mouseupHandler
	#mousemoveHandler
	#onVertical
	#onHorizontal

	options = {
		onVertical: null,
		onHorizontal: null,
	}

	constructor({ container, content, ...options } = {}) {
		this.#element.container = container;
		this.#element.content = content;
		Object.assign(this.options, options);

		const doc = new DOMParser().parseFromString(`<div class="${this.#vertical.class}"><div class="ds-tree-scroll-handle"></div></div><div class="${this.#horizontal.class}"><div class="ds-tree-scroll-handle"></div></div>`, 'text/html');
		this.#element.vertical.wrapper = doc.body.firstChild;
		this.#element.vertical.handle = this.#element.vertical.wrapper.firstChild;
		this.#element.container.appendChild(this.#element.vertical.wrapper);
		this.#element.horizontal.wrapper = doc.body.lastChild;
		this.#element.horizontal.handle = this.#element.horizontal.wrapper.firstChild;
		this.#element.container.appendChild(this.#element.horizontal.wrapper);

		this.#onVertical = typeof this.options.onVertical == 'function' ? this.options.onVertical : this.#defaultOnVertical;
		this.#onHorizontal = typeof this.options.onHorizontal == 'function' ? this.options.onHorizontal : this.#defaultOnHorizontal;
		this.#mouseupHandler = this.#mouseup.bind(this);

		this.#element.content.addEventListener('wheel', event => this.#onWheel(event));
		this.#element.vertical.handle.addEventListener('mousedown', downEvent => {
			this.#element.vertical.wrapper.className = `${this.#element.vertical.wrapper.className} active`;
			const start = this.#vertical.scroll;
			this.#mousemoveHandler = moveEvent => {
				this.setVertical(start + (( moveEvent.clientY - downEvent.clientY ) * this.#vertical.scale));
			}
			this.#mousedown(downEvent);
		});
		this.#element.horizontal.handle.addEventListener('mousedown', downEvent => {
			this.#element.horizontal.wrapper.className = `${this.#element.horizontal.wrapper.className} active`;
			const start = this.#horizontal.scroll;
			this.#mousemoveHandler = moveEvent => {
				this.setHorizontal(start + (( moveEvent.clientX - downEvent.clientX ) * this.#horizontal.scale));
			}
			this.#mousedown(downEvent);
		});		
	}

	#calculation() {
		if(this.#vertical.enabled) {
			this.#element.vertical.wrapper.className = `${this.#vertical.class} show`;
			this.#vertical.size = this.#element.vertical.wrapper.clientHeight - (this.#horizontal.enabled ? this.#element.vertical.wrapper.clientWidth : 0);
		}
		if(this.#horizontal.enabled) {
			this.#element.horizontal.wrapper.className = `${this.#horizontal.class} show`;
			this.#horizontal.size = this.#element.horizontal.wrapper.clientWidth - (this.#vertical.enabled ? this.#element.horizontal.wrapper.clientHeight : 0);
		}

		if(this.#vertical.enabled) {
			const scrollSize = this.#content.scrollHeight - this.#content.clientHeight;	// 원본컨텐츠의 최대 scroll 값
			const ratio = this.#content.scrollHeight / this.#vertical.size;				// (원본컨텐츠Size / 스크롤바영역Size) 비율
			this.#vertical.handle.size = Math.max(15, this.#vertical.size / ratio);		// 스크롤바(handle) 사이즈
			const radiusofaction = this.#vertical.size - this.#vertical.handle.size;	// 스크롤바(handle)가 실제로 움직이는 행동반경
			this.#vertical.scale = scrollSize / radiusofaction;							// 원본컨텐츠 최대 scroll 값 / 스크롤바(handle) 행동반경
			this.#element.vertical.handle.style.height = `${this.#vertical.handle.size}px`;
			this.#element.vertical.handle.style.top = `${this.#vertical.handle.scroll}px`;
		} else {
			this.#vertical.scale = 1;
			this.#element.vertical.wrapper.className = this.#vertical.class;
		}

		if(this.#horizontal.enabled) {
			const scrollSize = this.#content.scrollWidth - this.#content.clientWidth;	// 원본컨텐츠의 최대 scroll 값
			const ratio = this.#content.scrollWidth / this.#horizontal.size;			// (원본컨텐츠Size / 스크롤바영역Size) 비율
			this.#horizontal.handle.size = Math.max(15, this.#horizontal.size / ratio);	// 스크롤바(handle) 사이즈
			const radiusofaction = this.#horizontal.size - this.#horizontal.handle.size;// 스크롤바(handle)가 실제로 움직이는 행동반경
			this.#horizontal.scale = scrollSize / radiusofaction;						// 원본컨텐츠 최대 scroll 값 / 스크롤바(handle) 행동반경
			this.#element.horizontal.handle.style.width = `${this.#horizontal.handle.size}px`;
			this.#element.horizontal.handle.style.left = `${this.#horizontal.handle.scroll}px`;
		} else {
			this.#horizontal.scale = 1;
			this.#element.horizontal.wrapper.className = this.#horizontal.class;
		}
	}

	#onWheel(event) {
		if(event.deltaY !== 0) {
			this.setVertical(this.#vertical.scroll + event.deltaY);
		} else {
			this.setHorizontal(this.#horizontal.scroll + event.deltaX);
		}
	}

	#defaultOnVertical() {
		this.#element.content.scrollTop = this.#vertical.scroll;
	}

	#defaultOnHorizontal() {
		this.#element.content.scrollLeft = this.#horizontal.scroll;
	}

	#mousedown(event) {
		window.addEventListener('mousemove', this.#mousemoveHandler);
		window.addEventListener('mouseup', this.#mouseupHandler);
	}

	#mouseup(event) {
		this.#element.vertical.wrapper.className = this.#element.vertical.wrapper.className.replace(' active', '');
		this.#element.horizontal.wrapper.className = this.#element.horizontal.wrapper.className.replace(' active', '');
		window.removeEventListener('mousemove', this.#mousemoveHandler);
		window.removeEventListener('mouseup', this.#mouseupHandler);
	}

	resize({ clientWidth, scrollWidth, clientHeight, scrollHeight }) {
		this.#content.clientWidth = clientWidth?? 0;
		this.#content.scrollWidth = scrollWidth?? 0;
		this.#content.clientHeight = clientHeight?? 0;
		this.#content.scrollHeight = scrollHeight?? 0;

		// add scroll margin
		if(this.#vertical.enabled = this.#content.clientHeight < this.#content.scrollHeight) {
			this.#content.scrollHeight += 20;
		}
		if(this.#horizontal.enabled = this.#content.clientWidth < this.#content.scrollWidth) {
			// this.#content.scrollWidth += 12;
		}

		this.#vertical.max = Math.max(0, this.#content.scrollHeight - this.#content.clientHeight);
		this.#vertical.scroll = Math.min(this.#vertical.scroll, this.#vertical.max);
		this.#horizontal.max = Math.max(0, this.#content.scrollWidth - this.#content.clientWidth);
		this.#horizontal.scroll = Math.min(this.#horizontal.scroll, this.#horizontal.max);

		this.#calculation();
		this.setVertical(this.#vertical.scroll);
		this.setHorizontal(this.#horizontal.scroll);
	}

	setVertical(scroll=0) {
		this.#vertical.scroll = Math.min(Math.max(0, scroll), Math.max(0, this.#vertical.max));
		this.#element.vertical.handle.style.top = `${this.#vertical.handle.scroll = this.#vertical.scroll / this.#vertical.scale}px`;
		this.#onVertical();
	}

	setHorizontal(scroll=0) {
		this.#horizontal.scroll = Math.min(Math.max(0, scroll), Math.max(0, this.#horizontal.max));
		this.#element.horizontal.handle.style.left = `${this.#horizontal.handle.scroll = this.#horizontal.scroll / this.#horizontal.scale}px`;
		this.#onHorizontal();
	}

	get scrollTop() {
		return this.#vertical.scroll;
	}

	get scrollLeft() {
		return this.#horizontal.scroll;
	}

	reset() {
		this.#vertical.scale = this.#horizontal.scale = 1;
		this.#vertical.size = this.#vertical.scroll = this.#vertical.max = this.#vertical.handle.size = this.#vertical.handle.scroll = 0;
		this.#horizontal.size = this.#horizontal.scroll = this.#horizontal.max = this.#horizontal.handle.size = this.#horizontal.handle.scroll = 0;
		this.#content.clientWidth = this.#content.scrollWidth = this.#content.clientHeight = this.#content.scrollHeight = 0;
		this.#element.content.scrollTop = this.#element.content.scrollLeft = 0;
	}

}






class DSTree {

	#element = {
		container: null,
		wrapper: null,
		canvas: null,
		nodes: null,
	}
	#canvas = {
		width: 0,
		height: 0,
	}
	#content = {
		width: 0,
		height: 0,
	}

	#events = {}

	#selectedNode
	#selectedNodes = {}
	#scrollService
	#nodeRenderer
	#nodeContentRenderer

	#originData = []		// 원본 데이터
	#renderedObjects = {}	// 현재 화면에 실제로 그려져 Element가 존재하는 Node Objects
	#maxRenderedNodeCnt = 0	// 한번에 렌더링 가능한 Node의 최대 개수
	#visible = {		// Visible 상태의 Node들에 대한 변수
		data: [],		// Visible Node Datas
		size: 0,		// Visible Node Datas 개수
		lastIndex: -1,	// Visible Node Datas 마지막 인덱스
		start: 0,		// Visible Node Datas 중 화면에 그려진 상태인 Node들의 시작 Index
		end: -1			// Visible Node Datas 중 화면에 그려진 상태인 Node들의 끝 Index
	}

	options = {
		container: null,
		height: null,
		nodeHeight: 24,
		nodeKey: 'id',
		data: null,	// 초기 데이터
		defaultExpanded: false,
		multiSelect: false,
		onNodeSelect: null,			// function(({ event, node, nodes, renderedObject, api })) {}
		onNodeUnselect: null,		// function(({ event, node, nodes, renderedObject, api })) {}
		onNodeClick: null,			// function(({ event, node, renderedObject, api })) {}
		onNodeDblClick: null,		// function(({ event, node, renderedObject, api })) {}
		onNodeContextmenu: null,	// function(({ event, node, renderedObject, api })) {}
		onContextmenu: null,		// function(({ event, api })) {}
		onChildren: null,			// function(({ node, api })) { return new Promise }
		nodeRenderer: null,
		nodeContentRenderer: null,
		defaultEvents: [
			{
				type: 'click',
				selecter: '.ds-tree-node-toggle-handler',
				callback({ event, node, renderedObject, api }) {
					event.stopPropagation();
					this.toggle(node);
				}
			},
			{
				type: 'click',
				selecter: '.ds-tree-node-select-handler',
				callback({ event, node, renderedObject, api }) {
					if(typeof this.options.onNodeClick == 'function') {
						this.options.onNodeClick.call(this, { event, node, renderedObject, api });
					}
					if(this.options.multiSelect) {
						if(node.__isSelected != 2) {
							this.selectNode(node, { multiple:true, event });
						} else {
							this.unselectNode(node, { event });
						}
					} else {
						this.selectNode(node, { event });
					}
				}
			},
			{
				type: 'dblclick',
				selecter: '.ds-tree-node-select-handler',
				callback({ event, node, renderedObject, api }) {
					if(typeof this.options.onNodeDblClick == 'function') {
						this.options.onNodeDblClick.call(this, { event, node, renderedObject, api });
					}
				}
			},
			{
				type: 'contextmenu',
				selecter: '.ds-tree-node-contextmenu-handler',
				callback({ event, node, renderedObject, api }) {
					event.preventDefault();
					this.selectNode(node, { event });
					if(typeof this.options.onNodeContextmenu == 'function') {
						this.options.onNodeContextmenu.apply(this, arguments);
					}
				}
			},
			{
				type: 'contextmenu',
				selecter: '.ds-tree-contextmenu-handler',
				callback({ event, node, renderedObject, api }) {
					event.preventDefault();
					if(renderedObject?.el == event.target && typeof this.options.onContextmenu == 'function') {
						this.options.onContextmenu.call(this, { event, api });
					}
				}
			},
		],
		events: []
	}


	constructor({ container, ...options } = {}) {
		Object.assign(this.options, options);
		this.options.height = options.height || container.clientHeight || 400;
		this.#nodeRenderer = typeof this.options.nodeRenderer == 'function' ? this.options.nodeRenderer : this.#defaultNodeRenderer;
		this.#nodeContentRenderer = typeof this.options.nodeContentRenderer == 'function' ? this.options.nodeContentRenderer : this.#defaultNodeContentRenderer;

		this.#element.container = container;
		this.#element.wrapper = this.#createDocument(`
			<div class="ds-tree-wrapper${ this.options.multiSelect ? ' ds-tree-multi-select' : '' }">
				<div class="ds-tree-canvas">
					<div class="ds-tree-nodes"></div>
				</div>
			</div>
		`);
		this.#element.canvas = this.#element.wrapper.firstElementChild;
		this.#element.nodes = this.#element.canvas.firstElementChild;
		container.appendChild(this.#element.wrapper);

		// Events Initialization
		for(const event of [ ...this.options.defaultEvents, ...this.options.events ]) {
			if(!this.#events[event.type]) {
				this.#events[event.type] = [];
				this.#element.wrapper.addEventListener(event.type, event => {
					const renderedObject = this.#getRenderedObjectsFromElement(event.target);
					this.isStopPropagation = false;
					event.stopPropagation = function() {
						this.isStopPropagation = true;
						Event.prototype.stopPropagation.apply(this, arguments);
					}
					this.isStopImmediatePropagation = false;
					event.stopImmediatePropagation = function() {
						this.isStopImmediatePropagation = true;
						Event.prototype.stopImmediatePropagation.apply(this, arguments);
					}
					this.#eventHandler({
						event,
						el: event.target,
						renderedObject
					});
				}); 
			}
			this.#events[event.type].push(event);
		}

		this.#scrollService = new ScrollService({
			container: this.#element.wrapper,
			content: this.#element.canvas,
			onVertical: scroll => this.#__throttleRender(scroll),
			// onHorizontal: scroll => {},
		});
		this.resize(this.options.height);

		if(this.options.data && this.options.data.length) {
			this.setData(this.options.data);
		}

	}

	setData(data) {
		this.#originData = data?? [];
		this.#selectedNode = undefined;
		this.#selectedNodes = {};
		this.#scrollService.reset();
		this.refresh({ initData:true, initScrollWidth:true });
		return this;
	}

	getData() {
		return this.#originData;
	}

	resize(height) {
		this.options.height = height;
		this.#element.wrapper.style.height = `${this.options.height}px`;
		this.#canvas.width = this.#element.wrapper.clientWidth;
		this.#canvas.height = this.#element.wrapper.clientHeight;
		this.#content.width = this.#element.canvas.scrollWidth;
		this.#maxRenderedNodeCnt = Math.ceil(this.#canvas.height / this.options.nodeHeight);
		this.#scrollService.resize({ clientWidth:this.#canvas.width, scrollWidth:this.#content.width, clientHeight:this.#canvas.height, scrollHeight:this.#content.height });
		this.#render();
		return this;
	}

	refresh({ resetData=true, initData=false, initScrollWidth=false, start=0, end=-1 } = {}) {
		if(resetData) {
			this.#visible.data = this.#resetData({ data:this.#originData, isInit:initData });
		};
		this.#visible.start = start;
		this.#visible.end = end;
		for(const i in this.#renderedObjects) {
			if(i < start || i > end) {
				this.#element.nodes.removeChild(this.#renderedObjects[i].el);
				delete this.#renderedObjects[i];
			}
		}
		this.#visible.size = this.#visible.data.length;
		this.#visible.lastIndex = this.#visible.size - 1;

		let beforeScrollLeft;
		if(initScrollWidth) {
			beforeScrollLeft = this.#scrollService.scrollLeft;
			this.#element.nodes.style.width = 'auto';
		}
		this.#content.width = this.#element.canvas.scrollWidth;
		this.#content.height = this.#visible.size * this.options.nodeHeight;
		this.#scrollService.resize({ clientWidth:this.#canvas.width, scrollWidth:this.#content.width, clientHeight:this.#canvas.height, scrollHeight:this.#content.height });
		this.#render();
		if(initScrollWidth) this.#scrollService.setHorizontal(beforeScrollLeft);
		return this;
	}

	get selectedNode() {
		return this.#selectedNode;
	}
	get selectedNodes() {
		return Object.values(this.#selectedNodes);
	}

	selectNode(node, { multiple=false, refresh=true, event } = {}) {
		if(!node) return this;
		const beforeSelected = Object.values(this.#selectedNodes);
		if(!this.#selectedNodes[node[this.options.nodeKey]]) {
			if(!multiple) {
				this.unselectNode(null, { refresh:false });
			}
			const queue = [[ node ]];
			while(queue.length) {
				const children = queue.pop();
				for(let i=0; i < children?.length; i++) {
					const child = children[i];
					child.__isSelected = 2;
					this.#selectedNodes[child[this.options.nodeKey]] = child;
					if(multiple) queue.push(child.children);
				}
			}

			queue.push(node.parent);
			if(this.options.multiSelect) {
				while(queue.length) {
					const parent = queue.pop();
					if(parent) {
						parent.__isSelected = 2;
						this.#selectedNodes[parent[this.options.nodeKey]] = parent;
						for(let i=0; i < parent.children?.length; i++) {
							if(parent.children[i].__isSelected != 2) {
								parent.__isSelected = 1;
								delete this.#selectedNodes[parent[this.options.nodeKey]];
								break;
							}
						}
						queue.push(parent.parent);
					}
				}
			} else {
				while(queue.length) {
					const parent = queue.pop();
					if(parent) {
						parent.__isSelected = 1;
						queue.push(parent.parent);
					}
				}
			}
			if(refresh) {
				this.refresh({ resetData:false });
			}
		}
		this.#selectedNode = node;

		if(typeof this.options.onNodeSelect == 'function') {
			const nodeSet = new Set(beforeSelected);
			this.options.onNodeSelect.call(this, { event, node, nodes:Object.values(this.#selectedNodes).filter(d => d == node || !nodeSet.has(d)), renderedObject:this.#getRenderedObject(node), api:this });
		}

		return this;
	}

	unselectNode(node, { refresh=true, event } = {}) {
		const beforeSelected = Object.values(this.#selectedNodes);
		if(node) {
			const queue = [[ node ]];
			while(queue.length) {
				const children = queue.pop();
				for(let i=0; i < children?.length; i++) {
					const child = children[i];
					delete child.__isSelected;
					delete this.#selectedNodes[child[this.options.nodeKey]];
					if(this.options.multiSelect) queue.push(child.children);
				}
			}

			queue.push(node.parent);
			if(this.options.multiSelect) {
				while(queue.length) {
					const parent = queue.pop();
					if(parent) {
						delete parent.__isSelected;
						delete this.#selectedNodes[parent[this.options.nodeKey]];
						for(let i=0; i < parent.children?.length; i++) {
							if(parent.children[i].__isSelected == 2) {
								parent.__isSelected = 1;
								break;
							}
						}
						queue.push(parent.parent);
					}
				}
			} else {
				while(queue.length) {
					const parent = queue.pop();
					if(parent) {
						delete parent.__isSelected;
						queue.push(parent.parent);
					}
				}
			}
		} else {
			const keys = Object.keys(this.#selectedNodes);
			for(let i=0; i < keys.length; i++) {
				const key = keys[i];
				const queue = [this.#selectedNodes[key]?.parent];
				while(queue.length) {
					const parent = queue.pop();
					if(parent) {
						delete parent.__isSelected;
						queue.push(parent.parent);
					}
				}
				delete this.#selectedNodes[key]?.__isSelected;
				delete this.#selectedNodes[key];
			}
		}
		if(refresh) {
			this.refresh({ resetData:false });
		}
		this.#selectedNode = undefined;

		if(typeof this.options.onNodeUnselect == 'function') {
			const nodeSet = new Set(Object.values(this.#selectedNodes));
			const nodes = beforeSelected.filter(d => !nodeSet.has(d));
			if(nodes.length) {
				if(!node && nodes.length == 1) node = nodes[0];
				this.options.onNodeUnselect.call(this, { event, node, nodes, renderedObject:this.#getRenderedObject(node), api:this });
			}
		}

		return this;
	}

	highlightNode(node, { timer=3000 } = {}) {
		if(!node) return this;
		node.__highlight = true;
		this.updateNode(node, { refresh:false });
		setTimeout(() => {
			delete node.__highlight;
			this.updateNode(node, { refresh:false });
		}, timer);
		return this;
	}

	async createNode(node, parent, { position='prepend'/* 'prepend' or 'append' */ } = {}) {
		if(!node) return;
		let target = this.#originData;
		if(parent) {
			if(parent.children === true) {
				await this.toggle(parent, { expanded:true, refresh:false });
			} else {
				parent.__expanded = true;
			}
			target = parent.children = parent.children || [];
		}
		this.#initData([node], parent, false, !!parent, ((parent?.__depth?? 0) + 1));
		if(position == 'prepend') {
			target.unshift(node);
		} else {
			target.push(node);
		}
		this.refresh();
	}

	updateNode(node, { refresh=true } = {}) {
		if(!node) return this;
		this.#_updateNode(this.#getRenderedObject(node), refresh);
		return this;
	}
	#_updateNode(object, refresh=true) {
		if(object && object.el) {
			if(refresh) {
				object.el.innerHTML = this.#nodeRenderer({ node:object.node, api:this });
			}
			if(!object.node.children) {
				object.el.querySelectorAll('.ds-tree-node-toggle-handler').forEach(el => {
					el.className = el.className.replace(/([ ]*ds-tree-node-toggle-handler)([ ]*ds-tree-icon toggle)/gi, '');
				});
			}
			setTimeout(() => object.el.className = this.#getNodeClassNames(object.node), 0);
		}	
	}

	deleteNode(node, { refresh=true } = {}) {
		if(!node) return this;
		let array = node.parent ? node.parent.children : this.#originData;
		const idx = array.indexOf(node);
		if(idx > -1) array.splice(idx, 1);
		if(!array.length && node.parent) {
			node.parent.children = node.parent.__expanded = false;
		}
		if(this.#selectedNode && this.getNode(this.#selectedNode[this.options.nodeKey], [node])) {
			this.unselectNode();
		}
		if(refresh) {
			this.refresh();
		}
		return this;
	}

	async toggle(node, { expanded, refresh=true, update=true } = {}) {
		if(!node) return;
		node.__expanded = typeof expanded == 'boolean' ? expanded : !node.__expanded;
		if(node.__expanded && node.children && !node.children.length) {
			node.__isLoading = node.__expanded;
			if(update) this.#_updateNode(this.#getRenderedObject(node), false);
			if(typeof node.children == 'function') {
				node.children = await node.children.call(this, { node, api:this });
			} else if(typeof this.options.onChildren == 'function') {
				node.children = await this.options.onChildren.call(this, { node, api:this });
			}
			if(node.children && node.children.length) {
				this.#initData(node.children, node, false, false, node.__depth+1);
			} else {
				node.__expanded = node.children = false;
			}
			delete node.__isLoading;
		}
		if(update || refresh) {
			const renderedObject = this.#getRenderedObject(node);
			if(update) this.#_updateNode(renderedObject, false);
			if(refresh) this.refresh({ initScrollWidth:!node.__expanded, ...(renderedObject ? { start:this.#visible.start, end:renderedObject.index } : {}) });
		}
	}

	async toggleAll({ expanded=true } = {}) {
		const queue = [this.#originData];
		while(queue.length) {
			const nodes = queue.pop();
			for(let i=0; i < nodes.length; i++) {
				const node = nodes[i];
				await this.toggle(node, { expanded, refresh:false, update:false });
				if(node.children.length) queue.push(node.children);
			}
		}
		this.refresh({ initScrollWidth:!expanded });
	}

	getElement(node) {
		return this.#getRenderedObject(node)?.el;
	}

	getNode(key, data=this.#originData) {
		let target;
		for(let i=0; i < data.length; i++) {
			const node = data[i];
			if(node[this.options.nodeKey] === key) {
				target = node;
			} else {
				if(node.children && node.children.length) {
					target = this.getNode(key, node.children);
				}
			}
			if(target) break;
		}
		return target;
	}

	scroll(node) {
		if(!node) return this;

		let isRefresh = false;
		const queue = [ node.parent ];
		while(queue.length) {
			const parent = queue.pop();
			if(parent) {
				if(!parent.__expanded) {
					parent.__expanded = isRefresh = true;
				}
				queue.push(parent.parent);
			}
		}

		if(isRefresh) {
			this.refresh();
		}

		for(let i=0; i < this.#visible.data.length; i++) {
			if(this.#visible.data[i] == node) {
				let move = i * this.options.nodeHeight;
				this.setScrollTop(move);
				break;
			}
		}
		return this;
	}

	addScrollTop(num) {
		this.setScrollTop(this.#scrollService.scrollTop + num);
		return this;
	}

	addScrollLeft(num) {
		this.setScrollLeft(this.#scrollService.scrollLeft + num);
		return this;
	}

	setScrollTop(scrollTop) {
		this.#scrollService.setVertical(scrollTop);
		return this;
	}

	setScrollLeft(scrollLeft) {
		this.#scrollService.setHorizontal(scrollLeft);
		return this;
	}

	get scrollTop() {
		return this.#scrollService.scrollTop;
	}

	get scrollLeft() {
		return this.#scrollService.scrollLeft;
	}

	#eventHandler({ event, el, renderedObject }) {
		const listeners = this.#events[event.type];
		if(listeners && listeners.length) {
			for(let i=0; i < listeners.length; i++) {
				const obj = listeners[i];
				if(el.matches ? el.matches(obj.selecter) : el.msMatchesSelector ? el.msMatchesSelector(obj.selecter) : false) {
					if(typeof obj.callback == 'function') {
						obj.callback.call(this, { event, node:renderedObject.node, renderedObject, api:this });
					}

					if(event.isStopImmediatePropagation) break;
				}
			}
			if(el.parentElement && el != this.#element.wrapper && !event.isStopPropagation && !event.isStopImmediatePropagation && !/input|textarea|button|select|option/i.test(event.target.tagName)) {
				this.#eventHandler({
					event,
					el: el.parentElement,
					renderedObject
				});
			}
		}
	}

	#getRenderedObject(node) {
		let renderedObject;
		const keys = Object.keys(this.#renderedObjects);
		for(let i=0; i < keys.length; i++) {
			const obj = this.#renderedObjects[keys[i]];
			if(obj.node == node) {
				renderedObject = obj;
				break;
			}
		}
		return renderedObject;
	}

	#getRenderedObjectsFromElement(el) {
		let renderedObject;
		if(el != this.#element.wrapper) {
			if(el.parentElement == this.#element.nodes) {
				const keys = Object.keys(this.#renderedObjects);
				for(let i=0; i < keys.length; i++) {
					const obj = this.#renderedObjects[keys[i]];
					if(obj.el == el) {
						renderedObject = obj;
						break;
					}
				}
			} else {
				renderedObject = this.#getRenderedObjectsFromElement(el.parentElement);
			}
		}
		return renderedObject;
	}

	#resetData({ data, parent, insert=true, isRoot=true, depth=1, list=[], isInit=false }) {
		return isInit ? this.#initData(data, parent, insert, isRoot, depth, list) : this.#createData(data, list);
	}

	#initData(data, parent, insert=true, isRoot=true, depth=1, list=[]) {
		for(let i=0; i < data.length; i++) {
			const node = data[i];
			if(isRoot) {
				node.__isRoot = isRoot;
			}
			node.__depth = depth;
			node.parent = parent;
			if(insert) {
				list.push(node);
			}
			if(parent?.__isSelected == 2 && this.options.multiSelect) {
				node.__isSelected = 2;	
			}
			if(node.__isSelected == 2) {
				this.#selectedNodes[node[this.options.nodeKey]] = node;
			}
			if(typeof node.__expanded != 'boolean') {
				node.__expanded = this.options.defaultExpanded;
			}
			if(node.children && node.children.length) {
				this.#initData(node.children, node, insert && node.__expanded, false, depth+1, list);
			} else if(typeof node.children == 'function') {
				node.__expanded = false;
			} else if(node.children === true && typeof this.options.onChildren == 'function') {
				node.__expanded = false;
			} else {
				node.children = node.__expanded = false;
			}
		}
		return list;
	}

	#createData(data, list=[]) {
		for(let i=0; i < data.length; i++) {
			const node = data[i];
			list.push(node);
			if(node.__expanded && node.children.length) {
				this.#createData(node.children, list);
			}
		}
		return list;
	}

	#__throttleRender_isBlock = false;
	#__throttleRender_lastCall = false;
	#__throttleRender() {
		if(this.#__throttleRender_isBlock) {
			this.#__throttleRender_lastCall = true;
			return;
		}
		this.#__throttleRender_isBlock = true;
		this.#render();
		setTimeout(() => {
			this.#__throttleRender_isBlock = false;
			if(this.#__throttleRender_lastCall) {
				this.#__throttleRender_lastCall = false;
				this.#__throttleRender();
			}
		}, 15);
	}

	#render() {
		const start = Math.max(Math.floor(this.#scrollService.scrollTop / this.options.nodeHeight) - 2, 0);
		const marginTop = ( start * this.options.nodeHeight ) - this.#scrollService.scrollTop;
		const end = Math.ceil(Math.min(start + ( this.#maxRenderedNodeCnt + ( marginTop < 0 ? 1 : 0 ) ) + 3, this.#visible.lastIndex));

		/* Delete */
		for(let i=this.#visible.start; i < start && i <= this.#visible.end; i++) {
			const renderedObject = this.#renderedObjects[i];
			if(renderedObject) {
				this.#element.nodes.removeChild(renderedObject.el);
				delete this.#renderedObjects[i];
			}
		}
		for(let i=this.#visible.end; i > end && i >= this.#visible.start; i--) {
			const renderedObject = this.#renderedObjects[i];
			if(renderedObject) {
				this.#element.nodes.removeChild(renderedObject.el);
				delete this.#renderedObjects[i];
			}
		}

		/* Update */
		// for(const i in this.#renderedObjects) {
			// this.#renderedObjects[i]
			// console.log(`%cupdate ${i}`, 'color:blue;');
		// }

		/* Create */
		for(let i=Math.max(this.#visible.end+1, start); i <= end; i++) {
			const newNodeEl = this.#createNodeElement(this.#visible.data[i], i);
			this.#renderedObjects[i] = {
				el: newNodeEl,
				node: this.#visible.data[i],
				index: i
			}
			this.#element.nodes.appendChild(newNodeEl);
		}
		for(let i=Math.min(this.#visible.start-1, end); i >= start; i--) {
			const newNodeEl = this.#createNodeElement(this.#visible.data[i], i);
			this.#renderedObjects[i] = {
				el: newNodeEl,
				node: this.#visible.data[i],
				index: i
			}
			this.#element.nodes.insertBefore(newNodeEl, this.#element.nodes.firstElementChild);
		}

		this.#element.nodes.style.marginTop = `${ marginTop }px`;

		this.#visible.start = start;
		this.#visible.end = end;

		if(this.#element.nodes.scrollWidth > this.#content.width) {
			this.#element.nodes.style.width = `${this.#content.width = this.#element.nodes.scrollWidth}px`;
			this.#scrollService.resize({ clientWidth:this.#canvas.width, scrollWidth:this.#content.width, clientHeight:this.#canvas.height, scrollHeight:this.#content.height });
		}

	}

	#getNodeClassNames(node) {
		return 'ds-tree-node ds-tree-contextmenu-handler'
		+ ( node.__isRoot ? ' root' : '' )
		+ ( node.children ? ( node.__expanded ? ' hasChildren open' : ' hasChildren' ) : '' )
		+ ( node.__isLoading ? ' loading' : '' )
		+ ( node.__isSelected == 1 ? ' hasSelected' : '' )
		+ ( node.__isSelected == 2 ? ' selected' : '' )
		+ ( node.__highlight ? ' highlight' : '' )
	}

	#createNodeElement(node, index) {
		return this.#createDocument(`
			<div class="${this.#getNodeClassNames(node)}"
				 index="${index}" key="${node[this.options.nodeKey]}"
				 depth="${node.__depth}"
				 style="height:${this.options.nodeHeight}px;"
			>${this.#nodeRenderer({ node, api:this })}</div>
		`);
	}

	#defaultNodeRenderer({ node, api }) {
		let interval = '', checkbox = '';
		for(let i=1; i < node.__depth; i++) {
			interval += '<div class="ds-tree-node-interval-item"></div>';
		}
		interval += `<div class="ds-tree-node-interval-item${node.children ? ' ds-tree-node-toggle-handler ds-tree-icon toggle' : ''}"></div>`
		if(this.options.multiSelect) {
			switch(node.__isSelected) {
				case 1:
					checkbox += `<i class="ds-tree-node-multi-select-handler ds-tree-icon checkbox-intermediate"></i>`; break;
				case 2:
					checkbox += `<i class="ds-tree-node-multi-select-handler ds-tree-icon checkbox-checked"></i>`; break;
				default:
					checkbox += `<i class="ds-tree-node-multi-select-handler ds-tree-icon checkbox-unchecked"></i>`;
			}
		}
		return `${interval}<div class="ds-tree-node-content ds-tree-node-select-handler ds-tree-node-contextmenu-handler">${checkbox}${this.#nodeContentRenderer({ node, api:this })}</div>`;
	}

	#defaultNodeContentRenderer({ node, api }) {
		return node.title?? '';
	}

	#createDocument(domString) {
		return new DOMParser().parseFromString(domString, 'text/html').body.firstChild;
	}

}