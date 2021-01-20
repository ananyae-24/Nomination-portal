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
  let p=document.createElement("p");
  p.innerText="For the post";
  el.appendChild(p);
  let select=document.createElement("select");
  select.id="signup_post";
  select.innerHTML=`<option value="President_Student's_gymkhana"> President, Student' gymkhana</option>
  <option value="General_secretary,_Science_and_Technology"> General secretary(SNT)</option>
  <option value="General_secretary,_Media_and_Culture"> General secretary(Media and Culture)</option>
  <option value="General_secretary,_Games_and_sports)"> General secretary(GNS)</option>
  <option value="General_secretary_UG_Academics_and_Career"> General secretary,UG Academics and Career</option>
  <option value="General_secretary_PG_Academics_and_Career"> General secretary,PG Academics and Career</option>
  <option value= BT_BS_MT_MS_MBA_Y16> BT/BS-MT/MS/MBA Y16</option>
  <option value=BT_BS_MT_MS_MBA_Y17> BT/BS-MT/MS/MBA Y17</option>
  <option value=BT_BS_Y17> BT/BS Y17</option>
  <option value=BT_BS_Y18>BT/BS Y18</option>
  <option value=BT_BS_Y19>BT/BS Y19</option>
  <option value=BT_BS_Y20>BT/BS Y20</option>
  <option value=MTech_Y19>MTech Y19</option>
  <option value=MTech_Y20>MTech Y20</option>
  <option value=MSc_Y19>MSc Y19</option>
  <option value=MSc_Y20>MSc Y20</option>
  <option value=MSR> MSR</option>
  <option value=MBA_and_MDes_Y19>MBA and MDes Y19</option>
  <option value=MBA_and_MDes_Y20>MBA and MDes Y20</option>
  <option value=PHD_Y18>PHD Y18 and earlier batches(including Msc-Phd Y16)</option>
  <option value=PHD_Y19>PHD Y19 (including Msc-Phd Y17) </option>
  <option value=PHD_Y20>PHD Y20 (including Msc-Phd Y18)</option>`;
  el.appendChild(select);
  t.nextElementSibling.parentElement.removeChild(t.nextElementSibling);t.after(el);
}
else if(val=="campaigner"){
    let temp ="";
    for(let i=0;i<ans.length;i++)
    {
    temp=temp+`<option value=${ans[i]._id}> ${ans[i].name}</option>`;
    
  }
  temp=`<p> Enter who you want to campaign for</p><select id="signup_worksfor">`+temp+"</select>";
  el.innerHTML=temp;
  let checkbox=document.createElement("input");
  checkbox.type="checkbox";
  checkbox.id="signup_check";
  el.appendChild(document.createElement("br"));
  el.appendChild(document.createElement("br"));
  el.appendChild(checkbox);
  let l=` I , hereby ,give my consent to be a campaigner of the candidate mentioned above and undertake that I have completely read and understood the Code of Conduct of the General Election 2021 ,Students' Gymkhana and promise to abide by all clauses at all points of time during the election period.I understand that my actions and violations ot the code of Conduct shall reciprocate on the candidate I support.`;
  el.appendChild(document.createTextNode(l));
  el.appendChild(document.createElement("br"));
  el.appendChild(document.createTextNode("I am voluntarily signing up as campaigner of the above mentioed candidate."))
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
    let check=document.querySelector("#signup_check");
    if(check)
    {
      check=check.checked;
    }
    if(role=="candidate" || check )
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
