import { Login } from "./login";
import { Logo } from "./logo";

export const Header = () => {
  return (
    <div className="absolute top-0 w-screen flex items-center justify-between my-2 px-8 lg:px-2">
      <div className="flex flex-row items-center justify-center">
        <Logo className="h-10 w-10" />
        <h1 className="text-2xl font-extrabold text-white">bit2</h1>
      </div>
      <Login />
    </div>
  );
};
