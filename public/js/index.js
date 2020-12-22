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
  el.innerHTML=`<p>For the post</p><select id="signup_post"><option value="President_Students_gymkhana"> President, Student' gymkhana</option>
  <option value="Gerenal_secretary(SNT)"> Gerenal secretary(SNT)</option>
  <option value="Gerenal_secretary(Media_and_Culture)"> Gerenal secretary(Media and Culture)</option>
  <option value="Gerenal_secretary(GNS)"> Gerenal secretary(GNS)</option>
  <option value="Gerenal_secretary_UG_Academics_and_Career"> Gerenal secretary,UG Academics and Career</option>
  <option value="Gerenal_secretary_PG_Academics_and_Career"> Gerenal secretary,PG Academics and Career</option>
  <option value= BT_BS_MT_MS_MBA_Y${new Date().getFullYear()%100-4}> BT/BS-MT/MS/MBA Y${new Date().getFullYear()%100-4}</option>
  <option value=BT_BS_MT_MS_MBA_Y${(new Date().getFullYear()%100)-3}> BT/BS-MT/MS/MBA Y${(new Date().getFullYear()%100)-3}
  <option value=BT_BS_Y${(new Date().getFullYear()%100)-3}> BT/BS Y${(new Date().getFullYear()%100)-3}</option>
  <option value=BT_BS_Y${(new Date().getFullYear()%100)-2}>BT/BS Y${(new Date().getFullYear()%100)-2}</option>
  <option value=BT_BS_Y${(new Date().getFullYear()%100)-1}>BT/BS Y${(new Date().getFullYear()%100)-1}</option>
  <option value=BT_BS_Y${(new Date().getFullYear()%100)}>BT/BS Y${(new Date().getFullYear()%100)}</option>
  <option value=MTech_Y${(new Date().getFullYear()%100)-1}>MTech Y${(new Date().getFullYear()%100)-1}</option>
  <option value=MTech_Y${(new Date().getFullYear()%100)}>MTech Y${(new Date().getFullYear()%100)}</option>
  <option value=MSc_Y${(new Date().getFullYear()%100)-1}>MSc Y${(new Date().getFullYear()%100)-1}</option>
  <option value=MSc_Y${(new Date().getFullYear()%100)}>MSc Y${(new Date().getFullYear()%100)}</option>
  <option value=MSR> MSR</option>
  <option value=MBA_and_MDes_Y${(new Date().getFullYear()%100)-1}>MBA and MDes Y${(new Date().getFullYear()%100)-1}</option>
  <option value=MBA_and_MDes_Y${(new Date().getFullYear()%100)}>MBA and MDes Y${(new Date().getFullYear()%100)}</option>
  <option value=PHD_Y${(new Date().getFullYear()%100)-2}>PHD Y${(new Date().getFullYear()%100)-2}</option>
  <option value=PHD_Y${(new Date().getFullYear()%100)-1}>PHD Y${(new Date().getFullYear()%100)-1}</option>
  <option value=PHD_Y${(new Date().getFullYear()%100)}>PHD Y${(new Date().getFullYear()%100)}</option></select>`;
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
