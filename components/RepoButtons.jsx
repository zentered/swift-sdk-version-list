import GitHubButton from 'react-github-btn'

export default ({ owner }) => {
  return (
    <>
      <span className="relative z-0 inline-flex shadow-sm rounded-md">
        <GitHubButton
          href={`https://github.com/sponsors/${owner.login}`}
          data-color-scheme="no-preference: light; light: light; dark: dark;"
          data-icon="octicon-heart"
          data-size="large"
          aria-label={`Sponsor @${owner.login} on GitHub`}
        >
          Sponsor {owner.login}
        </GitHubButton>
      </span>
    </>
  )
}
