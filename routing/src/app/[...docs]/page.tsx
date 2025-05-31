type blugProps = {
    params: {
        docs: string[]
    }
}
export default function DocsPage({ params }: blugProps) {
    if (params.docs?.length == 1) {
        return (
            <div>
                <h1>This content is first docs</h1>
            </div>
        )
    }
    if (params.docs?.length == 2) {
        return (
            <div>
                <h1>This content is : second docs</h1>
            </div>
        )
    }
    if (params.docs?.length == 3) {
        return (
            <div>
                <h1>This content is : third docs</h1>
            </div>
        )
    }

    return (
        <div>
            this is home page of docs
        </div>
    )

}