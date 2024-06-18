import { Login } from "./login";

export const Header = () => {
  return (
    <div className="absolute top-0 w-screen flex items-center justify-between my-2 px-8 lg:px-2">
      <h1 className="text-lg font-extrabold text-black">bit2</h1>
      <Login />
    </div>
  );
};
