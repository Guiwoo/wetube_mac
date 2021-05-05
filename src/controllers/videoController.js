const fakeUser = {
    username : "guiwoo",
    loggedin : false
} 

let videos = [{
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

export const trending = (req,res) => {
    return res.render("home",{pageTitle: 'Home', fakeUser, videos});
}

export const search = (req,res)=>res.render("search")


export const watch = (req,res)=> {
    const {params:{id}}=req
    const video = videos[id-1]
    res.render("watch",{pageTitle:`Watch ${video.title}`, fakeUser,video});
}

export const getHandleEdit = (req,res) => {
   const {params:{id}}=req
   const video = (videos[id-1])
   res.render("edit",{pageTitle:`Editing ${video.title}`,fakeUser,video})
}

export const postHandleEdit = (req,res) => {
    const {params:{id}} = req
    const {body:{title}} =req
    videos[id-1].title = title
    res.redirect(`/videos/${id}`)
}

export const deleteVideo = (req,res)=>res.send("Delete Video")

export const uploadVideo = (req,res)=>res.send("Upload Video")