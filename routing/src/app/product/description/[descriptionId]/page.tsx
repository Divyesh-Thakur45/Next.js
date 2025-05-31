type paramsProps = {
    params: { descriptionId: string }
}
export default function descriptionId({ params }: paramsProps) {
    return (
        <div>
            <h1>The id is :{params.descriptionId} </h1>
        </div>
    )
}