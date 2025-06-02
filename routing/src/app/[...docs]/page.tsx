// ✅ DO NOT add "use client"
// type blugProps = {
//     params: {
//         docs: string[];
//     };
// };
// { params }: blugProps
export default async function DocsPage() {
    const num = Math.floor(Math.random() * 5) + 1;
    if (num === 1) {
        throw new Error("Number is 1 ")
    }
    // if (params?.docs?.length === 1) {
    //     return <h1>This content is first docs</h1>;
    // }

    // if (params?.docs?.length === 2) {
    //     return <h1>This content is second docs</h1>;
    // }

    // if (params?.docs?.length === 3) {
    //     return <h1>This content is third docs</h1>;
    // }

    return <h1>This is home page of docs. Random number: {num}</h1>;
}
