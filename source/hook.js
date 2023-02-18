const shared = {
	clock: 0,
	pulls: [],
}

const State = class {
	constructor(value) {
		this.value = value
		this.birth = shared.clock++
	}

	set(value) {
		this.birth = shared.clock++
		this.value = value
	}

	get() {
		for (const pull of shared.pulls) {
			pull.addSource(this)
		}
		return this.value
	}
}

const Pull = class extends State {
	constructor(evaluator) {
		super()
		this.evaluator = evaluator
		this.sources = new Set()
		this.birth = -Infinity
		this.stack = shared.pulls
	}

	addSource(source) {
		this.sources.add(source)
		if (source.sources === undefined) return
		for (const sourceSource of source.sources) {
			this.addSource(sourceSource)
		}
	}

	update() {
		this.sources.clear()

		this.stack.push(this)
		const value = this.evaluator()
		const popped = this.stack.pop()

		if (popped !== this) {
			throw new Error("Puller stack is corrupted")
		}

		super.set(value)
	}

	get() {
		const sources = [...this.sources]
		if (this.birth < 0 || sources.some((source) => source.birth > this.birth)) {
			this.update()
		}

		return super.get()
	}

	set() {
		throw new Error("Pulls are read-only")
	}
}

export const useState = (value) => new State(value)
export const usePull = (evaluator) => new Pull(evaluator)
