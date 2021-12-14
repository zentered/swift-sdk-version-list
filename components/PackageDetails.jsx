import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default ({ release }) => {
  return (
    <div className="">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white overflow-hidden shadow divide-y divide-gray-200">
            <div className="px-4 py-5 sm:px-6">
              {release.authors &&
                release.authors.map((author) => (
                  <div key={author.login} className="flex-shrink-0 group block">
                    <div className="flex items-center">
                      <div>
                        <img
                          className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                          src={`${author.avatarUrl}.jpg`}
                          alt={author.login}
                          width={50}
                          height={50}
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                          {author.login}
                        </p>
                      </div>
                      <div className="ml-3">
                        <span className="inline-flex items-center ml-4 px-2.5 py-0.5 rounded-md text-base font-medium bg-fuchsia-100 text-pink-800">
                          {release.tag}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className="px-4 py-5 sm:p-6">
              <a href={release.url}>
                <h3 className="mt-3 text-xl text-fuchsia-500 sm:mt-4">
                  {release.name}
                </h3>
              </a>
              <p className="prose text-left">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {release.notes}
                </ReactMarkdown>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
