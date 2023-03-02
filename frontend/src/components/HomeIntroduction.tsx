import React from 'react'

/**
 *  Display the project summary on the Home page
 * @component
 * @category Home
 * @return {Jsx}
 */
const HomeIntroduction = () => {
  return (
    <div className="background-linear-gradient h-sm-100 w-sm-100">
      <div className='svg-div d-none d-lg-block'>
        <svg
          width="711"
          height="779"
          viewBox="0 0 711 779"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M687.401 73.6371C685.919 239.919 669.461 365.842 622.009 470.884C573.608 578.027 491.861 665.761 355.049 752.073C234.288 675.303 152.732 593.888 100.49 487.637C49.0205 382.957 24.9504 252.058 22.6784 73.6202C85.0299 87.2513 136.167 90.4719 186.432 83.1161C240.713 75.1726 292.399 55.1023 354.437 25.2803C414.04 57.137 466.02 77.2319 521.391 84.6669C572.45 91.5229 624.97 87.4268 687.401 73.6371Z"
            stroke="url(#paint0_linear_105_180)"
            strokeOpacity="0.2"
            strokeWidth="45"
          />
          <defs>
            <linearGradient
              id="paint0_linear_105_180"
              x1="355.007"
              y1="0"
              x2="355.007"
              y2="778.614"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4E7577" stopOpacity="0.76" />
              <stop offset="1" stopColor="#23445B" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className='h-sm-100 d-flex justify-content-center flex-column align-middle px-lg-5 mx-5'>
        <h1 className='text-magic-mint fs-2 mt-5 mt-lg-0'>Automotive Traceability</h1>
        <p className='text-white fs-1 my-4'>
          Automotive traceability is a critical aspect of the automotive industry.
          It refers to the ability to track a vehicle's entire life cycle from its manufacture to its end-of-life disposal.
          Automotive traceability is essential for ensuring quality, improving efficiency, and ensuring consumer safety.
          Blockchain technology has emerged as a promising solution for achieving automotive traceability.
        </p>
        <p className='text-white fs-1 my-4'>
          Blockchain technology provides a decentralized, immutable, and transparent ledger that can record transactions in a secure and tamper-proof way.
          In the context of the automotive industry, a blockchain can be used to record every step in a vehicle's life cycle, including its production, shipping, sale, maintenance, and disposal.
        </p>
      </div>
    </div>
  )
}

export default HomeIntroduction
