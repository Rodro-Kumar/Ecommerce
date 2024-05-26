import React from "react";

const Input = ({
  inputTitle,
  inputType,
  inputId,
  inputName,
  placeHolder,
  className,
  onChangeInput,
  inputValue,
}) => {
  return (
    <div className="py-6 basis-2/4 flex flex-col">
      <p className="text-base font-DMsans font-bold text-primaryFontColor pb-2">
        {inputTitle ? inputTitle : "Title"}
      </p>
      <input
        type={inputType}
        id={inputId}
        value={inputValue}
        name={inputName}
        placeholder={placeHolder ? placeHolder : "Placeholder"}
        className={`placeholder:text-sm placeholder:font-DMsans placeholder:text-secondaryFontColor placeholder:font-normal border-b-2  pb-4 w-[90%] focus:border-yellow-400 ${className}`}
        onChange={onChangeInput}
      />
    </div>
  );
};

export default Input;
