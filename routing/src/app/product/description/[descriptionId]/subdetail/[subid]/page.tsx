type subprops = {
    params: {
        subid: string
        descriptionId: string
    }
}
export default function subid({ params }: subprops) {
    return (
        <div>
            <h1> sub id is : {params.subid} and description id is : {params.descriptionId}</h1>
        </div>
    )
}