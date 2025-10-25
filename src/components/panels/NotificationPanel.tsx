type NotificationPanelProps = {
    messages: string[]
}

export const NotificationPanel = ({ messages }: NotificationPanelProps) => {
    if (messages.length === 0) return null

    return (
        <div className="fixed top-4 right-4 space-y-2 z-50">
            {messages.map((message, index) => (
                <div
                    key={index}
                    className="bg-primary text-white px-4 py-3 rounded-xl shadow-lg max-w-sm animate-fade-in"
                >
                    <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {message}
                    </div>
                </div>
            ))}
        </div>
    )
}