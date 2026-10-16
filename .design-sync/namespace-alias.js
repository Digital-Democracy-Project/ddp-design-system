// Claude Design assigned the namespace DesignSystem_ad94b7 to this project's earlier, hand-written copy of the library, and existing designs reference it; this keeps that name pointing at the real bundle's global.
Object.defineProperty(window, 'DesignSystem_ad94b7', {
	configurable: true,
	get: () => window.DigitalDemocracyProjectDesignSystem,
})

// The converter pulls this file in with `export *`, and package.json marks only CSS as having side effects, so without an export the bundler drops the module and the alias above never runs.
export const legacyNamespace = 'DesignSystem_ad94b7'
