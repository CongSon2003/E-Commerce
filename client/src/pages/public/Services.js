import { Breadcrumb } from 'component'
import React from 'react'
const Services = () => {
  return (
    <div className="w-full flex flex-col gap-5">
      <Breadcrumb title={"Services"} pages={"Services"} />
      <div className="w-full bg-white flex justify-center font-[Poppins] pb-[20px]">
        <div className="w-main flex flex-col gap-4">
          <div className='flex flex-col'>
            <div className="grid grid-cols-2 mb-12">
              <div className="col-span-1">
                <img className='w-[580px] h-fit object-cover' src="https://cdn.shopify.com/s/files/1/1636/8779/files/9069783_orig.jpg?v=1491836163" alt=""/>
              </div>
              <div className="col-span-1 text-sm text-[#505050]">
                <p className="mb-[10px]">Cras magna tellus, congue vitae congue vel, facilisis id risus. Proin semper in lectus id faucibus. Aenean vitae quam eget mi aliquam viverra quis quis velit.</p>
                <p className="mb-[10px]">Curabitur mauris diam, posuere vitae nunc eget, blandit pellentesque mi. Pellentesque placerat nulla at ultricies malesuada. Aenean mi lacus, malesuada at leo vel, blandit iaculis nisl.</p>
                <p>Praesent vestibulum nisl sed diam euismod, a auctor neque porta. Vestibulum varius ligula non orci tincidunt rutrum. Suspendisse placerat enim eu est egestas, aliquam venenatis elit accumsan. Donec metus quam, posuere sit amet odio et, ultricies consequat nibh.</p>
              </div>
            </div>
            <div className='text-center'>
              <h1 className='capitalize font-semibold text-[#505050] text-2xl'>We Offer Best Services</h1>
              <div className='grid grid-cols-3 grid-rows-2 text-[#505050]'>
                <div className='col-span-1 row-span-1 text-center p-[30px]'>
                  <div className='inline-block'>
                    <img src='https://cdn.shopify.com/s/files/1/1636/8779/files/settings.png?v=1491835711' alt=''/>
                  </div>
                  <div className='flex flex-col'>
                    <span className='text-base mb-2'>Customizable Page</span>
                    <span className='text-xs'>Fusce arcu molestie eget libero consectetur congue consectetur in bibendum litora</span>
                  </div>
                </div>
                 <div className='col-span-1 row-span-1 text-center p-[30px]'>
                  <div className='inline-block'>
                    <img src='https://cdn.shopify.com/s/files/1/1636/8779/files/picture.png?v=1491835656' alt=''/>
                  </div>
                  <div className='flex flex-col'>
                    <span className='text-base mb-2'>Customizable Page</span>
                    <span className='text-xs'>Fusce arcu molestie eget libero consectetur congue consectetur in bibendum litora</span>
                  </div>
                </div>
                 <div className='col-span-1 row-span-1 text-center p-[30px]'>
                  <div className='inline-block'>
                    <img src='https://cdn.shopify.com/s/files/1/1636/8779/files/layout.png?v=1491835677' alt=''/>
                  </div>
                  <div className='flex flex-col'>
                    <span className='text-base mb-2'>Customizable Page</span>
                    <span className='text-xs'>Fusce arcu molestie eget libero consectetur congue consectetur in bibendum litora</span>
                  </div>
                </div>
                 <div className='col-span-1 row-span-1 text-center p-[30px]'>
                  <div className='inline-block'>
                    <img src='https://cdn.shopify.com/s/files/1/1636/8779/files/picture.png?v=1491835656' alt=''/>
                  </div>
                  <div className='flex flex-col'>
                    <span className='text-base mb-2'>Customizable Page</span>
                    <span className='text-xs'>Fusce arcu molestie eget libero consectetur congue consectetur in bibendum litora</span>
                  </div>
                </div>
                <div className='col-span-1 row-span-1 text-center p-[30px]'>
                  <div className='inline-block'>
                    <img src='https://cdn.shopify.com/s/files/1/1636/8779/files/layout.png?v=1491835677' alt=''/>
                  </div>
                  <div className='flex flex-col'>
                    <span className='text-base mb-2'>Customizable Page</span>
                    <span className='text-xs'>Fusce arcu molestie eget libero consectetur congue consectetur in bibendum litora</span>
                  </div>
                </div>
                <div className='col-span-1 row-span-1 text-center p-[30px]'>
                  <div className='inline-block'>
                    <img src='https://cdn.shopify.com/s/files/1/1636/8779/files/settings.png?v=1491835711' alt=''/>
                  </div>
                  <div className='flex flex-col'>
                    <span className='text-base mb-2'>Customizable Page</span>
                    <span className='text-xs'>Fusce arcu molestie eget libero consectetur congue consectetur in bibendum litora</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Services