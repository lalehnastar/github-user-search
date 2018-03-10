
const dotenv = require('dotenv').config()
const express = require('express')
const app = express()
const axios = require('axios')
const httpClient = axios.create()
const PORT = 3000
console.log(process.env)
//website to find urls
//https://developer.github.com/v3/ 

//each time you need another app info you need to be registrated in that app and pick the client_id and client_secret

app.get('/users/:username', (req, res) => {
   const options = {
       method: 'get',
       //from documentation he sent to us then made it to req.params.username 
       //to make it useful for each user then client_id and secret_id you put from 
       //registration you did in github after registration gives you an id

       url: `https://api.github.com/users/${req.params.username}?
       client_id=${process.env.CLIENT_ID}&
       client_secret=${process.env.CLIENT_SECRET}`
   }

   httpClient(options).then((apiResponse) => {
       const html = `
       <h1>${apiResponse.data.name}</h1>
       <ul>
           <li>${apiResponse.data.location}</li>
           <li>${apiResponse.data.public_repos}</li>
           <li>${apiResponse.data.bio}</li>
           <img src = ${apiResponse.data.avatar_url}/>
       </ul>
       `
       res.send(html)
   })
   
   
})
app.get('/repos/:owner/:repo', (req, res) => {
    const options = {
        method: 'get',
        //from documentation he sent to us then made it to req.params.username 
        //to make it useful for each user then client_id and secret_id you put from 
        //registration you did in github after registration gives you an id
 //                                                                       || if have /:something in the app.get
        //url is always the site you wanna go like githubaddress/repos/${req.params.owner}/${req.params.repo}
        url: `https://api.github.com/repos/${req.params.owner}/${req.params.repo}?client_id=2aac68f8bb5f5932bb50&client_secret=f52a37a026d3b4a2da53be1a8992630ccf7d7514`
    }
 //to see the object in terminal you need active the localhost first and the localhost should be
 //the same as localhost:3000/repos/lalehnastar/wdi-fundamentals-memorygame for example
    httpClient(options).then((apiResponse) => {
        console.log(apiResponse.data)
        const html = `
        <h1>${apiResponse.data.name}</h1>
        <ul>
           <li>${apiResponse.data.location}</li>
           <li>${apiResponse.data.public_repos}</li>
           <li>${apiResponse.data.bio}</li>
           <img src = ${apiResponse.data.avatar_url}/>
       </ul>
        `
        res.send(html)
    })
}) 





app.listen(PORT, (err) => {
   console.log(err || `Server running on port ${PORT}`)
})