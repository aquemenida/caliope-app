
export default function SignupPage() {
  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#f8fcfa] justify-between group/design-root overflow-x-hidden"
      style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}
    >
      <div>
        <div className="flex items-center bg-[#f8fcfa] p-4 pb-2 justify-between">
          <div className="text-[#0e1b17] flex size-12 shrink-0 items-center" data-icon="ArrowLeft" data-size="24px" data-weight="regular">
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
              <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
            </svg>
          </div>
          <h2 className="text-[#0e1b17] text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">Sign up</h2>
        </div>
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <input
              placeholder="Email"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0e1b17] focus:outline-0 focus:ring-0 border-none bg-[#e7f3ef] focus:border-none h-14 placeholder:text-[#4e977f] p-4 text-base font-normal leading-normal"
              value=""
            />
          </label>
        </div>
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <input
              placeholder="Password"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0e1b17] focus:outline-0 focus:ring-0 border-none bg-[#e7f3ef] focus:border-none h-14 placeholder:text-[#4e977f] p-4 text-base font-normal leading-normal"
              value=""
            />
          </label>
        </div>
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <input
              placeholder="Confirm Password"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0e1b17] focus:outline-0 focus:ring-0 border-none bg-[#e7f3ef] focus:border-none h-14 placeholder:text-[#4e977f] p-4 text-base font-normal leading-normal"
              value=""
            />
          </label>
        </div>
        <div className="flex px-4 py-3">
          <button
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-5 flex-1 bg-[#14b781] text-[#0e1b17] text-base font-bold leading-normal tracking-[0.015em]"
          >
            <span className="truncate">Sign up</span>
          </button>
        </div>
        <div className="flex justify-center">
          <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 max-w-[480px] justify-center">
            <button
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#e7f3ef] text-[#0e1b17] text-sm font-bold leading-normal tracking-[0.015em] grow"
            >
              <span className="truncate">Continue with Google</span>
            </button>
            <button
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#e7f3ef] text-[#0e1b17] text-sm font-bold leading-normal tracking-[0.015em] grow"
            >
              <span className="truncate">Continue with Facebook</span>
            </button>
          </div>
        </div>
      </div>
      <div>
        <p className="text-[#4e977f] text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center underline">Already have an account? Log in</p>
        <div className="h-5 bg-[#f8fcfa]"></div>
      </div>
    </div>
  );
}
