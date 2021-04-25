const http = require('http');

const removeTag = (str) => {
    return str.replace(/(<[^>]*>)|\s/g, '')
}

const fetchData = () => {
    let data = {}
    const req = http.get("http://codequiz.azurewebsites.net/",{headers: {
        Cookie: "hasCookie=true;"
    }}, res => {
        res.on('data', content => {
            const contentStr = content.toString()
            const body = contentStr.match(/<td>(.*?)<\/td>/g)
            for(var i = 0;i < body.length/5;i++){
                data = {
                    ...data,
                    [removeTag(body[5*i])]: {
                        Nav: removeTag(body[(5*i) + 1]),
                        Bid: removeTag(body[(5*i) + 2]),
                        Offer: removeTag(body[(5*i) + 3]),
                        Change: removeTag(body[(5*i) + 4]),
                    }
                }
            }
            getNav(data)
        })

        res.on('error', error => {
            console.error("error", error)
        })
    })
    
    req.end()
}

const getNav = data => {
    if(data[process.argv[2]]){
        console.log(data[process.argv[2]].Nav)
    }
    else{
        console.log("Not found!!!")
    }
}

fetchData()