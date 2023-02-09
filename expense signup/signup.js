const myForm = document.getElementById('my-form');

const msg = document.getElementById('msg');

function saveToCloud(e){

    const nameInput= document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('email');


    if(nameInput.value === '' || emailInput.value === '' || passwordInput.value === ''){

        msg.classList.add('error');
        msg.innerHTML = 'Please enter all fields';
        setTimeout(() => msg.remove(), 3000);

    }

    else{

        e.preventDefault();

            const userDetails = {
            name : nameInput.value,
            email: emailInput.value,
            password: passwordInput.value
        
            }

            console.log(userDetails)
        
        
        
            let serilized_Obj = JSON.stringify(userDetails);
        
            

            axios.post("http://localhost:3000/user/signup",userDetails)
            .then((response) => {

                console.log(response);
            })
            .catch(err => {

                document.body.innerHTML = document.body.innerHTML + "<h4> Something went wrong </h4>"
                console.log(err)
            })

            nameInput.value ='';
            emailInput.value= '';
            passwordInput.value ='';

            console.log(response);

    }


    
  
  }