
export default function DashboardPage() {
  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#f8fcfa] justify-between group/design-root overflow-x-hidden"
      style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}
    >
      <div>
        <div className="flex items-center bg-[#f8fcfa] p-4 pb-2 justify-between">
          <div className="text-[#0e1b17] flex size-12 shrink-0 items-center" data-icon="List" data-size="24px" data-weight="regular">
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
              <path
                d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"
              ></path>
            </svg>
          </div>
          <h2 className="text-[#0e1b17] text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">Dashboard</h2>
        </div>
        <h3 className="text-[#0e1b17] tracking-light text-2xl font-bold leading-tight px-4 text-left pb-2 pt-5">Hi, Amelia</h3>
        <div className="flex items-center gap-4 bg-[#f8fcfa] px-4 min-h-[72px] py-2 justify-between">
          <div className="flex flex-col justify-center">
            <p className="text-[#0e1b17] text-base font-medium leading-normal line-clamp-1">1,250</p>
            <p className="text-[#4e977f] text-sm font-normal leading-normal line-clamp-2">Points</p>
          </div>
          <div className="shrink-0">
            <div className="text-[#0e1b17] flex size-7 items-center justify-center" data-icon="ArrowRight" data-size="24px" data-weight="regular">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path>
              </svg>
            </div>
          </div>
        </div>
        <h2 className="text-[#0e1b17] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Transaction History</h2>
        <div className="flex gap-4 bg-[#f8fcfa] px-4 py-3 justify-between">
          <div className="flex flex-1 flex-col justify-center">
            <p className="text-[#0e1b17] text-base font-medium leading-normal">Completed 3 workouts</p>
            <p className="text-[#4e977f] text-sm font-normal leading-normal">Earned</p>
            <p className="text-[#4e977f] text-sm font-normal leading-normal">July 15, 2024</p>
          </div>
          <div className="shrink-0"><p className="text-[#0e1b17] text-base font-normal leading-normal">+150</p></div>
        </div>
        <div className="flex gap-4 bg-[#f8fcfa] px-4 py-3 justify-between">
          <div className="flex flex-1 flex-col justify-center">
            <p className="text-[#0e1b17] text-base font-medium leading-normal">Massage</p>
            <p className="text-[#4e977f] text-sm font-normal leading-normal">Redeemed</p>
            <p className="text-[#4e977f] text-sm font-normal leading-normal">July 10, 2024</p>
          </div>
          <div className="shrink-0"><p className="text-[#0e1b17] text-base font-normal leading-normal">-500</p></div>
        </div>
        <div className="flex gap-4 bg-[#f8fcfa] px-4 py-3 justify-between">
          <div className="flex flex-1 flex-col justify-center">
            <p className="text-[#0e1b17] text-base font-medium leading-normal">Referral bonus</p>
            <p className="text-[#4e977f] text-sm font-normal leading-normal">Earned</p>
            <p className="text-[#4e977f] text-sm font-normal leading-normal">July 5, 2024</p>
          </div>
          <div className="shrink-0"><p className="text-[#0e1b17] text-base font-normal leading-normal">+1000</p></div>
        </div>
      </div>
      <div>
        <div className="flex gap-2 border-t border-[#e7f3ef] bg-[#f8fcfa] px-4 pb-3 pt-2">
          <a className="just flex flex-1 flex-col items-center justify-end gap-1 rounded-full text-[#0e1b17]" href="#">
            <div className="text-[#0e1b17] flex h-8 items-center justify-center" data-icon="House" data-size="24px" data-weight="fill">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path
                  d="M224,115.55V208a16,16,0,0,1-16,16H168a16,16,0,0,1-16-16V168a8,8,0,0,0-8-8H112a8,8,0,0,0-8,8v40a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V115.55a16,16,0,0,1,5.17-11.78l80-75.48.11-.11a16,16,0,0,1,21.53,0,1.14,1.14,0,0,0,.11.11l80,75.48A16,16,0,0,1,224,115.55Z"
                ></path>
              </svg>
            </div>
            <p className="text-[#0e1b17] text-xs font-medium leading-normal tracking-[0.015em]">Dashboard</p>
          </a>
          <a className="just flex flex-1 flex-col items-center justify-end gap-1 text-[#4e977f]" href="/curator">
            <div className="text-[#4e977f] flex h-8 items-center justify-center" data-icon="ListBullets" data-size="24px" data-weight="regular">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path
                  d="M56,128a16,16,0,1,1-16-16A16,16,0,0,1,56,128ZM40,48A16,16,0,1,0,56,64,16,16,0,0,0,40,48Zm0,128a16,16,0,1,0,16,16A16,16,0,0,0,40,176Zm176-64H88a8,8,0,0,0-8,8v16a8,8,0,0,0,8,8H216a8,8,0,0,0,8-8V120A8,8,0,0,0,216,112Zm0-64H88a8,8,0,0,0-8,8V72a8,8,0,0,0,8,8H216a8,8,0,0,0,8-8V56A8,8,0,0,0,216,48Zm0,128H88a8,8,0,0,0-8,8v16a8,8,0,0,0,8,8H216a8,8,0,0,0,8-8V184A8,8,0,0,0,216,176Z"
                ></path>
              </svg>
            </div>
            <p className="text-[#4e977f] text-xs font-medium leading-normal tracking-[0.015em]">Curator</p>
          </a>
          <a className="just flex flex-1 flex-col items-center justify-end gap-1 text-[#4e977f]" href="#">
            <div className="text-[#4e977f] flex h-8 items-center justify-center" data-icon="Gift" data-size="24px" data-weight="regular">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path
                  d="M216,72H180.92c.39-.33.79-.65,1.17-1A29.53,29.53,0,0,0,192,49.57,32.62,32.62,0,0,0,158.44,16,29.53,29.53,0,0,0,137,25.91a54.94,54.94,0,0,0-9,14.48,54.94,54.94,0,0,0-9-14.48A29.53,29.53,0,0,0,97.56,16,32.62,32.62,0,0,0,64,49.57,29.53,29.53,0,0,0,73.91,71c.38.33.78.65,1.17,1H40A16,16,0,0,0,24,88v32a16,16,0,0,0,16,16v64a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V136a16,16,0,0,0,16-16V88A16,16,0,0,0,216,72ZM149,36.51a13.69,13.69,0,0,1,10-4.5h.49A16.62,16.62,0,0,1,176,49.08a13.69,13.69,0,0,1-4.5,10c-9.49,8.4-25.24,11.36-35,12.4C137.7,60.89,141,45.5,149,36.51Zm-64.09.36A16.63,16.63,0,0,1,96.59,32h.49a13.69,13.69,0,0,1,10,4.5c8.39,9.48,11.35,25.2,12.39,34.92-9.72-1-25.44-4-34.92-12.39a13.69,13.69,0,0,1-4.5-10A16.6,16.6,0,0,1,84.87,36.87ZM40,88h80v32H40Zm16,48h64v64H56Zm144,64H136V136h64Zm16-80H136V88h80v32Z"
                ></path>
              </svg>
            </div>
            <p className="text-[#4e977f] text-xs font-medium leading-normal tracking-[0.015em]">Rewards</p>
          </a>
          <a className="just flex flex-1 flex-col items-center justify-end gap-1 text-[#4e977f]" href="#">
            <div className="text-[#4e977f] flex h-8 items-center justify-center" data-icon="User" data-size="24px" data-weight="regular">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path
                  d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"
                ></path>
              </svg>
            </div>
            <p className="text-[#4e977f] text-xs font-medium leading-normal tracking-[0.015em]">Profile</p>
          </a>
        </div>
        <div className="h-5 bg-[#f8fcfa]"></div>
      </div>
    </div>
  );
}
