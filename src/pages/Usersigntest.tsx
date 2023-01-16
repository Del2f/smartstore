    import { useState } from "react";
    import { useDispatch } from "react-redux";
    import { useNavigate } from "react-router-dom";
    import "./Usersign.scss";
    import { decrement, increment } from '../store/counterSlice';
    import axios from "axios";


    function UsersignTest() {

        // const count = useSelector((state : RootState) => state.counter.value);

        //increment(1증가) 동작
        const handleIncrement = () => dispatch(increment());
        //decrement(1감소) 동작
        const handleDecrement = () => dispatch(decrement());

        const dispatch = useDispatch();
        const navigate = useNavigate();
        const [name, setName] = useState("");
        const [password, setPassword] = useState("");
      
        const onNamedHandler = (e:any) => {
          setName(e.target.value);
        };
        const onPasswordHandler = (e:any) => {
          setPassword(e.target.value);
        };
        const onSubmitHandler = async (e:any) => {

          //새로고침 방지
          e.preventDefault();
          try {
            const {data} = await axios.post ("http://localhost:3000/smartstore/commerce/usersigntest", ...name);
            if (data) {
              if(data.errors) {

              } else {

              }
            }
          }
          catch (err){
            console.log(err)
          }

          // if (password !== confirmPassword) {
          //   return alert("비밀번호와 비밀번호확인은 같아야 합니다.");
          // }

          let body = {
            name: name,
            password: password,
          };

          // dispatch(setUser(body))
          // .then((response:any) => {
          //   if (response.data.success) {
          //     navigate("/login");
          //   } else {
          //     alert("Failed to sign up");
          //   }
          // })
        };

    return (
        <>
        {/* <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={handleIncrement}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={handleDecrement}
        >
          Decrement
        </button>
      </div> 
    </div> */}

        <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={(e) => onSubmitHandler(e)}
      >

        <label>Name</label>
        <input type="text" value={name} onChange={onNamedHandler} />

        <label>Password</label>
        <input type="password" value={password} onChange={onPasswordHandler} />

        <br />
        <button type="submit">Sign UP</button>
      </form>
    </div>
        </>
    );
    }

    export default UsersignTest;
