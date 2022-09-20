const fs = require('fs');

const requestHandler = (req, res)=>{
    const url = req.url;
    const method = req.method;

    if (url === "/") {
        res.setHeader("Content-Type", "text/html");
        res.write("<html  lang='en'>");
        res.write("<head><title>NodeJs</title></head>");
        res.write(
            "<body><form action='/message' method='POST'><input type='text' name='message'><button type='submit'>Submit</button></form></body>"
        );
        res.write("</html>");
        return res.end();
    }

    if (url === "/message" && method === "POST") {
        const body = [];
        req.on("data", (chunk => {
            console.log(chunk)
            body.push(chunk);
        }));

        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            const data = parsedBody.split("=")[1];
            // file system က fileName ထည့်တဲ့အခါ နောက်က extension ကိုပါ ထည့်ပေးရမယ်
            fs.writeFile('message.txt', data, (err)=>{
                if(err) throw err;
                // redirect
                setTimeout(()=>{
                    res.writeHead(302, {
                        'Location': '/home'
                    });
                    // res.status(302);
                    // res.setHeader('Location', '/');
                    res.end();
                    console.log('sent response')
                }, 3000)

            });

            console.log('end listening');
            return null;
        })
    }

    if (url === "/home") {
        res.setHeader("Content-Type", "text/html");
        res.write("<html lang='en'>");
        res.write("<head><title>NodeJs</title></head>");
        res.write("<body><h1>Hello from NodeJs</h1></body>");
        res.write("</html>");
        return res.end();
    }

    res.write("<html  lang='en'>");
    res.write("<head><title>NodeJs</title></head>");
    res.write("<body><h1>Welcome</h1></body>");
    res.write("</html>");
    res.end();
}

module.exports = requestHandler;