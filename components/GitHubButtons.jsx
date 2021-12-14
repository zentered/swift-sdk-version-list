import GitHubButton from 'react-github-btn'

export default ({ item }) => {
  return (
    <>
      <span className="relative z-0 inline-flex">
        <GitHubButton
          href={item.htmlUrl}
          data-color-scheme="no-preference: light; light: light; dark: dark;"
          data-icon="octicon-star"
          data-size="large"
          data-show-count="true"
          aria-label={`Star ${item.fullName} on GitHub`}
        >
          Star
        </GitHubButton>
        <GitHubButton
          href={item.htmlUrl}
          data-color-scheme="no-preference: light; light: light; dark: dark;"
          data-icon="octicon-eye"
          data-size="large"
          data-show-count="true"
          aria-label={`Watch ${item.fullName} on GitHub`}
        >
          Watch
        </GitHubButton>
        <GitHubButton
          href={`${item.htmlUrl}/issues`}
          data-color-scheme="no-preference: light; light: light; dark: dark;"
          data-icon="octicon-issue-opened"
          data-size="large"
          data-show-count="true"
          aria-label={`Issue ${item.fullName} on GitHub`}
        >
          Issue
        </GitHubButton>
      </span>
    </>
  )
}
