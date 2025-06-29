import React, { memo } from 'react'
import { Link } from 'react-router-dom';
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { FaChevronRight } from "react-icons/fa6"
// define custom breadcrumbs for certain routes.
// breadcrumbs can be components or strings.
const Breadcrumb = ({title, category}) => {
  const routes = [
    // { path : '/', breadcrumbs : "Home"},
    { path : '/products', breadcrumbs: "products"},
    { path : '/products/:category', breadcrumbs: category},
    { path : ':category', breadcrumbs : category},
    { path : '/products/:category/:productId/:title', breadcrumbs : title}
  ];
  const breadcrumbs = useBreadcrumbs(routes);
  console.log(breadcrumbs);
  return (
    <div className='w-full bg-[#f7f7f7] flex flex-col justify-center items-center py-[15px] mt-[-20px]'>
      <div className='w-main flex flex-col gap-2'>
        <h3 className='uppercase text-[#151515] font-semibold text-lg'>{title}</h3>
        <div className='flex items-center gap-1'>
          <Link to={breadcrumbs[0].match.pathname} className='flex items-center gap-1'>
            <span className='capitalize'>{breadcrumbs[0].breadcrumb}</span>
            <FaChevronRight size={10} className='mt-1 text-[#505050]'/>
          </Link>
          {breadcrumbs?.filter(el => el.match.route).map(({ match, breadcrumb }, index, self) => (
            <Link key={match.pathname} to={match.pathname} className='flex items-center gap-1'>
              <span className={`${index === self.length - 1? 'text-[#505050]' : ''} capitalize`}>{breadcrumb}</span>
              {index !== self.length -1 && <FaChevronRight size={10} className='mt-1 text-[#505050]'/>}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default memo(Breadcrumb)