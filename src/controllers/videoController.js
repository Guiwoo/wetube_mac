const fakeUser = {
    username : "guiwoo",
    loggedin : false
} 

export const trending = (req,res) => {
    const videos = [{
        title:"Hello",
        rating:5,
        comments:2,
        createdAt:"2 mins ago",
        view:59,
        id:1,
    },{
        title:"Second",
        rating:8,
        comments:32,
        createdAt:"5 mins ago",
        view:30000,
        id:2,
    },{
        title:"Third",
        rating:10,
        comments:100,
        createdAt:"10 mins ago",
        view:12392193,
        id:3,
    }
]
    return res.render("home",{pageTitle: 'Home', fakeUser, videos});
}

export const search = (req,res)=>res.render("search")

export const handleEdit = (req,res) => res.render("edit")

export const myVideo = (req,res)=> res.send("My videos")

export const deleteVideo = (req,res)=>res.send("Delete Video")

export const uploadVideo = (req,res)=>res.send("Upload Video")