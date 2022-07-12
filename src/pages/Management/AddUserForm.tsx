import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useForm, SubmitHandler } from "react-hook-form";
interface FormValues {
  name: string;
  role: string;
  gender: string;
}
const Loader = forwardRef(({ handleOutsdeComponentSubmit }: any, ref) => {
  const [visible, setVisible] = useState(false);
  useImperativeHandle(ref, () => ({
    setModalVisible(data: boolean) {
      if (data === false) reset();
      setVisible(data);
    },
  }));

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitted },
    reset,
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    handleOutsdeComponentSubmit(data);
  };

  const handleClose = (e: any) => {
    reset();
    if (e.target.id === "add-user-custom") setVisible(false);
  };
  const handleButtonClose = (e: any) => {
    reset();
    setVisible(false);
  };

  return visible ? (
    <div
      className="absolute bg-white bg-opacity-60 z-20 h-full w-full flex items-center justify-center"
      id="add-user-custom"
      onClick={handleClose}
    >
      <div className="flex items-center w-4/12">
        <div className="block bg-white shadow-lg rounded-lg w-full">
          <div className="lg:flex lg:flex-wrap items-center justify-center py-9">
            <div className="w-8/12">
              <input
                placeholder="Name"
                className={`${
                  (isDirty || isSubmitted) && errors.name && "border-b-red-500"
                } form-control mt-4 block w-full py-2 text-md font-normal text-gray-700 bg-white bg-clip-padding border-b border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none`}
                {...register("name", {
                  required: true,
                })}
              />
              {(isDirty || isSubmitted) && errors.name?.type === "required" && (
                <p className={`text-xs text-red-500 text-left`}>
                  Name is required
                </p>
              )}
              <input
                placeholder="Role"
                className={`${
                  (isDirty || isSubmitted) && errors.role && "border-b-red-500"
                } form-control mt-4 block w-full py-2 text-md font-normal text-gray-700 bg-white bg-clip-padding border-b border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none`}
                {...register("role", {
                  required: true,
                })}
              />
              {(isDirty || isSubmitted) && errors.role?.type === "required" && (
                <p className={`text-xs text-red-500 text-left`}>
                  Role is required
                </p>
              )}
              <input
                placeholder="Gender"
                className={`${
                  (isDirty || isSubmitted) &&
                  errors.gender &&
                  "border-b-red-500"
                } form-control mt-4 block w-full py-2 text-md font-normal text-gray-700 bg-white bg-clip-padding border-b border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none`}
                {...register("gender", {
                  required: true,
                })}
              />
              {(isDirty || isSubmitted) &&
                errors.gender?.type === "required" && (
                  <p className={`text-xs text-red-500 text-left`}>
                    Gender is required
                  </p>
                )}
              <div className="flex justify-between">
                <div
                  onClick={handleButtonClose}
                  className="w-5/12 mt-7 text-center rounded-md duration-300 bg-gray-500 cursor-pointer tr py-3 px-4 text-md font-semibold text-white hover:bg-gray-700 hover:text-white focus:outline-none"
                >
                  Close
                </div>
                <div
                  onClick={handleSubmit(onSubmit)}
                  className="w-5/12 mt-7 text-center rounded-md duration-300 bg-green-500 cursor-pointer tr py-3 px-4 text-md font-semibold text-white hover:bg-green-700 hover:text-white focus:outline-none"
                >
                  Create
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
});
export default Loader;
