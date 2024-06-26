import React, { useState } from "react";
import RegistrationTop from "../../RegistrationComponent/RegistrationTop";
import Input from "../../RegistrationComponent/Input";
import { successMessage } from "../../../utils/Utils";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../Firebase/Firebase";
import { Link, useNavigate } from "react-router-dom";
// Bangladeshi division & district array of list
import { allDivision, allDistict } from "@bangladeshi/bangladesh-address";
// ===============================================
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Registration = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [show, setshow] = useState(false);
  const [show2, setshow2] = useState(false);

  // store input value
  const [userInfo, setuserInfo] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Telephone: "",
    Address1: "",
    Address2: "",
    City: "",
    PostCode: "",
    Password: "",
    RepeatPassword: "",
    division: "",
    District: "",
    agreement: false,
    subscribeyes: false,
    subscribeno: false,
  });
  // store input error
  const [userInfoError, setuserInfoError] = useState({
    FirstNameError: "",
    TelephoneError: "",
    Address1Error: "",
    PasswordError: "",
    PasswordLengthError: "",
    PasswordMatchError: "",
    RepeatPasswordError: "",
    divisionError: "",
    agreementError: false,
  });

  // Handle sign up button
  const HandleSignup = () => {
    const {
      FirstName,
      Telephone,
      Address1,
      division,
      Password,
      RepeatPassword,
      agreement,
    } = userInfo;

    if (!FirstName) {
      setuserInfoError({
        ...userInfoError,
        FirstNameError: "Firstname required",
        TelephoneError: "",
        Address1Error: "",
        PasswordError: "",
        PasswordLengthError: "",
        RepeatPasswordError: "",
        PasswordMatchError: "",
        divisionError: "",
        agreementError: "",
      });
    } else if (!Telephone) {
      setuserInfoError({
        ...userInfoError,
        FirstNameError: "",
        Address1Error: "",
        PasswordError: "",
        PasswordLengthError: "",
        RepeatPasswordError: "",
        PasswordMatchError: "",
        divisionError: "",
        agreementError: "",
        TelephoneError: "Telephone number required",
      });
    } else if (!Address1) {
      setuserInfoError({
        ...userInfoError,
        FirstNameError: "",
        PasswordError: "",
        PasswordLengthError: "",
        RepeatPasswordError: "",
        PasswordMatchError: "",
        divisionError: "",
        agreementError: "",
        TelephoneError: "",
        Address1Error: "Address required",
      });
    } else if (!Password) {
      setuserInfoError({
        ...userInfoError,
        FirstNameError: "",
        PasswordLengthError: "",
        RepeatPasswordError: "",
        PasswordMatchError: "",
        divisionError: "",
        agreementError: "",
        TelephoneError: "",
        Address1Error: "",
        PasswordError: "Password required",
      });
    } else if (Password.length < 8) {
      setuserInfoError({
        ...userInfoError,
        FirstNameError: "",

        RepeatPasswordError: "",
        PasswordMatchError: "",
        divisionError: "",
        agreementError: "",
        TelephoneError: "",
        Address1Error: "",
        PasswordError: "",
        PasswordLengthError: "Password must be 8 character",
      });
    } else if (!RepeatPassword) {
      setuserInfoError({
        ...userInfoError,
        FirstNameError: "",
        PasswordMatchError: "",
        divisionError: "",
        agreementError: "",
        TelephoneError: "",
        Address1Error: "",
        PasswordError: "",
        PasswordLengthError: "",
        RepeatPasswordError: "Confirm password required",
      });
    } else if (Password !== RepeatPassword) {
      setuserInfoError({
        ...userInfoError,
        FirstNameError: "",
        RepeatPasswordError: "",
        divisionError: "",
        agreementError: "",
        TelephoneError: "",
        Address1Error: "",
        PasswordError: "",
        PasswordLengthError: "",
        PasswordMatchError: "Password not match",
      });
    } else if (!division) {
      setuserInfoError({
        ...userInfoError,
        FirstNameError: "",
        RepeatPasswordError: "",
        agreementError: "",
        TelephoneError: "",
        Address1Error: "",
        PasswordError: "",
        PasswordLengthError: "",
        PasswordMatchError: "",
        divisionError: "Select your division",
      });
    } else if (agreement == false) {
      setuserInfoError({
        ...userInfoError,
        FirstNameError: "",
        RepeatPasswordError: "",
        TelephoneError: "",
        Address1Error: "",
        PasswordError: "",
        PasswordLengthError: "",
        PasswordMatchError: "",
        divisionError: "",
        agreementError: "Accept the agreement",
      });
    } else {
      setuserInfoError({
        ...userInfoError,
        FirstNameError: "",
        RepeatPasswordError: "",
        TelephoneError: "",
        Address1Error: "",
        PasswordError: "",
        PasswordLengthError: "",
        PasswordMatchError: "",
        divisionError: "",
        agreementError: false,
      });

      // creat user with firebase createUserWithEmailAndPassword
      setloading(true);
      createUserWithEmailAndPassword(auth, userInfo.Email, userInfo.Password)
        .then(() => {
          successMessage(
            `${userInfo.FirstName} Sign up`,
            "top-right",
            "light",
            2000
          );
        })
        .then(() => {
          addDoc(collection(db, "users"), userInfo)
            .then((user) => {
              sendEmailVerification(auth.currentUser).then(() => {
                successMessage(
                  `${userInfo.FirstName} Email sent`,
                  "top-center",
                  "dark",
                  1500
                );
              });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((errr) => {
          toast.error(<p>{errr.code}</p>, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        })
        .finally(() => {
          setloading(false);
          navigate("/login");
          setuserInfo({
            FirstName: "",
            LastName: "",
            Email: "",
            Telephone: "",
            Address1: "",
            Address2: "",
            City: "",
            PostCode: "",
            Password: "",
            RepeatPassword: "",
            division: "",
            District: "",
            agreement: false,
            subscribeyes: false,
            subscribeno: false,
          });
        });
    }
  };

  // HandleInput field
  const HandleInput = (e) => {
    setuserInfo({
      ...userInfo,
      [e.target.id]: e.target.value,
    });
  };

  // HandleShowPassword
  const HandleShowPassword = () => {
    setshow(!show);
  };

  const HandleShowPassword2 = () => {
    setshow2(!show2);
  };

  // Firebae
  const auth = getAuth();

  return (
    <>
      <div className="py-14 lg:py-28 px-4 lg:px-0">
        <div className="container">
          <RegistrationTop />

          {/* Personal Details */}
          <div className="py-14 border-y-2 mt-14 lg:mt-28">
            <h2 className="font-DMsans font-bold text-primaryFontColor text-[24px] md:text-[39px] pb-5 lg:pb-10">
              Your Personal Details
            </h2>
            <form action="#" onSubmit={(e) => e.preventDefault()}>
              <div className="flex items-center justify-between flex-wrap">
                <div className="w-full md:basis-2/4">
                  <Input
                    inputTitle={"First Name"}
                    placeHolder={"First Name"}
                    inputType={"text"}
                    inputName={"FirstName"}
                    inputId={"FirstName"}
                    inputValue={userInfo.FirstName}
                    onChangeInput={HandleInput}
                    className={`${userInfoError.FirstNameError && "border-red-700"}`}
                  />
                  {userInfoError.FirstNameError && (
                    <p className="text-red-600 font-DMsans text-xs md:text-base font-normal">
                      {userInfoError.FirstNameError}
                    </p>
                  )}
                </div>

                <Input
                  inputTitle={"Last Name"}
                  placeHolder={"Last Name"}
                  inputType={"text"}
                  inputName={"LastName"}
                  inputId={"Last Name"}
                  inputValue={userInfo.LastName}
                  onChangeInput={HandleInput}
                />

                <Input
                  inputTitle={"Email address"}
                  placeHolder={"Your email address"}
                  inputId={"Email"}
                  inputName={"Email"}
                  inputType={"email"}
                  inputValue={userInfo.Email}
                  onChangeInput={HandleInput}
                />
                <div className="w-full md:basis-2/4">
                  <Input
                    inputTitle={"Telephone"}
                    placeHolder={"Your telephone number"}
                    inputId={"Telephone"}
                    inputName={"Telephone"}
                    inputType={"text"}
                    inputValue={userInfo.Telephone}
                    onChangeInput={HandleInput}
                    className={`${userInfoError.TelephoneError && "border-red-700"}`}
                  />
                  {userInfoError.TelephoneError && (
                    <p className="text-red-600 font-DMsans text-base font-normal">
                      {userInfoError.TelephoneError}
                    </p>
                  )}
                </div>
              </div>
            </form>
          </div>

          {/* New Customer */}
          <div className="py-2 lg:py-14 border-0 lg:border-y-2 mt-6 lg:mt-28">
            <h2 className="font-DMsans font-bold text-primaryFontColor text-2xl lg:text-[39px] pb-4 lg:pb-10">
              New Customer
            </h2>
            <form action="#" onSubmit={(e) => e.preventDefault()}>
              <div className="flex items-center justify-between flex-wrap">
                <div className="w-full md:basis-2/4">
                  <Input
                    inputTitle={"Address 1"}
                    placeHolder={"Address 1"}
                    inputType={"text"}
                    inputName={"Address1"}
                    inputId={"Address1"}
                    inputValue={userInfo.Address1}
                    onChangeInput={HandleInput}
                    className={`${userInfoError.Address1Error && "border-red-700"}`}
                  />
                  {userInfoError.Address1Error && (
                    <p className="text-red-600 font-DMsans text-base font-normal">
                      {userInfoError.Address1Error}
                    </p>
                  )}
                </div>

                <Input
                  inputTitle={"Address 2"}
                  placeHolder={"Address 2"}
                  inputType={"text"}
                  inputName={"Address2"}
                  inputId={"Address2"}
                  inputValue={userInfo.Address2}
                  onChangeInput={HandleInput}
                />
                <Input
                  inputTitle={"City"}
                  placeHolder={"City"}
                  inputId={"City"}
                  inputName={"City"}
                  inputType={"text"}
                  inputValue={userInfo.City}
                  onChangeInput={HandleInput}
                />
                <Input
                  inputTitle={"Post Code"}
                  placeHolder={"Post Code"}
                  inputId={"PostCode"}
                  inputName={"PostCode"}
                  inputType={"text"}
                  inputValue={userInfo.PostCode}
                  onChangeInput={HandleInput}
                />

                <div className="flex justify-between w-full md:basis-full">
                  {/* Division */}
                  <div className="flex w-full md:basis-2/4 flex-col">
                    <h2 className="font-DMsans font-bold text-primaryFontColor text-xs md:text-base pb-[5px] md:pb-[10px]">
                      Division
                    </h2>
                    <select
                      name="division"
                      id="division"
                      className={`w-[90%] text-xs md:text-base pb-2 md:pb-4 border-b-2 ${userInfoError.divisionError && "border-red-700"}`}
                      onChange={HandleInput}
                      value={userInfo.division}
                    >
                      <option>Please select</option>
                      {allDivision()?.map((item) => (
                        <option name="division">{item}</option>
                      ))}
                    </select>
                    {userInfoError.divisionError && (
                      <p className="text-red-600 font-DMsans text-base font-normal">
                        {userInfoError.divisionError}
                      </p>
                    )}
                  </div>
                  {/* District */}
                  <div className="flex w-full md:basis-2/4 flex-col">
                    <h2 className="font-DMsans font-bold text-primaryFontColor text-xs md:text-base pb-[5px] md:pb-[10px]">
                      District
                    </h2>
                    <select
                      name="District"
                      id="District"
                      className="w-[90%] border-b-2 pb-2 md:pb-4 text-xs md:text-base"
                      onChange={HandleInput}
                    >
                      <option value="">Please select</option>
                      {allDistict()?.map((item) => (
                        <option value={userInfo.District}>{item}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* password */}

          <div className="py-2 lg:py-14 border-0 md:border-y-2 mt-6 lg:mt-28">
            <h2 className="font-DMsans font-bold text-primaryFontColor text-[24px] md:text-[39px] pb-5 md:pb-10">
              Your Password
            </h2>
            <form action="#" onSubmit={(e) => e.preventDefault()}>
              <div className="flex items-center justify-between flex-wrap">
                <div className="w-full md:basis-2/4">
                  <p className="text-xs md:text-base font-DMsans font-bold text-primaryFontColor pb-2">
                    Password
                  </p>
                  <div className="relative w-[90%]">
                    <input
                      className={`${userInfoError.PasswordError && "border-red-700"} placeholder:md:text-sm placeholder:text-xs placeholder:font-DMsans placeholder:text-secondaryFontColor placeholder:font-normal border-b-2 pb-4 w-full  focus:border-yellow-400 `}
                      title={"Password"}
                      placeholder={"Password"}
                      type={`${show ? "text" : "password"}`}
                      name={"Password"}
                      id={"Password"}
                      value={userInfo.Password}
                      onChange={HandleInput}
                    />
                    <div
                      className="absolute top-[50%] z-50 -translate-y-[50%] right-4 cursor-pointer text-xl"
                      onClick={HandleShowPassword}
                    >
                      {show ? <FaRegEye /> : <FaRegEyeSlash />}
                    </div>
                  </div>
                  {userInfoError.PasswordError ? (
                    <p className="text-red-600 font-DMsans text-base font-normal">
                      {userInfoError.PasswordError}
                    </p>
                  ) : (
                    userInfoError.PasswordLengthError && (
                      <p className="text-red-600 font-DMsans text-base font-normal">
                        {userInfoError.PasswordLengthError}
                      </p>
                    )
                  )}
                </div>
                <div className="w-full md:basis-2/4 pt-6 md:pt-0">
                  <p className="text-xs md:text-base font-DMsans font-bold text-primaryFontColor pb-2">
                    Repeat password
                  </p>
                  <div className="relative w-[90%]">
                    <input
                      className={`${userInfoError.RepeatPasswordError && "border-red-700"} placeholder:md:text-sm placeholder:text-xs placeholder:font-DMsans placeholder:text-secondaryFontColor placeholder:font-normal border-b-2 pb-4 w-full  focus:border-yellow-400 `}
                      title={"RepeatPassword"}
                      placeholder={"Repeat password"}
                      type={`${show2 ? "text" : "password"}`}
                      name={"RepeatPassword"}
                      id={"RepeatPassword"}
                      value={userInfo.RepeatPassword}
                      onChange={HandleInput}
                    />
                    <div
                      className="absolute top-[50%] z-50 -translate-y-[50%] right-4 cursor-pointer text-xl"
                      onClick={HandleShowPassword2}
                    >
                      {show2 ? <FaRegEye /> : <FaRegEyeSlash />}
                    </div>
                  </div>
                  {userInfoError.RepeatPasswordError ? (
                    <p className="text-red-600 font-DMsans text-base font-normal">
                      {userInfoError.RepeatPasswordError}
                    </p>
                  ) : (
                    userInfoError.PasswordMatchError && (
                      <p className="text-red-600 font-DMsans text-base font-normal">
                        {userInfoError.PasswordMatchError}
                      </p>
                    )
                  )}
                </div>
              </div>
            </form>
          </div>

          {/* Privacy & Policy */}
          <div className="flex items-center gap-x-4 mt-16">
            <input
              onChange={HandleInput}
              type="checkbox"
              id="agreement"
              name="agreement"
              value={userInfo.agreement}
              className={`${userInfoError.agreementError && "border-red-600"}`}
            />
            <p className="font-DMsans font-normal text-xs md:text-sm text-secondaryFontColor">
              I have read and agree to the Privacy Policy
            </p>
            {userInfoError.agreementError && (
              <p className="text-red-600 font-DMsans text-sm md:text-base font-normal">
                {userInfoError.agreementError}
              </p>
            )}
          </div>
          <div className="flex items-center gap-x-4 mt-6">
            <p className="font-DMsans font-normal text-xs md:text-sm text-secondaryFontColor">
              Subscribe Newsletter
            </p>
            <div className="flex items-center gap-x-4">
              <input
                type="checkbox"
                id="subscribeyes"
                name="subscribeyes"
                value={userInfo.subscribeyes}
              />
              <p className="font-DMsans font-normal text-sm text-secondaryFontColor">
                Yes
              </p>
            </div>
            <div className="flex items-center gap-x-4">
              <input
                type="checkbox"
                id="subscribeno"
                name="subscribeno"
                value={userInfo.subscribeno}
              />
              <p className="font-DMsans font-normal text-sm text-secondaryFontColor">
                No
              </p>
            </div>
          </div>
          {/* already login ? */}
          <div className="text-xs md:text-sm font-DMsans font-normal text-primaryFontColor underline pt-4">
            <Link to={"/login"}>Already login?</Link>
          </div>
          {/* Sign up */}
          <div className="mt-7" onClick={HandleSignup}>
            <button
              id="signUpButton"
              className="flex items-center gap-x-2 py-2 md:py-4 px-10 md:px-20 bg-primaryFontColor text-primaryBgColor font-DMsans font-bold text-xs md:text-sm"
            >
              {loading ? (
                <svg viewBox="25 25 50 50">
                  <circle r="20" cy="50" cx="50"></circle>
                </svg>
              ) : (
                " Sign up"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
