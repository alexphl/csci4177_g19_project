// Two ways with async either .then or await, I used await
import bcrypt from 'bcrypt'; // https://www.npmjs.com/package/bcrypt
import axios from 'axios';
const saltRounds = 10

export const login = async (req, res)=>{
    // get variables from req
    const {password, email} = req.body

    try{
        // load hash from database
        const response = await axios.get(process.env.URL+'/api/users/find/'+email)

        if(response.status === 200 ){

            // get hash from response
            const hash = response.data[0].password

            // compare password to hash
            const result = await bcrypt.compare(password, hash)

            console.log(result)

            // send response
            if(result){
                // send token
                res.status(200).json({token: 'testing123'}) // still need to come up with correct token
            }else{
                res.status(400).json({error: "wrong password"})
            }
        }else{
            return res.status(500).json({error: "something went wrong"})
        }
    }catch(e){
        console.log(e.message)
        return res.status(500).json({error: e.message})
    }

}

export const register = async (req, res)=>{
    // get variables from req
    const {userPassword, email, name} = req.body

    try{
        // hash received password
        const password  = await bcrypt.hash(userPassword, saltRounds)
        const user = {name, email, password}

        // Store hash in database
        const response = await axios.post(process.env.URL+'/api/users/', user)

        if(response && response.status===200){
            // send token
            res.status(200).json({ token: 'testing123'})
        }else{
            res.status(400).json({error:"registration failed"})
        }
    }catch(e){
        console.log(e)
        res.status(500).json({error: e.message})
    }
}
