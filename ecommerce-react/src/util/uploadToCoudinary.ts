
export const uploadToCoudinary=async(pics:any)=>{
    const cloud_name="dz46ubqnx"
    const upload_preset="magizh_ecommerce"

    if(pics){
        const data=new FormData();
        data.append("file",pics);
        data.append("upload_preset",upload_preset);
        data.append("cloud_name",cloud_name);

        const res=await fetch("https://api.cloudinary.com/v1_1/dz46ubqnx/image/upload",{
            method:"POST",
            body:data   
        })
        const urlData=await res.json();
        return urlData.url;
    }else{
        console.error("error: pics not found");
    }
}