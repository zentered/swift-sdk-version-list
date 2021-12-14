import React, { useState } from 'react'
import copy from 'copy-to-clipboard'
import Head from 'next/head'
import {
  ClipboardCopyIcon,
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
  CheckIcon
} from '@heroicons/react/solid'
import mapItem from 'lib/mapItem'
import dynamic from 'next/dynamic'
import PackageDetails from 'components/PackageDetails'

export default function Home({ packageList }) {
  const GitHubButtons = dynamic(() =>
    import('components/GitHubButtons', { ssr: false })
  )
  const RepoButtons = dynamic(() => import('components/RepoButtons'), {
    ssr: false
  })

  const [copyIndex, setCopyIndex] = useState()
  const [activeIndex, setActiveIndex] = useState()

  const copyToClipboard = (idx, item) => {
    copy(`.package(url: "${item.url}", from: "${item.latestRelease.tag}")`)
    if (copyIndex === idx) {
      setCopyIndex(null)
    } else {
      setCopyIndex(idx)
    }
  }

  const toggleExpand = (idx) => {
    if (activeIndex === idx) {
      setActiveIndex(null)
    } else {
      setActiveIndex(idx)
    }
  }

  return (
    <>
      <Head>
        <title>Vapor and Vapor-Kit Versions</title>
        <meta
          name="description"
          content="Quick overview of the latest Vapor and Vapor-Kit versions"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl my-16">
          <h2 className="text-4xl mb-4 font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Latest{' '}
            <a className="text-fuchsia-600" href="https://vapor.codes">
              Vapor
            </a>{' '}
            SDKs
          </h2>
          <RepoButtons owner={{ login: 'vapor' }} />
        </div>
        <div className="bg-white border border-gray-300 overflow-hidden rounded-md">
          <ul role="list" className="divide-y divide-gray-300">
            {packageList.map((item, idx) => (
              <li key={item.id} className="px-4 py-4">
                <div className="px-4 py-5 sm:px-6">
                  <div className="flex flex-col">
                    <div className="flex justify-end justify-items-end">
                      <GitHubButtons item={item} />
                    </div>
                    <div className="flex text-sm">
                      <h2 className="font-bold text-4xl mb-1">{item.name}</h2>
                      <span className="inline-flex items-center ml-4 px-2.5 py-0.5 rounded-md text-base font-medium bg-fuchsia-100 text-pink-800">
                        v{item.latestRelease.tag}
                      </span>
                    </div>
                    <p className="my-2">{item.description}</p>
                    <div className="mt-2">
                      <div className="text-sm text-gray-500">
                        <button
                          type="button"
                          className="inline-flex items-center px-2 py-1 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-fuchsia-600 hover:bg-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-500"
                          onClick={() => copyToClipboard(idx, item)}
                        >
                          <ClipboardCopyIcon
                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                          <code
                            data-url={`.package(url: "${item.url}", from: "${item.latestRelease.tag}")`}
                          >
                            .package(url: "{item.url}", from: "
                            {item.latestRelease.tag}")
                          </code>
                        </button>
                        {idx === copyIndex && (
                          <CheckIcon
                            className="flex-shrink-0 ml-2 mr-1.5 h-5 w-5 text-green-400"
                            aria-hidden="true"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex items-center px-2 py-1 border border-transparent shadow-sm text-base font-medium rounded-md hover:bg-fuchsia-50"
                      onClick={() => {
                        toggleExpand(idx)
                      }}
                    >
                      {idx === activeIndex && (
                        <>
                          <ChevronDoubleUpIcon
                            className="w-8 h-8 flex-shrink-0 mr-1.5 h-5 w-5 text-fuchsia-400"
                            aria-hidden="true"
                          />{' '}
                        </>
                      )}
                      {idx !== activeIndex && (
                        <>
                          <ChevronDoubleDownIcon
                            className="w-8 h-8 flex-shrink-0 mr-1.5 h-5 w-5 text-fuchsia-400"
                            aria-hidden="true"
                          />{' '}
                          Release Details
                        </>
                      )}
                    </button>
                  </div>
                </div>
                <div
                  className={`${
                    idx === activeIndex ? '' : 'hidden'
                  } animate-animated animate-delay-slow animate-fadeIn px-4 py-5 sm:p-6`}
                >
                  <PackageDetails release={item.latestRelease} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  )
}

export async function getStaticProps(context) {
  let packageList = []
  const p = []
  const featuredRepos = [
    'vapor',
    'queues',
    'redis',
    'jwt',
    'fluent',
    'http',
    'core',
    'leaf',
    'email',
    'auth'
  ]
  const searchPattern = ['-nio', '-kit', '-driver']
  const reposResponse = await fetch(
    'https://api.github.com/orgs/vapor/repos?type=public&per_page=100',
    {
      headers: {
        authorization: `token ${process.env.GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json'
      }
    }
  )

  if (reposResponse && reposResponse.status === 200) {
    const repos = await reposResponse.json()
    const filteredRepos = repos.filter((r) => {
      return (
        featuredRepos.includes(r.name) ||
        searchPattern.some((p) => r.name.includes(p))
      )
    })
    filteredRepos.forEach((repo) => {
      p.push(mapItem(repo))
    })

    packageList = await Promise.all(p)
  } else {
    console.log('github error')
  }

  packageList = packageList.filter((v) => !!v)

  return {
    props: {
      packageList
    }
  }
}
