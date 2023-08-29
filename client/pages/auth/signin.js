import { useState } from "react";
import Router from "next/router";
import UseRequest from "../../hooks/use-request";

const signin = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {doRequest, errors} = UseRequest({
    url: '/api/users/signin',
    method: 'post',
    body: {email, password},
    onSuccess: () => Router.push('/')
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    
    await doRequest();
    
  };

  return (
    <form onSubmit={onSubmit} className="m-lg-3">
      <h1 className="m-lg-2">Signin</h1>
      <div className="form-group m-lg-2">
        <label>Email Address</label>
        <input value={email} onChange={e => setEmail(e.target.value)} 
          className="form-control"></input>
      </div>
      <div className="form-group m-lg-2">
        <label>Password</label>
        <input value={password} onChange={e => setPassword(e.target.value)} 
          className="form-control" type="password"></input>
      </div>
      {errors}
      <button className="btn btn-primary m-lg-2">Sign IN</button>

    </form>
  );
};
 
export default signin;