import { useForm, SubmitHandler } from "react-hook-form";

interface FormValues {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitted },
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);

  return (
    <section className="h-full gradient-form bg-gray-200 md:h-screen">
      <div className=" py-12 px-6 h-full">
        <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
          <div className="xl:w-4/12">
            <div className="block bg-white shadow-lg rounded-lg">
              <div className="lg:flex lg:flex-wrap items-center justify-center py-9">
                <div className="text-center ">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                      className={`form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`}
                      {...register("email", {
                        required: true,
                        pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                      })}
                    />
                    {(isDirty || isSubmitted) &&
                      errors.email?.type === "required" && (
                        <p className={`text-xs mb-3 text-red-500 text-left`}>
                          Email is required
                        </p>
                      )}
                    {(isDirty || isSubmitted) &&
                      errors.email?.type === "pattern" && (
                        <p className={`text-xs mb-3 text-red-500 text-left`}>
                          Email is invalid
                        </p>
                      )}
                    <input
                      className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      {...register("password", {
                        required: true,
                      })}
                    />
                    {(isDirty || isSubmitted) &&
                      errors.password?.type === "required" && (
                        <p className={`text-xs mb-3 text-red-500 text-left`}>
                          Password is required
                        </p>
                      )}
                    <input
                      type="submit"
                      className="w-full rounded-lg duration-300 bg-purple-500 cursor-pointer tr py-3 px-4 text-sm font-semibold text-white hover:bg-purple-700 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
