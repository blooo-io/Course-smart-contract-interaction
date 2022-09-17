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
        <h1 className='text-magic-mint fs-2 mt-5 mt-lg-0'>Secure Intellectual Properties With Blockchain</h1>
        <p className='text-white fs-1 my-4'>
          Inventors, designers, developers, and authors can protect the ideas
          they have developed, for instance using copyright or patents. The aim
          is to prevent others from wrongly profiting from their creations or
          inventions. It also allows them to earn back the money they invested
          in developing a product.
        </p>
        <p className='text-white fs-1 my-4'>
          However, intellectual property fraud exists. It is when fake goods are
          passed off as originals. It can include counterfeit products or piracy
          of products from many industries, including health, music, film, and
          fashion. Counterfeit goods can be produced with lower safety
          standards, which can pose health and safety risks to those who buy
          counterfeit goods. They also damage the reputation of the companies
          that produce legitimate products.
        </p>
        <p className='text-white fs-1 my-4'>
          Blockchain technology helps in cases of lack of trust. When
          counterfeit goods can be produced, no document can be trusted without
          verification. Therefore, blockchain technology accommodates itself as
          a solution.
        </p>
        <p className='text-white fs-1 my-4'>
          The principle is to write all the information about the intellectual
          property on the blockchain to engrave it forever. The name of the
          person who created the IP and the date of publication will be written
          on the blockchain. Therefore, nobody can produce counterfeit goods.
        </p>
      </div>
    </div>
  )
}

export default HomeIntroduction
