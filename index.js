const R = require('ramda')

module.exports = function (opts = {}) {
	return function ({ addUtilities, config, e }) {
		const prefix = ['', 't', 'b', 'l', 'r', 'x', 'y']
		const {
			notable = [
				{
					type: 'margin',
					char: 'm'
				},
				{
					type: 'padding',
					char: 'p'
				}
			]
		} = opts

		const buildClass = (type, char) => {
			return R.compose(
				R.flatten,
				R.map(([key, value]) => {
					return R.map(pref => {
						let prop = {}

						switch (pref) {
							case '':
								prop = {
									[`.not\\:last-${char}-${key}:not(:last-child)`]: {
										[type]: value
									}
								}
								break

							case 't':
								prop = {
									[`.not\\:last-${char}t-${key}:not(:last-child)`]: {
										[`${type}-top`]: value
									}
								}
								break
							case 'b':
								prop = {
									[`.not\\:last-${char}b-${key}:not(:last-child)`]: {
										[`${type}-bottom`]: value
									}
								}
								break
							case 'l':
								prop = {
									[`.not\\:last-${char}l-${key}:not(:last-child)`]: {
										[`${type}-left`]: value
									}
								}
								break
							case 'r':
								prop = {
									[`.not\\:last-${char}r-${key}:not(:last-child)`]: {
										[`${type}-right`]: value
									}
								}
								break
							case 'x':
								prop = {
									[`.not\\:last-${char}x-${key}:not(:last-child)`]: {
										[`${type}-right`]: value,
										[`${type}-left`]: value
									}
								}
								break
							case 'y':
								prop = {
									[`.not\\:last-${char}y-${key}:not(:last-child)`]: {
										[`${type}-top`]: value,
										[`${type}-bottom`]: value
									}
								}
								break
						}

						return prop
					})(prefix)
				}),
				Object.entries
			)(config(type))
		}

		R.compose(
			R.map(({ classes, variants }) => {
				addUtilities(classes, variants)
			}),
			R.map(({ type, char }) => ({
				classes: buildClass(type, char),
				variants: config(`modules.${type}`, [])
			}))
		)(notable)
	}
}
