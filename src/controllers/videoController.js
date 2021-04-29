export const trending = (req,res) => res.render("home",{pageTitle: 'Home'})

export const search = (req,res)=>res.render("search")

export const handleEdit = (req,res) => res.render("edit")

export const myVideo = (req,res)=> res.send("My videos")

export const deleteVideo = (req,res)=>res.send("Delete Video")

export const uploadVideo = (req,res)=>res.send("Upload Video")