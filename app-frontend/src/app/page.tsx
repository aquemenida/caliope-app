export default function HomePage() {
  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#f8fcfa] justify-between group/design-root overflow-x-hidden"
      style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}
    >
      <div>
        <div className="@container">
          <div className="@[480px]:px-4 @[480px]:py-3">
            <div
              className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden bg-[#f8fcfa] @[480px]:rounded-xl min-h-80"
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBgOeCkUSaXfgcr-X8PmB-wdo56Ybhh-UNx5LzOZGo8aoiliknpU620Ethf9LibQ1hmjs-KmkQAoz4eRyAXVm524E2rneAoux6d1aBBMKqLjyOJsShNaX4stp1wnR9gmyVq08iRDcrtxERx0C0MmsErodvUNzif3BC2htlNm8QzW2ovlyI-30OhmXvDhZ_FoViBjKeX1HCoS_ix1xepkJQA9dVmNgS9Xc8Y5DKVjzgxA9xh6-BuwhaKR6oi5TOIs3QXvqxrSufaHg")' }}
            ></div>
          </div>
        </div>
        <h2 className="text-[#0e1b17] tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">Welcome to Wellness Rewards</h2>
        <p className="text-[#0e1b17] text-base font-normal leading-normal pb-3 pt-1 px-4 text-center">Earn points for healthy habits and redeem them for exclusive rewards.</p>
        <div className="flex justify-center">
          <div className="flex flex-1 gap-3 max-w-[480px] flex-col items-stretch px-4 py-3">
            <button
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-5 bg-[#14b781] text-[#0e1b17] text-base font-bold leading-normal tracking-[0.015em] w-full"
            >
              <span className="truncate">Explore Benefits</span>
            </button>
            <button
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-5 bg-[#e7f3ef] text-[#0e1b17] text-base font-bold leading-normal tracking-[0.015em] w-full"
            >
              <span className="truncate">Join Now</span>
            </button>
          </div>
        </div>
      </div>
      <div><div className="h-5 bg-[#f8fcfa]"></div></div>
    </div>
  );
}