export default function Button({
    children,
    type = "button",
    bgColor = "bg-blue-600 hover:bg-blue-700",
    textColor = "text-white",
    cursor = "cursor-pointer",
    className = "",
    disabled = false,
    ...props
}) {
    return (
        <button
            type={type}
            disabled={disabled}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none focus:ring-2 focus:ring-blue-500 focus:outline-none ${bgColor} ${textColor} hover:shadow-lg ${className} cursor-pointer`}
            {...props}
        >
            {children}
        </button>
    );
}