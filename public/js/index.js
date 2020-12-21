import '@babel/polyfill';
import {
  start_login,
  start_logout,
  start_signup,
  start_forgetpassword,
  start_reset,somedata
} from './login';
import { update_person, register_person, start_delete } from './update';
const login = document.querySelector('#login');
const logout = document.querySelector('#logout');
const signup = document.querySelector('#signup');
const forgetpassword = document.querySelector('#forget_password');
const resetpassword = document.querySelector('#resetpassword');
const savePersonalDetails = document.querySelector('#personal-detail');
const saveprofessionaldetails = document.querySelector('#professional-detail');
const deleteuser = document.querySelectorAll('.deleteme');
if (login) {
  login.addEventListener('submit', (e) => {
    e.preventDefault();
    let email = document.querySelector('#login_emailid').value;
    let password = document.querySelector('#login_password').value;

    start_login(email, password);
  });
}
if (logout) {
  logout.addEventListener('click', (e) => {
    e.preventDefault();
    start_logout();
  });
}
if (signup) {
  let ans;
  document.addEventListener('DOMContentLoaded',async()=>{ans=await somedata();})
  let t=document.querySelector('#signup_role');
 t.addEventListener("change",async(e)=>{e.preventDefault();
    let val=e.target.value;
  let el=document.createElement('div');
if(val=="candidate"){
  el.innerHTML=`<p>For the post</p><select id="signup_post"><option value="President,_Student's_gymkhana"> President, Student' gymkhana</option>
  <option value="Gerenal_secretary(SNT)"> Gerenal secretary(SNT)</option></select>`;
  t.nextElementSibling.parentElement.removeChild(t.nextElementSibling);t.after(el);
}
else if(val=="campaigner"){
    let temp ="";
    for(let i=0;i<ans.length;i++)
    {
    temp=temp+`<option value=${ans[i]._id}> ${ans[i].name}</option>`;
    
  }temp=`<p> Enter who you want to campaign for</p><select id="signup_worksfor">`+temp+"</select>";
  el.innerHTML=temp;
  t.nextElementSibling.parentElement.removeChild(t.nextElementSibling);
  t.after(el);
}});
  document.querySelector("#submit_details").addEventListener('click', (e) => {
    e.preventDefault();
    let email = document.querySelector('#signup_email').value;
    let password = document.querySelector('#signup_password').value;
    let confirmpassword = document.querySelector('#signup_confirmpassword')
      .value;
    let name = document.querySelector('#signup_name').value;
    let role = document.querySelector('#signup_role').value;
    let worksfor = document.querySelector('#signup_worksfor');
    if(worksfor)
    worksfor=worksfor.value;
    let post = document.querySelector('#signup_post')
    if(post)
    post=post.value;
    start_signup(name, email, password, confirmpassword, role, worksfor, post);
  });
}
if (forgetpassword) {
  forgetpassword.addEventListener('click', (e) => {
    e.preventDefault();
    let email = document.querySelector('#login_emailid').value;
    start_forgetpassword(email);
  });
}
if (resetpassword) {
  resetpassword.addEventListener('submit', (e) => {
    e.preventDefault();
    let password = document.querySelector('#forget_password1').value;
    let confirmpassword = document.querySelector('#forget_password1').value;
    let token = document.querySelector('.resettoken').id;
    start_reset(password, confirmpassword, token);
  });
}
if (savePersonalDetails) {
  document.querySelector(".submit_info").addEventListener('click', (e) => { 
    let form = new FormData();
    form.append('address', document.querySelector('#save-address').value);
    form.append('phoneNo', document.querySelector('#save-number').value);
    form.append('Rollno', document.querySelector('#save-rollno').value);
    form.append('photo', document.querySelector('#save-photo').files[0]);
    let id = document.querySelector('.id__').id;
    update_person(form, id);
    e.preventDefault();
  });
}
if (saveprofessionaldetails) {
  saveprofessionaldetails.addEventListener('submit', (e) => {
    e.preventDefault();
    let name = document.querySelector('#create-name').value;
    let email = document.querySelector('#create-email').value;
    let role = document.querySelector('#type').value;
    let address = document.querySelector('#create-address').value;
    let phoneno = document.querySelector('#create-number').value;
    let rollno = document.querySelector('#create-rollno').value;
    let id = document.querySelector('.id__').id;
    register_person(name, email, role, address, phoneno, rollno, id);
  });
}
if (deleteuser) {
  deleteuser.forEach((item) => {
    item.addEventListener('click', (e) => {
      r = confirm('Do you want to delete the person');
      e.preventDefault();
      if (r) {
        let id = e.target.id;
        start_delete(id);
      }
    });
  });
}
