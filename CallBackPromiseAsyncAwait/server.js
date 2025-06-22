// Program using callbacks :
function fetchData(name, cb){
    setTimeout(() => {
        if(name == "SSP"){
            cb(null, { success : true });
        }else{
            cb(new Error("Invalid name"), null);
        }
    }, 2000)
}

const promise = fetchData("SSP", (error, success) => {
    if(error){
        console.log("The error is :", error.message);
    }else{
        console.log(success);
    }
})

// Program using promises :
function fetchName(name){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(name == "SSP"){
                resolve({ success : true });
            }else{
                reject(new Error("Invalid name"));
            }
        }, 2000);
    })
}

fetchName("ISP")
.then(data => console.log(data))
.catch(err => console.log(err.message));

// Program using async await :

const getUser = async () => {
    try{
        const data = await fetchName("SSP");
        console.log(data);
    }catch (err){
        console.log(err.message);
    }
}

getUser();
