var allInputs = Array.from(document.querySelectorAll("input"));
var signUpAnchor = document.querySelector("#signUp");
var login = document.querySelector(".loginbtn");
var welcomeBody =document.querySelector("body");
var regex =/(@)[a-z]{3,8}(\.com)$/;
var userPack ;
if (JSON.parse(localStorage.getItem("users"))==null)
{
    userPack = [];
}
else
{
    userPack = JSON.parse(localStorage.getItem("users"));
}
function inputCycle(Array)
{
    for(var i = 0 ; i < Array.length ; i++){
        Array[i].addEventListener("focus" , function (eInfo){
            retriveBorder(eInfo.target) 
        })
        Array[i].addEventListener("blur" , function (eInfo){
            addBorder(eInfo.target) 
        })
    }
}
inputCycle(allInputs);
function retriveBorder(information)
{
    information.style.cssText = "border :none !important;";
}
function addBorder(information)
{
    information.style.cssText = "border :1px solid #ced4da !important;";
}
function signUpPage()
{
    var signUp = document.querySelector(".container");
    signUp.innerHTML =
    `
        <h3 class="text-center  text-info my-3">Smart Login System</h3>
        <input type="text" name="userName" placeholder="Enter Your name" class="form-control my-2 text-muted">
        <input type="email" name="userEmail" placeholder="Enter Your Email" class="form-control my-2 text-muted">
        <input type="password" name="userPassward" placeholder="Enter Your password" class="form-control my-2 text-muted">
        <p class="text-center text-danger my-2 alarm"></p>
        <a href="#" class="btn w-100 text-info border-info signinbtn my-2">Sign up</a>
        <p class="text-white text-center fs-5 my-2">You have an account <a href="index.html" class="text-decoration-none text-white">Sign in</a> </p>
    `
    var allInputs = Array.from(document.querySelectorAll("input"));
    var signIn = document.querySelector(".signinbtn");
    inputCycle(allInputs);    
     signIn.addEventListener("click" , registeration);
}    
signUpAnchor.addEventListener("click" ,signUpPage );
function registeration() {
    var signUpInputs = Array.from(document.querySelectorAll("input"));
    if(signUpInputs[0].value=="" || signUpInputs[1].value=="" ||signUpInputs[2].value=="") 
    {
        window.alert("please fill Your Data")
    }
    else
    {
        if(regex.test(signUpInputs[1].value)==true)
        {
            var userInfo = {
                userName : signUpInputs[0].value,
                userEmail : signUpInputs[1].value,
                userPassward : signUpInputs[2].value,
            }
            if(searchByMail(signUpInputs,1)==-1)
            {
                userPack.push(userInfo);
                localStorage.setItem("users" , JSON.stringify(userPack));
                document.querySelector(".alarm").innerHTML=" your e-mail is created";
                clearInputs(signUpInputs);
            }
            else
            {
                document.querySelector(".alarm").innerHTML="e-mail already exist";
                signUpInputs[1].value=="";
            }

        }
        else
        {
            document.querySelector(".alarm").innerHTML="try valid mail";
        }


    }
}
function clearInputs(inputlist)
{
    for (var i = 0 ; i<inputlist.length ; i++)
    {
        inputlist[i].value="";
    }
}
function searchByMail(list , index)
{
    for(var i=0 ; i<userPack.length;i++)
    {
        if(list[index].value.match(userPack[i].userEmail))
        {
          break;
        }  
    }
    if(i<userPack.length)
    {
      return i ;
    }  
    else
    {
        return -1;
    }  
}  
login.addEventListener("click" , signIn);
function signIn()
{
    var index = searchByMail(allInputs,0);
    if(index==-1)
    {
        document.querySelector(".alarm").innerHTML = "invalid User Mail";
        clearInputs(allInputs);
    }
    else
    {
        if(allInputs[1].value.match(userPack[index].userPassward))
        {
            welcomeBody.innerHTML =
            `
            <section id="sectionTwo">
                <div class="navigation  py-3">
                    <div class="container d-flex justify-content-between text-white">
                        <h2>SMART LOGIN</h2>
                        <a class="btn btn-outline-warning " href="index.html">Log out</a>
                    </div>
                </div>
                <div class="h-75 container d-flex justify-content-between align-items-center welcomeBox">
                    <h3 class="text-center text-info py-5 w-50 mx-auto ">welcome  ${userPack[index].userName.toUpperCase()}</h3>
                </div>
            </section>
            `
        }
        else
        {
            document.querySelector(".alarm").innerHTML = "invalid passward";
            allInputs[1].value="";
        }
    }

}
