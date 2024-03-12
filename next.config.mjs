import nextMDX from '@next/mdx'
import { recmaPlugins } from './mdx/recma.mjs'
import { remarkPlugins } from './mdx/remark.mjs'
import { rehypePlugins } from './mdx/rehype.mjs'

const withMDX = nextMDX({
	options: {
		remarkPlugins,
		rehypePlugins,
		recmaPlugins,
		providerImportSource: '@mdx-js/react',
	},
})

/** @type {import('next').NextConfig} */
const nextConfig = {
	swcMinify: true,
	reactStrictMode: true,
	pageExtensions: ['ts', 'tsx', 'mdx'],
	experimental: {
		scrollRestoration: true,
	},
	async redirects() {
		return [
			{
				source: '/apps',
				destination: 'https://worldcoin.org/apps',
				permanent: true,
			},
			{
				source: '/world-id-2',
				destination: 'https://worldcoin.org/blog/announcements/introducing-world-id-2.0',
				permanent: true,
			},
			{
				source: '/idkit',
				destination: '/id/cloud',
				permanent: true,
			},
			{
				source: '/js',
				destination: '/id/cloud',
				permanent: true,
			},
			{
				source: '/id',
				destination: '/world-id',
				permanent: true,
			},
			{
				source: '/id/sign-in',
				destination: '/sign-in',
				permanent: true,
			},
			{
				source: '/protocol',
				destination: 'https://whitepaper.worldcoin.org/technical-implementation#worldcoin-protocol',
				permanent: false,
			},
			{
				source: '/test',
				destination: '/quick-start',
				permanent: false,
			},
			{
				source: '/simulator',
				destination: '/quick-start/testing',
				permanent: false,
			},
			{
				source: '/privacy',
				destination: 'https://whitepaper.worldcoin.org/technical-implementation#privacy',
				permanent: false,
			},
			{
				source: '/zkp',
				destination: '/advanced/zero-knowledge-proofs',
				permanent: false,
			},
			{
				source: '/id/anonymous-actions',
				destination: '/id/incognito-actions',
				permanent: false,
			},
		]
	},
}

export default withMDX(nextConfig)
