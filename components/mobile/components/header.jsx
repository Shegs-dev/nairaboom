import imm from "../assets/EduPlan.png";

const Header = () => {
  return (
    <div className="bg-[#522AAF] h-16 px-4 flex justify-between items-center ">
      <div className="md:ml-20">
        <img className="w-50 h-50" loading="lazy" alt="Logo" src={imm} />
      </div>
    </div>
  );
};

export default Header;
