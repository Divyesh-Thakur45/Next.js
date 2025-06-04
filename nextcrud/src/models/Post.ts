import {Schema , Document , model , models} from "mongoose";

interface productData extends Document {
    // image? : string;
    title : string;
    price : string;
    description : string;
} 
const productSchema: Schema=new Schema<productData>(
    {
        // image :{
        //     type : String,
        //     required : false,
        // },
        title :{
            type : String,
            required : true,
        },
        price :{
            type : String,
            required : true,
        },
        description :{
            type : String,
            required : true,
        },   
    }
)

const productModel = models.Product || model<productData>("Product",productSchema)

export default productModel;