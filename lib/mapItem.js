export default async (v) => {
  const result = {
    id: v.id,
    name: v.name,
    fullName: v.full_name,
    description: v.description,
    watchers: v.watchers,
    forks: v.forks,
    stargazers: v.stargazers_count,
    url: v.clone_url,
    htmlUrl: v.html_url,
    owner: {
      login: v.owner.login
    },
    isCopied: false
  }

  const releasesResponse = await fetch(v.releases_url.replace('{/id}', ''), {
    headers: {
      authorization: `token ${process.env.GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3+json'
    }
  })

  const releases = await releasesResponse.json()
  const filteredReleases = releases.filter((r) => !r.draft && !r.prerelease)
  if (filteredReleases && filteredReleases.length > 0) {
    result.latestRelease = {
      tag: filteredReleases[0].tag_name,
      name: filteredReleases[0].name,
      notes: filteredReleases[0].body,
      url: filteredReleases[0].url,
      authors: [
        {
          id: filteredReleases[0].author.id,
          avatarUrl: filteredReleases[0].author.avatar_url,
          login: filteredReleases[0].author.login,
          url: filteredReleases[0].author.url
        }
      ]
    }
    return result
  } else {
    return null
  }
}
