import { ListStart } from "lucide-react";

const Dashboard = () => {
  return (
    <>
      <div className="flex flex-row items-center justify-center">
        <h2>welcome to dashboard </h2>
      </div>
      <div className="flex flex-col items-center justify-center">
        <ListStart />
        <p> Start over!</p>
      </div>
    </>
  );
};

export default Dashboard;
