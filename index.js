import express from "express";
import axios from "axios";


const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/api/quote", async (req, res) => {
try {
    const result = await axios.get("https://zenquotes.io/api/random");
    const quoteData = result.data[0];
    res.json( {
        quote: quoteData.q,
        author: quoteData.a,
    });
} catch (error) {
    res.status(500).send({error: "Failed to fetch quote"});
    }
});



app.get("/", async (req, res) => {
    try {
        const result = await axios.get("https://zenquotes.io/api/random");
        const quoteData = result.data[0];
        res.render("index.ejs", {
            quote: quoteData.q,
            author: quoteData.a,
        });
    } catch (error) {
        res.status(404).send(error.message);
        }
    });
     
 
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
