import { Outlet } from "react-router-dom";
import { DermSubnav } from "../../components/DermSubnav";

export function DermLayout() {
  return (
    <>
      <DermSubnav />
      <Outlet />
    </>
  );
}
