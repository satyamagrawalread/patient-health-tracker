import Navbar from "./Navbar";

export default function Layout({
  children
}:{
  children: React.ReactNode
}) {
  return (
    <div>
        <div className="w-screen h-svh flex flex-col box-border overflow-hidden">
          <Navbar />
          {children}
        </div>
    </div>
  );
}
