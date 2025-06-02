import React from "react"

export default function LayoutofDashBoard({ children, model, profile, login }: {
    children: React.ReactNode;
    model: React.ReactNode;
    profile: React.ReactNode;
    login: React.ReactNode;
}) {
    const isAuth: boolean = true;
    return isAuth ? (
        <div>
            <div className="flex justify-around">
                <div className="">{children}</div>
                <div className="">{model}</div>
                <div>{profile}</div>
            </div>
        </div>
    ) : (
        <div>
            {login}
        </div>
    )
}