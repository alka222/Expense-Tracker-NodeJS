async function login(event){

    try{

        event.preventDefault();

        const loginDetails = {
            email: event.target.email.value,
            password: event.target.password.value
        }

        console.log(loginDetails);

        const response = await axios.post("http://localhost:3000/user/login",loginDetails)
        .then(response => {
            if(response.status === 201){
                console.log(response);
                alert('Login Successful');
            }

            else if(response.status === 401){
                console.log(response);
                alert('user not authorized');
            }

            else if(response.status === 404){
                console.log(response);
                alert('user not found');
            }

            else{
                throw new Error('Failed to Login');
            }
        })

        .catch(err => console.log(err));

    }

    catch(err){
        document.body.innerHTML += `<h4> <div style="color:red;"> ${err} </div> </h4>`
        console.log(err)
    }


}