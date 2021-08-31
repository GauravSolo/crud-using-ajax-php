//Ajax request for retreiving data

let tbody = document.getElementById('tbody');

function showData(){
    tbody.innerHTML="";
    // console.log("I entered");

    const xhr = new XMLHttpRequest();
    xhr.open("GET","retreive.php",true);
    
    xhr.responseType = 'json';
    
    xhr.onload = ()=>{
        if(xhr.status === 200)
        {
            if(xhr.response)
            {
                var x = xhr.response;
            }else{
                var x = "";
            }
            // console.log(x,x.length,typeof(x));
            for(let i = 0;i < x.length; i++)
            {
                tbody.innerHTML += "<tr><td>"+(i+1)+"</td><td>"+x[i].NAME+"</td><td>"+x[i].EMAIL+"</td><td>"+x[i].PASSWORD+"</td><td><div class='btn btn-warning btn-edit' data-sid='"+x[i].ID+"'>Edit</div><div class='btn btn-danger ms-3 btn-del' data-sID='"+x[i].ID+"'>Delete</div></td></tr>"; 
            }

        }else{
            document.querySelector('#sm').innerText = 'Student data couldnt fetched!';
        }
        studentDelete();
    }
    xhr.send();
}

showData();

//Ajax request for sending data
document.querySelector("button[type='submit']").addEventListener("click",(e)=>{
    e.preventDefault();
    let nm = document.getElementById('inputName').value;
    let em = document.getElementById('inputEmail4').value;
    let ps = document.getElementById('inputPassword4').value;


    //creating xhr object
    const xhr = new XMLHttpRequest();

    xhr.open('POST','insert.php',true);

    xhr.setRequestHeader('Content-Type','application/json');

    // xhr.onprogress= ()=>{
    //     console.log("On Progress");
    // }
    // xhr.onreadystatechange=()=>{
    //     console.log('ready state is ',xhr.readyState);
    // }

    xhr.onload = ()=> {
        if(xhr.status === 200){
            document.querySelector('#formid').reset();
            if(xhr.responseText != "0")
                document.querySelector('#sms').innerText = 'Student data saved successfully!';
            else
                document.querySelector('#smf').innerText = 'PLEASE FILL ALL FIELDS!!';
            showData();
        }else{
            document.querySelector('#smf').innerText = 'Some problem Occured!';
        }
    }

    const data = {name:nm,email:em,password:ps};
    const mydata  = JSON.stringify(data);
    xhr.send(mydata);
});

//Ajax for Delete item
function studentDelete(){

    var x = document.getElementsByClassName('btn-del');

    for(let i = 0;i < x.length; i++)
    {
        x[i].addEventListener("click",()=>{
            var id = x[i].getAttribute("data-sid");

            var xhr = new XMLHttpRequest();

            xhr.open('POST','delete.php',true);
            xhr.setRequestHeader('Content-Type','application/json');

            xhr.onload=()=>{
                if(xhr.status === 200)
                {
                    if(xhr.response)
                    {
                        
                        if(xhr.responseText == "1")
                            document.getElementById("sm").innerText = "Student data delete successfully!";
                        else
                            document.getElementById("sm").innerText = "couldnt delete student data!";  
                        
                    } 
                }else{
                            document.getElementById("sm").innerText = "Some problem occured";
                }
                showData();
            }
            var data = {sid:id};
            var mydata = JSON.stringify(data);
            xhr.send(mydata);

        });
    }


}











