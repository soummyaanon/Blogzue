import React from "react";


function Button({

    children,
    type = "button",
    bgcolor = "bg-blue-500",
    textcolor = "text-white",
    className = "",
    ...props
    
}) {
    return (
        <button className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} {...props}>
            {children}
        </button>
    );
}